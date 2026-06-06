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
        <div class="contact-body">
          <ul class="social-list">
            <li>
              <span class="social-mark">Mail</span>
              <a :href="`mailto:${emailAddress}`">
                {{ emailAddress }}
              </a>
            </li>
            <li>
              <span class="social-mark">{{ isZh ? '红书' : 'RED' }}</span>
              <a
                :href="xiaohongshuUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ isZh ? '小红书' : 'Xiaohongshu' }}
              </a>
            </li>
            <li>
              <span class="social-mark">Git</span>
              <a
                :href="githubUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                IsaacHuo
              </a>
            </li>
          </ul>

          <form
            class="mail-compose"
            @submit.prevent="sendEmail"
          >
            <textarea
              v-model="mailBody"
              :placeholder="isZh ? '写下邮件正文...' : 'Write your message...'"
              rows="4"
            />
            <button type="submit">
              {{ isZh ? '发送邮件' : 'Send email' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { ref } from 'vue'

const { site, page } = useData()
const isZh = site.value.lang === 'zh-CN' || page.value.relativePath.startsWith('zh/')
const emailAddress = 'huoweifang@foxmail.com'
const xiaohongshuUrl = 'https://www.xiaohongshu.com/user/profile/6767de890000000018017ac0'
const githubUrl = 'https://github.com/IsaacHuo'
const mailBody = ref('')

const sendEmail = () => {
  const subject = encodeURIComponent(isZh ? '来自博客首页的邮件' : 'Message from blog homepage')
  const body = encodeURIComponent(mailBody.value.trim())
  window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`
}
</script>

<style scoped>
.about-layout,
.about-layout *,
.about-layout a,
.about-layout a * {
  font-family: inherit !important;
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
  font-family: inherit !important;
}

.about-intro a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: color 0.3s ease;
  font-family: inherit !important;
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
  margin-top: var(--space-2xl);
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

.contact-body {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: var(--space-2xl);
  align-items: start;
}

.social-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.social-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 0;
  font-size: var(--vp-font-size-xl);
  line-height: 1.4;
}

.social-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  color: var(--vp-c-text-3);
  font-size: 14px;
  font-weight: 700;
  text-align: right;
}

.social-list a {
  color: #4d74eb !important;
  text-decoration: none;
}

.social-list a:hover {
  text-decoration: underline;
}

.mail-compose {
  display: flex;
  min-width: 0;
  border: 1px solid #80c4ff;
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  box-shadow: 0 0 0 1px rgba(77, 116, 235, 0.08);
}

.mail-compose textarea {
  flex: 1;
  min-width: 0;
  resize: vertical;
  border: 0;
  padding: 14px 16px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: var(--vp-font-size-lg);
  line-height: 1.5;
  outline: none;
}

.mail-compose textarea::placeholder {
  color: var(--vp-c-text-3);
}

.mail-compose button {
  flex: 0 0 auto;
  border: 0;
  padding: 0 22px;
  background: #87c5f5;
  color: #ffffff;
  font-size: var(--vp-font-size-lg);
  cursor: pointer;
}

.mail-compose button:hover {
  background: #6fb5ec;
}

@media (max-width: 768px) {
  .about-avatar {
    float: none;
    width: 160px;
    height: 160px;
    margin: 0 auto var(--space-lg) auto;
    shape-outside: none;
  }

  .about-contact {
    margin-top: var(--space-xl);
  }

  .contact-body {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }

  .mail-compose {
    flex-direction: column;
  }

  .mail-compose button {
    padding: 12px 16px;
  }
}
</style>
