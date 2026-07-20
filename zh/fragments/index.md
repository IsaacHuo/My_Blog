---
layout: page
title: 片段
description: 个人数字剪贴簿，记录照片、近况、短想法、收藏和未成熟的实验。
fragments:
  - id: spoken-english-practice-prompts
    date: 2026-07-20
    type: 提示词
    title: 用 ChatGPT 练英语口语
    wide: true
    prompts:
      - title: 新手模式
        text: |-
          你是我的英语口语陪练。全程只用英语与我交流，并遵守以下规则：

          1. 每次只问一个问题，等我回答后再继续。
          2. 我说话时不要打断；如果我停顿，请耐心等待。
          3. 使用适合初学者的常用词，并放慢语速。
          4. 对话过程中先保证交流继续，不要即时纠错。
          5. 当我说“结束练习”时，再统一指出最重要的 3 个问题，并分别给出我的原句、更自然的表达和简短原因。

          请先用一个简单问题开始。
      - title: 场景一：机场全程
        text: |-
          现在模拟一次完整的机场出行。你依次扮演值机柜台工作人员、安检人员、登机口工作人员和入境官员，我扮演旅客。

          对话依次覆盖：办理值机、选择座位、托运行李、行李超重、航班延误、登机口变更、安检和入境问答。

          每次只说一句并等待我回答，不要提前给我参考答案。全部结束后，按照新手模式统一复盘。
      - title: 场景二：酒店入住与退房
        text: |-
          现在模拟一次海外酒店从入住到退房的完整对话。你扮演酒店前台，我扮演住客。

          对话依次覆盖：核对预订、出示证件、支付押金、确认房型、询问早餐时间、连接 Wi-Fi、询问设施位置、申请延迟退房、核对费用和办理退房。

          每次只问一个问题并等待我回答，不要提前给我参考答案。全部结束后，按照新手模式统一复盘。
      - title: 场景三：国外餐厅点餐
        text: |-
          现在模拟一次在国外餐厅用餐的完整对话。你扮演服务员，我扮演顾客。

          对话依次覆盖：询问是否预订、安排座位、介绍菜单、推荐菜品、询问口味和忌口、确认熟度或辣度、加菜或修改订单、结账、支付和小费。

          每次只问一个问题并等待我回答，不要提前给我参考答案。全部结束后，按照新手模式统一复盘。
      - title: 场景四：酒店应急问题
        text: |-
          现在模拟住酒店期间遇到问题。你扮演酒店前台或值班经理，我扮演住客。

          请随机选择一种情况开始：房间太吵、空调或热水故障、卫生问题、房卡失效、物品遗失，或者需要换房。不要提前告诉我解决方案，通过对话让我说明问题、提出要求、确认处理时间并追问结果。

          每次只说一句并等待我回答。问题解决后，按照新手模式统一复盘。
      - title: 场景五：打车、问路与交通
        text: |-
          现在模拟海外出行。你依次扮演出租车司机、公交或地铁工作人员和路人，我扮演旅客。

          对话依次覆盖：说明目的地、确认地址、询问预计时间和费用、确认上下车地点、购买车票、询问线路和换乘方式、听懂方向指引，以及走错路后的再次确认。

          每次只问一个问题并等待我回答，不要提前给我参考答案。全部结束后，按照新手模式统一复盘。
  - id: learning-through-output
    date: 2026-07-20
    type: 简短想法
    title: 最高效的学习，是产出并获得真实反馈
    text: 读书、听课和看教程很容易让人产生“已经懂了”的感觉。更有效的方式，是把理解变成可以被检验的产出：解一道题、写一篇文章、做一个项目，或者讲给别人听。产出会暴露含糊和漏洞，真实反馈会指出偏差。根据反馈反复修改、再次验证，知识才会逐渐变成能够稳定调用的能力。
    tags: [学习, 产出, 反馈]
  - id: why-rag
    date: 2026-07-18
    type: 简短想法
    title: 为什么要用 RAG？
    text: 传统关键词检索依赖字符是否相同，换一种说法就可能找不到。RAG 借助向量检索，在语义空间里寻找含义相近的内容，再把结果交给模型。它要解决的问题，就是把字符匹配转换成语义匹配。
    tags: [AI, RAG, 检索]
  - id: blog-redesign
    date: 2026-07-10
    type: 正在做
    title: 把博客变得更像自己
    text: 正在整理文章、项目和片段之间的边界，让完整思考、实际产出与日常兴趣各有自己的位置。
    status: 进行中
    tags: [博客, 设计]
    placeholder: true
  - id: campus-sunset
    date: 2026-07-09
    type: 照片
    title: 校园里的一场晚霞
    text: 下课后抬头看到的颜色。照片不一定要讲完整故事，一句说明就够了。
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dramatic%20sunset%20landscape.jpg?width=1200"
    placeholder: true
  - id: recently
    date: 2026-07-08
    type: 最近在看
    title: 最近在读、在听、在看
    text: 《设计心理学》、一期关于端侧 AI 的播客，以及一部记录城市生活的纪录片。
    tags: [书, 播客, 纪录片]
    placeholder: true
  - id: short-thought
    date: 2026-07-07
    type: 简短想法
    title: 效率不是唯一尺度
    text: 好工具应该减少无意义的消耗，但不应该替人决定什么值得做。省下来的时间，最终还是要交还给生活和创造。
    placeholder: true
  - id: saved-hig
    date: 2026-07-06
    type: 收藏
    title: Apple Human Interface Guidelines
    text: 遇到交互和系统组件拿不准时，先回到官方设计指南，而不是凭印象重新发明一套规则。
    link: https://developer.apple.com/design/human-interface-guidelines/
    linkText: 打开设计指南
    tags: [Apple, UI, 设计]
    placeholder: true
  - id: map-experiment
    date: 2026-07-05
    type: 小实验
    title: 把城市道路画成一张海报
    text: 尝试只保留道路、水系与留白，让地图从导航工具变成一张可以打印的图像。
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mountain%20lake.jpg?width=1200"
    status: 还在调整配色与构图
    tags: [地图, Python, 可视化]
    placeholder: true
  - id: learning-note
    date: 2026-07-04
    type: 学习记录
    title: 今天弄懂了一件小事
    text: 页面看起来像是表格撑宽，真正的问题也可能来自父级容器被错误位移。先检查最终生成的 CSS，再修改宽度。
    visualEmoji: 🧩
    visualText: 一条以后还能搜到的调试记录
    placeholder: true
  - id: museum-note
    date: 2026-07-03
    type: 旅行与生活
    title: 国家博物馆的一天
    text: 比起匆忙拍完所有展品，更想记住少数真正停下来看的东西，以及它们为什么让我停下。
    tags: [北京, 博物馆, 生活]
    placeholder: true
---

<FragmentsPage />
