<template>
  <div class="about-layout">
    <div class="about-content">
      <div class="about-avatar">
        <a
          href="https://www.xiaohongshu.com/user/profile/6767de890000000018017ac0"
          target="_blank"
          class="avatar-link"
        >
          <img
            src="/avatar.jpg"
            :alt="isZh ? '霍玮放' : 'Huo Weifang'"
            class="avatar-image"
          >
        </a>
      </div>
      <template v-if="isZh">
        <p class="welcome-message">你好👋</p>
        <p class="welcome-message">欢迎来到我的博客！</p>
      </template>
      <template v-else>
        <p class="welcome-message">Hi there👋</p>
        <p class="welcome-message">Welcome to my blog!</p>
      </template>
      <p
        class="about-intro"
        v-html="isZh ? 
          '我来自广西梧州，目前是<a href=&quot;https://www.bjfu.edu.cn/&quot; target=&quot;_blank&quot;>北京林业大学</a><strong>电气工程及其自动化</strong>专业大二学生，同时持续学习计算机、AI 与工程系统。' :
          'I grew up in a small city in southern China and am now a sophomore at <a href=&quot;https://www.bjfu.edu.cn/&quot; target=&quot;_blank&quot;>Beijing Forestry University</a>, majoring in <strong>Electrical Engineering and Automation</strong> while continuing to work across computer science, AI, and engineering systems.'
        "
      />
      <p
        class="about-description"
        v-html="isZh ?
          '我曾在<strong>大众中国</strong>旗下的 <a href=&quot;https://cariad.technology&quot; target=&quot;_blank&quot;>CARIAD</a> 参与测试平台与数据工作流相关实习，现在主要回到学校推进自己的校园产品和 AI 安全项目。' :
          'I previously interned at <a href=&quot;https://cariad.technology&quot; target=&quot;_blank&quot;>CARIAD</a> (Volkswagen Group China), working on testing platforms and data workflows. I am now back on campus, building student-facing products and AI safety tooling.'
        "
      />
      <p
        class="about-description"
        v-html="isZh ?
          '近期我主要在做<strong>Leafy in BJFU</strong> 校园 iOS 客户端和 <strong>Agent-Firewall</strong> 这类 AI Agent 安全基础设施，也持续关注后端、运维、移动端体验和模型落地。' :
          'Recently I have been building <strong>Leafy in BJFU</strong>, a campus iOS client, and <strong>Agent-Firewall</strong>, an AI Agent safety layer. I also keep working on backend systems, operations, mobile UX, and practical model deployment.'
        "
      />
      <p class="about-description">
        {{ isZh ?
          '我希望把这些项目继续做成可靠、可维护、真正有人使用的系统，在学校场景和 AI 工程之间找到更扎实的连接。' :
          'I want to keep turning these projects into reliable, maintainable systems that people actually use, and to build a stronger bridge between campus scenarios and AI engineering.'
        }}
      </p>

      <div class="about-contact">
        <h3>{{ isZh ? '联系我' : 'Contact me' }}</h3>
        <ul>
          <li>
            {{ isZh ? '简历：' : 'Resume: ' }}
            <a 
              :href="isZh ? '/my-cv/resume_cn_20260515.pdf' : '/my-cv/resume_en_20260515.pdf'" 
              target="_blank" 
              class="copyable"
              :title="isZh ? '点击查看简历' : 'Click to view resume'"
            >
              {{ isZh ? '点击查看' : 'view pdf' }}
            </a>
          </li>
          <li v-if="!isZh">
            LinkedIn: 
            <a 
              href="https://www.linkedin.com/in/weifang-huo-293237386/" 
              target="_blank" 
              class="copyable"
              title="Click to view LinkedIn profile"
            >
              view my profile
            </a>
          </li>
          <li>
            {{ isZh ? '邮箱：' : 'Email: ' }}
            <span
              class="copyable"
              :title="isZh ? '点击复制' : 'Click to copy'"
              @click="copyToClipboard('huoweifang@foxmail.com', 'email')"
            >
              huoweifang@foxmail.com
            </span>
            <span
              v-if="copiedField === 'email'"
              class="copied-tip"
            >{{ isZh ? '已复制！' : 'Copied!' }}</span>
          </li>
          <li>
            {{ isZh ? '微信：' : 'WeChat: ' }}
            <span
              class="copyable"
              :title="isZh ? '点击复制' : 'Click to copy'"
              @click="copyToClipboard('hwfgxwzxysw', 'wechat')"
            >
              hwfgxwzxysw
            </span>
            <span
              v-if="copiedField === 'wechat'"
              class="copied-tip"
            >{{ isZh ? '已复制！' : 'Copied!' }}</span>
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
  font-size: var(--vp-font-size-2xl);
  line-height: 1.7;
  color: var(--vp-c-text-1);
  margin-bottom: var(--space-lg);
}

.about-intro,
.about-description {
  font-size: var(--vp-font-size-xl);
  line-height: 1.7;
  color: var(--vp-c-text-1);
  margin-bottom: var(--space-lg);
}

.about-intro {
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

.about-intro strong,
.about-description strong {
  font-weight: normal;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}

.about-intro :deep(strong),
.about-description :deep(strong) {
  font-weight: normal !important;
  text-decoration: underline !important;
  text-decoration-thickness:0.5px !important;
  text-underline-offset: 3px !important;
}

.about-contact {
  margin-bottom: var(--space-xl);
  clear: both; /* 后续区块不受浮动影响 */
}

.about-contact h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: var(--space-md);
  color: var(--vp-c-text-1);
  display: inline-block;
  border: 2px solid var(--vp-c-text-1);
  border-radius: 35px; /* 胶囊形状的大圆角 */
  padding: 2px 10px;
}

.about-contact ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.about-contact li {
  padding: 4px 0;
  color: var(--vp-c-text-2);
  font-size: var(--vp-font-size-xl);
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
