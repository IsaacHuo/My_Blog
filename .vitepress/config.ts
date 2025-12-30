import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Isaac Huo's Blog",
  description: "Sharing thoughts on technology, life, and creativity",
  // Cloudflare Pages 使用根路径
  base: '/',

  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    zh: {
      label: '中文',
      lang: 'zh-CN',
      title: "Isaac Huo 的博客",
      description: "分享技术、生活和创意的思考",
      themeConfig: {
        siteTitle: 'Isaac Huo',
        nav: [
          { text: '文章', link: '/zh/blog/' },
          { text: '项目', link: '/zh/projects/' },
          { text: '清单100', link: '/zh/list100/' },
          { text: 'EN', link: '/' }
        ],
        socialLinks: [
          { icon: 'github', link: 'https://github.com/IsaacHuo' }
        ],
        footer: {
          message: '基于 MIT 许可证发布。',
          copyright: 'Copyright © 2024 Isaac Huo'
        },

      }
    }
  },

  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=yes' }],
    ['link', { rel: 'icon', href: '/huo.png' }],
    ['meta', { name: 'author', content: 'Isaac Huo' }],
    ['meta', { property: 'og:title', content: "Isaac Huo's Blog" }],
    ['meta', { property: 'og:description', content: 'Sharing thoughts on technology, life, and creativity' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap', rel: 'stylesheet' }]
  ],

  themeConfig: {
    siteTitle: 'Isaac Huo',
    nav: [
      { text: 'Blog', link: '/en/blog/' },
      { text: 'Projects', link: '/en/projects/' },
      { text: 'List 100', link: '/en/list100/' },
      { text: '中文', link: '/zh/' }
    ],



    socialLinks: [
      { icon: 'github', link: 'https://github.com/IsaacHuo' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Isaac Huo'
    },


  },

  markdown: {
    lineNumbers: true
  }
})
