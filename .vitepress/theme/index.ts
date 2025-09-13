import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Layout from './Layout.vue'
import HomePage from './components/HomePage.vue'
import ArticleLayout from './components/ArticleLayout.vue'
import AboutPage from './components/AboutPage.vue'
import BooksPage from './components/BooksPage.vue'
import List100Page from './components/List100Page.vue'
import BlogList from './components/BlogList.vue'
import LanguageSwitch from './components/LanguageSwitch.vue'
import List100Item from './components/List100Item.vue'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp(ctx) {
    // 保留默认主题的增强
    DefaultTheme.enhanceApp?.(ctx)
    const { app, router } = ctx
    
    // 注册全局组件
    app.component('HomePage', HomePage)
    app.component('ArticleLayout', ArticleLayout)
    app.component('AboutPage', AboutPage)
    app.component('BooksPage', BooksPage)
    app.component('List100Page', List100Page)
    app.component('BlogList', BlogList)
    app.component('LanguageSwitch', LanguageSwitch)
    app.component('List100Item', List100Item)
    
    // 字体检测和应用
    if (typeof window !== 'undefined') {
      const applyChineseFont = () => {
        const isChinesePage = window.location.pathname.includes('/zh/')
        const body = document.body
        
        if (isChinesePage) {
          body.classList.add('chinese-page')
          body.style.setProperty('--font-family-override', "'KaiTi', '楷体', 'STKaiti', '华文楷体', serif")
        } else {
          body.classList.remove('chinese-page')
          body.style.removeProperty('--font-family-override')
        }
      }
      
      // 初始应用
      router.onAfterRouteChanged = applyChineseFont
      
      // 页面加载时也应用
      window.addEventListener('DOMContentLoaded', applyChineseFont)
    }
  }
}
