<template>
  <div class="about-layout">
    <div class="about-content">
      <div class="about-avatar">
        <a href="https://www.xiaohongshu.com/user/profile/6767de890000000018017ac0" target="_blank" class="avatar-link">
          <img src="/avatar.jpg" :alt="isZh ? '霍玮放' : 'Isaac Huo'" class="avatar-image" />
        </a>
      </div>
      <p class="welcome-message">
        {{ isZh ?
          '你好👋，我是霍玮放，欢迎你来到我的博客！' :
          'Hello👋, I\'m Isaac Huo. Welcome to my blog!'
        }}
      </p>
      <p class="about-intro" v-html="isZh ? 
          '我来自广西梧州，目前本科就读于<a href=&quot;https://www.bjfu.edu.cn/&quot; target=&quot;_blank&quot;>北京林业大学</a>，最初学习风景园林专业，后转入电气工程专业。我的兴趣涵盖编程、人工智能、古典文学与诗词、书法、时事、金融。<br>' :
          'I\'m a student at <a href=&quot;https://www.bjfu.edu.cn/&quot; target=&quot;_blank&quot;>Beijing Forestry University</a>, initially studying Landscape Architecture before transferring to Electrical Engineering and Automation. My interests span programming, artificial intelligence, classical literature and poetry, calligraphy, current affairs, finance, robotics, and philosophy. I particularly enjoy reading literary works.'
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
          <li>{{ isZh ? '前端开发：Vue.js、Vite' : 'Frontend Development: Vue.js, Vite' }}</li>
          <li>{{ isZh ? '后端开发：Python' : 'Backend Development: Python' }}</li>
          <li>{{ isZh ? '专注领域：人工智能/机器学习、Web技术、系统设计' : 'Focus Areas: AI/ML, Web Technologies, System Design' }}</li>
          <li>{{ isZh ? '其他兴趣：古典文学' : 'Other Interests: Classical Literature, Philosophy, Finance' }}</li>
        </ul>
      </div>

      <div class="about-contact">
        <h3>{{ isZh ? '联系方式' : 'Get in Touch' }}</h3>
        <ul>
          <li>
            {{ isZh ? '邮箱：' : 'Email: ' }}
            <span class="copyable" @click="copyToClipboard('huoweifang@foxmail.com', 'email')" :title="isZh ? '点击复制' : 'Click to copy'">
              huoweifang@foxmail.com
            </span>
            <span v-if="copiedField === 'email'" class="copied-tip">{{ isZh ? '已复制！' : 'Copied!' }}</span>
          </li>
          <li>
            {{ isZh ? '微信：' : 'WeChat: ' }}
            <span class="copyable" @click="copyToClipboard('hwfgxwzxysw', 'wechat')" :title="isZh ? '点击复制' : 'Click to copy'">
              hwfgxwzxysw
            </span>
            <span v-if="copiedField === 'wechat'" class="copied-tip">{{ isZh ? '已复制！' : 'Copied!' }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { ref } from 'vue'

const { site, page } = useData()
const isZh = site.value.lang === 'zh-CN' || page.value.relativePath.startsWith('zh/')
const copiedField = ref<string | null>(null)

const copyToClipboard = async (text: string, field: string) => {
  try {
    await navigator.clipboard.writeText(text)
    copiedField.value = field
    setTimeout(() => {
      copiedField.value = null
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<style scoped>
/* 强制整个页面使用 DFKai 字体 */
.about-layout,
.about-layout *,
.about-layout a,
.about-layout a * {
  font-family: 'DFKai', 'GoudyOldStyle', sans-serif !important;
}

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

.welcome-message {
  font-size: var(--vp-font-size-lg);
  line-height: 1.7;
  color: var(--vp-c-text-1);
  margin-bottom: var(--space-lg);
}

.about-intro {
  font-size: var(--vp-font-size-lg);
  line-height: 1.7;
  color: var(--vp-c-text-1);
  margin-bottom: var(--space-lg);
  font-family: 'DFKai', 'GoudyOldStyle', sans-serif !important;
}

.about-intro a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: color 0.3s ease;
  font-family: 'DFKai', 'GoudyOldStyle', sans-serif !important;
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

.copyable {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
  font-family: 'DFKai', 'GoudyOldStyle', monospace, sans-serif !important;
}

.copyable:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}

.copyable:active {
  transform: translateY(0);
}

.copy-icon {
  font-size: 14px;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.copyable:hover .copy-icon {
  opacity: 1;
}

.copied-tip {
  display: inline-block;
  margin-left: 8px;
  padding: 2px 8px;
  background: var(--vp-c-green-soft);
  color: var(--vp-c-green-1);
  border-radius: 4px;
  font-size: 12px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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