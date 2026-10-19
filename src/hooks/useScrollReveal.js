import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const elements = document.querySelectorAll(
      '.section-header, .values-heading, .strive-path, .value-stop, .stat, .program-card, .story-panel, .impact-story-copy, .impact-photo-main, .impact-photo-secondary, .founder-photo, .founder-copy, .info-card, .timeline-item, .cta-donate-copy, .about-story-visual, .about-story-copy, .work-reframe-header, .work-reframe-image, .work-reframe-content, .work-program-list li, .home-story-card, .journey-list, .journey-film, .journey-list li, .about-hero-copy, .about-hero-photo, .about-story-heading, .about-story-copy, .about-purpose-heading, .about-purpose-card, .about-initiatives-heading, .about-initiative-card, .about-founder-topline, .about-founder-copy, .about-founder-photo, .journey-hero-copy, .journey-hero-visual, .journey-section-heading, .journey-milestone, .journey-promise-copy'
    );

    if (!elements.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      elements.forEach((el) => {
        el.classList.add('reveal', 'is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => {
      el.classList.add('reveal');
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
}
