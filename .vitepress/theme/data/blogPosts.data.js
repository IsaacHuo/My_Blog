import { createContentLoader } from 'vitepress'

const loader = createContentLoader(['zh/blog/*.md', 'en/blog/*.md'], {
  includeSrc: false,
  render: false,
  excerpt: false,
  transform(rawData) {
    return rawData
      .filter(({ url }) => !url.endsWith('/index') && !url.endsWith('/blog/') && !url.endsWith('/zh/blog/'))
      .map(({ url, frontmatter }) => ({
        url,
        frontmatter
      }))
      .sort((a, b) => {
        return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
      })
  }
})

export default loader
export const data = loader