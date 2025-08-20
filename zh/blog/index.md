---
layout: page
title: 博客
description: 我的中文博客文章
---

<div class="books-page-container">
   <!-- Mobile Sidebar Overlay -->
   <div class="mobile-sidebar-overlay" id="sidebarOverlay"></div>
   
   <!-- Mobile Sidebar Toggle Button -->
   <button class="mobile-sidebar-toggle" id="sidebarToggle" aria-label="切换导航菜单">
     <span id="toggleIcon">☰</span>
   </button>
   
   <!-- Sidebar -->
   <aside class="books-sidebar" id="sidebar">
    <nav class="sidebar-nav">
      <h3 class="sidebar-title">分类导航</h3>
      <ul class="category-list">
        <li>
          <a href="#tech-articles" class="category-link">技术文章</a>
          <ul class="subcategory-list">
            <li><a href="#frontend">前端开发</a></li>
            <li><a href="#backend">后端开发</a></li>
            <li><a href="#devops">运维部署</a></li>
          </ul>
        </li>
        <li>
          <a href="#learning-notes" class="category-link">学习笔记</a>
          <ul class="subcategory-list">
            <li><a href="#algorithms">算法与数据结构</a></li>
            <li><a href="#system-design">系统设计</a></li>
          </ul>
        </li>
        <li><a href="#life-thoughts" class="category-link">生活感悟</a></li>
        <li><a href="#project-sharing" class="category-link">项目分享</a></li>
      </ul>
    </nav>
  </aside>
  
  <!-- Main Content -->
   <main class="books-content">
     <BlogList />
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
        // 只在移动端禁用body滚动，桌面端不影响
        if (window.innerWidth <= 1024) {
          document.body.style.overflow = '';
        }
      } else {
        // Open sidebar
        sidebar.classList.add('active');
        overlay.classList.add('active');
        sidebarToggle.classList.add('active');
        toggleIcon.textContent = '✕';
        // 只在移动端禁用body滚动，桌面端不影响
        if (window.innerWidth <= 1024) {
          document.body.style.overflow = 'hidden';
        }
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
    
    // Close sidebar on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        toggleSidebar();
      }
    });
    
    // Close sidebar on window resize (desktop)
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
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
  } else {
    initSidebar();
  }
})();
</script>