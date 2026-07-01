# 博客个人化改造计划

> **For Hermes:** 按任务逐个实施。

**目标:** 删除 what-I-want-to-do.md，并基于个人画像 (me.md) 重写首页（AboutPage.vue）和项目列表页（zh/projects/index.md）文案，使其更具个人风格、更有叙事性、更体现"产品型开发者"定位。

**个人风格参考:** 从 me.md 中提炼出的核心特质：
- 身份：电气工程 + 辅修计算机，就业导向型本科生
- 叙事角度：不是"电气转码"，而是"工程出身、能完整闭环交付的产品型开发者"
- 双核心资产：大众中国/CARIAD 外企实习 + MyLeafy 5000+ 用户独立 App
- 性格：项目驱动、边做边学、审美要求高、偏好外企/国际化、不满足于纯技术
- 语言风格：直接、不浮夸、强调真实成果和闭环能力

**当前首页现状:** 文案太简单——"你好，欢迎来到我的博客" + 一句自我介绍 + 一句实习 + 一句项目列表 + 一句套话收尾。缺乏个人声音和故事线。

**技术栈:** VitePress + Vue 3 + TypeScript

---

### 任务 1: 删除 what-I-want-to-do.md

**目标:** 从文件系统和 git 中移除该文件。

**文件:**
- 删除: `zh/blog/what-I-want-to-do.md`

**步骤 1: 删除文件并 git rm**

```bash
cd /Users/yingwu/Developer/projects/My_Blog
git rm zh/blog/what-I-want-to-do.md
```

**验证:** `ls zh/blog/what-I-want-to-do.md` 应该返回 "No such file"。

---

### 任务 2: 重写首页文案 (AboutPage.vue)

**目标:** 将首页从简单介绍变为有个人叙事风格、体现代码兼产品能力的页面。保持原有布局结构（头像浮动右侧 + 正文 + 联系方式），只改文案。

**文件:**
- 修改: `.vitepress/theme/components/AboutPage.vue` (模板中 `v-if="isZh"` 分支的文案部分)

**当前文案 (需替换的部分):**

```html
<p class="welcome-message">你好👋</p>
<p class="welcome-message">欢迎来到我的博客！</p>
```

和后续几个 `<p>` 标签中的 `v-html` 内容。

**新文案设计理念:**
1. 开头不再说"欢迎"，而是直接亮身份
2. 用一条叙事线串联：电气工程 → 外企实习 → 独立开发 App → 现在在做什么
3. 加一句体现"产品型开发者"理念的结语
4. 保持与原有 CSS 类名一致，不破坏现有样式

**新中文文案:**

```html
<p class="about-intro">
  我是<strong>霍玮放</strong>，<a href="https://www.bjfu.edu.cn/" target="_blank">北京林业大学</a>电气工程及其自动化专业学生，同时辅修计算机科学与技术。
</p>
<p class="about-description">
  大二暑假，我在<strong>大众中国集团 CARIAD</strong> 完成了第一段外企实习——在系统集成团队参与测试平台后端开发，用 FastAPI 和 PostgreSQL 搭服务，做 AI 模型接入，第一次看到工程化代码如何跑在真实业务里。
</p>
<p class="about-description">
  与此同时，我独立设计、开发、上线了校园 iOS App <a href="/zh/projects/leafy"><strong>MyLeafy</strong></a>，覆盖课表、成绩、社区等场景，累计服务 <strong>5000+</strong> 真实用户。从图标到后端，从 SwiftUI 到 Supabase，我享受把一个想法做成能被人每天用的产品。
</p>
<p class="about-description">
  目前我在做的事：持续迭代 MyLeafy，探索 AI 应用层开发（比如自己写的 <a href="/zh/projects/poemery"><strong>Poemery</strong></a> 诗词 App 和 <a href="/zh/projects/polymarket-predictor"><strong>PolyBot</strong></a> 预测交易系统），并准备 2027 年在北京拿下一段更漂亮的实习。
</p>
<p class="about-description">
  我相信：技术不是目的，做出有用户、有审美、能交付的产品才是。我不是在"转码"——我是在用工程背景、外企经验、移动端能力和 AI 工具，把想法变成真实上线的产品。
</p>
```

**对应英文文案 (en 分支):**

```html
<p class="about-intro">
  I'm <strong>Huo Weifang</strong>, studying Electrical Engineering & Automation at <a href="https://www.bjfu.edu.cn/" target="_blank">Beijing Forestry University</a>, with a minor in Computer Science & Technology.
</p>
<p class="about-description">
  During my sophomore summer, I interned at <strong>Volkswagen Group China's CARIAD</strong> — building test platform backends with FastAPI and PostgreSQL, integrating AI models, and seeing real engineering systems in production for the first time.
</p>
<p class="about-description">
  In parallel, I independently designed, built, and launched <a href="/en/projects/leafy"><strong>MyLeafy</strong></a>, a campus iOS app covering timetables, grades, and community features — now serving <strong>5,000+</strong> real users. I enjoy taking an idea from design to a product people actually use every day.
</p>
<p class="about-description">
  What I'm working on now: iterating on MyLeafy, exploring AI application development (like my poetry app <a href="/en/projects/poemery"><strong>Poemery</strong></a> and trading research system <a href="/en/projects/polymarket-predictor"><strong>PolyBot</strong></a>), and aiming for a stronger internship in Beijing for 2027.
</p>
<p class="about-description">
  I believe technology is a means, not an end. What matters is shipping products that are well-crafted, useful, and real. I'm not "pivoting to CS" — I'm using engineering discipline, enterprise experience, mobile development, and AI tools to build things that ship.
</p>
```

**实施方式:** 用 patch 替换 AboutPage.vue 中第 17-51 行（`<template v-if="isZh">` 到 `</template>` 之间的内容），以及对应的英文模板（`<template v-else>` 内容）。

---

### 任务 3: 丰富项目列表页文案 (zh/projects/index.md)

**目标:** 给每个项目加一行描述（副标题），让项目列表不只是光秃秃的标题，而是有信息量的卡片。

**文件:**
- 修改: `zh/projects/index.md`
- 修改: `en/projects/index.md`
- 修改: `.vitepress/theme/components/ProjectsPage.vue`（增加 description 显示）

**当前 projects/index.md 格式:**
```yaml
thoughts:
  - title: "MyLeafy：通用型校园 iOS 应用"
    url: /zh/projects/leafy
    date: 2026-07-01
```

**新格式（增加 description 字段）:**
```yaml
thoughts:
  - title: "MyLeafy"
    description: "校园 iOS App，覆盖课表/成绩/社区，5000+ 用户"
    url: /zh/projects/leafy
    date: 2026-07-01
  - title: "Poemery"
    description: "离线诗词阅读 App，SwiftUI 构建，支持收藏与搜索"
    url: /zh/projects/poemery
    date: 2026-06-28
  - title: "MapToPoster"
    description: "城市地图海报生成器，输入地址即可生成可打印海报"
    url: /zh/projects/maptoposter
    date: 2026-06-09
  - title: "PolyBot"
    description: "本地预测市场研究系统，新闻采集→AI 预测→风控→自动交易"
    url: /zh/projects/polymarket-predictor
    date: 2026-06-30
```

**ProjectsPage.vue 改造:** 在模板中增加 `project.description` 的显示行：

```html
<a class="project-link" ...>{{ project.title }}</a>
<p v-if="project.description" class="project-description">{{ project.description }}</p>
```

加一行 CSS：
```css
.project-description {
  color: var(--vp-c-text-2);
  font-size: 16px;
  line-height: 1.5;
  margin-top: 4px;
}
```

**英文版同理** (en/projects/index.md)。

---

### 任务 4: 验证

**目标:** 本地 dev server 仍在运行（http://localhost:5173），用 curl 确认页面渲染正常，检查页面无 JS 报错。

**验证步骤:**
1. 确保 dev server 进程还在运行（`proc_510a659ce795`）
2. 检查进程日志是否有编译错误
3. `curl -s http://localhost:5173/zh/` 确认首页加载
4. `curl -s http://localhost:5173/zh/projects/` 确认项目页加载
5. 确认 what-I-want-to-do.md 已被正确删除且在 git 中 staged

---

### 任务 5: 提交

```bash
cd /Users/yingwu/Developer/projects/My_Blog
git add -A
git commit -m "refactor: 删除2026计划清单，重写首页和项目页文案，强化个人风格"
```

---

## 风险和注意事项

- AboutPage.vue 使用的是 `v-html` 渲染，换文案时注意 HTML 标签配对和属性转义
- 中文引号 / 英文引号在 Vue 模板中需注意混用
- `what-I-want-to-do.md` 已添加了 `category: 生活` frontmatter，删除后生活分类仅剩 2 篇文章，视觉上可能偏少——**这是用户明确要求的，直接删除，后续有新生活类文章再补充**
- dev server 在 hot reload 模式下，修改组件会自动刷新，无需重启
- 修改 AboutPage.vue 时注意中英文分支都要更新，否则英文页会显示旧文案
