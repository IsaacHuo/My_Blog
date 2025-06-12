import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Isaac Huo's Blog",
  description: "分享技术、生活与思考",
  base: '/My_Blog/',
  
  head: [
    ['meta', { name: 'author', content: 'Isaac Huo' }],
    ['meta', { property: 'og:title', content: "Isaac Huo's Blog" }],
    ['meta', { property: 'og:description', content: '分享技术、生活与思考' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap', rel: 'stylesheet' }]
  ],

  themeConfig: {
    nav: [
      { text: '🏠 首页', link: '/' },
      { text: '📝 文章', link: '/posts/' },
      { text: '🏷️ 标签', link: '/tags/' },
      { text: '👨‍💻 关于', link: '/about' }
    ],

    sidebar: {
      '/posts/': [
        {
          text: '📚 文章导航',
          items: [
            { text: '📝 所有文章', link: '/posts/' }
          ]
        },
        {
          text: '🔧 技术文章',
          items: [
            { text: 'VitePress 搭建指南', link: '/posts/vitepress-guide' }
          ]
        },
        {
          text: '📖 生活随笔',
          items: [
            { text: '我的第一篇博客', link: '/posts/first-post' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/IsaacHuo/My_Blog' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Isaac Huo'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/IsaacHuo/My_Blog/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    }
  },

  markdown: {
    lineNumbers: true
  }
})
