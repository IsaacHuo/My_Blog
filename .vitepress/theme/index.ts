import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Layout from './Layout.vue'
import HomePage from './components/HomePage.vue'
import ArticleLayout from './components/ArticleLayout.vue'
import AboutPage from './components/AboutPage.vue'
import ThoughtsPage from './components/ThoughtsPage.vue'
import List100Page from './components/List100Page.vue'
import BlogList from './components/BlogList.vue'
import LanguageSwitch from './components/LanguageSwitch.vue'
import ProgressTracker from './components/ProgressTracker.vue'
import List100Item from './components/List100Item.vue'
import BackToTop from './components/BackToTop.vue'
import { EnhanceAppContext } from 'vitepress'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp(ctx: EnhanceAppContext) {
    // 保留默认主题的增强
    DefaultTheme.enhanceApp?.(ctx)
    const { app } = ctx
    // 注册全局组件
    app.component('HomePage', HomePage)
    app.component('ArticleLayout', ArticleLayout)
    app.component('AboutPage', AboutPage)
    app.component('ThoughtsPage', ThoughtsPage)
    app.component('List100Page', List100Page)
    app.component('BlogList', BlogList)
    app.component('LanguageSwitch', LanguageSwitch)
    app.component('ProgressTracker', ProgressTracker)
    app.component('List100Item', List100Item)
    app.component('BackToTop', BackToTop)
  }
}
