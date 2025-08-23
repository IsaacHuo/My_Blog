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
        <div v-for="(item, index) in list100Items" :key="index" class="list100-item">
          <span class="item-number">{{ index + 1 }}.</span>
          <span class="item-status">{{ item.status }}</span>
          <span class="item-text" v-html="isZh ? item.textZh : item.textEn"></span>
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
  { status: '✓', textEn: '<a href="#" target="_blank">Start a nonprofit organization</a>', textZh: '<a href="#" target="_blank">创办非营利组织</a>' },
  { status: '✗', textEn: 'See my book being sold', textZh: '看到我的书被出售' },
  { status: '✓', textEn: 'Be in a movie/commercial', textZh: '参演电影/广告' },
  { status: '✗', textEn: 'Become the first author of a paper', textZh: '成为第一作者' },
  { status: '✗', textEn: 'Get published on the New Yorker', textZh: '在《纽约客》发表文章' },
  { status: '✗', textEn: 'Read 1000 books (<a href="#" target="_blank">~60% done</a>)', textZh: '阅读1000本书（<a href="#" target="_blank">~60% 完成</a>）' },
  { status: '✓', textEn: '<a href="#" target="_blank">Teach a graduate-level course</a>', textZh: '<a href="#" target="_blank">教授研究生课程</a>' },
  { status: '✓', textEn: 'Start a company', textZh: '创办公司' },
  { status: '✗', textEn: 'Author a patent', textZh: '申请专利' },
  { status: '✗', textEn: 'Write for a TV show that I watch', textZh: '为我观看的电视节目写剧本' },
  { status: '✗', textEn: 'Design and publish a game', textZh: '设计并发布游戏' },
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
  padding: 2px 0;
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

.item-text a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: color 0.3s ease;
}

.item-text a:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
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
