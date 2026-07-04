# 正文与目录间距优化计划

> **For Hermes:** 直接执行，无需 subagent。

**Goal:** 减小正文定宽解决 1280-1440px 视口下正文与 TOC 间距过紧的问题

**根因:** `.content` 定宽 700px + TOC `position:fixed` 不参与流式布局，在常见笔记本分辨率下（1280-1440px），正文右边缘与 TOC 左边缘间距仅 18-98px。

**Architecture:** 将 content 宽度从 700px 调至 640px，同步调整 `--content-max-width` 变量保持一致。

**Tech Stack:** CSS（VitePress 自定义主题）

---

### Task 1: 调整 content 定宽

**Objective:** 将 desktop 下 content 从 700px 缩小到 640px，释放 60px 空间给正文-TOC 间隙

**Files:**
- Modify: `.vitepress/theme/custom.css:211-212`（`.content` 宽度规则）

**Step 1: 修改 content 宽度**

```css
  .content,
  div.content,
  .vp-doc .content {
    width: 640px !important;
    max-width: 640px !important;
    margin: 0 !important;
    flex: none !important;
    display: block !important;
  }
```

**Step 2: 运行 build 验证**

```bash
cd /Users/yingwu/Developer/projects/My_Blog && npm run build
```
Expected: build 通过

**Step 3: 提交**

```bash
git add .vitepress/theme/custom.css
git commit -m "缩小 content 宽度解决正文与 TOC 间距过紧"
```

---

### 验证：调整后的间距

| 视口 | 旧间距 | 新间距（content=640px） |
|---|---|---|
| 1280px | 18px ❌ | 68px ⚠️ |
| 1366px | 61px ❌ | 111px ✓ |
| 1440px | 98px ⚠️ | 148px ✓ |
| 1600px | 178px ✓ | 228px ✓ |

在 1280px 下从 18px 提升到 68px，虽然仍偏紧但已不会贴在一起；1366px+ 完全解决。

---

### 备选：若 640px 仍嫌不够

将此前加的 `padding-left: 2.5rem` 改成在 `.vp-doc` 层面加 `gap` 或给 content 加 `margin-right`。但当前方案改动最小、影响面最窄，优先执行。
