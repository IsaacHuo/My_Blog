---
layout: page
title: Book Recommendations
---

<div class="books-page-container">
  <!-- Mobile Sidebar Overlay -->
  <div class="mobile-sidebar-overlay" id="sidebarOverlay"></div>
  
  <!-- Mobile Sidebar Toggle Button -->
  <button class="mobile-sidebar-toggle" id="sidebarToggle" aria-label="Toggle navigation menu">
    <span id="toggleIcon">☰</span>
  </button>
  
  <aside class="books-sidebar" id="sidebar">
    <nav class="sidebar-nav">
      <h3 class="sidebar-title">Categories</h3>
      <ul class="category-list">
        <li><a href="#technical-books" class="category-link">Technical Books</a>
          <ul class="subcategory-list">
            <li><a href="#frontend-dev">Frontend Development</a></li>
            <li><a href="#software-eng">Software Engineering</a></li>
            <li><a href="#system-design">System Design</a></li>
          </ul>
        </li>
        <li><a href="#personal-growth" class="category-link">Personal Growth</a>
          <ul class="subcategory-list">
            <li><a href="#thinking-methods">Thinking Methods</a></li>
            <li><a href="#learning-methods">Learning Methods</a></li>
          </ul>
        </li>
        <li><a href="#business-innovation" class="category-link">Business & Innovation</a></li>
        <li><a href="#humanities" class="category-link">Humanities & Social Sciences</a></li>
      </ul>
    </nav>
  </aside>
  
  <main class="books-content">
    <h1>Book Recommendations</h1>
    <p class="books-intro">Here are some excellent books I've read and recommend, covering technology, personal growth, thinking methods, and other fields.</p>

<section id="technical-books">
<h2>Technical Books</h2>

<div id="frontend-dev">
<h3>Frontend Development</h3>
- **JavaScript: The Definitive Guide** - Essential reading for frontend development
- **You Don't Know JS** - Deep understanding of JavaScript core concepts
- **Vue.js Design and Implementation** - In-depth Vue.js framework principles

</div>

<div id="software-eng">
<h3>Software Engineering</h3>
- **Clean Code** - The art of writing maintainable code
- **Refactoring: Improving the Design of Existing Code** - Classic guide to code refactoring
- **Design Patterns** - Foundation of object-oriented design

</div>

<div id="system-design">
<h3>System Design</h3>
- **Designing Data-Intensive Applications** - Large-scale system design approaches
- **High Performance Web Sites** - Web performance optimization practices

</div>
</section>

<section id="personal-growth">
<h2>Personal Growth</h2>

<div id="thinking-methods">
<h3>Thinking Methods</h3>
- **Thinking, Fast and Slow** - Cognitive psychology classic
- **Principles** - Ray Dalio's life and work principles
- **Deep Work** - Ability to stay focused in a distracted age

</div>

<div id="learning-methods">
<h3>Learning Methods</h3>
- **How to Read a Book** - Improving reading efficiency and quality
- **Peak: Secrets from the New Science of Expertise** - Golden rules for mastering any skill
- **The Art of Learning** - The art and science of learning

</div>
</section>

<section id="business-innovation">
<h2>Business & Innovation</h2>

- **The Innovator's Dilemma** - Disruptive innovation theory
- **Zero to One** - Startup and innovation thinking
- **The Lean Startup** - Modern entrepreneurship methodology

</section>

<section id="humanities">
<h2>Humanities & Social Sciences</h2>

- **Sapiens: A Brief History of Humankind** - Human development from animals to gods
- **Homo Deus: A Brief History of Tomorrow** - Future trends of human development
- **A Short History of Nearly Everything** - Fascinating journey of scientific development

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