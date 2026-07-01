# 恢复文章阅读量计数

> **For Hermes:** 按任务逐个实施。

**目标:** 将已注册但未渲染的 ViewCounter 组件放回文章页面中，显示在合适位置。

**背景:** ViewCounter.vue 组件完整（连 `count.huoweifang.cn` Worker），已全局注册，但当前没有任何模板引用它。之前似乎放导航栏，但导航栏已满且不适合。

**设计决策:** 阅读量放在文章页 h1 下方、日期/作者元信息旁边或之后，而不是导航栏。

**技术栈:** VitePress + Vue 3

---

### 任务 1: 在 Layout.vue 的 article meta 注入中加入 ViewCounter

**目标:** 修改 `injectArticleMeta()` 函数，在日期/作者后追加一个 ViewCounter DOM 节点。

**文件:**
- 修改: `.vitepress/theme/Layout.vue`

**当前逻辑:**
```js
// injectArticleMeta 创建 div 插入 h1 后面：
articleMetaEl = document.createElement('div')
articleMetaEl.className = 'article-meta-container'
articleMetaEl.textContent = articleMetaText.value  // "日期 • 作者"
h1.parentNode.insertBefore(articleMetaEl, h1.nextSibling)
```

**改为:** 在 `articleMetaEl` 后面再追加一个 span 放阅读量。由于 ViewCounter 依赖异步 fetch，直接用 DOM 操作挂载一个带 `data-view-counter` 属性的 span，然后在 `onMounted` 中由独立逻辑初始化。

实际上，更干净的做法是用 Vue 的 `createVNode` + `render` 在注入阶段挂载 ViewCounter 组件。但这会引入额外复杂度。简化方案：

直接在 Layout.vue 模板中添加 ViewCounter，放到 `#doc-after` 插槽的 Comments 上方。一劳永逸，不需要 DOM hack。

**最终方案:** 在模板中加，放在 `#doc-after` 中 Comments 前面：

```html
<template v-if="isArticlePage" #doc-after>
  <div class="article-meta-footer">
    <ViewCounter :id="pageRelativePath" :is-zh="isZh" />
  </div>
  <div class="article-comments-section">
    <Comments />
  </div>
</template>
```

其中 `pageRelativePath` 需要新增一个 computed：
```js
const pageRelativePath = computed(() => page.value.relativePath || '')
```

**样式补充:** 在 `<style>` 中添加：
```css
.article-meta-footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
}
```

---

### 任务 2: 验证

**验证步骤:**
1. `npm run build` — 确保编译无错误
2. 打开任意文章页，确认阅读量显示在文章正文下方、评论区上方
3. 等待 1-2 秒 fetch 完成后，确认数字正常显示（不是 "--" 或 "...")
4. `npm run lint` — 无报错

---

### 任务 3: 提交

```bash
git add -A
git commit -m "feat: 恢复文章阅读量计数，显示在文末评论区上方"
```

---

## 风险

- ViewCounter 依赖 `count.huoweifang.cn` Worker 可用；若 Worker 挂了会降级显示 "--"，不影响页面
- 确保 ViewCounter 的 `id` prop 传的是文章路径（`relativePath`），保证每篇文章独立计数
