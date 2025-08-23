<template>
  <div class="list100-layout">
    <div class="list100-content">
      <h1>{{ isZh ? 'List 100' : 'List 100' }}</h1>
      <p class="list100-intro">
        {{ isZh ? 
          '死前想做的事情。如果你有任何建议，请告诉我。进度截至2023年12月31日：40/75/92。' :
          'Things I want to do before I die. Please let me know if you have any recommendation. Progress as of Dec 31, 2023: 40/75/92.'
        }}
      </p>
      
      <div class="list100-items">
        <div v-for="(item, index) in list100Items" :key="index" class="list100-item">
          <span class="item-number">{{ index + 1 }}.</span>
          <span class="item-status">{{ item.status }}</span>
          <span class="item-text">{{ isZh ? item.textZh : item.textEn }}</span>
          <a v-if="item.link" :href="item.link" class="item-link" target="_blank">{{ item.linkText }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'

const { site, page } = useData()
const isZh = site.value.lang === 'zh-CN' || page.value.relativePath.startsWith('zh/')

// List 100 数据
const list100Items = [
  { status: '✓', textEn: 'Learn Spanish', textZh: '学习西班牙语' },
  { status: '✓', textEn: 'Live in another country', textZh: '在另一个国家生活' },
  { status: '✓', textEn: 'Start a nonprofit organization', textZh: '创办非营利组织', link: '#', linkText: 'Start a nonprofit organization' },
  { status: '✗', textEn: 'See my book being sold at an airport outside Vietnam', textZh: '在越南以外的机场看到我的书被出售' },
  { status: '✓', textEn: 'Be in a movie/commercial (I\'ve actually done this in 3 countries: Vietnam, India, US)', textZh: '参演电影/广告（我实际上在3个国家做过：越南、印度、美国）' },
  { status: '✗', textEn: 'Become the first author of a paper at a top-tier conference', textZh: '成为顶级会议论文的第一作者' },
  { status: '✗', textEn: 'Get published on the New Yorker', textZh: '在《纽约客》发表文章' },
  { status: '✗', textEn: 'Read 1000 books', textZh: '阅读1000本书', link: '#', linkText: '~60% done' },
  { status: '✓', textEn: 'Teach a graduate-level course', textZh: '教授研究生课程', link: '#', linkText: 'Teach a graduate-level course' },
  { status: '✓', textEn: 'Start a company', textZh: '创办公司' },
  { status: '✗', textEn: 'Author a patent', textZh: '申请专利' },
  { status: '✗', textEn: 'Write for a TV show that I watch', textZh: '为我观看的电视节目写剧本' },
  { status: '✗', textEn: 'Design and publish a game', textZh: '设计并发布游戏' },
  { status: '✓', textEn: 'Fall in love', textZh: '坠入爱河' },
  { status: '✓', textEn: 'Build a home (a simple one, but it\'s mine)', textZh: '建造房屋（简单的，但是我的）' },
  { status: '✗', textEn: 'Have a salad from my garden', textZh: '吃自己花园种的沙拉' },
  { status: '✗', textEn: 'Become a parent', textZh: '成为父母' },
  { status: '✗', textEn: 'Be a writer in Paris', textZh: '在巴黎当作家' },
  { status: '✓', textEn: 'Go on a trip overseas with my whole family', textZh: '与全家人一起出国旅行' },
  { status: '✗', textEn: 'Take a hot-air balloon ride', textZh: '乘坐热气球' },
  { status: '✓', textEn: 'Be in a submarine', textZh: '乘坐潜水艇' },
  { status: '✗', textEn: 'Swim a mile', textZh: '游泳一英里' },
  { status: '✗', textEn: 'Run a half marathon', textZh: '跑半程马拉松' },
  { status: '✗', textEn: 'Scuba dive', textZh: '水肺潜水' }
]
</script>

<style scoped>
.list100-layout {
  display: block;
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--space-lg) var(--space-lg);
  text-align: left;
}

.list100-content h1 {
  font-size: var(--vp-font-size-3xl);
  font-weight: 700;
  margin-bottom: var(--space-lg);
  margin-top: 0;
  color: var(--vp-c-text-1);
  text-align: left;
}

.list100-intro {
  font-size: var(--vp-font-size-md);
  line-height: 1.7;
  color: var(--vp-c-text-1);
  margin-bottom: var(--space-xl);
  text-align: left;
}

.list100-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.list100-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
  padding: var(--space-xs) 0;
  font-size: var(--vp-font-size-md);
  line-height: 1.6;
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

.item-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: color 0.3s ease;
  margin-left: var(--space-xs);
}

.item-link:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

@media (max-width: 768px) {
  .list100-layout {
    padding: var(--space-md) var(--space-md);
  }
  
  .list100-content h1 {
    font-size: var(--vp-font-size-2xl);
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
