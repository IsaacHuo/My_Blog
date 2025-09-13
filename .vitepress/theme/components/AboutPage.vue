<template>
  <div class="about-layout">
    <div class="about-content">
      <h1>{{ isZh ? '霍玮放' : 'Isaac Huo' }}</h1>
      <div class="about-avatar">
        <a href="https://www.xiaohongshu.com/user/profile/6767de890000000018017ac0" target="_blank" class="avatar-link">
          <img src="/avatar.jpg" :alt="isZh ? '霍玮放' : 'Isaac Huo'" class="avatar-image" />
        </a>
      </div>
      <p class="about-intro" v-html="isZh ? 
          '你好👋，我是一名<a href=&quot;https://www.bjfu.edu.cn/&quot; target=&quot;_blank&quot;>北京林业大学</a>的学生，最初学习风景园林专业，后转入电气工程及其自动化专业。我的兴趣涵盖编程、人工智能、古典文学、书法、时事、金融。' :
          'Hello👋, I\'m a student at <a href=&quot;https://www.bjfu.edu.cn/&quot; target=&quot;_blank&quot;>Beijing Forestry University</a>, initially studying Landscape Architecture before transferring to Electrical Engineering and Automation. My interests span programming, artificial intelligence, classical literature, calligraphy, current affairs, and finance. A socialist who sympathizes with Buddhism and Taoism.'
        ">
      </p>
      <p class="about-description">
        {{ isZh ?
          '启动该博客，是用来记录自己比较曲折的学习历程，以及分享一些谈不上有用的技术经验。学习的路往往是孤独的，学习计算机尤为如此。你需要面对屏幕，一条条地写抽象的代码，了解各种看不到用处的原理。但孤独不是无聊，你会逐渐发现计算机的奇妙，钦佩前辈的创造，并且深深认同开源、平等和保护隐私的互联网精神。这样看来，学习计算机也是助益于人生的。' :
          'Through this blog, I hope to document my learning journey, share useful technical experiences, exchange ideas with other developers, and build bridges between technology and creativity.'
        }}
      </p>
      
      <div class="about-skills">
        <h3>{{ isZh ? '技能与兴趣 🚀' : 'Skills & Interests 🚀' }}</h3>
        <ul>
          <li>{{ isZh ? '前端：Vue.js、Vite、Tailwind CSS' : 'Frontend Development: Vue.js, Vite, Tailwind CSS' }}</li>
          <li>{{ isZh ? '后端：C/C++，Python' : 'Backend Development: C/C++, Python' }}</li>
          <li>{{ isZh ? '专注领域：人工智能/机器学习/深度学习、Web技术、系统设计' : 'Focus Areas: AI/ML, Web Technologies, System Design' }}</li>
        </ul>
      </div>

      <div class="about-contact">
        <h3>{{ isZh ? '联系方式 📫' : 'Get in Touch 📫' }}</h3>
        <ul>
          <li>{{ isZh ? '邮箱：' : 'Email: ' }}2210286979@qq.com</li>
          <li>{{ isZh ? '微信：' : 'WeChat: ' }}hwfgxwzxysw</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'

const { site, page } = useData()
const isZh = site.value.lang === 'zh-CN' || page.value.relativePath.startsWith('zh/')
</script>

<style scoped>
.about-layout {
  /* 单列容器，和内容最大宽度保持一致 */
  display: block;
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--space-3xl) var(--space-lg);
}

.about-content h1 {
  font-size: var(--vp-font-size-3xl);
  font-weight: 700;
  margin-bottom: var(--space-xl);
  color: var(--vp-c-text-1);
}

/* 头像浮动到右侧，让正文自然环绕 */
.about-avatar {
  float: right;
  width: 220px;
  height: 220px;
  margin-left: var(--space-xl);
  margin-bottom: var(--space-md);
  shape-outside: circle(50%);
  -webkit-shape-outside: circle(50%);
  clip-path: circle(50% at 50% 50%);
}

.about-avatar .avatar-link {
  display: block;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 50%;
}

.about-avatar .avatar-link:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.about-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--vp-c-border);
  transition: border-color 0.3s ease;
}

.about-avatar .avatar-link:hover img {
  border-color: var(--vp-c-brand-1);
}

.about-intro {
  font-size: var(--vp-font-size-lg);
  line-height: 1.7;
  color: var(--vp-c-text-1);
  margin-bottom: var(--space-lg);
}

.about-intro a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: color 0.3s ease;
}

.about-intro a:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

.about-description {
  font-size: var(--vp-font-size-lg);
  line-height: 1.7;
  color: var(--vp-c-text-1);
  margin-bottom: var(--space-lg);
}

.about-skills,
.about-contact {
  margin-bottom: var(--space-xl);
  clear: both; /* 后续区块不受浮动影响 */
}

.about-skills h3,
.about-contact h3 {
  font-size: 24px;
  font-weight: 1000; /* 更加粗 */
  margin-bottom: var(--space-md);
  color: var(--vp-c-text-1);
}

.about-skills ul,
.about-contact ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.about-skills li,
.about-contact li {
  padding: 4px 0;
  color: var(--vp-c-text-2);
  font-size: var(--vp-font-size-md);
}

.about-contact a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.about-contact a:hover {
  text-decoration: underline;
}

.github-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--vp-c-brand-1) !important;
  text-decoration: none;
}

.github-link:hover {
  color: var(--vp-c-brand-2) !important;
  text-decoration: underline;
}

.github-icon {
  width: 16px;
  height: 16px;
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.dark .github-icon {
  color: var(--vp-c-brand-1);
}

@media (max-width: 768px) {
  .about-avatar {
    float: none;
    width: 160px;
    height: 160px;
    margin: 0 auto var(--space-lg) auto;
    shape-outside: none;
  }
}
</style>