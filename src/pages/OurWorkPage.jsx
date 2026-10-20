import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function OurWorkPage() {
  useScrollReveal();

  // Animate each showcase metric when it enters the viewport.
  useEffect(() => {
    const counterElements = document.querySelectorAll('[data-showcase-counter]');
    if (!counterElements.length) return;

    const setCounterValue = (el) => {
      const valSpan = el.querySelector('[data-showcase-value]');
      const target = Number(el.dataset.showcaseCounter);
      if (valSpan && Number.isFinite(target)) valSpan.textContent = target.toLocaleString('en-US');
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      counterElements.forEach(setCounterValue);
      return;
    }

    const animateCounter = (el) => {
      if (el.dataset.showcaseAnimated === 'true') return;
      el.dataset.showcaseAnimated = 'true';
      const valSpan = el.querySelector('[data-showcase-value]');
      const target = Number(el.dataset.showcaseCounter);
      if (!valSpan || !Number.isFinite(target)) return;

      const start = performance.now();
      const duration = 1600;
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        valSpan.textContent = Math.round(target * eased).toLocaleString('en-US');
        if (progress < 1) requestAnimationFrame(tick);
        else valSpan.textContent = target.toLocaleString('en-US');
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    counterElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="work-page-main">
      <section className="unified-hero" aria-labelledby="work-hero-title">
        <div className="unified-hero-container">
          <div className="unified-hero-grid">
            <div className="unified-hero-copy">
              <h1 id="work-hero-title" className="unified-hero-title">Learning, skills and real pathways.</h1>
              <p className="unified-hero-lead">
                From early childhood education to our adopted public school and entrepreneurship academy, we open sustainable pathways for children, youth, and families across Lyari.
              </p>
              <div className="unified-hero-actions">
                <a className="button gold" href="#detailed-showcase">
                  Explore All Programs <span aria-hidden="true">&#8595;</span>
                </a>
                <Link className="unified-hero-link" to="/contact">
                  Partner With Us <span aria-hidden="true">&#8599;</span>
                </Link>
              </div>
            </div>
            <figure className="unified-hero-visual">
              <img
                src="/assets/images/programs/work-classroom-seminar.webp"
                alt="Students attending a classroom seminar at HOL Foundation"
                width="1450"
                height="1085"
                fetchPriority="high"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="detailed-programs-showcase" id="detailed-showcase" aria-labelledby="showcase-heading">
        <div className="programs-showcase-container">
          <header className="showcase-header">
            <span className="showcase-kicker">Impact Interventions</span>
            <h2 id="showcase-heading" className="showcase-title">Detailed Programs Showcase</h2>
            <div className="showcase-divider" aria-hidden="true" />
          </header>

          <div className="showcase-stack">
            {/* Program 1: HOL KB Campus */}
            <article className="showcase-card" id="kb-campus">
              <div className="showcase-card-grid">
                <div className="showcase-col-image-left">
                  <Link to="/programs/hol-kb-campus" className="showcase-image-frame" aria-label="HOL KB Campus: GBSS Kara Bhai Karim Jee">
                    <img
                      src="/assets/images/programs/our-work-kb-assembly.webp"
                      alt="HOL KB Campus students gathered for a school assembly beneath colorful bunting"
                      loading="lazy"
                      decoding="async"
                    />
                  </Link>
                </div>

                <div className="showcase-col-content-right">
                  <div className="showcase-content">
                    <h3 className="showcase-card-title">
                      <Link to="/programs/hol-kb-campus" className="showcase-title-link">
                        HOL KB Campus: GBSS Kara Bhai Karim Jee
                      </Link>
                    </h3>
                    <p className="showcase-card-desc">
                      Under the public-private partnership framework, HOL Foundation adopted GBSS Kara Bhai Karim Jee. We engineered a complete institutional turnaround for 700 public school students: constructing an inDrive Ramadhan mini football turf, installing a 16 KVA rooftop solar system with industrial battery bank, deploying a Saaf Pani commercial RO filtration plant, equipping modern IT and science labs, and establishing biometric monitoring and an EPI vaccination room.
                    </p>

                    <div className="showcase-metrics-bar">
                      <div className="showcase-metric-item">
                        <span className="showcase-metric-num" data-showcase-counter="700">
                          <span data-showcase-value>0</span>
                        </span>
                        <span className="showcase-metric-label">Children Receiving Free Education</span>
                      </div>
                      <div className="showcase-metric-item">
                        <span className="showcase-metric-num" data-showcase-counter="100">
                          <span data-showcase-value>0</span>%
                        </span>
                        <span className="showcase-metric-label">Free Education</span>
                      </div>
                      <div className="showcase-metric-item">
                        <span className="showcase-metric-num" data-showcase-counter="500">
                          <span data-showcase-value>0</span>
                        </span>
                        <span className="showcase-metric-label">Students Enrolled in Evening Clubs</span>
                      </div>
                    </div>

                    <div className="showcase-actions">
                      <Link to="/programs/hol-kb-campus" className="btn-dark-action">
                        <svg className="btn-icon-left" viewBox="0 0 24 24" fill="none" stroke="#59C438" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                        <span>Explore Campus Details</span>
                        <svg className="btn-icon-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </Link>
                      <Link to="/donate" className="btn-sponsor">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span>Sponsor This Program</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Program 2: Lyari Entrepreneur Academy */}
            <article className="showcase-card" id="lyari-entrepreneur-academy">
              <div className="showcase-card-grid">
                <div className="showcase-col-content-left">
                  <div className="showcase-content">
                    <h3 className="showcase-card-title">
                      <Link to="/programs/lyari-entrepreneur-academy" className="showcase-title-link">
                        Lyari Entrepreneur Academy
                      </Link>
                    </h3>
                    <p className="showcase-card-desc">
                      Lyari Entrepreneur Academy (LEA) is the premier youth mobility hub in Lyari. We offer 100% free certified courses in Full-Stack Web Development, Digital Marketing, Cisco Networking, Graphic Design, and Video Editing. Beyond code, LEA has incubated 40 funded seed-money startups, runs an annual CEO Camp bringing 40 MNC leaders into Lyari, and operates a dedicated Vocational Stitching &amp; Abaya Designing wing for single mothers.
                    </p>

                    <div className="showcase-metrics-bar">
                      <div className="showcase-metric-item">
                        <span className="showcase-metric-num" data-showcase-counter="5000">
                          <span data-showcase-value>0</span>+
                        </span>
                        <span className="showcase-metric-label">Youth Benefited</span>
                      </div>
                      <div className="showcase-metric-item">
                        <span className="showcase-metric-num" data-showcase-counter="150">
                          <span data-showcase-value>0</span>+
                        </span>
                        <span className="showcase-metric-label">Funded Seed Startups</span>
                      </div>
                      <div className="showcase-metric-item">
                        <span className="showcase-metric-num" data-showcase-counter="50">
                          <span data-showcase-value>0</span>+
                        </span>
                        <span className="showcase-metric-label">Corporate Placements</span>
                      </div>
                    </div>

                    <div className="showcase-actions">
                      <Link to="/programs/lyari-entrepreneur-academy" className="btn-dark-action">
                        <svg className="btn-icon-left" viewBox="0 0 24 24" fill="none" stroke="#59C438" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                        <span>Explore Academy Details</span>
                        <svg className="btn-icon-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </Link>
                      <Link to="/donate" className="btn-sponsor">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span>Sponsor This Program</span>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="showcase-col-image-right">
                  <Link to="/programs/lyari-entrepreneur-academy" className="showcase-image-frame" aria-label="Lyari Entrepreneur Academy">
                    <img
                      src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/lyari_entrepneur_acedemy.png?v=1790947568"
                      alt="Lyari Entrepreneur Academy students and learning hub in Lyari"
                      loading="lazy"
                      decoding="async"
                    />
                  </Link>
                </div>
              </div>
            </article>

            {/* Program 3: School Preparatory Program */}
            <article className="showcase-card" id="school-preparatory-program">
              <div className="showcase-card-grid">
                <div className="showcase-col-image-left">
                  <Link to="/programs/school-preparatory-program" className="showcase-image-frame" aria-label="School Preparatory Program">
                    <img
                      src="/assets/images/programs/our-work-school-preparatory-family.webp"
                      alt="Children and educators from the School Preparatory Program standing together outside"
                      loading="lazy"
                      decoding="async"
                    />
                  </Link>
                </div>

                <div className="showcase-col-content-right">
                  <div className="showcase-content">
                    <h3 className="showcase-card-title">
                      <Link to="/programs/school-preparatory-program" className="showcase-title-link">
                        School Preparatory Program
                      </Link>
                    </h3>
                    <p className="showcase-card-desc">
                      Initiated in 2014, the School Preparatory Program targets out-of-school children in Lyari—particularly from vulnerable coastal and fisherman communities. Through accelerated remedial modules in Urdu, English phonics, and mental arithmetic, children catch up on lost academic years within 12 to 18 months, securing direct admissions and ongoing sponsorships at formal partner institutions like DCTO and Pingus School.
                    </p>

                    <div className="showcase-metrics-bar">
                      <div className="showcase-metric-item">
                        <span className="showcase-metric-num" data-showcase-counter="300">
                          <span data-showcase-value>0</span>+
                        </span>
                        <span className="showcase-metric-label">Enrolled Now</span>
                      </div>
                      <div className="showcase-metric-item">
                        <span className="showcase-metric-num" data-showcase-counter="500">
                          <span data-showcase-value>0</span>+
                        </span>
                        <span className="showcase-metric-label">Joined Formal School</span>
                      </div>
                      <div className="showcase-metric-item">
                        <span className="showcase-metric-num" data-showcase-counter="40">
                          <span data-showcase-value>0</span>+
                        </span>
                        <span className="showcase-metric-label">Ladies Enrolled</span>
                      </div>
                    </div>

                    <div className="showcase-actions">
                      <Link to="/programs/school-preparatory-program" className="btn-dark-action">
                        <svg className="btn-icon-left" viewBox="0 0 24 24" fill="none" stroke="#59C438" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                        <span>Explore Program Details</span>
                        <svg className="btn-icon-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </Link>
                      <Link to="/donate" className="btn-sponsor">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span>Sponsor This Program</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Program 4: HOL Preschool */}
            <article className="showcase-card" id="preschool">
              <div className="showcase-card-grid">
                <div className="showcase-col-content-left">
                  <div className="showcase-content">
                    <h3 className="showcase-card-title">
                      <Link to="/programs/hol-preschool" className="showcase-title-link">
                        HOL Preschool (Kiran Satellite Model)
                      </Link>
                    </h3>
                    <p className="showcase-card-desc">
                      Operating under the pioneering Kiran Satellite Model, HOL Preschool represents the culmination of Co-Founder Areeba Hunain’s 8-year mentorship with Maa Sabina Khatri. Providing holistic care to 150 young children, the sanctuary includes daily warm nutritious breakfast, play-based sensory development, health check-ups, and mandatory weekly mother emotional well-being circles.
                    </p>

                    <div className="showcase-metrics-bar">
                      <div className="showcase-metric-item">
                        <span className="showcase-metric-num" data-showcase-counter="150">
                          <span data-showcase-value>0</span>
                        </span>
                        <span className="showcase-metric-label">Children</span>
                      </div>
                      <div className="showcase-metric-item">
                        <span className="showcase-metric-num" data-showcase-counter="128">
                          <span data-showcase-value>0</span>
                        </span>
                        <span className="showcase-metric-label">Mothers</span>
                      </div>
                      <div className="showcase-metric-item">
                        <span className="showcase-metric-num">Fully</span>
                        <span className="showcase-metric-label">Supported by Kiran Foundation</span>
                      </div>
                    </div>

                    <div className="showcase-actions">
                      <Link to="/programs/hol-preschool" className="btn-dark-action">
                        <svg className="btn-icon-left" viewBox="0 0 24 24" fill="none" stroke="#59C438" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                        <span>View HOL Preschool</span>
                        <svg className="btn-icon-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </Link>
                      <Link to="/donate" className="btn-sponsor">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span>Sponsor This Program</span>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="showcase-col-image-right">
                  <Link to="/programs/hol-preschool" className="showcase-image-frame" aria-label="HOL Preschool (Kiran Satellite Model)">
                    <img
                      src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/kiran_sattelaite_model.png?v=1790947562"
                      alt="HOL Preschool Kiran Satellite Model classroom and students"
                      loading="lazy"
                      decoding="async"
                    />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
