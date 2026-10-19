import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Scroll to top on route change or to hash target
  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const targetEl = document.querySelector(hash);
        if (targetEl) {
          if (window.__lenis) {
            window.__lenis.scrollTo(targetEl, { offset: -80 });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 80);
      return () => clearTimeout(timer);
    } else {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, hash]);

  // Show floating button when scrolled down > 360px
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 360);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: reducedMotion });
    } else {
      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <button
      type="button"
      className={`scroll-to-top ${isVisible ? 'is-visible' : ''}`}
      aria-label="Scroll to top"
      title="Back to top"
      onClick={handleScrollToTop}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  );
}

