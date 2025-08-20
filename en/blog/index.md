---
layout: page
title: Blog
description: My English blog articles
---

<div class="books-page-container">
   <!-- Mobile Sidebar Overlay -->
   <div class="mobile-sidebar-overlay" id="sidebarOverlay"></div>
   
   <!-- Mobile Sidebar Toggle Button -->
   <button class="mobile-sidebar-toggle" id="sidebarToggle" aria-label="Toggle Navigation Menu">
     <span id="toggleIcon">☰</span>
   </button>
   
   <!-- Sidebar -->
   <aside class="books-sidebar" id="sidebar">
    <nav class="sidebar-nav">
      <h3 class="sidebar-title">Categories</h3>
      <ul class="category-list">
        <li>
          <a href="#tech-articles" class="category-link">Tech Articles</a>
          <ul class="subcategory-list">
            <li><a href="#frontend">Frontend Development</a></li>
            <li><a href="#backend">Backend Development</a></li>
            <li><a href="#devops">DevOps</a></li>
          </ul>
        </li>
        <li>
          <a href="#learning-notes" class="category-link">Learning Notes</a>
          <ul class="subcategory-list">
            <li><a href="#algorithms">Algorithms & Data Structures</a></li>
            <li><a href="#system-design">System Design</a></li>
          </ul>
        </li>
        <li><a href="#life-thoughts" class="category-link">Life Thoughts</a></li>
        <li><a href="#project-sharing" class="category-link">Project Sharing</a></li>
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
        // Only disable body scroll on mobile, not on desktop
        if (window.innerWidth <= 1024) {
          document.body.style.overflow = '';
        }
      } else {
        // Open sidebar
        sidebar.classList.add('active');
        overlay.classList.add('active');
        sidebarToggle.classList.add('active');
        toggleIcon.textContent = '✕';
        // Only disable body scroll on mobile, not on desktop
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