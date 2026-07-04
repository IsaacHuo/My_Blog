---
title: "MyLeafy：通用型校园 iOS 应用"
date: 2026-07-01
author: 霍玮放
description: "通用型校园 iOS 应用，首个上线校园为北京林业大学，以课表为核心整合教务数据、社区、评教和校园工具。"
editLink: true
outline: [2, 3]
---

# MyLeafy：通用型校园 iOS 应用

MyLeafy 是我独立开发的通用型校园 iOS 应用。内部代码名、target 和类型命名沿用 `Leafy`，产品展示名已更新为 MyLeafy。首个上线校园是北京林业大学，教务连接器直连北林强智系统。

| 入口 | 链接 |
|---|---|
| GitHub 仓库 | [IsaacHuo/leafy](https://github.com/IsaacHuo/leafy) |
| 完整技术文档 | [docs/](https://github.com/IsaacHuo/leafy/tree/main/docs) |
| 项目总览 | [overview.md](https://github.com/IsaacHuo/leafy/blob/main/docs/overview.md) |
| 架构说明 | [architecture.md](https://github.com/IsaacHuo/leafy/blob/main/docs/architecture.md) |
| App 设计 | [app-design.md](https://github.com/IsaacHuo/leafy/blob/main/docs/app-design.md) |
| UI 风格指南 | [ui-style-guide.md](https://github.com/IsaacHuo/leafy/blob/main/docs/ui-style-guide.md) |
| Supabase 接入 | [supabase.md](https://github.com/IsaacHuo/leafy/blob/main/docs/supabase.md) |
| 运营后台 | [admin-console.md](https://github.com/IsaacHuo/leafy/blob/main/docs/admin-console.md) |
| 路线图 | [roadmap.md](https://github.com/IsaacHuo/leafy/blob/main/docs/roadmap.md) |

<div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; align-items: flex-start;">
  <img src="/project-images/myleafy/calendar.jpg" alt="MyLeafy 课表展示" width="220" loading="lazy" style="max-width: 100%; border-radius: 16px;">
  <img src="/project-images/myleafy/grade.jpg" alt="MyLeafy 成绩展示" width="220" loading="lazy" style="max-width: 100%; border-radius: 16px;">
  <img src="/project-images/myleafy/xuefen.jpg" alt="MyLeafy 学分展示" width="220" loading="lazy" style="max-width: 100%; border-radius: 16px;">
  <img src="/project-images/myleafy/zongsu.jpg" alt="MyLeafy 综素测算展示" width="220" loading="lazy" style="max-width: 100%; border-radius: 16px;">
  <img src="/project-images/myleafy/sharecal.jpg" alt="MyLeafy 共享课表展示" width="220" loading="lazy" style="max-width: 100%; border-radius: 16px;">
  <img src="/project-images/myleafy/community.jpg" alt="MyLeafy 社区展示" width="220" loading="lazy" style="max-width: 100%; border-radius: 16px;">
  <img src="/project-images/myleafy/color.jpg" alt="MyLeafy 主题色展示" width="220" loading="lazy" style="max-width: 100%; border-radius: 16px;">
</div>

## 功能全景

App 以五个根 Tab 组织：

| Tab | 图标 | 承载内容 |
|---|---|---|
| **Leafy** | `sparkles` | AI 助手，围绕课表、考试、成绩提问；支持自备 DeepSeek API Key 或 Leafy 托管模式 |
| **课表** | `calendar` | 周视图课表网格、课程详情、考试/提醒/重要日期投射、课表底图、时间视角 |
| **社区** | `person.2` | 帖子流、发布、搜索、投票、通知、公告、举报、屏蔽 |
| **学业** | `book.closed` | 成绩、自习室、学习、体育、教学培养、职业规划、考研信息、评教/评课/评菜 |
| **我的** | `person` | 社区资料、个人内容、共享课表、主题色、深色模式、反馈、退出 |

每个 Tab 右侧有独立浮动动作按钮：Leafy 页对应 AI 操作入口，课表页打开"时间视角"全屏页，社区页展开筛选/热门/搜索/投票面板，学业页展开功能切换面板，我的页触发教务数据同步。

数据源边界：

| 数据类型 | 来源 |
|---|---|
| 学号登录、验证码、课表、成绩、考试、教学计划、培养方案、空教室 | 北林强智教务系统 |
| 社区资料、帖子、图片、评论、点赞、收藏、通知、公告、反馈、评教/评课/评菜、共享课表、考研公共信息、Leafy AI 托管额度 | Supabase |
| 课程备注、提醒、学习资料、简历、任务、体测、目标院校、常用链接 | 本机 SwiftData / App 私有目录 |
| 校历、作息、体育场馆 | App 包内资源 |

## 课表

课表数据来自强智教务 HTML 页面——没有 API，入口不固定。`fetchTimetable()` 走五层回退：

1. 上次成功访问的 URL 落点
2. 直接请求 `/jsxsd/xskb/xskb_list.do`
3. 从返回的查询 form 中提取参数继续请求
4. 从主页 DOM、`<script>`、`href`、`onclick` 提取候选 URL
5. 隐藏 `WKWebView` 带 Cookie 复现浏览器完整访问路径

HTML 解析支持 `#kbtable` 和 `kbcontent_* / .kbcontent` 两类结构。调试 HTML 落到 `Library/Caches/leafy-debug/`。展示层通过 `TimetableGridSnapshot` 预投影，把课程布局、提醒、考试/倒计时提前算好，不在 SwiftUI body 热路径上重复计算。

课表页具体功能：全学期周切换、自动识别当前周、隐藏周末、手动刷新学校课表、课程详情 sheet（课程名/教师/教室/周次/节次）、同节次重叠课程并排压缩、课程备注、空白节次添加本地提醒、考试/重要日期投射到课表格子、日期头点击查看当天摘要、iPad agenda 列表模式、自定义课表底图（图片/透明度/模糊/遮罩/课程卡片透明度）。

快捷入口：共享课表、成绩、找自习室、课表底图。

小组件支持小号和中号，展示今日/明日课程，点击课程 deep link 到 App 课程详情，每约 20 分钟刷新。

## Leafy AI

Leafy AI 是独立根 Tab，用 `sparkles` 图标。围绕课表、考试、成绩、培养方案和本机学习记录提问。

两种模式：用户自备 DeepSeek API Key 时，App 直连 `https://api.deepseek.com`，Key 仅保存在本机 Keychain；Leafy 托管模式由 Supabase Edge Function `campus-ai-assistant` 代理调用 DeepSeek，服务端只记录额度、状态、token、估算成本和错误码，不保存 prompt 或 response 正文。

动作规划限于打开 App 内页面、创建重要日期和创建课表提醒，不修改成绩、课表原始数据或社区内容。对话记录保存在本机。

## 社区

社区数据全部来自 Supabase。登录采用匿名 Supabase 会话绑定教务学号（Edge Function `community-bootstrap-user`），用户不需要额外注册。

帖子流支持分类筛选、近 7 天热门（按互动热度排序）、全局置顶和分类置顶混排。发布支持文本帖子和图片帖子（本地压缩后上传，含图帖子可进入审核流程），支持匿名发布。互动包括一级评论、点赞、收藏。每条帖子和评论提供举报入口，被举报内容从公共 Feed 下架进入后台审核队列。支持屏蔽用户，屏蔽后该用户的帖子、评论和通知全部不可见。

通知订阅使用 Supabase Realtime，App 前台时刷新未读数。站内公告可打开详情。投票功能支持查看列表、发布投票、投票和查看统计。

首次发帖、评论、点赞前需完成社区资料（昵称必填，头像/学院/年级可选），并同意社区条款。

## 学业

学业页通过一级功能切换组织 8 类校园工具：

- **成绩**：查询课程成绩、绩点、各学期记录；成绩分析和趋势展示；考试安排；荣誉记录（导入和管理 PDF/图片）
- **自习室**：按楼宇/日期/起止节次查询空教室；指定教室占用查询；常用自习室收藏；图书馆座位预约外部链接；专注记录
- **学习**：固定学习空间（四六级、考试资料、课件）；自定义学习项目（长期目标/课程复习/证书考试/竞赛）；资料导入/预览/导出；学习任务管理
- **体育**：阳光长跑本地记录（两周四次、满分 34 次规则 + 进度提醒）；体测记录；场馆开放信息（操场/球场/体育馆/健身房的时间、预约规则和收费）
- **教学培养**：教学计划（按学期查看课程/学分/考核方式）；培养方案与毕业进度；校园日程；校历与作息图片
- **职业规划**：导入和管理简历（PDF/Word/图片）；求职/升学任务管理；收藏岗位和申请入口
- **考研信息**：管理目标院校/专业/年份；按目标匹配官方来源和公共信息源（招生简章/专业目录/复试线/拟录取/参考书目）；提交考研线索
- **评教/评课/评菜**：搜索教师/学院/课程/菜品；1-5 星评分；提交"缺老师""缺课程""缺菜品"补录建议

## 我的

系统 `List + insetGrouped`。资料区展示社区头像、昵称、学号绑定说明和学院/年级。内容区包含我的发帖、点赞、评论、收藏、投票。功能区包含共享课表、个性化设置、课表底图、中英文切换、隐藏周末。支持区包含使用手册、反馈提交、缓存同步说明、App Store 评分、常用链接和联系我们。退出登录使用红色危险操作，二次确认后清理学校会话和社区会话。

## 设计系统

主题、颜色、间距、字体集中定义在 `AppTheme.swift`。

主题色 4 种：鼠尾草绿（默认）、蒂芙尼蓝、糖果莓粉、自定义颜色。语义色包括 `accent`（主强调）、`danger`（危险操作）、`warning`（考试/停课提示）、`cardBackground`（卡片底色）、`separator`（低对比边框）、`primaryText`/`secondaryText`/`tertiaryText` 三级文本。

显示密度 4 档：紧凑、标准、舒适、宽松。通过 `leafyFontScale` 和 `leafyControlScale` 统一控制。常用字号修饰：`responsiveLargeTitle()`、`leafyHeadline()`、`leafyBody()`、`microCaption()`。

圆角三档：`large(24)` / `medium(16)` / `small(12)`。间距五档：`page(20)` / `section(24)` / `card(16)` / `compact(12)` / `micro(8)`。

玻璃和材质通过 `LeafyPageBackground()`、`.leafyCardStyle()`、`.leafyGlassSurface(...)` 封装：iOS 26 使用系统 `glassEffect`，低版本回退到 `topBarMaterial` 和描边。图标优先使用 SF Symbols，英文品牌标题使用 `Lora` 字体。

根导航在 iOS 26 使用系统 `TabView` 和 tab bar；iOS 17-25 使用自定义底部 `RootFloatingTabBar`——一条玻璃胶囊 Tab 区加右侧独立圆形浮动动作按钮。窄屏减少横向边距，极窄宽度下隐藏 Tab 文案只保留图标。

## 技术架构

| 层 | 技术 |
|---|---|
| iOS UI | SwiftUI，部署目标 iOS 17.0 |
| 本地持久化 | SwiftData（课程、成绩、备注、提醒、学习资料、简历、任务、体测、收藏），`@AppStorage`（设置） |
| 学校网络 | `URLSession` + 显式 `HTTPCookieStorage` 管理，登录后收集响应 Cookie，每次请求前同步并拼接 `Cookie` 头 |
| HTML 解析 | SwiftSoup |
| 课表兜底 | `WKWebView` |
| 社区后端 | Supabase Auth / Database / Storage / Edge Functions（51 个 migration，16+ Edge Functions） |
| 后台前端 | React 18 + Vite + TypeScript + Supabase JS，部署在 Cloudflare Pages |
| AI 服务 | DeepSeek Chat Completions API（直连或 Edge Function 代理） |

工程分层：

```
leafy/
├── App/            # 启动、登录态切换、根 Tab、主题、生命周期
├── Features/       # Auth、Timetable、Discover、Profile
│   ├── Presentation/   # SwiftUI 页面、sheet、导航
│   ├── Application/    # 用例、仓储协议、缓存协调
│   └── Domain/         # 课表网格快照、周投影等纯计算模型
├── Services/       # 教务直连（SchoolNetworkManager + 4 个扩展）、Supabase、诊断、WebView 兜底
├── Parsers/        # SwiftSoup HTML 解析
└── Shared/Models/  # 社区 DTO、本地 SwiftData 模型
```

两个关键设计：`SchoolNetworkManager` 按职责拆为 Core / Auth / Timetable / Discover 四个扩展，是教务访问的唯一入口；展示层预投影（`TimetableGridSnapshot`）解决了 iPhone 16e 上曾出现的 AutoLayout hang。SwiftData store 损坏时备份旧文件并尝试恢复或降级为内存 store。iOS 26 Liquid Glass 能力通过 `#available` 保护。

## 运营后台

官网 `/admin` 挂载 React + TypeScript 后台，iOS App 共享同一 Supabase 项目但权限边界不同：iOS 用 publishable key + 匿名会话 + RLS；后台用 publishable key 调 Edge Functions；Edge Functions 端以 `service_role` 执行管理操作。

模块包括：手册（运营顺序和权限边界）、总览（运营健康和审核压力）、帖子/评论管理（检索/置顶/下架/批量操作）、用户管理（禁言/解除）、反馈处理、公告管理、教师/评分管理、管理员/审计日志。所有管理操作写入审计日志。

## App Store 上架

Guideline 2.3.6（年龄分级元数据）：首次提交时错误选择了"家长控制"和"年龄保证"，修正为 `None` 并通过 Override 设为 18+。

Guideline 1.2（UGC）：发帖/评论前同意社区条款；帖子举报后从 Feed 下架进入审核队列；屏蔽用户使其内容全局不可见；24 小时审核 SLA；`support@myleafy.space` 联系方式和应用内社区安全反馈入口。

## 未来规划

- 课表和教务解析稳定性（加强错误文案，区分网络/登录态/HTML 变化，增加 HTMLParser 回归测试）
- TestFlight 上线（隐私检查、错误文案、配置安全检查）
- 社区运营（按真实反馈优化后台筛选和批量处理）
- 教师名录更新流程
- 暂缓：Supabase Auth 替代教务登录、学校登录迁入后端、评教文字评价、独立推送基础设施

## 工程收获

**多层回退不是过度设计。** 强智教务的页面结构会变——URL、form 参数、Cookie 行为都可能变。五层 fallback（HTTP → form 提取 → DOM 遍历 → script/onclick 提取 → WKWebView 兜底）是真实系统里被逼出来的。调试 HTML 落盘（`leafy-debug/`）和面向用户的错误文案（"课表数据暂时无法获取"而不是吐一屏 HTML）同样来自真实使用场景。

**设计 token 在功能膨胀时体现价值。** 当 4 种主题色、4 档密度、三套语义色、统一间距和圆角应用于 5 个 Tab 几十个页面时，不硬编码颜色和 magic number 不是规范要求，是实用需求。新页面选语义 token，深色模式和主题切换自动适配。

**完整产品链路。** 数据源（强智 HTML）→ 客户端（SwiftUI + 预投影）→ 后端（Supabase RLS + Edge Functions）→ 运营后台（React + 受控管理操作）→ App Store 合规审核——从 0 到可上线的全链路。边界大多是被逼出来的：WKWebView 兜底因为教务改了页面结构、共享课表不用 Supabase 接管因为本地已是权威数据源。
