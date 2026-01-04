<template>
  <div class="custom-toc" v-if="headers && headers.length > 0">
    <div class="toc-header">目录</div>
    <nav class="toc-content">
      <ul>
        <li 
          v-for="header in headers" 
          :key="header.slug"
          :class="{ 
            'active': activeId === header.slug,
            'toc-h2': header.level === 2,
            'toc-h3': header.level === 3
          }"
        >
          <a 
            :href="`#${header.slug}`" 
            @click.prevent="scrollToHeader(header.slug)"
          >
            {{ header.title }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

const { page } = useData()
const headers = ref<any[]>([])
const activeId = ref('')

// 手动提取标题的函数（作为 fallback）
function extractHeaders() {
  const elements = document.querySelectorAll('.vp-doc h2, .vp-doc h3')
  const extracted = Array.from(elements).map(el => ({
    title: el.innerText,
    slug: el.id,
    level: parseInt(el.tagName.substring(1))
  }))
  return extracted
}

watch(() => page.value.headers, (newHeaders) => {
  if (newHeaders && newHeaders.length > 0) {
    headers.value = newHeaders
  } else {
    // 如果 page.headers 为空，尝试手动提取
    // 需要在 DOM 更新后执行
    nextTick(() => {
      const extracted = extractHeaders()
      if (extracted.length > 0) {
        headers.value = extracted
        // 重新初始化观察器
        setTimeout(setupObserver, 100)
      }
    })
  }
}, { immediate: true })

function scrollToHeader(slug: string) {
  const element = document.getElementById(slug)
  if (element) {
    const offset = 80 // Adjust for fixed header
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
    activeId.value = slug
    // Update URL hash without jumping
    history.pushState(null, null, `#${slug}`)
  }
}

// Scroll spy implementation
let observer: IntersectionObserver | null = null

function setupObserver() {
  if (observer) observer.disconnect()

  const options = {
    root: null,
    rootMargin: '-100px 0px -60% 0px',
    threshold: 0
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeId.value = entry.target.id
      }
    })
  }, options)

  headers.value.forEach(header => {
    const el = document.getElementById(header.slug)
    if (el) observer?.observe(el)
  })
}

onMounted(() => {
  // Wait for DOM update
  setTimeout(setupObserver, 500)
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  window.removeEventListener('scroll', onScroll)
})

// Fallback scroll handler for better accuracy
function onScroll() {
  // Simple check if at bottom
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
    if (headers.value.length > 0) {
      activeId.value = headers.value[headers.value.length - 1].slug
    }
  }
}

watch(() => page.value.relativePath, () => {
  setTimeout(setupObserver, 500)
})
</script>

<style scoped>
.custom-toc {
  position: fixed;
  left: 50%;
  margin-left: 250px; /* 700px/2 + 10px gap */
  top: 100px;
  width: 220px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 12px;
  border: 1px solid var(--vp-c-border);
  font-size: 0.9rem;
  z-index: 2000;
  transition: opacity 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.toc-header {
  font-weight: 600;
  margin-bottom: 0.8rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-base);
}

.toc-content ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.toc-content li {
  margin: 0;
  padding: 0;
  line-height: 1.4;
}

.toc-content a {
  display: block;
  padding: 4px 0;
  color: var(--vp-c-text-1) !important;
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 2px solid transparent;
  padding-left: 10px;
  margin-left: -12px; /* Align border with container edge */
}

.toc-content a:hover {
  color: #4D74EB !important;
  background: var(--vp-c-bg-soft);
}

.toc-content li.active > a {
  color: #4D74EB !important;
  border-left-color: #4D74EB;
  font-weight: 500;
  background: var(--vp-c-bg-soft);
}

.toc-h3 a {
  padding-left: 24px;
  font-size: 0.85em;
}

/* Hide on mobile/tablet */
@media (max-width: 1200px) {
  .custom-toc {
    display: none;
  }
}

/* Dark mode adjustments */
:global(.dark) .custom-toc {
  background: rgba(30, 30, 30, 0.8);
}
</style>
