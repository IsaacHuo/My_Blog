<template>
  <div class="fragments-page">
    <header class="fragments-header">
      <h1>{{ isZh ? '片段' : 'Fragments' }}</h1>
      <p>
        {{ isZh
          ? '一份个人数字剪贴簿，收下那些不必写成长文章、也不属于完整项目的东西。'
          : 'A personal digital scrapbook for things that do not need to become full essays or complete projects.'
        }}
      </p>
    </header>

    <div
      v-if="fragments.length > 0"
      class="fragment-list"
    >
      <article
        v-for="(fragment, index) in fragments"
        :key="fragment.id || `${fragment.date}-${fragment.title || fragment.text}-${index}`"
        class="fragment-item"
      >
        <div class="fragment-meta">
          <time v-if="fragment.date">{{ formatDate(fragment.date) }}</time>
          <span v-if="fragment.type">{{ fragment.type }}</span>
        </div>
        <img
          v-if="fragment.image"
          :src="fragment.image"
          :alt="fragment.title || fragment.text || ''"
          loading="lazy"
        >
        <h2 v-if="fragment.title">
          {{ fragment.title }}
        </h2>
        <p v-if="fragment.text">
          {{ fragment.text }}
        </p>
        <a
          v-if="fragment.link"
          :href="fragment.link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ fragment.linkText || (isZh ? '查看链接' : 'Open link') }} ↗
        </a>
      </article>
    </div>

    <section
      v-else
      class="fragments-empty"
    >
      <p>{{ isZh ? '这里会慢慢出现：' : 'This space will gradually collect:' }}</p>
      <ul>
        <li
          v-for="item in fragmentKinds"
          :key="item"
        >
          {{ item }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

type FragmentItem = {
  id?: string
  date?: string
  type?: string
  title?: string
  text?: string
  image?: string
  link?: string
  linkText?: string
}

const { frontmatter, page, site } = useData()
const isZh = computed(() => site.value.lang === 'zh-CN' || page.value.relativePath.startsWith('zh/'))
const fragments = computed<FragmentItem[]>(() => frontmatter.value.fragments || [])

const fragmentKinds = computed(() => isZh.value
  ? [
      '一张照片和一句说明',
      '最近在读、在听、在看',
      '正在做什么',
      '简短想法和学习记录',
      '收藏的网站、工具和设计',
      '尚未成熟的小实验',
      '旅行或校园生活记录'
    ]
  : [
      'A photo with a short note',
      'Recently read, heard, or watched',
      'What I am working on',
      'Short thoughts and learning notes',
      'Saved websites, tools, and design',
      'Small unfinished experiments',
      'Travel and campus life'
    ])

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat(isZh.value ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}
</script>

<style scoped>
.fragments-page {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: 56px 15px 72px;
}

.fragments-header {
  margin-bottom: 42px;
}

.fragments-header h1 {
  margin: 0 0 14px;
  color: var(--vp-c-text-1);
  font-size: 42px;
  font-weight: 400;
  line-height: 1.15;
  text-align: left;
}

.fragments-header p {
  max-width: 560px;
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 17px;
  line-height: 1.65;
}

.fragment-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.fragment-item {
  min-width: 0;
  padding: 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg);
}

.fragment-item img {
  display: block;
  width: 100%;
  margin: 12px 0 16px;
  border-radius: 10px;
}

.fragment-meta {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.fragment-item h2 {
  margin: 12px 0 8px;
  color: var(--vp-c-text-1);
  font-size: 20px;
  font-weight: 400;
  line-height: 1.4;
  text-align: left;
}

.fragment-item p {
  margin: 12px 0 0;
  color: var(--vp-c-text-2);
  font-size: 16px;
  line-height: 1.65;
}

.fragment-item a {
  display: inline-block;
  margin-top: 14px;
  font-size: 14px;
  text-decoration: none;
}

.fragments-empty {
  padding-top: 22px;
  border-top: 1px solid var(--vp-c-divider);
}

.fragments-empty p {
  margin: 0 0 14px;
  color: var(--vp-c-text-1);
  font-size: 17px;
}

.fragments-empty ul {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 32px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.fragments-empty li {
  position: relative;
  margin: 0;
  padding-left: 16px;
  color: var(--vp-c-text-2);
  font-size: 16px;
  line-height: 1.6;
}

.fragments-empty li::before {
  position: absolute;
  left: 0;
  content: '·';
}

@media (max-width: 768px) {
  .fragments-page {
    padding: 40px 7.5px 56px;
  }

  .fragments-header h1 {
    font-size: 36px;
  }

  .fragment-list,
  .fragments-empty ul {
    grid-template-columns: 1fr;
  }
}
</style>
