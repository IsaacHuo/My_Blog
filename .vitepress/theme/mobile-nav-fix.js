// 移动端导航修复脚本
export function fixMobileNavigation() {
  if (typeof window === 'undefined') return;
  
  // 等待 DOM 加载完成
  document.addEventListener('DOMContentLoaded', () => {
    // 查找汉堡菜单按钮
    const hamburgerSelectors = [
      '.VPNavBarHamburger',
      '.vp-nav-bar-hamburger',
      '.VPNavBarHamburger button',
      '.vp-nav-bar-hamburger button',
      '[class*="hamburger"]',
      '[aria-expanded]'
    ];
    
    let hamburgerButton = null;
    
    for (const selector of hamburgerSelectors) {
      hamburgerButton = document.querySelector(selector);
      if (hamburgerButton) break;
    }
    
    if (hamburgerButton) {
      console.log('找到汉堡菜单按钮:', hamburgerButton);
      
      // 确保按钮可点击
      hamburgerButton.style.pointerEvents = 'auto';
      hamburgerButton.style.zIndex = '9999';
      hamburgerButton.style.position = 'relative';
      
      // 添加点击事件监听器
      hamburgerButton.addEventListener('click', (e) => {
        console.log('汉堡菜单被点击');
        e.stopPropagation();
        
        // 查找导航菜单
        const navScreenSelectors = [
          '.VPNavScreen',
          '.vp-nav-screen',
          '[class*="nav-screen"]'
        ];
        
        let navScreen = null;
        for (const selector of navScreenSelectors) {
          navScreen = document.querySelector(selector);
          if (navScreen) break;
        }
        
        if (navScreen) {
          console.log('找到导航菜单:', navScreen);
          
          // 强制显示导航菜单
          navScreen.style.display = 'block';
          navScreen.style.opacity = '1';
          navScreen.style.visibility = 'visible';
          navScreen.style.zIndex = '9998';
          navScreen.style.position = 'fixed';
          navScreen.style.top = '0';
          navScreen.style.left = '0';
          navScreen.style.width = '100%';
          navScreen.style.height = '100%';
          navScreen.style.background = 'var(--vp-c-bg)';
          navScreen.setAttribute('aria-hidden', 'false');
          navScreen.classList.add('open');
          
          console.log('导航菜单已强制显示');
        } else {
          console.log('未找到导航菜单');
        }
      }, true);
      
      // 添加触摸事件支持
      hamburgerButton.addEventListener('touchend', (e) => {
        e.preventDefault();
        hamburgerButton.click();
      });
      
    } else {
      console.log('未找到汉堡菜单按钮');
    }
  });
  
  // 监听路由变化，重新初始化
  if (window.addEventListener) {
    window.addEventListener('popstate', () => {
      setTimeout(() => fixMobileNavigation(), 100);
    });
  }
}

// 页面加载时立即执行
if (typeof window !== 'undefined') {
  fixMobileNavigation();
  
  // 如果页面已经加载完成，再次执行
  if (document.readyState === 'complete') {
    setTimeout(() => fixMobileNavigation(), 100);
  }
}
