import DefaultTheme from 'vitepress/theme'
import './custom.css'
import HomePage from './components/HomePage.vue'
import ArticleLayout from './components/ArticleLayout.vue'
import AboutPage from './components/AboutPage.vue'
import BlogList from './components/BlogList.vue'
import LanguageSwitch from './components/LanguageSwitch.vue'
import ProgressTracker from './components/ProgressTracker.vue'
import List100Item from './components/List100Item.vue'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    // 保留默认主题的增强
    DefaultTheme.enhanceApp?.(ctx)
    const { app } = ctx
    // 注册全局组件
    app.component('HomePage', HomePage)
    app.component('ArticleLayout', ArticleLayout)
    app.component('AboutPage', AboutPage)
    app.component('BlogList', BlogList)
    app.component('LanguageSwitch', LanguageSwitch)
    app.component('ProgressTracker', ProgressTracker)
    app.component('List100Item', List100Item)
  }
}
