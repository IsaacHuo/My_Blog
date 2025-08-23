<template>
  <div class="books-layout">
    <div class="books-content">
      <h1>{{ isZh ? '书籍' : 'Books' }}</h1>
      <p class="books-intro">
        {{ isZh ? 
          '我从事技术写作、创意非小说和小说——既有长篇形式，也有真正的长篇形式（书籍）。我发现创意写作中的叙事技巧让技术概念更易理解。' :
          'I do technical writing, creative nonfiction, and fiction—in both long form and really long form (books). I find that storytelling techniques from creative writing make technical concepts more accessible.'
        }}
      </p>
      
      <div class="book-section">
        <h2 class="book-title">
          <a href="#" class="book-link">{{ isZh ? 'AI 工程' : 'AI Engineering' }}</a>
          <span class="book-publisher">(O'Reilly, 2025)</span>
        </h2>
        
        <p class="book-subtitle">
          <em>{{ isZh ? '有声书将于2025年6月在' : 'Audiobook coming out in June 2025 on' }} 
          <a href="#" class="link">{{ isZh ? 'Audible' : 'Audible' }}</a>.</em>
        </p>
        
        <div class="book-content">
          <div class="book-cover">
            <div class="book-placeholder">
              <!-- 书籍封面占位符 -->
              <div class="cover-text">{{ isZh ? '书籍封面' : 'Book Cover' }}</div>
            </div>
          </div>
          
          <div class="book-description">
            <p>
              {{ isZh ? 
                '本书讨论了AI工程：使用现成的基础模型构建应用程序的过程。它介绍了开发AI应用程序并高效部署它的实用框架。' :
                'This book discusses AI engineering: the process of building applications with readily available foundation models. It introduces a practical framework for developing an AI application and efficiently deploying it.'
              }}
            </p>
            
            <p>
              {{ isZh ? 
                '它还涵盖了如何导航AI领域，包括模型、数据集、评估基准，以及看似无限的用例和应用模式。' :
                'It also covers how to navigate the AI landscape, including models, datasets, evaluation benchmarks, and the seemingly infinite number of use cases and application patterns.'
              }}
            </p>
            
            <p>
              {{ isZh ? '本书可在' : 'The book is available on' }}
              <a href="#" class="link">{{ isZh ? '亚马逊' : 'Amazon' }}</a>, 
              <a href="#" class="link">{{ isZh ? 'Kindle' : 'Kindle' }}</a> {{ isZh ? '和' : 'and the' }}
              <a href="#" class="link">{{ isZh ? 'O\'Reilly平台' : 'O\'Reilly' }}</a> {{ isZh ? '上获得。' : 'platform.' }}
            </p>
          </div>
        </div>
        
        <p class="book-stats">
          {{ isZh ? 
            '这是自发布以来在O\'Reilly上阅读最多的书籍。在Twitter上查看人们对这本书的评论' :
            'It\'s been the most read book on O\'Reilly since its release. See what people are talking about the book on Twitter'
          }}
          <a href="#" class="link">@aisysbooks</a>!
        </p>
        
        <p class="book-translation">
          {{ isZh ? 
            '目前正在被翻译成中文、法文、日文、韩文、波兰文和俄文。' :
            'It\'s currently being translated into Chinese, French, Japanese, Korean, Polish, and Russian.'
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'

const { site, page } = useData()
const isZh = site.value.lang === 'zh-CN' || page.value.relativePath.startsWith('zh/')
</script>

<style scoped>
.books-layout {
  display: block;
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--space-lg) var(--space-lg);
  text-align: center;
}

.books-content h1 {
  font-size: var(--vp-font-size-2xl);
  font-weight: 700;
  margin-bottom: var(--space-lg);
  margin-top: 0;
  color: var(--vp-c-text-1);
  text-align: center;
}

.books-intro {
  font-size: var(--vp-font-size-md);
  line-height: 1.7;
  color: var(--vp-c-text-1);
  margin-bottom: var(--space-xl);
  text-align: left;
}

.book-section {
  margin-bottom: var(--space-xl);
}

.book-title {
  font-size: var(--vp-font-size-xl);
  font-weight: 600;
  margin-bottom: var(--space-sm);
  color: var(--vp-c-text-1);
  text-align: left;
}

.book-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: color 0.3s ease;
}

.book-link:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

.book-publisher {
  color: var(--vp-c-text-2);
  font-weight: 400;
  margin-left: var(--space-sm);
}

.book-subtitle {
  font-size: var(--vp-font-size-md);
  color: var(--vp-c-text-2);
  margin-bottom: var(--space-lg);
  text-align: left;
}

.book-content {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: var(--space-lg);
  margin-bottom: var(--space-lg);
}

.book-cover {
  width: 200px;
  height: 280px;
}

.book-placeholder {
  width: 100%;
  height: 100%;
  background: var(--vp-c-bg-soft);
  border: 2px dashed var(--vp-c-border);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-3);
  font-size: var(--vp-font-size-sm);
}

.book-description {
  flex: 1;
  text-align: left;
}

.book-description p {
  font-size: var(--vp-font-size-md);
  line-height: 1.7;
  color: var(--vp-c-text-1);
  margin-bottom: var(--space-sm);
  text-align: left;
}

.book-stats,
.book-translation {
  font-size: var(--vp-font-size-md);
  line-height: 1.7;
  color: var(--vp-c-text-1);
  margin-bottom: var(--space-sm);
  text-align: left;
}

.link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: color 0.3s ease;
}

.link:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

@media (max-width: 768px) {
  .books-layout {
    padding: var(--space-md) var(--space-md);
  }
  
  .book-content {
    display: block;
  }
  
  .book-cover {
    width: 120px;
    height: 168px;
    float: left;
    margin: 0 var(--space-md) var(--space-md) 0;
  }
  
  .book-description {
    overflow: hidden;
  }
  
  .books-content h1 {
    font-size: var(--vp-font-size-2xl);
    margin-bottom: var(--space-md);
  }
}

@media (max-width: 480px) {
  .book-cover {
    width: 100px;
    height: 140px;
    margin: 0 var(--space-sm) var(--space-sm) 0;
  }
  
  .book-description p {
    font-size: var(--vp-font-size-sm);
  }
}
</style>
