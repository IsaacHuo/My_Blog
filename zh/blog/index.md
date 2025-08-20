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
  
  <aside class="books-sidebar" id="sidebar">
    <nav class="sidebar-nav">
      <h3 class="sidebar-title">分类导航</h3>
      <ul class="category-list">
        <li><a href="#technical-posts" class="category-link">技术文章</a>
          <ul class="subcategory-list">
            <li><a href="#frontend">前端开发</a></li>
            <li><a href="#backend">后端开发</a></li>
            <li><a href="#devops">运维部署</a></li>
            <li><a href="#tools">开发工具</a></li>
          </ul>
        </li>
        <li><a href="#life-posts" class="category-link">生活随笔</a>
          <ul class="subcategory-list">
            <li><a href="#thoughts">思考感悟</a></li>
            <li><a href="#reading">读书笔记</a></li>
            <li><a href="#travel">旅行见闻</a></li>
            <li><a href="#daily">日常生活</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
  
  <main class="books-content">
    <BlogList />
  </main>
</div>

<script>
(function() {
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