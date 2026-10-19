/**
 * GBSS Kara Bhai Karim Jee - Responsive Scaling & Smooth Counting Animations
 * Ensures 100% responsiveness on all devices without horizontal scrolling or overflow.
 */
(function initKaraBhaiFeatures() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Smoothly animates a counter element from 0 to target value
   * @param {HTMLElement} el
   */
  function animateCounter(el) {
    if (el.dataset.kbAnimated === 'true') return;
    el.dataset.kbAnimated = 'true';

    const target = parseFloat(el.getAttribute('data-kb-counter'));
    if (isNaN(target)) return;

    const decimals = parseInt(el.getAttribute('data-kb-decimals') || '0', 10);
    const suffix = el.getAttribute('data-kb-suffix') || '';
    const prefix = el.getAttribute('data-kb-prefix') || '';
    const duration = parseInt(el.getAttribute('data-kb-duration') || '1500', 10);

    if (prefersReduced || target === 0) {
      el.textContent = prefix + (decimals > 0 ? target.toFixed(decimals) : Math.round(target).toLocaleString('en-US')) + suffix;
      return;
    }

    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      // Quartic ease-out curve for a natural deceleration
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const current = target * easeOut;

      let formatted;
      if (decimals > 0) {
        formatted = current.toFixed(decimals);
      } else {
        formatted = Math.round(current).toLocaleString('en-US');
      }

      el.textContent = prefix + formatted + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + (decimals > 0 ? target.toFixed(decimals) : Math.round(target).toLocaleString('en-US')) + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  /**
   * Animates bar chart heights
   * @param {HTMLElement} barEl
   */
  function animateBar(barEl) {
    if (barEl.dataset.barAnimated === 'true') return;
    barEl.dataset.barAnimated = 'true';

    const targetHeight = barEl.getAttribute('data-bar-target');
    if (!targetHeight) return;

    if (prefersReduced) {
      barEl.style.height = targetHeight;
      return;
    }

    requestAnimationFrame(() => {
      barEl.style.height = targetHeight;
    });
  }

  /**
   * Dynamically scales circle canvases to fit viewport without horizontal scrolling or overflow
   */
  function fitCanvasScales() {
    // 1. School Impact Circles Canvas (base dimensions: 480px width x 430px height)
    const circleWrap = document.querySelector('.kb-infographic-wrap');
    let circleScaler = document.querySelector('.kb-circles-scaler');
    const circleCanvas = document.querySelector('.kb-circles-canvas');

    if (circleWrap && circleCanvas) {
      if (!circleScaler) {
        circleScaler = document.createElement('div');
        circleScaler.className = 'kb-circles-scaler';
        circleCanvas.parentNode.insertBefore(circleScaler, circleCanvas);
        circleScaler.appendChild(circleCanvas);
      }

      const wrapWidth = circleWrap.clientWidth || (window.innerWidth - 32);
      const availWidth = Math.min(wrapWidth, window.innerWidth - 32);

      if (availWidth > 0) {
        // Base canvas width is 480px, allow scaling down to 0.38 for small mobile screens
        const scale = Math.min(1, Math.max(0.38, availWidth / 480));
        const targetW = Math.round(480 * scale);
        const targetH = Math.round(430 * scale);

        circleScaler.style.width = targetW + 'px';
        circleScaler.style.height = targetH + 'px';
        circleCanvas.style.transform = `scale(${scale})`;
        circleCanvas.style.transformOrigin = 'top left';
      }
    }

    // 2. Families Constellation Circles Canvas (base dimensions: 440px width x 380px height)
    const famWrap = document.querySelector('.kb-families-canvas-wrap');
    let famScaler = document.querySelector('.kb-families-scaler');
    const famCanvas = document.querySelector('.kb-families-canvas');

    if (famWrap && famCanvas) {
      if (!famScaler) {
        famScaler = document.createElement('div');
        famScaler.className = 'kb-families-scaler';
        famCanvas.parentNode.insertBefore(famScaler, famCanvas);
        famScaler.appendChild(famCanvas);
      }

      const wrapWidth = famWrap.clientWidth || (window.innerWidth - 32);
      const availWidth = Math.min(wrapWidth, window.innerWidth - 32);

      if (availWidth > 0) {
        // Base canvas width is 440px, allow scaling down to 0.38
        const scale = Math.min(1, Math.max(0.38, availWidth / 440));
        const targetW = Math.round(440 * scale);
        const targetH = Math.round(380 * scale);

        famScaler.style.width = targetW + 'px';
        famScaler.style.height = targetH + 'px';
        famCanvas.style.transform = `scale(${scale})`;
        famCanvas.style.transformOrigin = 'top left';
      }
    }
  }

  /**
   * Setup IntersectionObserver for smooth on-scroll animations
   */
  function setupObservers() {
    // Initial sizing
    fitCanvasScales();

    const counterElements = document.querySelectorAll('[data-kb-counter]');
    const barElements = document.querySelectorAll('[data-bar-target]');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target.hasAttribute('data-kb-counter')) {
              animateCounter(entry.target);
            }
            if (entry.target.hasAttribute('data-bar-target')) {
              animateBar(entry.target);
            }

            // Animate child counter/bar elements
            entry.target.querySelectorAll?.('[data-kb-counter]').forEach(animateCounter);
            entry.target.querySelectorAll?.('[data-bar-target]').forEach(animateBar);

            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
      });

      counterElements.forEach(el => observer.observe(el));
      barElements.forEach(el => observer.observe(el));

      document.querySelectorAll('.kb-impact-section, .kb-team-families-section, .kb-matric-chart-section').forEach(sec => {
        observer.observe(sec);
      });
    } else {
      counterElements.forEach(animateCounter);
      barElements.forEach(animateBar);
    }
  }

  // Window resize & orientation change listeners
  window.addEventListener('resize', fitCanvasScales, { passive: true });
  window.addEventListener('orientationchange', fitCanvasScales);

  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(() => fitCanvasScales());
    const wrap1 = document.querySelector('.kb-infographic-wrap');
    const wrap2 = document.querySelector('.kb-families-canvas-wrap');
    if (wrap1) ro.observe(wrap1);
    if (wrap2) ro.observe(wrap2);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupObservers);
  } else {
    setupObservers();
  }
})();
