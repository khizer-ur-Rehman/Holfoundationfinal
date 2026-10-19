import React, { useState, useEffect, useRef } from 'react';

const slidesData = [
  {
    className: 'hero-slide-community',
    mobileSrc: '/assets/images/hero/mobile_banner_1_children_group.png',
    desktopSrc: '/assets/images/hero/hol%20hero%20bg.png',
    alt: 'Children smiling together during a community activity',
    title: 'Every child deserves space to discover.',
    subtitle: 'Welcoming early learning helps children build curiosity, friendships and confidence from the very start.',
  },
  {
    className: '',
    mobileSrc: '/assets/images/hero/mobile_banner_2_child_closeup.png',
    desktopSrc: '/assets/images/hero/hol-student-smile.png',
    alt: 'A smiling young student at a HOL learning program',
    title: 'A brighter future starts with learning.',
    subtitle: 'Every child deserves the chance to learn, grow and discover what’s possible.',
  },
  {
    className: 'hero-slide-campus',
    mobileSrc: '/assets/images/hero/mobile_banner_3_school_exterior.png',
    desktopSrc: '/assets/images/hero/ChatGPT%20Image%20Sep%2030,%202026,%2001_53_20%20PM.png',
    fallbackDesktopSrc: '/assets/images/hero/ChatGPT%20Image%20Sep%2030%2C%202026%2C%2001_53_20%20PM.png',
    alt: 'The entrance to GBSS KBKJ Campus in Lyari, adopted by HOL Foundation',
    title: 'A stronger school. A brighter future.',
    subtitle: 'At HOL KB Campus, students learn within a community committed to helping them move forward.',
  },
];

export function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const totalSlides = slidesData.length;

  const showSlide = (index) => {
    setActiveSlide((index + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 2000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, totalSlides]);

  return (
    <section className="hero hero-slider" aria-label="HOL Foundation highlights" aria-roledescription="carousel">
      {slidesData.map((slide, i) => {
        const isActive = i === activeSlide;
        return (
          <div
            key={i}
            className={`hero-slide ${slide.className} ${isActive ? 'is-active' : ''}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${totalSlides}`}
            aria-hidden={!isActive}
            inert={!isActive ? true : undefined}
          >
            <picture className="hero-photo-picture">
              <source media="(max-width: 768px)" srcSet={slide.mobileSrc} />
              <img
                className="hero-photo"
                src={slide.desktopSrc}
                alt={slide.alt}
                onError={(e) => {
                  if (slide.fallbackDesktopSrc && !e.currentTarget.dataset.fallbackTried) {
                    e.currentTarget.dataset.fallbackTried = 'true';
                    e.currentTarget.src = slide.fallbackDesktopSrc;
                  }
                }}
              />
            </picture>
            <div className="hero-overlay">
              <div className="container hero-inner">
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
              </div>
            </div>
          </div>
        );
      })}

      <div className="hero-controls" aria-label="Carousel navigation">
        <button
          type="button"
          className="hero-arrow hero-prev"
          aria-label="Previous slide"
          onClick={() => showSlide(activeSlide - 1)}
        >
          &#8592;
        </button>
        <div className="hero-dots">
          {slidesData.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`hero-dot ${i === activeSlide ? 'is-active' : ''}`}
              aria-label={`Show slide ${i + 1}`}
              aria-current={i === activeSlide ? 'true' : undefined}
              onClick={() => showSlide(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="hero-arrow hero-next"
          aria-label="Next slide"
          onClick={() => showSlide(activeSlide + 1)}
        >
          &#8594;
        </button>
        <button
          type="button"
          className="hero-pause"
          aria-label={isPaused ? 'Resume automatic slides' : 'Pause automatic slides'}
          onClick={() => setIsPaused((prev) => !prev)}
        >
          {isPaused ? 'Play' : 'Pause'}
        </button>
      </div>
    </section>
  );
}
