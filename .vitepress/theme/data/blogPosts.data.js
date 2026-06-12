import { createContentLoader } from 'vitepress'

const loader = createContentLoader(['zh/blog/*.md', 'en/blog/*.md'], {
  includeSrc: true,
  render: false,
  excerpt: false,
  transform(rawData) {
    return rawData
      .filter(({ url, frontmatter }) => {
        if (!frontmatter.title) return false
        if (url.endsWith('/index') || url.endsWith('/blog/') || url.endsWith('/zh/blog/')) return false
        if (url.endsWith('/template')) return false
        return true
      })
      .map(({ url, frontmatter, src }) => ({
        url,
        frontmatter,
        src // 保留源码以供搜索
      }))
      .sort((a, b) => {
        return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
      })
  }
})

export default loader
export const data = loader
