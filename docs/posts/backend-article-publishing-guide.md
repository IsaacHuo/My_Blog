---
title: VitePress 博客发布文章教程
date: 2024-01-17
tags:
  - VitePress
  - 博客
  - 文章发布
  - 教程
description: 详细介绍如何在 VitePress 博客项目中发布新文章的完整流程
---

# VitePress 博客发布文章教程

本教程将介绍如何在这个 VitePress 博客项目中发布新文章的完整流程，从创建文章到部署上线。

## 📋 项目结构

我们的 VitePress 博客项目结构如下：

```
My_Blog/
├── docs/
│   ├── .vitepress/          # VitePress 配置
│   │   ├── config.ts         # 主配置文件
│   │   └── theme/           # 自定义主题
│   ├── posts/               # 文章目录
│   │   ├── index.md         # 文章列表页
│   │   └── *.md            # 各篇文章
│   ├── index.md            # 首页
│   ├── about.md            # 关于页面
│   └── tags/               # 标签页面
└── package.json            # 项目配置
```

## ✍️ 发布新文章的步骤

### 第一步：创建文章文件

在 `docs/posts/` 目录下创建新的 Markdown 文件：

```bash
# 进入文章目录
cd docs/posts/

# 创建新文章文件（建议使用英文文件名）
touch my-new-article.md
```

### 第二步：编写文章内容

在新创建的文件中添加以下内容结构：

```markdown
---
title: 文章标题
date: 2024-01-17
tags:
  - 标签1
  - 标签2
  - 标签3
description: 文章简短描述，会显示在文章列表中
---

# 文章标题

这里是文章的正文内容...

## 二级标题

更多内容...

### 三级标题

详细内容...
```

**重要说明**：
- `title`: 文章标题，会显示在页面和导航中
- `date`: 发布日期，格式为 YYYY-MM-DD
- `tags`: 文章标签，用于分类和搜索
- `description`: 文章摘要，显示在首页和文章列表中

### 第三步：本地预览文章

在项目根目录运行开发服务器：

```bash
# 启动开发服务器
npm run docs:dev
```

服务器启动后，访问 `http://localhost:5173/My_Blog/` 查看效果。

### 第四步：将文章添加到首页

编辑 `docs/index.md` 文件，在文章列表中添加新文章：

```html
<article class="blog-card">
  <h3><a href="/My_Blog/posts/my-new-article">文章标题</a></h3>
  <div class="meta">2024年1月17日</div>
  <div class="description">文章简短描述</div>
  <div>
    <span class="tag">标签1</span>
    <span class="tag">标签2</span>
  </div>
</article>
```

同时更新文章总数：

```html
<p><strong>当前文章数</strong>: X篇</p>
```

## 🚀 部署到 GitHub Pages

### 第一步：提交代码到 GitHub

```bash
# 添加所有文件到暂存区
git add .

# 提交更改
git commit -m "添加新文章：文章标题"

# 推送到远程仓库
git push origin main
```

### 第二步：自动部署

项目已配置 GitHub Actions 自动部署，推送代码后会自动：

1. 构建 VitePress 静态网站
2. 部署到 GitHub Pages
3. 网站会在几分钟内更新

### 第三步：验证部署

访问你的 GitHub Pages 地址查看新文章是否已上线：

```
https://your-username.github.io/My_Blog/
```

## 📝 文章编写技巧

### Markdown 语法

VitePress 支持标准 Markdown 语法和扩展功能：

```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体文本**
*斜体文本*

- 无序列表项1
- 无序列表项2

1. 有序列表项1
2. 有序列表项2

[链接文本](https://example.com)

![图片描述](./images/example.jpg)

```代码块```

> 引用文本
```

### 代码高亮

```javascript
// JavaScript 代码示例
const greeting = 'Hello, World!';
console.log(greeting);
```

### 添加图片

1. 将图片放在 `docs/public/images/` 目录下
2. 在文章中引用：`![图片描述](/My_Blog/images/filename.jpg)`

## 🔍 常见问题解决

### 文章不显示在首页

1. 检查文章的 frontmatter 格式是否正确
2. 确认已在 `index.md` 中添加文章卡片
3. 检查文件路径和链接是否正确

### 图片无法显示

1. 确保图片放在 `docs/public/` 目录下
2. 使用正确的路径格式：`/My_Blog/images/filename.jpg`
3. 检查图片文件名是否包含特殊字符

### 本地预览正常但部署后异常

1. 检查所有链接是否使用了正确的 base 路径 `/My_Blog/`
2. 确认 GitHub Actions 部署是否成功
3. 清除浏览器缓存后重新访问

## 📊 文章管理

### 文章列表页面

访问 `/My_Blog/posts/` 可以查看所有文章列表。

### 标签系统

- 文章会根据标签自动分类
- 访问 `/My_Blog/tags/` 查看所有标签
- 点击标签可以筛选相关文章

### 文章搜索

VitePress 内置搜索功能，读者可以通过搜索框快速找到相关文章。

## 🎨 自定义样式

### 修改主题样式

编辑 `docs/.vitepress/theme/custom.css` 文件可以自定义博客样式：

```css
/* 自定义文章样式 */
.blog-card {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.blog-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
```

### 添加自定义组件

可以在 `docs/.vitepress/theme/` 目录下创建 Vue 组件来扩展功能。

## 🎯 总结

通过这个教程，你已经学会了在 VitePress 博客项目中发布文章的完整流程：

- ✅ 创建 Markdown 文章文件
- ✅ 编写文章内容和 frontmatter
- ✅ 本地预览和调试
- ✅ 更新首页文章列表
- ✅ 提交代码并自动部署
- ✅ 文章样式和图片处理
- ✅ 常见问题解决

### 快速发布检查清单

- [ ] 创建新的 `.md` 文件
- [ ] 添加正确的 frontmatter
- [ ] 编写文章内容
- [ ] 本地预览确认效果
- [ ] 更新首页文章列表
- [ ] 更新文章总数
- [ ] 提交并推送代码
- [ ] 验证线上部署效果

现在你可以轻松地为博客添加新内容了！如果有任何问题，欢迎查看项目文档或提出 issue。