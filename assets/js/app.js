document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader-container');
  const mainContent = document.getElementById('main-content');
  
  // Sticky Header Scroll Effect
  const header = document.querySelector('.main-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  }
  
  if (loader) {
    // ==========================================
    //   HOME PAGE: RUN THE TAKEOFF LOADER
    // ==========================================
    loader.classList.add('stage-active');
    
    const timeline = [
      { delay: 800, class: 'stage-1' },    // Curve starts appearing (Desktop 4)
      { delay: 1800, class: 'stage-2' },   // Curve rises higher (Desktop 5-6)
      { delay: 2800, class: 'stage-3' },   // Curve goes even higher (Desktop 7)
      { delay: 3800, class: 'stage-4' }    // Takeoff: Plane flies up, curve covers screen (Desktop 8)
    ];
    
    let timeoutIds = [];
    
    timeline.forEach(step => {
      const id = setTimeout(() => {
        loader.classList.add(step.class);
      }, step.delay);
      timeoutIds.push(id);
    });
    
    const revealId = setTimeout(() => {
      mainContent.classList.remove('hidden');
      void mainContent.offsetHeight;
      mainContent.classList.add('visible');
    }, 4800);
    timeoutIds.push(revealId);
    
    const fadeOutId = setTimeout(() => {
      loader.classList.add('fade-out');
    }, 5000);
    timeoutIds.push(fadeOutId);
    
    const cleanupId = setTimeout(() => {
      loader.style.display = 'none';
    }, 5800);
    timeoutIds.push(cleanupId);

    // Skip loader on click
    loader.addEventListener('click', () => {
      timeoutIds.forEach(id => clearTimeout(id));
      loader.classList.add('stage-1', 'stage-2', 'stage-3', 'stage-4');
      
      setTimeout(() => {
        mainContent.classList.remove('hidden');
        void mainContent.offsetHeight;
        mainContent.classList.add('visible');
      }, 600);
      
      setTimeout(() => {
        loader.classList.add('fade-out');
      }, 800);
      
      setTimeout(() => {
        loader.style.display = 'none';
      }, 1600);
    });
  } else {
    // ==========================================
    //   OTHER PAGES: SIMPLE SMOOTH FADE-IN
    // ==========================================
    if (mainContent) {
      mainContent.classList.remove('hidden');
      void mainContent.offsetHeight;
      mainContent.classList.add('visible');
    }
  }

  // ==========================================
  //   SCROLL-SPY NAVIGATION TRACKING
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120; // header height + buffer
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    if (current) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }
  });
});
