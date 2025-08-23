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
          '你好👋，我是一名<a href=&quot;https://www.bjfu.edu.cn/&quot; target=&quot;_blank&quot;>北京林业大学</a>的学生，最初学习风景园林专业，后转入电气工程及其自动化专业。我的兴趣涵盖编程、人工智能、古典文学诗词、书法、时事、金融。' :
          'Hello👋, I\'m a student at <a href=&quot;https://www.bjfu.edu.cn/&quot; target=&quot;_blank&quot;>Beijing Forestry University</a>, initially studying Landscape Architecture before transferring to Electrical Engineering and Automation. My interests span programming, artificial intelligence, classical literature and poetry, calligraphy, current affairs, finance, robotics, and philosophy. I particularly enjoy reading literary works.'
        ">
      </p>
      <p class="about-description">
        {{ isZh ?
          '通过这个博客，我希望记录自己的学习历程，分享有用的技术经验，与其他开发者交流想法，在技术与创意之间搭建桥梁。' :
          'Through this blog, I hope to document my learning journey, share useful technical experiences, exchange ideas with other developers, and build bridges between technology and creativity.'
        }}
      </p>
      
      <div class="about-skills">
        <h3>{{ isZh ? '技能与兴趣' : 'Skills & Interests' }}</h3>
        <ul>
          <li>{{ isZh ? '前端开发：Vue.js、Vite、Tailwind CSS' : 'Frontend Development: Vue.js, Vite, Tailwind CSS' }}</li>
          <li>{{ isZh ? '后端开发：Python' : 'Backend Development: Python' }}</li>
          <li>{{ isZh ? '专注领域：人工智能/机器学习、Web技术、系统设计' : 'Focus Areas: AI/ML, Web Technologies, System Design' }}</li>
          <li>{{ isZh ? '其他兴趣：古典文学' : 'Other Interests: Classical Literature, Philosophy, Finance' }}</li>
        </ul>
      </div>

      <div class="about-contact">
        <h3>{{ isZh ? '联系方式' : 'Get in Touch' }}</h3>
        <ul>
          <li>
            <a href="https://github.com/IsaacHuo" target="_blank" class="github-link">
              <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              IsaacHuo
            </a>
          </li>
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
  font-size: var(--vp-font-size-lg);
  font-weight: 700;
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