/**
 * Meet Our Team (Board of Directors) Carousel Controller
 * Features:
 * - Multi-card responsive viewports:
 *   - Desktop (>= 1024px): 3 cards visible
 *   - Tablet (>= 640px): 2 cards visible
 *   - Mobile (< 640px): 1 card visible
 * - Continuous auto-sliding every 3 seconds (3000ms)
 * - Fluid cubic-bezier transition: cubic-bezier(0.25, 1, 0.5, 1)
 * - Seamless looping back to start / end
 * - Accurate pixel-based slide tracking (immune to flex-basis percentages)
 * - Navigation controls: Prev / Next circular arrows
 * - Touch-swipe gestures for smartphones & tablets
 * - Interactive pagination dots with active pill indicator
 * - Hover / tap biography flip on cards
 * - Auto-slide pause on hover, interaction, and background tab
 */

(function initTeamCarousel() {
  function setup() {
    const section = document.querySelector('[data-team-carousel]');
    if (!section) return;

    const track = section.querySelector('[data-team-track]');
    const slides = Array.from(section.querySelectorAll('[data-team-slide]'));
    const prevBtn = section.querySelector('[data-team-prev]');
    const nextBtn = section.querySelector('[data-team-next]');
    const dotsContainer = section.querySelector('[data-team-dots]');
    const cards = section.querySelectorAll('.team-photo-container');

    if (!track || slides.length === 0) return;

    const totalSlides = slides.length;
    let currentIndex = 0;
    let autoSlideTimer = null;
    let isInteracting = false;

    // Determine how many cards are visible simultaneously
    function getVisibleCardsCount() {
      const w = window.innerWidth;
      if (w >= 1024) return 3;
      if (w >= 640) return 2;
      return 1;
    }

    // Maximum index we can scroll to before reaching the end
    function getMaxIndex() {
      const visible = getVisibleCardsCount();
      return Math.max(0, totalSlides - visible);
    }

    // Measure exact pixel width of a single slide
    function getSlideWidth() {
      if (!slides[0]) return 0;
      return slides[0].getBoundingClientRect().width;
    }

    // Render pagination dots based on total scrollable pages
    function renderDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const visible = getVisibleCardsCount();
      const dotCount = Math.max(1, totalSlides - visible + 1);

      for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `team-dot ${i === currentIndex ? 'is-active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.setAttribute('data-dot-index', String(i));
        dot.addEventListener('click', () => {
          goToSlide(i);
          restartTimer();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateDots() {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('.team-dot');
      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('is-active');
        } else {
          dot.classList.remove('is-active');
        }
      });
    }

    function updateTrackPosition(immediate = false) {
      const slideWidth = getSlideWidth();
      const translateX = -(currentIndex * slideWidth);
      if (immediate) {
        track.style.transition = 'none';
      } else {
        track.style.transition = 'transform 700ms cubic-bezier(0.25, 1, 0.5, 1)';
      }
      track.style.transform = `translate3d(${translateX}px, 0, 0)`;
      updateDots();
    }

    function goToSlide(index, immediate = false) {
      const max = getMaxIndex();
      if (index > max) {
        currentIndex = 0; // Loop back to start
      } else if (index < 0) {
        currentIndex = max; // Loop to end
      } else {
        currentIndex = index;
      }
      updateTrackPosition(immediate);
    }

    function nextSlide() {
      const max = getMaxIndex();
      if (currentIndex >= max) {
        goToSlide(0);
      } else {
        goToSlide(currentIndex + 1);
      }
    }

    function prevSlide() {
      const max = getMaxIndex();
      if (currentIndex <= 0) {
        goToSlide(max);
      } else {
        goToSlide(currentIndex - 1);
      }
    }

    function startTimer() {
      stopTimer();
      if (!isInteracting) {
        autoSlideTimer = setInterval(() => {
          nextSlide();
        }, 3000);
      }
    }

    function stopTimer() {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
      }
    }

    function restartTimer() {
      stopTimer();
      startTimer();
    }

    // Arrow Button Handlers
    prevBtn?.addEventListener('click', () => {
      prevSlide();
      restartTimer();
    });

    nextBtn?.addEventListener('click', () => {
      nextSlide();
      restartTimer();
    });

    // Pause on Hover
    section.addEventListener('mouseenter', () => {
      isInteracting = true;
      stopTimer();
    });

    section.addEventListener('mouseleave', () => {
      isInteracting = false;
      startTimer();
    });

    // Touch Swipe Gesture Support
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let isSwiping = false;

    track.addEventListener('touchstart', (e) => {
      isInteracting = true;
      stopTimer();
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
      isSwiping = true;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      if (!isSwiping) return;
      isSwiping = false;
      touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      
      const swipeDistanceX = touchEndX - touchStartX;
      const swipeDistanceY = Math.abs(touchEndY - touchStartY);
      
      // Only process horizontal swipes, not vertical scrolling
      if (Math.abs(swipeDistanceX) > swipeDistanceY) {
        const minThreshold = 40; // minimum 40px to trigger
        if (swipeDistanceX < -minThreshold) {
          nextSlide();
        } else if (swipeDistanceX > minThreshold) {
          prevSlide();
        }
      }

      setTimeout(() => {
        isInteracting = false;
        startTimer();
      }, 1000);
    }, { passive: true });

    // Tap/Click to Toggle Biography on Mobile & Touch Devices
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const wasFlipped = card.classList.contains('is-flipped');
        cards.forEach(c => c.classList.remove('is-flipped'));
        if (!wasFlipped) {
          card.classList.add('is-flipped');
        }
      });
      // Keyboard accessible
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const wasFlipped = card.classList.contains('is-flipped');
          cards.forEach(c => c.classList.remove('is-flipped'));
          if (!wasFlipped) {
            card.classList.add('is-flipped');
          }
        }
      });
    });

    // Handle Window Resize with Debounce
    let resizeTimeout = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const max = getMaxIndex();
        if (currentIndex > max) currentIndex = max;
        renderDots();
        updateTrackPosition(true);
      }, 100);
    });

    // Visibility Change: stop timer when page is backgrounded
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopTimer();
      } else {
        startTimer();
      }
    });

    // Initial setup
    renderDots();
    updateTrackPosition(true);
    startTimer();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
