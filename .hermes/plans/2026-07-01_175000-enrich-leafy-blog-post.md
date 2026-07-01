# Enrich MyLeafy Blog Post Implementation Plan

> **For Hermes:** Execute this plan task-by-task directly. Each task is a single edit step.

**Goal:** 基于 `leafy/docs/` 下的项目文档，将 `/zh/projects/leafy.md` 从当前 54 行的概述性文章丰满为一篇有技术深度、设计故事和产品完整性的项目展示文章。

**Architecture:** 保持现有文章骨架（frontmatter + intro + screenshots + sections），在现有各节内部插入/扩展内容，新增"设计系统""运营后台""上架合规""未来规划"等节。所有新增内容均从 `leafy/docs/` 提取事实，不做推测。

**Tech Stack:** Markdown + YAML frontmatter（VitePress 博客框架）

---

### Task 1: 扩展项目定位 — 加入产品哲学和边界说明

**Objective:** 将"项目定位"节扩展为更有故事性的"产品哲学与定位"，补充设计原则、数据源边界说明

**Files:**
- Modify: `zh/projects/leafy.md:24-30`

**Step 1: 替换"项目定位"节**

将现有简短的定位说明替换为更丰满的版本，内容来源：`overview.md` 定位 + `app-design.md` 产品原则 + `architecture.md` 边界约束。

替换文本（old_string → new_string）：

```markdown
## 项目定位

MyLeafy 的核心目标是把学生最常用的校园信息重新组织成更适合移动端的体验。App 以课表为入口，向外连接成绩、考试安排、教学培养、自习室、校历、社区、通知、反馈和评教等场景。

系统边界保持清晰：学号和学校教务系统仍是教务身份与数据来源；Supabase 承接社区资料、帖子、评论、点赞、通知、公告、反馈、教师评分和共享课表快照等非教务业务。
```

→ 替换为：

```markdown
## 产品哲学与定位

MyLeafy 从一个朴素的问题出发：为什么查课表、看成绩、找自习室这些校园高频操作，体验还停留在十年前的教务页面？能不能把这件事做得更轻、更快、更像一个 2026 年的 App？

### 设计原则

核心产品原则只有几条，但每一条都直接影响功能取舍：

- **课表是锚点**。打开 App 第一眼就是今天的课，不需要先翻几层菜单。所有其他能力（成绩、考试、自习室、社区）围绕课表向外展开，而不是把功能平铺成工具栏。
- **教务数据直连学校**，不引入中间层。学号、密码、验证码直接和强智教务系统交互，不经过第三方后端代理。这让数据链路更短，也意味着需要自己处理 Cookie 会话、HTML 解析和页面结构变化。
- **社区独立但克制**。社区不替代教务登录，而是以"绑定教务学号"的方式存在。匿名 Supabase 会话 + 学号映射，用户不需要额外注册社区账号。帖子、图片、评论、点赞、通知、评教、共享课表都由 Supabase 承接。
- **复杂功能收敛进学业页**。成绩、教学培养、自习室、校历、评教这些教务工具不散落在各处，统一收进"学业"Tab 的横向胶囊导航，保持信息架构的清晰。

### 数据源边界

| 能力 | 数据源 | 说明 |
|---|---|---|
| 登录 | 强智教务 | 学号、密码、验证码 |
| 课表 | 强智教务 | HTTP 优先，WKWebView 兜底 |
| 成绩 / 考试 / 培养方案 | 强智教务 | HTML 解析 |
| 空教室 / 教室占用 | 强智教务 | 条件查询 |
| 校历 / 作息 | 本地资源 | App 包内图片 |
| 社区 / 通知 / 公告 / 反馈 | Supabase | 匿名会话绑定教务学号 |
| 评教 / 评课 | Supabase | 手动导入教师/课程名录 |
| 运营后台 | Supabase Edge Functions | 高权限管理操作 |
```

---

### Task 2: 扩展已实现能力 — 课表链路深度

**Objective:** 将"已实现能力"节的课表部分从一句话展开为课表数据链路的完整说明

**Files:**
- Modify: `zh/projects/leafy.md:32-38`（"已实现能力"整节）

**Step 1: 替换"已实现能力"节**

内容来源：`architecture.md` 第 4 节课表抓取解析 + `app-design.md` 第 4 节课表 + `overview.md` 第 2 节已落地能力。

替换文本：

```markdown
## 已实现能力

当前 App 以三个根 Tab 组织功能：

- **课表**：周视图、周次切换、课程详情、今日课程摘要、单日课程分享图和天气信息。
- **发现**：成绩、考试安排、教学培养、自习室、校历、社区、通知和评教。
- **我的**：社区资料、个人内容、收藏、共享课表、主题设置、反馈和退出登录。

教务侧已经实现学号、密码、验证码登录，显式 Cookie 会话管理，课表、成绩、考试、培养方案等页面的抓取与解析，并用 SwiftData 做本地缓存。课表链路保留 WKWebView 兜底，以应对教务页面跳转和结构变化。

社区侧基于 Supabase，包含匿名会话与学号绑定、profile 持久化、发帖、图片、评论、点赞、通知、公告、反馈、评教老师列表、星级评分和共享课表授权。
```

→ 替换为：

```markdown
## 已实现能力

App 以四个根 Tab 组织功能：**课表**、**社区**、**学业**、**我的**。

### 课表：最复杂的数据链路

课表是整个 App 里最核心也最脆弱的功能。强智教务的课表页面没有 API，纯 HTML，而且入口不固定——可能直接返回课表表格，可能返回查询表单，可能跳转到中间页。

`fetchTimetable()` 的回退顺序是：

1. 优先尝试上次成功访问的 URL 落点
2. 直接请求 `/jsxsd/xskb/xskb_list.do`
3. 如果返回查询页，从 form 中提取参数继续请求
4. 如果返回主页或中间页，从 DOM、`<script>`、`href`、`onclick` 中提取候选课表 URL
5. 如果纯 HTTP 仍然拿不到可解析的课表 HTML，使用隐藏 `WKWebView` 带 Cookie 复现完整的浏览器访问路径

课表 HTML 解析支持 `#kbtable` 和 `kbcontent_* / .kbcontent` 两类结构，课程被归并为 `Course` 模型，由 `TimetableView` 按当前周过滤展示。调试 HTML 会落到 `Library/Caches/leafy-debug/`，用于排查学校页面结构变化。

展示层做了预投影优化：`TimetableGridSnapshot` 和 `TimetableScheduleProjectionSnapshot` 把课程布局、提醒占用、考试/倒计时投影提前算好，避免 SwiftUI body 在每个日期列重复过滤排序。

### 教务直连

- 学号、密码、验证码登录（强智 `encode` 算法）
- 显式 Cookie 会话管理：登录后收集响应 Cookie，每次请求前同步到 `HTTPCookieStorage`，额外拼接 `Cookie` 头
- 会话失效自动识别（检测登录页重定向），统一清理后要求重新登录
- 成绩抓取与展示
- 考试安排抓取与展示
- 教学计划、培养方案、毕业学分要求
- 空教室与教室占用查询
- 校历、作息时间本地资源展示（支持全屏预览、缩放、拖拽和切换）

### 社区

基于 Supabase，当前已落地：

- 匿名 Supabase 会话 + 教务学号绑定（Edge Function `community-bootstrap-user`）
- 社区 profile 持久化（昵称必填，头像/专业/年级可选）
- 发帖（支持纯文本和带图帖子）、评论（一级评论）、点赞、收藏
- 全局置顶和分类置顶
- 帖子举报与审核（管理员后台处理）
- 通知中心：评论/点赞通知、站内公告、全部静音设置
- 意见反馈
- 评教：教师列表搜索、星级评分（1-5 星）、评分汇总
- 评课：公选课课程库、星级评分、缺失课程建议
- 投票功能
- 共享课表：手动发布课表快照、7 天单次邀请码（SHA-256 hash 存储）、单向只读授权与撤销
- 邮箱验证绑定

### 学业

学业页使用横向胶囊一级导航，集中教务工具：

- **成绩**：成绩查询、考试安排、成绩分析
- **教学培养**：教学计划、培养方案、毕业学分进度
- **自习室**：按楼宇/日期/节次查询可用教室、指定教室占用、常用自习室收藏
- **校历**：校历图片、作息时间、校园日程、自定义倒计时
- **评教**：教师搜索、星级评分

### 我的

系统 `List + insetGrouped` 风格，包含社区资料、我的发帖/点赞/评论/收藏、共享课表管理、主题色设置（10 种可选主题）、深色模式、反馈、缓存同步、数据安全说明和退出登录。
```

---

### Task 3: 扩展技术实现 — 展开为技术架构

**Objective:** 将"技术实现"节从技术栈罗列展开为分层架构说明

**Files:**
- Modify: `zh/projects/leafy.md:42-46`（"技术实现" → "技术架构"）

**Step 1: 替换"技术实现"节**

内容来源：`architecture.md` 第 1-8 节 + `overview.md` 技术栈表 + `ui-style-guide.md` 主题系统。

替换文本：

```markdown
## 技术实现

MyLeafy 使用 SwiftUI 构建，部署目标是 iOS 17。本地持久化使用 SwiftData，学校网络请求基于 URLSession 和 HTTPCookieStorage，HTML 解析使用 SwiftSoup。非教务业务由 Supabase Auth、Database、Storage 和 Edge Functions 支撑。

项目还包含 React + Vite + TypeScript 的运营后台，用于社区指标、帖子、评论、用户、反馈、公告、教师和评分管理。高权限管理操作通过 Supabase Edge Functions 执行，避免直接把管理权限暴露给前端。
```

→ 替换为：

```markdown
## 技术架构

### 技术栈总览

| 层 | 技术 |
|---|---|
| iOS UI | SwiftUI（部署目标 iOS 17.0） |
| 本地持久化 | SwiftData（课程、成绩、备注、提醒、收藏） |
| 学校网络 | `URLSession` + `HTTPCookieStorage`（显式 Cookie 管理，不依赖隐式行为） |
| HTML 解析 | SwiftSoup |
| 课表兜底 | `WKWebView`（隐藏 WebView 带 Cookie 复现浏览器路径） |
| 社区后端 | Supabase（Auth / Database / Storage / Edge Functions） |
| 后台前端 | React 18 + Vite + TypeScript + Supabase JS |
| 部署 | Cloudflare Pages（官网 `/admin`）+ Supabase 托管（Edge Functions） |

### iOS 工程分层

项目按 Clean Architecture 思路组织，但保持务实，不为了分层而分层：

```
leafy/
├── App/            # 启动、登录态切换、根 Tab、主题、生命周期
├── Features/       # Auth、Timetable、Discover、Profile
│   ├── Presentation/   # SwiftUI 页面、sheet、导航
│   ├── Application/    # 用例、仓储协议、缓存协调
│   └── Domain/         # 纯计算模型（课表网格快照、周投影等）
├── Services/       # 教务直连、Supabase、诊断、WebView 兜底
├── Parsers/        # SwiftSoup HTML 解析，输出统一业务模型
└── Shared/Models/  # 社区 DTO、本地 SwiftData 模型
```

关键设计决策：

- **`SchoolNetworkManager`** 是教务系统访问的唯一入口，按职责拆为多个扩展（Core / Auth / Timetable / Discover），每个扩展职责清晰。
- **展示层预投影**：课表网格布局在进入 SwiftUI body 之前就通过 `TimetableGridSnapshot` 完成计算，避免在渲染热路径上重复过滤、排序和解析备注。这一设计直接解决了 iPhone 16e 上曾出现的 AutoLayout hang 问题（详见 `archive/error-summaries/`）。
- **SwiftData 容错**：本地 store 损坏时，App 启动逻辑会备份旧 store 文件并尝试恢复或降级为内存 store，不直接崩溃。
- **iOS 26 Liquid Glass**：使用 `#available(iOS 26.0, *)` 保护，低版本自动回退到 `topBarMaterial`。

### 设计系统

MyLeafy 有一套自己的设计 token 体系，中心化在 `AppTheme.swift`：

- **10 种可选主题色**：鼠尾草绿（默认）、蒂芙尼蓝、阳光琥珀、珊瑚粉红、蜜橘橙、柠檬黄、青柠绿、海岛晴蓝、糖果莓粉、兰花紫
- **语义色**：`accent`（主强调色）、`danger`（危险操作）、`leafyGreenSoft`（浅色背景）、`cardBackground`（卡片底色）等——新页面不硬编码颜色，只使用语义色
- **统一间距**：`page(20)` / `section(24)` / `card(16)` / `compact(12)` / `micro(8)`
- **统一圆角**：`large(24)` / `medium(16)` / `small(12)`
- **字体缩放**：`responsiveLargeTitle()` / `leafyHeadline()` / `leafyBody()` / `microCaption()` 等 view modifier，由 `leafyFontScale` 环境值统一控制
- **深色模式**：可强制开启；关闭时跟随系统。浅色模式卡片有轻阴影（半径 10，Y 偏移 2，黑色 5%），深色模式弱化阴影依赖底色和边框层次

视觉方向是**轻量、原生、低噪声**——使用 SwiftUI 系统控件作为基础，页面背景叠加低透明度主题渐变，避免厚重阴影和复杂装饰，保持明亮多彩但不霓虹的校园工具感。
```

---

### Task 4: 新增运营后台节

**Objective:** 在"技术架构"之后新增"运营后台"节，说明后台产品形态

**Files:**
- Modify: `zh/projects/leafy.md`（在"技术架构"节后、"工程收获"节前插入）

**Step 1: 在"技术架构"与"工程收获"之间插入新节**

在文件中定位 "## 工程收获" 之前，插入：

```markdown
## 运营后台

除了 iOS App，项目还包含一个完整的社区运营后台，挂在官网 `/admin`。技术栈是 React 18 + Vite + TypeScript + Supabase JS，部署在 Cloudflare Pages。

后台与 iOS App 共享同一个 Supabase 项目，但权限边界不同：
- iOS App 使用 publishable key + 匿名会话 + RLS 操作自己的数据
- 后台前端使用 publishable key 调用 Edge Functions
- Edge Functions 端以 `service_role` 执行高权限操作

当前后台模块：
- **手册**：日常运营顺序、置顶规则、权限边界和常用动作速查
- **总览**：运营健康、审核压力、反馈 SLA、内容质量和教师评分关注项
- **帖子/评论管理**：检索、日期筛选、分页、置顶（全局/分类）、Feed 预览、下架/恢复、批量操作
- **用户管理**：资料检索、禁言/解除禁言、近期内容和相关审计
- **反馈处理**：查看、标记已看、关闭
- **公告管理**：发布、草稿、下线
- **教师/评分管理**：名录维护、隐藏/恢复、评分明细
- **管理员/审计日志**：账号创建、停用、操作审计

安全边界上，前端不持有 `service_role`，登录、会话校验和管理操作全部通过 Edge Functions，管理员密码不写入仓库，所有管理操作写入审计日志。
```

---

### Task 5: 新增上架合规节

**Objective:** 新增"App Store 上架"节，讲述审核经历

**Files:**
- Modify: `zh/projects/leafy.md`（在"运营后台"节后插入）

**Step 1: 在"运营后台"与"工程收获"之间插入新节**

```markdown
## App Store 上架

MyLeafy 的上架过程遇到了匿名 UGC 应用常见但值得记录的合规挑战。

**Guideline 2.3.6 — 年龄分级元数据**：首次提交时因为年龄分级中错误选择了"家长控制"和"年龄保证"，被 Apple 以元数据不准确为由退回。实际上 App 并没有实现 Apple 定义的 Parental Controls 或 Age Assurance 机制。修正方式是在 App Store Connect 中将两者设为 `None`，并通过 Override to Higher Age Rating 将分级设为 18+，以如实反映匿名社区功能的审核要求。

**Guideline 1.2 — 用户生成内容**：匿名社区功能需要满足 Apple 对 UGC 应用的严格要求：
- 用户在发帖和评论前必须同意社区条款（零容忍政策）
- 帖子举报功能：用户可从 `...` 菜单举报内容，被举报的帖子立即从公共 Feed 下架进入审核队列
- 屏蔽功能：被屏蔽用户的帖子、评论、通知全部对屏蔽者不可见
- 24 小时 SLA：举报内容在 24 小时内审核处理
- 后台举报队列：管理员可查看举报、下架内容、禁言用户、处理或驳回举报
- 应用内提供 `support@myleafy.space` 联系方式和社区安全反馈入口

这两个审核过程让我对 App Store 的 UGC 合规要求有了实操级的理解——不只是写一份社区条款，而是要在产品里真实落地举报、屏蔽、下架、审核的全链路。
```

---

### Task 6: 新增未来规划节

**Objective:** 新增简要的未来规划

**Files:**
- Modify: `zh/projects/leafy.md`（在"App Store 上架"节后插入）

**Step 1: 插入"未来规划"节**

```markdown
## 未来规划

当前阶段重点不是扩散新入口，而是稳定核心链路：

- **课表和教务解析稳定性**：加强抓取失败时的用户文案，区分学校网络、登录态、HTML 结构变化；对 `HTMLParser` 增加更多真实页面样本回归测试
- **TestFlight 上线**：完成隐私检查、错误文案、配置安全检查，让真实用户在目标网络下验证全链路
- **社区运营**：继续按真实运营反馈优化后台筛选和批量处理能力
- **教师名录**：建立最小可用的教师数据更新流程

明确不做或暂缓的：用 Supabase Auth 替代教务登录、把学校登录迁入后端、评教文字评价和复杂审核流、独立消息推送基础设施。
```

---

### Task 7: 更新工程收获 — 加入更具体的经验总结

**Objective:** 将现有的通用化"工程收获"替换为更具体的、项目独有的经验总结

**Files:**
- Modify: `zh/projects/leafy.md:48-50`

**Step 1: 替换"工程收获"节**

替换文本：

```markdown
## 工程收获

这个项目让我更系统地处理了真实校园系统的复杂性：验证码登录、Cookie 会话、HTML 结构变动、移动端缓存、解析失败提示、社区数据权限和后台管理边界。它也让我从单个功能开发转向完整产品链路：从数据源、客户端体验、后端权限，到运营后台和 TestFlight 检查清单。
```

→ 替换为：

```markdown
## 工程收获

### 真实系统的脆弱性

学术项目里的数据往往是干净的 JSON API，但真实校园系统是 20 年前的 HTML 页面。课表链路教会我：
- **多层回退是必须的**。不能假设强智教务的页面结构稳定——URL 会变、form 参数会变、Cookie 行为会变。纯 HTTP → form 提取 → DOM 遍历 → WKWebView 兜底，每一层都要有明确的 fallback 信号。
- **调试数据要可落盘**。没有 `Library/Caches/leafy-debug/` 的原始 HTML dump，排查"课表今天突然不显示了"会极其痛苦。生产环境要隐藏这些，但开发/诊断链路必须有。
- **错误文案要面向用户**。"HTML 结构变化导致解析失败"是对的，但用户看到应该是"课表数据暂时无法获取，请稍后重试"，而不是吐一屏原始 HTML。

### 设计系统的价值

10 种主题色、语义色、统一间距和圆角、字体缩放 modifier——这些在最初看起来像是过度设计。但当功能增长到 4 个 Tab、几十个页面后，不硬编码颜色、不手写 magic number 变成了强制力。新页面只需要选择正确的语义 token，深色模式和主题切换自动适配。

### 完整产品链路的体感

从数据源（强智教务 HTML）→ 客户端体验（SwiftUI 课表网格 + 预投影优化）→ 社区后端（Supabase RLS + Edge Functions）→ 运营后台（React + 受控管理操作）→ App Store 合规审核——这个项目让我完整走了一遍"从 0 到可上线"的全链路。很多边界不是设计出来的，是被真实场景逼出来的：验证码 OCR 不靠谱只能走人工输入、WKWebView 兜底是因为某一天教务突然改了页面结构、共享课表不用 Supabase 接管本地缓存是因为本地已经是权威数据源。
```

---

### Task 8: 运行 lint 和 build 验证

**Objective:** 确认修改后的 markdown 文件不破坏 VitePress 构建

**Files:**
- Modify: None（验证步骤）

**Step 1: 运行 lint**

```bash
cd /Users/yingwu/Developer/projects/My_Blog && npm run lint
```

**Expected:** 无新增错误。Markdown 文件不应该触发 lint 错误（lint 主要检查 JS/Vue）。

**Step 2: 运行 dev build**

```bash
cd /Users/yingwu/Developer/projects/My_Blog && npm run build
```

**Expected:** 构建成功。检查输出确认无 frontmatter 解析错误。

**Step 3: 验证 frontmatter 完整性**

确认修改后的 `leafy.md` frontmatter 保持不变（title, date, author, description, editLink, outline 字段均未被改动）。

---

### Verification Checklist

- [ ] 所有新增内容的事实均可追溯到 `leafy/docs/` 中的具体文档
- [ ] frontmatter 完全未被修改
- [ ] 7 张图片链接保持不变
- [ ] GitHub 链接保持不变
- [ ] 中文表达流畅自然，无翻译腔
- [ ] `npm run build` 通过
- [ ] 文章从 54 行 → 预计 280-350 行

---

### Risks & Notes

- **内容真实性**：所有数据、架构、功能描述均直接来自 `leafy/docs/`，不做推测。如果文档与代码有出入，以文档为准（文档是项目 maintainer 确认过的事实）。
- **长度控制**：目标是从概述升级为有深度的项目文章，而不是技术文档的搬运。每节取最具叙事价值的内容，不追求穷举。
- **二义性处理**：文档中内部代码名 `Leafy` 和产品展示名 `MyLeafy` 并存。遵循当前博文已有的风格：正文使用 MyLeafy，技术描述中保留 Leafy 命名。
