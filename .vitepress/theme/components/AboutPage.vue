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
            :alt="isZh ? '霍玮放' : 'Isaac Huo'"
            class="avatar-image"
          >
        </a>
      </div>
      <p class="welcome-message">
        {{ isZh ?
          '你好👋，我是霍玮放，欢迎来到我的博客！' :
          'Hi there👋, I\'m Isaac Huo — welcome to my blog!'
        }}
      </p>
      <p
        class="about-intro"
        v-html="isZh ? 
          '我来自广西梧州，目前就读于<a href=&quot;https://www.bjfu.edu.cn/&quot; target=&quot;_blank&quot;>北京林业大学</a>，本科主修电气工程，辅修计算机科学。起初我选择了风景园林专业，但后来我意识到自己更热爱技术与工程，于是转入电气工程，并开始深入探索人工智能的工程化落地。' :
          'I grew up in a small city in southern China, and I\'m currently an undergraduate student at <a href=&quot;https://www.bjfu.edu.cn/&quot; target=&quot;_blank&quot;>Beijing Forestry University</a>, majoring in Electrical Engineering and minoring in Computer Science. I originally studied Landscape Architecture but later discovered my passion for technology and intelligent systems, which led me to switch majors.'
        "
      />
      <p
        class="about-description"
        v-html="isZh ?
          '目前，我在<strong>大众汽车</strong>旗下的 <a href=&quot;https://cariad.technology&quot; target=&quot;_blank&quot;>CARIAD</a> 部门作为 Platform System & Integration <strong>实习生</strong>，专注于智能驾驶与车载系统的集成与验证。' :
          'I\'m now an <strong>intern</strong> at <a href=&quot;https://cariad.technology&quot; target=&quot;_blank&quot;>CARIAD of Volkswagen Group China</a>, working in Platform System & Integration, where I focus on intelligent driving systems and vehicle software integration. This experience has taught me how large-scale engineering balances innovation, safety, and precision.'
        "
      />
      <p
        class="about-description"
        v-html="isZh ?
          '我的<strong>兴趣</strong>涵盖网络运维和AI，还对古典诗词与历史情有独钟。' :
          'My <strong>interests</strong> span programming, DevOps, and AI, with a special love for classical poetry and history.'
        "
      />
      <p class="about-description">
        {{ isZh ?
          '未来，我希望能在 AI 与工程的交汇处继续探索，推动AI技术在工业场景中的规模化应用，实现更快、更安全、更智能的工程解决方案。' :
          'I\'m passionate about exploring the intersection of AI and engineering systems, and I\'m always looking for ways to turn cutting-edge ideas into reality.'
        }}
      </p>

      <div class="about-contact">
        <h3>{{ isZh ? '联系我(求职ing)' : 'Contact me (I need a job, seriously)' }}</h3>
        <ul>
          <li>
            {{ isZh ? '简历：' : 'Resume: ' }}
            <a 
              :href="isZh ? '/my-cv/resume_cn.pdf' : '/my-cv/resume_en.pdf'" 
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

.about-description strong {
  font-weight: normal;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}

.about-description :deep(strong) {
  font-weight: normal !important;
  text-decoration: underline !important;
  text-decoration-thickness:0.5px !important;
  text-underline-offset: 3px !important;
}

.about-skills,
.about-contact {
  margin-bottom: var(--space-xl);
  clear: both; /* 后续区块不受浮动影响 */
}

.about-skills h3,
.about-contact h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: var(--space-md);
  color: var(--vp-c-text-1);
  display: inline-block;
  border: 2px solid var(--vp-c-text-1);
  border-radius: 40px; /* 胶囊形状的大圆角 */
  padding: 4px 10px;
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