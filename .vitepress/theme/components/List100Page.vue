<template>
  <div class="list100-layout">
    <div class="list100-content">
      <h1>{{ isZh ? '清单 100' : 'List 100' }}</h1>
      <p class="list100-intro">
        {{ isZh ? 
          '死前想做的事情。进度截至2023年12月31日。' :
          'Things I want to do before I die. Progress as of Dec 31, 2023.'
        }}
      </p>
      
      <div class="list100-items">
        <div
          v-for="(item, index) in list100Items"
          :key="index"
          class="list100-item"
          @click="openModal(item)"
        >
          <span class="item-number">{{ index + 1 }}.</span>
          <span class="item-status">{{ item.status }}</span>
          <span
            class="item-text"
            v-html="isZh ? item.textZh : item.textEn"
          />
        </div>
      </div>
    </div>
    
    <List100Modal 
      :is-open="isModalOpen"
      :item="selectedItem"
      :is-zh="isZh"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { ref } from 'vue'
import List100Modal from './List100Modal.vue'

const { site, page } = useData()
const isZh = site.value.lang === 'zh-CN' || page.value.relativePath.startsWith('zh/')

// Modal State
const isModalOpen = ref(false)
const selectedItem = ref({})

const openModal = (item: any) => {
  selectedItem.value = item
  isModalOpen.value = true
  document.body.style.overflow = 'hidden' // Prevent background scrolling
}

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = ''
}

// List 100 数据
interface List100Item {
  status: string
  textEn: string
  textZh: string
  records?: {
    date: string
    status: string
    contentZh: string
    contentEn: string
  }[]
}

const list100Items: List100Item[] = [
  { 
    status: '✗', 
    textEn: 'Independently design a complete production-grade project in the AI/ML systems field.', 
    textZh: '在 AI/ML 系统领域独立设计一个完整的生产级项目。',
    records: [
      { date: '2023-10-15', status: 'In Progress', contentZh: '开始构思系统架构，选型 Kubernetes + RayServe。', contentEn: 'Started conceptualizing architecture, selected Kubernetes + RayServe.' },
      { date: '2023-10-15', status: 'In Progress', contentZh: '开始构思系统架构，选型 Kubernetes + RayServe。', contentEn: 'Started conceptualizing architecture, selected Kubernetes + RayServe.' },
    ]
  },
  { status: '✗', textEn: 'Publish an open-source library or tool used by developers worldwide.', textZh: '发布自己的开源库或工具，让全球开发者使用。' },
  { status: '✗', textEn: 'Publish a paper or present at a top AI/ML conference (NeurIPS, ICML, CVPR).', textZh: '在顶级 AI/ML 会议（NeurIPS、ICML、CVPR）发表论文或报告。' },
  { status: '✗', textEn: 'Participate in or lead the design and deployment of a low-latency GPU inference system.', textZh: '参与或主导一个低延迟 GPU 推理系统的设计与部署。' },
  { status: '✗', textEn: 'Build a personal multimodal large model experimental environment and conduct innovative experiments.', textZh: '构建自己的多模态大模型实验环境，并做创新实验。' },
  { status: '✗', textEn: 'Deploy AI models in an enterprise environment to solve real business problems.', textZh: '在企业级环境中将 AI 模型落地，解决实际业务问题。' },
  { status: '✗', textEn: 'Achieve a high ranking through Kaggle or other competitions.', textZh: '通过 Kaggle 或其他竞赛获得高排名。' },
  { status: '✗', textEn: 'Design and implement a quantitative trading strategy and verify it in a simulated environment.', textZh: '设计并实现一个量化交易策略，并在模拟环境中验证。' },
  { status: '✗', textEn: 'Master at least three mainstream programming languages at an expert level (Python, C++, Java).', textZh: '学会至少三种主流编程语言精通级别（Python、C++、Java）。' },
  { status: '✗', textEn: 'Establish a personal tech blog or public account, sharing AI/engineering insights long-term.', textZh: '建立个人技术博客或公众号，长期分享 AI/工程技术干货。' },
  { status: '✗', textEn: 'Obtain an internationally recognized AI or data science certificate (e.g., AWS ML Specialty, Stanford/DeepLearning.AI courses).', textZh: '拿到国外认可的 AI 或数据科学证书（如 AWS ML Specialty、Stanford/DeepLearning.AI 课程证书）。' },
  { status: '✗', textEn: 'Systematically learn computer fundamentals, algorithms, and data structures to a top-tier level.', textZh: '系统学习计算机基础、算法和数据结构，达到顶尖水平。' },
  { status: '✗', textEn: 'Deeply study operating systems, networking, and distributed systems principles.', textZh: '深入学习操作系统、网络和分布式系统原理。' },
  { status: '✗', textEn: 'Become proficient in production environment tools like Kubernetes, Docker, and Triton.', textZh: '熟练掌握 Kubernetes、Docker、Triton 等生产环境工具。' },
  { status: '✗', textEn: 'Learn to systematically manage knowledge bases and research literature, becoming a domain knowledge integrator.', textZh: '学会系统化管理知识库和科研文献，成为领域内知识整合者。' },
  { status: '✗', textEn: 'Travel to major scenic and cultural cities in China (Guilin, Zhangjiajie, Huangshan, Lijiang, etc.).', textZh: '走遍中国主要山水与文化名城（桂林、张家界、黄山、丽江等）。' },
  { status: '✗', textEn: 'Take an in-depth trip to my hometown Wuzhou and the village from my childhood.', textZh: '去故乡梧州和小时候的村庄深度旅行。' },
  { status: '✗', textEn: 'Experience a complete around-the-world trip (covering at least Asia, Europe, and the Americas).', textZh: '体验一次完整的环游世界旅行（至少涵盖亚洲、欧洲、美洲）。' },
  { status: '✗', textEn: 'Camp or hike through the Great Wall or other national scenic areas.', textZh: '露营或徒步穿越长城或其他国家级风景区。' },
  { status: '✗', textEn: 'Live and work independently in a foreign country for a period of time.', textZh: '在一个陌生国家独自生活和工作一段时间。' },
  { status: '✗', textEn: 'Complete and publish a novel or short story collection.', textZh: '写完并出版一本小说或短篇集。' },
  { status: '✗', textEn: 'Read 100 classic literary books (Chinese and foreign combined).', textZh: '读完 100 本经典文学书籍（中外结合）。' },
  { status: '✗', textEn: 'Systematically practice calligraphy and be able to write complete poetry works.', textZh: '系统练习书法，能写出完整的诗词作品。' },
  { status: '✗', textEn: 'Use AI-assisted writing to create literary works.', textZh: '用 AI 创作辅助写作，尝试生成文学作品。' },
  { status: '✗', textEn: 'Participate in a literary or poetry creation competition.', textZh: '参加一次文学或诗词创作比赛。' },
  { status: '✗', textEn: 'Complete a full AI education or entertainment project.', textZh: '完成一个完整的 AI 教育或娱乐项目。' },
  { status: '✗', textEn: 'Learn a musical instrument or develop an artistic skill (e.g., piano, guitar).', textZh: '学会一门乐器或深入艺术技能（如钢琴、吉他）。' },
  { status: '✗', textEn: 'Participate in extreme sports or adventure activities (e.g., skydiving, diving, rock climbing).', textZh: '参加极限运动或冒险活动（如跳伞、潜水、攀岩）。' },
  { status: '✗', textEn: 'Complete a marathon or major long-distance running event.', textZh: '完成一次马拉松或大型长跑活动。' },
  { status: '✗', textEn: 'Establish a long-term technical interest group or community for learning and exchange.', textZh: '建立一个长期学习与交流的技术兴趣小组或社群。' },
  { status: '✗', textEn: 'Use technology to improve a real-life problem and leave a reusable solution.', textZh: '用技术改善一个实际生活问题，留下可复用的解决方案。' },
  { status: '✗', textEn: 'Maintain continuous learning and exploration, becoming a well-rounded talent who understands both technology and humanities.', textZh: '保持持续学习和探索，成为既懂技术又懂人文的复合型人才。' }
]
</script>

<style scoped>
.list100-layout {
  display: block;
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--space-lg) var(--space-lg);
  text-align: center;
}

.list100-content h1 {
  font-size: var(--vp-font-size-2xl);
  font-weight: 700;
  margin-bottom: 35px;
  margin-top: 6.5px;
  color: var(--vp-c-text-1);
  text-align: center;
}

.list100-intro {
  font-size: var(--vp-font-size-md);
  line-height: 1.7;
  color: var(--vp-c-text-1);
  margin-bottom: var(--space-xl);
  text-align: center;
}

.list100-items {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
  max-width: 450px;
  margin: 0 auto;
}

.list100-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
  padding: 4px 8px;
  font-size: var(--vp-font-size-md);
  line-height: 1.6;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin: 0 -8px; /* Negative margin to offset padding so text aligns */
}

.list100-item:hover {
  background-color: var(--vp-c-bg-soft);
}

.item-number {
  color: var(--vp-c-text-1);
  font-weight: 500;
  min-width: 24px;
  text-align: right;
}

.item-status {
  color: var(--vp-c-text-1);
  font-weight: 500;
  min-width: 16px;
}

.item-text {
  color: var(--vp-c-text-1);
  flex: 1;
}

/* Remove old link styles since whole item is clickable now */
:deep(.item-text a) {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  pointer-events: none; /* Let the parent click handler take over */
}

@media (max-width: 768px) {
  .list100-layout {
    padding: var(--space-md) var(--space-md);
  }
  
  .list100-content h1 {
    font-size: var(--vp-font-size-lg);
    margin-bottom: var(--space-md);
  }
  
  .list100-item {
    font-size: var(--vp-font-size-sm);
  }
  
  .item-number {
    min-width: 20px;
  }
}
</style>
