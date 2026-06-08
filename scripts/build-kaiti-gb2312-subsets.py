#!/usr/bin/env python3
from __future__ import annotations

import os
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE_CANDIDATES = [
    os.environ.get("KAITI_GB2312_SOURCE_TTF"),
    str(ROOT / "public/fonts/kaiti-gb2312.ttf"),
    str(Path.home() / "Downloads/楷体_GB2312.TTF"),
]
OUTPUT_DIR = ROOT / "public/fonts/kaiti-gb2312"
CSS_FILE = ROOT / ".vitepress/theme/kaiti-gb2312-fonts.css"
TEXT_ROOTS = [
    ROOT / "zh",
    ROOT / ".vitepress/theme/components",
    ROOT / ".vitepress/config.ts",
]


def source_font() -> Path:
    for candidate in SOURCE_CANDIDATES:
        if candidate and Path(candidate).is_file():
            return Path(candidate)
    raise SystemExit(
        "Could not find 楷体_GB2312.TTF. Set KAITI_GB2312_SOURCE_TTF=/absolute/path/楷体_GB2312.TTF"
    )


def iter_text_files() -> list[Path]:
    files: list[Path] = []
    for root in TEXT_ROOTS:
        if root.is_file():
            files.append(root)
        elif root.is_dir():
            files.extend(
                p for p in root.rglob("*") if p.suffix in {".md", ".vue", ".ts"}
            )
    return sorted(files)


def is_cjkish(cp: int) -> bool:
    return (
        0x2E80 <= cp <= 0x2EFF
        or 0x2F00 <= cp <= 0x2FDF
        or 0x3000 <= cp <= 0x303F
        or 0x3400 <= cp <= 0x4DBF
        or 0x4E00 <= cp <= 0x9FFF
        or 0xF900 <= cp <= 0xFAFF
        or 0xFF00 <= cp <= 0xFFEF
    )


def collect_site_codepoints() -> list[int]:
    codepoints: set[int] = set()
    for path in iter_text_files():
        try:
            text = path.read_text("utf-8")
        except UnicodeDecodeError:
            continue
        for char in text:
            cp = ord(char)
            if is_cjkish(cp):
                codepoints.add(cp)
    return sorted(codepoints)


def unicode_range(codepoints: list[int]) -> str:
    if not codepoints:
        return ""
    ranges: list[tuple[int, int]] = []
    start = prev = codepoints[0]
    for cp in codepoints[1:]:
        if cp == prev + 1:
            prev = cp
            continue
        ranges.append((start, prev))
        start = prev = cp
    ranges.append((start, prev))
    return ", ".join(
        f"U+{start:04X}" if start == end else f"U+{start:04X}-{end:04X}"
        for start, end in ranges
    )


def subset_font(source: Path, output: Path, unicodes: str | None = None, text_file: Path | None = None) -> None:
    command = [
        sys.executable,
        "-m",
        "fontTools.subset",
        str(source),
        f"--output-file={output}",
        "--flavor=woff2",
        "--layout-features=*",
        "--name-IDs=*",
        "--name-legacy",
        "--name-languages=*",
        "--glyph-names",
        "--symbol-cmap",
        "--legacy-cmap",
        "--notdef-glyph",
        "--notdef-outline",
        "--recommended-glyphs",
        "--no-hinting",
    ]
    if text_file:
        command.append(f"--text-file={text_file}")
    elif unicodes:
        command.append(f"--unicodes={unicodes}")
    else:
        raise ValueError("Either unicodes or text_file is required")

    try:
        result = subprocess.run(command, check=True, capture_output=True, text=True)
        for line in result.stderr.splitlines():
            if "timestamp seems very low" not in line:
                print(line, file=sys.stderr)
    except subprocess.CalledProcessError as exc:
        if exc.stderr:
            print(exc.stderr, file=sys.stderr)
        raise SystemExit(
            "Failed to build WOFF2 subsets. Install Brotli for fontTools first: "
            "python3 -m pip install brotli"
        ) from exc


def chunk_ranges() -> list[tuple[str, str]]:
    ranges: list[tuple[str, str]] = [
        ("symbols", "U+3000-303F,U+FF00-FFEF"),
    ]
    for start in range(0x3400, 0x4DC0, 0x800):
        end = min(start + 0x7FF, 0x4DBF)
        ranges.append((f"cjk-ext-a-{start:04x}-{end:04x}", f"U+{start:04X}-{end:04X}"))
    for start in range(0x4E00, 0xA000, 0x800):
        end = min(start + 0x7FF, 0x9FFF)
        ranges.append((f"cjk-{start:04x}-{end:04x}", f"U+{start:04X}-{end:04X}"))
    ranges.append(("cjk-compat", "U+F900-FAFF"))
    return ranges


def font_face(
    family: str,
    file_name: str,
    range_value: str,
    display: str = "swap",
) -> str:
    return f'''@font-face {{
  font-family: "{family}";
  src: url("/fonts/kaiti-gb2312/{file_name}") format("woff2");
  font-style: normal;
  font-weight: 400 700;
  font-display: {display};
  unicode-range: {range_value};
}}'''


def main() -> None:
    source = source_font()
    if OUTPUT_DIR.exists():
        shutil.rmtree(OUTPUT_DIR)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    site_codepoints = collect_site_codepoints()
    if not site_codepoints:
        raise SystemExit("No CJK characters found for the site subset.")

    site_text = OUTPUT_DIR / "site-chars.txt"
    site_text.write_text("".join(chr(cp) for cp in site_codepoints), "utf-8")

    css_blocks: list[str] = [
        "/* Generated by scripts/build-kaiti-gb2312-subsets.py. */",
    ]
    subset_font(source, OUTPUT_DIR / "kaiti-gb2312-site.woff2", text_file=site_text)
    css_blocks.append(
        font_face(
            "BlogKaitiGB2312Site",
            "kaiti-gb2312-site.woff2",
            unicode_range(site_codepoints),
            display="block",
        )
    )

    for name, range_value in chunk_ranges():
        file_name = f"kaiti-gb2312-{name}.woff2"
        subset_font(source, OUTPUT_DIR / file_name, unicodes=range_value)
        css_blocks.append(font_face("BlogKaitiGB2312Chunked", file_name, range_value))

    CSS_FILE.write_text("\n\n".join(css_blocks) + "\n", "utf-8")
    site_text.unlink()

    files = sorted(OUTPUT_DIR.glob("*.woff2"))
    total = sum(path.stat().st_size for path in files)
    print(f"Built {len(files)} WOFF2 subsets in {OUTPUT_DIR.relative_to(ROOT)}")
    print(f"Site subset chars: {len(site_codepoints)}")
    print(f"Total subset size: {total / 1024 / 1024:.2f} MB")


if __name__ == "__main__":
    main()
