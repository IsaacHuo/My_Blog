---
layout: page
title: 书籍推荐
---

<div class="books-page-container">
  <!-- Mobile Sidebar Overlay -->
  <div class="mobile-sidebar-overlay" id="sidebarOverlay"></div>
  
  <!-- Mobile Sidebar Toggle Button -->
  <button class="mobile-sidebar-toggle" id="sidebarToggle" aria-label="切换导航菜单">
    <span id="toggleIcon">☰</span>
  </button>
  
  <aside class="books-sidebar" id="sidebar">
    <nav class="sidebar-nav">
      <h3 class="sidebar-title">分类导航</h3>
      <ul class="category-list">
        <li><a href="#technical-books" class="category-link">技术类书籍</a>
          <ul class="subcategory-list">
            <li><a href="#frontend-dev">前端开发</a></li>
            <li><a href="#software-eng">软件工程</a></li>
            <li><a href="#system-design">系统设计</a></li>
          </ul>
        </li>
        <li><a href="#personal-growth" class="category-link">个人成长</a>
          <ul class="subcategory-list">
            <li><a href="#thinking-methods">思维方法</a></li>
            <li><a href="#learning-methods">学习方法</a></li>
          </ul>
        </li>
        <li><a href="#business-innovation" class="category-link">商业与创新</a></li>
        <li><a href="#humanities" class="category-link">人文社科</a></li>
      </ul>
    </nav>
  </aside>
  
  <main class="books-content">
    <h1>书籍推荐</h1>
    <p class="books-intro">这里是我读过并推荐的一些优秀书籍，涵盖技术、个人成长、思维方法等多个领域。</p>

<section id="technical-books">
<h2>技术类书籍</h2>

<div id="frontend-dev">
<h3>前端开发</h3>
- **JavaScript权威指南** - 前端开发必读经典
- **你不知道的JavaScript** - 深入理解JavaScript核心概念
- **Vue.js设计与实现** - 深入Vue.js框架原理

</div>

<div id="software-eng">
<h3>软件工程</h3>
- **代码大全** - 编写可维护代码的艺术
- **重构：改善既有代码的设计** - 代码重构经典指南
- **设计模式** - 面向对象设计基础

</div>

<div id="system-design">
<h3>系统设计</h3>
- **数据密集型应用系统设计** - 大规模系统设计方法
- **高性能网站建设指南** - Web性能优化实践

</div>
</section>

<section id="personal-growth">
<h2>个人成长</h2>

<div id="thinking-methods">
<h3>思维方法</h3>
- **思考，快与慢** - 认知心理学经典
- **原则** - Ray Dalio的人生和工作原则
- **深度工作** - 在分心时代保持专注的能力

</div>

<div id="learning-methods">
<h3>学习方法</h3>
- **如何阅读一本书** - 提高阅读效率和质量
- **刻意练习** - 掌握任何技能的黄金法则
- **学习之道** - 学习的艺术与科学

</div>
</section>

<section id="business-innovation">
<h2>商业与创新</h2>

- **创新者的窘境** - 颠覆性创新理论
- **从0到1** - 创业和创新思维
- **精益创业** - 现代创业方法论

</section>

<section id="humanities">
<h2>人文社科</h2>

- **人类简史** - 从动物到上帝的人类发展史
- **未来简史** - 人类发展的未来趋势
- **万物简史** - 科学发展的精彩历程

</section>
  </main>
</div>

<script>
(function() {
  // Only run on client side
  if (typeof window === 'undefined') return;
  
  function initSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (!sidebarToggle || !sidebar || !overlay || !toggleIcon) {
      console.log('Sidebar elements not found, retrying...');
      setTimeout(initSidebar, 100);
      return;
    }
    
    console.log('Sidebar elements found, initializing...');
  
    function toggleSidebar() {
      const isActive = sidebar.classList.contains('active');
      
      if (isActive) {
        // Close sidebar
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        sidebarToggle.classList.remove('active');
        toggleIcon.textContent = '☰';
        document.body.style.overflow = '';
      } else {
        // Open sidebar
        sidebar.classList.add('active');
        overlay.classList.add('active');
        sidebarToggle.classList.add('active');
        toggleIcon.textContent = '✕';
        document.body.style.overflow = 'hidden';
      }
    }
    
    // Toggle button click
    sidebarToggle.addEventListener('click', toggleSidebar);
  
    // Overlay click to close
    overlay.addEventListener('click', function() {
      if (sidebar.classList.contains('active')) {
        toggleSidebar();
      }
    });
    
    // Close sidebar when clicking on links
    sidebar.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') {
        setTimeout(toggleSidebar, 150);
      }
    });
    
    // Handle escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        toggleSidebar();
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 1024 && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        sidebarToggle.classList.remove('active');
        toggleIcon.textContent = '☰';
        document.body.style.overflow = '';
      }
    });
  }
  
  // Start initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
  } else {
    initSidebar();
  }
})();
</script>