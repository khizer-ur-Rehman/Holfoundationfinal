import React, { useState, useEffect, useRef } from 'react';

function AnimatedCounterValue({ target, suffix = '+' }) {
  const [value, setValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || hasAnimated) return;

    const startAnimation = () => {
      setHasAnimated(true);
      const start = performance.now();
      const duration = 1700;

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setValue(Math.round(target * eased));

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          setValue(target);
        }
      };

      requestAnimationFrame(tick);
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setValue(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <span ref={elementRef} className="stat-number">
      {value.toLocaleString('en-US')}{suffix}
    </span>
  );
}

export function ImpactCounters() {
  return (
    <section className="section difference-section" aria-labelledby="difference-title">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">Our Impact</p>
          <h2 id="difference-title" className="section-title">
            Ten years of sustained community impact in Lyari.
          </h2>
          <p className="section-lead">
            Every number represents a child in school, a youth with high-demand skills, or a family with greater economic resilience.
          </p>
        </div>

        <div className="difference-stats">
          <div className="stat" data-counter="1500">
            <AnimatedCounterValue target={1500} suffix="+" />
            <span className="stat-label">Students Educated</span>
            <p className="stat-desc">Through primary, preparatory, and government school programs.</p>
          </div>

          <div className="stat" data-counter="5">
            <AnimatedCounterValue target={5} suffix="+" />
            <span className="stat-label">Flagship Programs</span>
            <p className="stat-desc">Spanning early learning, schools, IT academies, and women empowerment.</p>
          </div>

          <div className="stat" data-counter="1">
            <AnimatedCounterValue target={1} suffix="" />
            <span className="stat-label">Adopted Government School</span>
            <p className="stat-desc">GBSS Kara Bhai Karim Jee completely revitalized into a modern learning campus.</p>
          </div>

          <div className="stat" data-counter="10">
            <AnimatedCounterValue target={10} suffix="+" />
            <span className="stat-label">Years of Community Trust</span>
            <p className="stat-desc">Founded in 2014 by local educators and changemakers in Lyari.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
