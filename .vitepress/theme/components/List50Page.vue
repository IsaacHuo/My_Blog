<template>
  <div class="list50-layout">
    <div class="list50-content">
      <h1>{{ isZh ? '清单 50' : 'List 50' }}</h1>
      <p class="list50-subtitle">
        {{ isZh
          ? '用产品、AI、审美和行动力，把自己带到一个更自由、更国际化、更有创造感的位置。'
          : 'Using products, AI, taste, and execution to reach a freer, more international, more creative place.'
        }}
      </p>

      <ol>
        <li
          v-for="(item, index) in items"
          :key="index"
        >
          {{ item }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

const { site, page } = useData()
const isZh = computed(() => site.value.lang === 'zh-CN' || page.value.relativePath.startsWith('zh/'))

const itemsZh = [
  '进入一家气质契合的企业，在国际化环境里工作。',
  '拥有几份符合个人追求的实习。',
  '未来去深圳工作和生活，进入更靠近科技、硬件、出海和创新的城市节奏。',
  '成为一个懂产品、懂审美、也懂技术的人。',
  '做出真正被人使用、记住、依赖的产品。',
  '让别人提到你时，会想到"这个人真的能把事情做出来，而且做的很漂亮"。',
  '拥有独立开发完整产品的能力，从想法、设计、开发到上线。',
  '用 AI 扩展自己的创造边界。',
  '建立一个长期更新的个人博客，记录作品、想法和判断。',
  '拥有一个极简、漂亮、像作品一样的个人主页。',
  '做出一个属于自己的、有质感的个人品牌。',
  '让自己的简历变成一条清晰、有力量的职业故事。',
  '在 Apple 生态里持续创造产品。',
  '有一天能参加 Apple、Stripe、OpenAI 这类科技公司的开发者活动。',
  '认识一批真正有创造力、审美和行动力的人。',
  '做一个让自己骄傲的 iOS App。',
  '把英文/外语变成真正的职业优势。',
  '在英文面试或英文工作场景里自如表达自己。',
  '拥有一份让自己和家人都觉得安心的收入。',
  '不再被短期缺钱严重牵制判断。',
  '能靠自己的项目、技术或工作持续赚钱。',
  '未来有能力选择公司、城市和生活方式。',
  '在深圳拥有一个小而自如的住处。',
  '有自己的书桌、显示器、咖啡、绿植和稳定的创作节奏。',
  '做一个既能进入好公司，也能独立创造产品的人。',
  '在外企积累职业化、流程化和国际化的工作方式。',
  '未来成为 Product Engineer 或 Technical Product 这类角色。',
  '进入一个重视审美、表达和用户体验的团队。',
  '不被专业背景限制住自己的可能性。',
  '把电气、软件、AI、产品这些背景组合成自己的独特路径。',
  '做出一个能被面试官认真追问的作品集。',
  '让 Leafy 成为你早期创造力和执行力的一个证明。',
  '以后有一个自己的小团队，一起做有趣、有用、好看的产品。',
  '做一个校园、城市、个人效率或 AI 工具领域的精致产品。',
  '拥有足够好的技术判断力，不被 AI 生成的代码牵着走。',
  '从"会用 AI 开发"走向"会指挥 AI 完成复杂系统"。',
  '在智能的边界，寻找新的创造可能。',
  '保持对好产品、好设计、好文案的敏感。',
  '写出一篇被开发者、学生或独立开发者收藏的文章。',
  '让自己的名字和作品在某个小圈子里被看见。',
  '拥有几段漂亮的实习经历，形成清晰的上升轨迹。',
  '毕业前拿到一份深圳的线下实习或可转正机会。',
  '在毕业时不慌张，有作品、有履历、有方向。',
  '能从容地对自己说：我走的是自己选出来的路。',
  '成为一个有创造力、有执行力、有审美、有长期耐心的人。',
  '保持好奇心，持续观察科技公司、产品趋势和个人机会。',
  '有能力把焦虑转化成行动，把想法转化成作品。',
  '过一种干净、自由、体面、有创造感的生活。',
  '在一个更大的世界里工作、表达、协作和成长。',
  '成为一个能持续为社会创造真实价值的人。',
]

const itemsEn = [
  'Join a company with the right culture and work in an international environment.',
  'Complete several internships aligned with my aspirations.',
  'Move to Shenzhen — closer to tech, hardware, global markets, and innovation.',
  'Become someone who understands product, design, and technology.',
  'Build products that people genuinely use, remember, and rely on.',
  'Be known as someone who can actually ship things — and ship them well.',
  'Gain the ability to independently build a complete product, from idea to launch.',
  'Use AI to expand the boundaries of what I can create.',
  'Maintain a long-running personal blog that documents work, ideas, and judgments.',
  'Have a minimal, beautiful personal site that feels like a crafted piece of work.',
  'Build a personal brand with substance and taste.',
  'Turn my resume into a clear, compelling career narrative.',
  'Keep creating products within the Apple ecosystem.',
  'Attend developer events by companies like Apple, Stripe, or OpenAI.',
  'Meet people who are genuinely creative, have good taste, and ship things.',
  'Build an iOS app I am proud of.',
  'Make English a real career advantage.',
  'Express myself comfortably in English interviews and work settings.',
  'Earn an income that feels secure for both myself and my family.',
  'Stop letting short-term financial pressure heavily influence my decisions.',
  'Consistently earn through my own projects, skills, or work.',
  'Have the ability to choose my company, city, and lifestyle.',
  'Have a small, comfortable home in Shenzhen.',
  'Have my own desk, monitor, coffee, plants, and a steady creative rhythm.',
  'Be someone who can both join a great company and build independently.',
  'Build professional, process-driven, international work experience.',
  'Become a Product Engineer or Technical Product Manager.',
  'Join a team that values taste, expression, and user experience.',
  'Not let my academic background limit what I can become.',
  'Combine EE, software, AI, and product into my own unique path.',
  'Build a portfolio that makes interviewers lean in and ask more.',
  'Let Leafy stand as proof of my early creativity and execution.',
  'Have a small team one day, building interesting products together.',
  'Build a polished product in the campus, city, productivity, or AI space.',
  'Develop strong technical judgment — not led around by AI-generated code.',
  'Go from "AI-assisted coding" to "orchestrating AI to build systems."',
  'Explore new creative possibilities at the frontier of intelligence.',
  'Stay sensitive to great products, design, and copy.',
  'Write an article bookmarked by developers, students, or indie makers.',
  'Get my name and work noticed in a small, meaningful circle.',
  'Have several strong internships forming a clear upward trajectory.',
  'Secure a Shenzhen internship or return offer before graduation.',
  'Graduate without panic — with work, a resume, and direction.',
  'Calmly tell myself: I walked the path I chose.',
  'Become a creative, execution-oriented person with taste and patience.',
  'Stay curious, watching tech, product trends, and personal opportunities.',
  'Turn anxiety into action, and ideas into finished work.',
  'Live a clean, free, dignified, and creatively fulfilling life.',
  'Work, express, collaborate, and grow in a larger world.',
  'Become someone who consistently creates real value for society.',
]

const items = computed(() => isZh.value ? itemsZh : itemsEn)
</script>

<style scoped>
.list50-layout {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: 30px 15px;
}

.list50-content {
  --list50-item-offset: 36px;
}

.list50-content h1 {
  margin: 0 0 10px var(--list50-item-offset);
  color: var(--vp-c-text-1);
  font-size: 42px;
  font-weight: 400;
  line-height: 1;
}

.list50-content p {
  margin: 0 0 24px var(--list50-item-offset);
  color: var(--vp-c-text-1);
  font-size: 16px;
  line-height: 1.5;
}

.list50-content ol {
  margin: 0 0 15px var(--list50-item-offset);
  padding: 0;
  list-style: none;
}

.list50-content li {
  margin: 0;
  padding: 0;
  color: var(--vp-c-text-1);
  font-size: 16px;
  line-height: 1.5;
}

.list50-content :deep(a) {
  color: #4d74eb !important;
  text-decoration: none;
}

.list50-content :deep(a:hover) {
  color: var(--vp-c-text-1) !important;
  text-decoration: underline;
}

@media (max-width: 800px) {
  .list50-layout {
    padding-right: 7.5px;
    padding-left: 7.5px;
  }

  .list50-content h1 {
    font-size: 36px;
  }
}
</style>
