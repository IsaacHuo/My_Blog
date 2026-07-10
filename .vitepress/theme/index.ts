import { EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Layout from './Layout.vue'
import AboutPage from './components/AboutPage.vue'
import ProjectsPage from './components/ProjectsPage.vue'
import FragmentsPage from './components/FragmentsPage.vue'
import List50Page from './components/List50Page.vue'
import BlogList from './components/BlogList.vue'
import List50Item from './components/List50Item.vue'
import BackToTop from './components/BackToTop.vue'
import ViewCounter from './components/ViewCounter.vue'
import ArticleTOC from './components/ArticleTOC.vue'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp(ctx: EnhanceAppContext) {
    // 保留默认主题的增强
    DefaultTheme.enhanceApp?.(ctx)
    const { app } = ctx
    // 注册全局组件
    app.component('AboutPage', AboutPage)
    app.component('ProjectsPage', ProjectsPage)
    app.component('FragmentsPage', FragmentsPage)
    app.component('List50Page', List50Page)
    app.component('BlogList', BlogList)
    app.component('List50Item', List50Item)
    app.component('BackToTop', BackToTop)
    app.component('ViewCounter', ViewCounter)
    app.component('ArticleTOC', ArticleTOC)
  }
}
