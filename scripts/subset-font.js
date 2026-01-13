import Fontmin from 'fontmin';
import fg from 'fast-glob';
import fs from 'fs/promises';
import path from 'path';

const ROOT_DIR = process.cwd();
const FONT_SRC = path.join(ROOT_DIR, 'front/HYWenRunSongYunU.ttf');
const TEMP_OUT = path.join(ROOT_DIR, 'front/temp_subset');

async function getUsedCharacters() {
    console.log('Scanning files for characters...');

    // Define patterns to search
    // We strictly focus on what the user asked: "Simply simplified Chinese appearing in Chinese pages" 
    // But to be safe, I'm including essential ASCII and punctuation.
    const entries = await fg([
        'zh/**/*.md',
        '.vitepress/**/*.vue',
        '.vitepress/**/*.ts',
        '.vitepress/**/*.js',
        '*.md'
    ], {
        cwd: ROOT_DIR,
        ignore: ['node_modules', 'dist', '.vitepress/dist']
    });

    let allText = '';

    // Basic ASCII + Common Punctuation (Important for layout stability)
    allText += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    allText += '.,;:?!@#$%^&*()_+-=[]{}|\\/\'"<>`~';
    allText += '，。？！：；“”‘’（）【】《》、…—·';

    for (const file of entries) {
        const content = await fs.readFile(path.join(ROOT_DIR, file), 'utf-8');
        allText += content;
    }

    // Filter to remove extremely rare chars if needed, but for now just unique is enough scaling.
    const uniqueChars = Array.from(new Set(allText)).join('');
    console.log(`Found ${uniqueChars.length} unique characters from ${entries.length} files.`);
    return uniqueChars;
}

async function subsetFont() {
    try {
        const text = await getUsedCharacters();

        // Ensure temp dir exists
        try {
            await fs.mkdir(TEMP_OUT, { recursive: true });
        } catch { }

        const fontmin = new Fontmin()
            .src(FONT_SRC)
            .use(Fontmin.glyph({
                text: text,
                hinting: false
            }))
            .use(Fontmin.ttf2woff2()) // Generate modern web format
            .dest(TEMP_OUT);

        console.log('Starting font generation...');

        fontmin.run(async (err, files) => {
            if (err) {
                console.error('Error:', err);
                process.exit(1);
            }

            console.log('Font generated in temp folder.');

            // Move the web friendly woff2 file to final destination
            const finalName = 'HYWenRunSongYunU-subset.woff2';
            const generatedFile = path.join(TEMP_OUT, 'HYWenRunSongYunU.woff2');
            const finalPath = path.join(ROOT_DIR, 'front', finalName);

            await fs.rename(generatedFile, finalPath);
            console.log(`Moved to ${finalPath}`);

            // Clean up temp
            await fs.rm(TEMP_OUT, { recursive: true, force: true });

            console.log('Done!');
        });
    } catch (e) {
        console.error('Script failed:', e);
    }
}

subsetFont();
