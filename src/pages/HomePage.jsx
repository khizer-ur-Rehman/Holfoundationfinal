import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeroSlider } from '../components/HeroSlider';
import { useScrollReveal } from '../hooks/useScrollReveal';

const striveData = {
  strength: {
    letter: 'S',
    title: 'Build on local strengths.',
    description: 'We grow local strengths into opportunity.',
  },
  tenacity: {
    letter: 'T',
    title: 'Tenacity in action.',
    description: 'We keep showing up and moving forward.',
  },
  respect: {
    letter: 'R',
    title: 'Respect for all.',
    description: 'We listen, include and learn together.',
  },
  integrity: {
    letter: 'I',
    title: 'Integrity in commitments.',
    description: 'We act honestly and honor commitments.',
  },
  vision: {
    letter: 'V',
    title: 'Vision for the future.',
    description: 'We make space for brighter possibilities.',
  },
  empathy: {
    letter: 'E',
    title: 'Empathy at heart.',
    description: 'We listen closely and respond with care.',
  },
};

export function HomePage() {
  useScrollReveal();
  const [activeStrive, setActiveStrive] = useState(null);

  const striveDetail = (activeStrive && striveData[activeStrive]) ? striveData[activeStrive] : striveData.strength;

  const getStriveGridColumns = () => {
    switch (activeStrive) {
      case 'strength':
        return 'minmax(0, 2.1fr) repeat(5, minmax(0, 1fr))';
      case 'tenacity':
        return 'minmax(0, 1fr) minmax(0, 2.1fr) repeat(4, minmax(0, 1fr))';
      case 'respect':
        return 'repeat(2, minmax(0, 1fr)) minmax(0, 2.1fr) repeat(3, minmax(0, 1fr))';
      case 'integrity':
        return 'repeat(3, minmax(0, 1fr)) minmax(0, 2.1fr) repeat(2, minmax(0, 1fr))';
      case 'vision':
        return 'repeat(4, minmax(0, 1fr)) minmax(0, 2.1fr) minmax(0, 1fr)';
      case 'empathy':
        return 'repeat(5, minmax(0, 1fr)) minmax(0, 2.1fr)';
      default:
        return 'repeat(6, minmax(0, 1fr))';
    }
  };

  return (
    <main className="home-page-main">
      <div className="home-donation-particles" aria-hidden="true">
        <span className="particle-heart">♥</span>
        <span className="particle-glint" />
        <span className="particle-heart particle-outline">♡</span>
        <span className="particle-glint" />
        <span className="particle-heart">♥</span>
        <span className="particle-glint" />
        <span className="particle-outline">✧</span>
        <span className="particle-glint" />
      </div>

      <HeroSlider />

      <section className="section about-story" aria-labelledby="about-story-title">
        <div className="container about-story-layout">
          <div className="about-story-visual">
            <figure className="about-photo-main">
              <img
                loading="lazy"
                src="/assets/images/about/Before%20Image.jpeg"
                alt="HOL KB Campus courtyard before adoption"
              />
              <div className="transform-badge badge-before">
                <span className="badge-icon" aria-hidden="true">⏳</span>
                <div className="badge-text">
                  <span className="badge-title">BEFORE ADOPTION</span>
                </div>
              </div>
            </figure>
            <figure className="about-photo-secondary">
              <img
                loading="lazy"
                src="/assets/images/about/After%20Image.jpeg"
                alt="Completed HOL KB Campus sports turf courtyard after adoption"
              />
              <div className="transform-badge badge-after">
                <span className="badge-icon" aria-hidden="true">✨</span>
                <div className="badge-text">
                  <span className="badge-title">AFTER ADOPTION</span>
                </div>
              </div>
            </figure>
          </div>

          <div className="about-story-copy">
            <h2 className="section-title" id="about-story-title">About HOL Foundation</h2>
            <p className="about-story-lead">
              HOL Foundation works with Lyari communities to make education, health, and opportunity more accessible, inclusive, and sustainable for everyone.
            </p>
            <p className="about-story-detail">
              We believe that lasting change begins with empowering people and creating opportunities close to home. Through our adopted government school and Lyari Entrepreneurship Academy, we support children, youth, and mothers with access to quality education, practical skills, mentorship, and pathways toward a brighter future.
            </p>
            <p className="about-story-detail">
              Our work focuses on building stronger communities by investing in learning, personal development, entrepreneurship, and well-being. Together with local communities and partners, we are working to create an environment where every individual has the confidence, knowledge, and opportunity to grow and thrive.
            </p>
          </div>
        </div>
      </section>

      <section className="section sdg-framework-section" aria-labelledby="sdg-framework-title">
        <div className="container sdg-framework-layout">
          <div className="sdg-framework-copy">
            <h2 className="section-title" id="sdg-framework-title">Aligned with UN Sustainable Development Goals</h2>
            <p className="sdg-framework-text">
              HOL Foundation directly embeds the United Nations 2030 Sustainable Development Goals into grass-roots programs across Lyari—turning global targets into everyday impact for children, youth, and families.
            </p>
          </div>
          <div className="sdg-framework-visual">
            <div className="sdg-framework-image-wrap">
              <img
                src="/assets/images/about/HOL_Foundation_SDG_Wheel_Corrected (1).png"
                alt="HOL Foundation Sustainable Goals Wheel"
                className="sdg-framework-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="our-purpose-section" aria-labelledby="our-purpose-title">
        <div className="our-purpose-container">
          <div className="our-purpose-frame">
            <header className="our-purpose-header">
              <h2 id="our-purpose-title" className="our-purpose-heading">Our Purpose</h2>
              <p className="our-purpose-subtitle">
                Guided by a clear vision and a focused mission, we work towards a brighter, more inclusive future for every child.
              </p>
            </header>

            <div className="our-purpose-grid">
              <article className="purpose-card purpose-card-vision">
                <div className="purpose-pill" aria-label="Our Vision">
                  <span className="purpose-pill-prefix">Our</span>
                  <span className="purpose-pill-title">Vision</span>
                </div>
                <span className="purpose-quote-mark quote-mark-left" aria-hidden="true">&ldquo;</span>
                <span className="purpose-quote-mark quote-mark-right" aria-hidden="true">&rdquo;</span>
                <p className="purpose-card-text">
                  A thriving, inclusive society where every child, regardless of background, has access to quality education, opportunities, and the support they need to reach their full potential.
                </p>
              </article>

              <article className="purpose-card purpose-card-mission">
                <div className="purpose-pill" aria-label="Our Mission">
                  <span className="purpose-pill-prefix">Our</span>
                  <span className="purpose-pill-title">Mission</span>
                </div>
                <span className="purpose-quote-mark quote-mark-left" aria-hidden="true">&ldquo;</span>
                <span className="purpose-quote-mark quote-mark-right" aria-hidden="true">&rdquo;</span>
                <p className="purpose-card-text">
                  To empower underprivileged children and communities through quality education, holistic development, and sustainable programs, creating pathways for a brighter and more equitable future.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section difference-section impact-overview-section" aria-labelledby="difference-title">
        <div className="container">
          <header className="impact-overview-heading">
            <div className="impact-overview-title">
              <h2 className="section-title" id="difference-title">Opportunity changes lives.</h2>
            </div>
            <div className="impact-overview-summary">
              <p>From classrooms to first jobs, our work supports people at each step toward a more secure future.</p>
              <span className="impact-since">
                <i aria-hidden="true" />
                <span>Community-led learning <strong>Lyari · Since 2014</strong></span>
              </span>
            </div>
          </header>

          <div className="impact-metrics-head">
            <span>Our work in numbers</span>
            <span className="impact-period">A community journey <i></i> 2014—2026</span>
          </div>

          <div className="difference-grid impact-metrics-grid">
            <article className="stat difference-metric impact-metric-card impact-tone-education">
              <span className="metric-index" aria-hidden="true">01</span>
              <span className="impact-metric-category">Public education</span>
              <span className="impact-metric-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="m3 9 9-5 9 5-9 5-9-5Z" />
                  <path d="M6 11v5c3.8 2.7 8.2 2.7 12 0v-5M21 9v6" />
                </svg>
              </span>
              <strong className="metric-count" data-counter="700" aria-label="700 plus students studying at our adopted government school">
                <span data-counter-value>700</span>
                <span className="metric-plus" aria-hidden="true">+</span>
              </strong>
              <p className="metric-caption">students studying at our adopted government school</p>
              <span className="impact-metric-rule" aria-hidden="true" />
            </article>

            <article className="stat difference-metric impact-metric-card impact-tone-careers">
              <span className="metric-index" aria-hidden="true">02</span>
              <span className="impact-metric-category">Career pathways</span>
              <span className="impact-metric-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="3.5" y="7" width="17" height="13" rx="2" />
                  <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3.5 12h17M10 12v2h4v-2" />
                </svg>
              </span>
              <strong className="metric-count" data-counter="50" aria-label="50 plus Lyari Entrepreneur Academy alumni in jobs">
                <span data-counter-value>50</span>
                <span className="metric-plus" aria-hidden="true">+</span>
              </strong>
              <p className="metric-caption">Lyari Entrepreneur Academy alumni in jobs</p>
              <span className="impact-metric-rule" aria-hidden="true" />
            </article>

            <article className="stat difference-metric impact-metric-card impact-tone-skills">
              <span className="metric-index" aria-hidden="true">03</span>
              <span className="impact-metric-category">Skills &amp; enterprise</span>
              <span className="impact-metric-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="9" cy="8" r="3" />
                  <path d="M3.5 19v-1.3A4.7 4.7 0 0 1 8.2 13h1.6a4.7 4.7 0 0 1 4.7 4.7V19M16 5.5a3 3 0 0 1 0 5.8M17 13h.8a3.7 3.7 0 0 1 3.7 3.7V19" />
                </svg>
              </span>
              <strong className="metric-count" data-counter="5000" aria-label="5,000 plus youth, single mothers, and students benefiting from LEE">
                <span data-counter-value>5,000</span>
                <span className="metric-plus" aria-hidden="true">+</span>
              </strong>
              <p className="metric-caption">youth, single mothers and students benefiting from LEE</p>
              <span className="impact-metric-rule" aria-hidden="true" />
            </article>

            <article className="stat difference-metric impact-metric-card impact-tone-access">
              <span className="metric-index" aria-hidden="true">04</span>
              <span className="impact-metric-category">School access</span>
              <span className="impact-metric-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 20V6.8A2.8 2.8 0 0 1 6.8 4H20v16H6.8A2.8 2.8 0 0 0 4 22" />
                  <path d="M8 8h8m-8 4h7m-7 4h4" />
                </svg>
              </span>
              <strong className="metric-count" data-counter="500" aria-label="500 plus out-of-school children admitted to school">
                <span data-counter-value>500</span>
                <span className="metric-plus" aria-hidden="true">+</span>
              </strong>
              <p className="metric-caption">out-of-school children admitted to school</p>
              <span className="impact-metric-rule" aria-hidden="true" />
            </article>
          </div>

          <div className="impact-metrics-footer">
            <span><i aria-hidden="true" />Every number represents a new possibility.</span>
            <Link to="/our-work">
              Explore how we work <b aria-hidden="true">&#8594;</b>
            </Link>
          </div>
        </div>
      </section>

      <section className="meet-founders-section bg-[#FEFEFC] border-b border-[#E4EBDD] py-12 sm:py-16 lg:py-20" aria-labelledby="meet-founders-title">
        <div className="meet-founders-container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-12">
          <div className="meet-founders-grid grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
            <div className="meet-founders-col meet-founders-left lg:col-span-3 order-2 lg:order-1 flex justify-center items-center w-full">
              <article className="founder-card group w-full max-w-[320px] mx-auto bg-[#ECEEE8] border border-[#E0E3DB] rounded-2xl p-5 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md flex flex-col items-center text-center">
                <figure className="founder-image-wrapper relative overflow-hidden rounded-xl aspect-[3/4] bg-[#dde2d8] mb-4 mx-auto w-full">
                  <img
                    src="/assets/images/about/hunain_abbas.webp"
                    alt="Hunain Abbas, Founder &amp; CEO of HOL Foundation"
                    className="founder-photo w-full h-full object-cover object-top mx-auto transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width="450"
                    height="600"
                  />
                </figure>
                <div className="founder-info flex flex-col items-center text-center w-full">
                  <h3 className="founder-name font-bold text-xl sm:text-2xl text-[#173667] tracking-tight mb-1 text-center w-full">Hunain Abbas</h3>
                  <p className="founder-designation font-medium text-sm sm:text-base text-[#555C66] m-0 text-center w-full">Founder &amp; CEO</p>
                  <span className="founder-accent-line block w-12 h-1 bg-[#59C438] rounded-full mt-3 mx-auto" aria-hidden="true" />
                </div>
              </article>
            </div>

            <div className="meet-founders-col meet-founders-center lg:col-span-6 order-1 lg:order-2 text-center lg:-translate-y-8 xl:-translate-y-12 flex flex-col items-center justify-center px-2 sm:px-4">
              <h2 id="meet-founders-title" className="founder-heading font-black text-[30px] sm:text-[40px] md:text-[48px] xl:text-[54px] tracking-tight uppercase text-[#173667] leading-tight mb-4 sm:mb-6 text-center">
                MEET OUR FOUNDER
              </h2>
              <p className="founder-description font-normal text-base sm:text-lg text-[#333333] leading-relaxed max-w-xl mx-auto text-center">
                Born and raised in Lyari, our two founders chose to leave behind the life they knew to dedicate themselves to the community that shaped them. Their journey is rooted in love for their people and a deep belief that every child deserves a chance to dream beyond their circumstances. Through accessible education, youth empowerment, and entrepreneurship, they are working to transform lives, restore hope, and build a future where the children, youth, and women of Lyari can shape their own destinies. For them, this is more than a mission; it is a promise to give back to the place they will always call home.
              </p>
            </div>

            <div className="meet-founders-col meet-founders-right lg:col-span-3 order-3 lg:order-3 flex justify-center items-center w-full">
              <article className="founder-card group w-full max-w-[320px] mx-auto bg-[#ECEEE8] border border-[#E0E3DB] rounded-2xl p-5 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md flex flex-col items-center text-center">
                <figure className="founder-image-wrapper relative overflow-hidden rounded-xl aspect-[3/4] bg-[#dde2d8] mb-4 mx-auto w-full">
                  <img
                    src="/assets/images/about/areeba_hunain.webp"
                    alt="Areeba Hunain, Co-Founder of HOL Foundation"
                    className="founder-photo w-full h-full object-cover object-top mx-auto transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width="450"
                    height="600"
                  />
                </figure>
                <div className="founder-info flex flex-col items-center text-center w-full">
                  <h3 className="founder-name font-bold text-xl sm:text-2xl text-[#173667] tracking-tight mb-1 text-center w-full">Areeba Hunain</h3>
                  <p className="founder-designation font-medium text-sm sm:text-base text-[#555C66] m-0 text-center w-full">Co-Founder</p>
                  <span className="founder-accent-line block w-12 h-1 bg-[#59C438] rounded-full mt-3 mx-auto" aria-hidden="true" />
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section home-stories-section" aria-labelledby="home-stories-title">
        <div className="container">
          <header className="section-header section-heading-row home-stories-heading">
            <div>
              <h2 className="section-title" id="home-stories-title">Turning potential into <em>progress.</em></h2>
            </div>
            <div className="home-stories-intro">
              <p>Learning, skills and opportunity for every stage of life.</p>
              <Link className="text-link" to="/our-work">
                Explore all programs <span aria-hidden="true">&#8594;</span>
              </Link>
            </div>
          </header>
          <div className="home-stories-grid">
            <Link className="home-story-card" to="/programs/school-preparatory-program">
              <span className="home-story-media">
                <img loading="lazy" decoding="async" src="/assets/images/programs/home-school-preparatory.webp" alt="Children and community members gathered outside for a school preparatory program visit" />
              </span>
              <span className="home-story-copy">
                <strong className="home-story-title">School Preparatory Program</strong>
                <span className="home-story-description">Bringing out-of-school children back to learning, with children transitioning into formal schools within two years.</span>
                <span className="home-story-action" aria-hidden="true">&#8599;</span>
              </span>
            </Link>
            <Link className="home-story-card" to="/programs/lyari-entrepreneur-academy">
              <span className="home-story-media">
                <img loading="lazy" decoding="async" src="/assets/images/programs/home-lyari-entrepreneur-academy.webp" alt="Lyari Entrepreneur Academy students taking part in a team-building activity" />
              </span>
              <span className="home-story-copy">
                <strong className="home-story-title">Lyari Entrepreneur Academy</strong>
                <span className="home-story-description">Lyari’s first entrepreneur academy, offering free IT and sports program to empower youth with skills and opportunities.</span>
                <span className="home-story-action" aria-hidden="true">&#8599;</span>
              </span>
            </Link>
            <Link className="home-story-card" to="/programs/hol-preschool">
              <span className="home-story-media">
                <img loading="lazy" decoding="async" src="/assets/images/programs/home-hol-preschool.webp" alt="A young child with family and an educator during a HOL preschool activity" />
              </span>
              <span className="home-story-copy">
                <strong className="home-story-title">HOL Preschool</strong>
                <span className="home-story-description">Replicating the Mother and Child model inspired by Sabina Khatri, nurturing children and empowering mothers through education.</span>
                <span className="home-story-action" aria-hidden="true">&#8599;</span>
              </span>
            </Link>
            <Link className="home-story-card" to="/programs/hol-kb-campus">
              <span className="home-story-media">
                <img loading="lazy" decoding="async" src="/assets/images/programs/home-hol-kb-campus.webp" alt="Students gathered outside HOL KB Campus: GBSS Kara Bhai Karim Jee" />
              </span>
              <span className="home-story-copy">
                <strong className="home-story-title">HOL KB Campus</strong>
                <span className="home-story-description">Transforming a neglected government school into a safe, happy learning space, providing free education to 700 children in Lyari.</span>
                <span className="home-story-action" aria-hidden="true">&#8599;</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section values-section strive-redesign" aria-labelledby="strive-title">
        <div className="container">
          <header className="values-heading values-heading-centered">
            <div>
              <h2 className="values-title" id="strive-title">We <span className="strive-highlight">S.T.R.I.V.E.</span></h2>
            </div>
            <p className="values-summary">Hover or select a value to see it in action.</p>
          </header>
          <div className="strive-experience">
            <ol
              className="strive-path"
              aria-label="Choose one of the six STRIVE values"
              style={{ '--strive-grid-columns': getStriveGridColumns() }}
              onMouseLeave={() => setActiveStrive(null)}
            >
              <li
                className={`value-stop value-strength ${activeStrive === 'strength' ? 'is-selected' : ''}`}
                onMouseEnter={() => setActiveStrive('strength')}
              >
                <button
                  className="value-select"
                  type="button"
                  aria-controls="strive-detail"
                  aria-pressed={activeStrive === 'strength'}
                  aria-label="Show Strength value details"
                  onClick={() => setActiveStrive(activeStrive === 'strength' ? null : 'strength')}
                  onFocus={() => setActiveStrive('strength')}
                  onBlur={() => setActiveStrive(null)}
                >
                  <span className="value-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M6 8v8M3.5 10v4M8 12h8m2-4v8m2.5-6v4" /></svg>
                  </span>
                  <span className="value-marker" aria-hidden="true">S</span>
                  <span className="value-copy">
                    <strong>Strength</strong>
                    <span className="value-card-description">We grow local strengths into opportunity.</span>
                  </span>
                </button>
              </li>

              <li
                className={`value-stop value-tenacity ${activeStrive === 'tenacity' ? 'is-selected' : ''}`}
                onMouseEnter={() => setActiveStrive('tenacity')}
              >
                <button
                  className="value-select"
                  type="button"
                  aria-controls="strive-detail"
                  aria-pressed={activeStrive === 'tenacity'}
                  aria-label="Show Tenacity value details"
                  onClick={() => setActiveStrive(activeStrive === 'tenacity' ? null : 'tenacity')}
                  onFocus={() => setActiveStrive('tenacity')}
                  onBlur={() => setActiveStrive(null)}
                >
                  <span className="value-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M7 4h10v3a5 5 0 0 1-10 0V4Zm0 2H4v2a4 4 0 0 0 4 4m9-6h3v2a4 4 0 0 1-4 4m-4 2v3m-4 2h8m-7-5h6v3H9z" /></svg>
                  </span>
                  <span className="value-marker" aria-hidden="true">T</span>
                  <span className="value-copy">
                    <strong>Tenacity</strong>
                    <span className="value-card-description">We keep showing up and moving forward.</span>
                  </span>
                </button>
              </li>

              <li
                className={`value-stop value-respect ${activeStrive === 'respect' ? 'is-selected' : ''}`}
                onMouseEnter={() => setActiveStrive('respect')}
              >
                <button
                  className="value-select"
                  type="button"
                  aria-controls="strive-detail"
                  aria-pressed={activeStrive === 'respect'}
                  aria-label="Show Respect value details"
                  onClick={() => setActiveStrive(activeStrive === 'respect' ? null : 'respect')}
                  onFocus={() => setActiveStrive('respect')}
                  onBlur={() => setActiveStrive(null)}
                >
                  <span className="value-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M9 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm6 1a2 2 0 1 0 0-4m-11 13v-2a5 5 0 0 1 10 0v2H4Zm13-6a4 4 0 0 1 3 4v2h-3" /></svg>
                  </span>
                  <span className="value-marker" aria-hidden="true">R</span>
                  <span className="value-copy">
                    <strong>Respect</strong>
                    <span className="value-card-description">We listen, include and learn together.</span>
                  </span>
                </button>
              </li>

              <li
                className={`value-stop value-integrity ${activeStrive === 'integrity' ? 'is-selected' : ''}`}
                onMouseEnter={() => setActiveStrive('integrity')}
              >
                <button
                  className="value-select"
                  type="button"
                  aria-controls="strive-detail"
                  aria-pressed={activeStrive === 'integrity'}
                  aria-label="Show Integrity value details"
                  onClick={() => setActiveStrive(activeStrive === 'integrity' ? null : 'integrity')}
                  onFocus={() => setActiveStrive('integrity')}
                  onBlur={() => setActiveStrive(null)}
                >
                  <span className="value-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></svg>
                  </span>
                  <span className="value-marker" aria-hidden="true">I</span>
                  <span className="value-copy">
                    <strong>Integrity</strong>
                    <span className="value-card-description">We act honestly and honor commitments.</span>
                  </span>
                </button>
              </li>

              <li
                className={`value-stop value-vision ${activeStrive === 'vision' ? 'is-selected' : ''}`}
                onMouseEnter={() => setActiveStrive('vision')}
              >
                <button
                  className="value-select"
                  type="button"
                  aria-controls="strive-detail"
                  aria-pressed={activeStrive === 'vision'}
                  aria-label="Show Vision value details"
                  onClick={() => setActiveStrive(activeStrive === 'vision' ? null : 'vision')}
                  onFocus={() => setActiveStrive('vision')}
                  onBlur={() => setActiveStrive(null)}
                >
                  <span className="value-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M12 3a7 7 0 0 0-4 12.7c.8.5 1.3 1.2 1.5 2.3h5c.2-1.1.7-1.8 1.5-2.3A7 7 0 0 0 12 3Z" /><path d="M9.5 21h5m-4.5-3h4m-2-11v4m-3-2 3 2 3-2" /></svg>
                  </span>
                  <span className="value-marker" aria-hidden="true">V</span>
                  <span className="value-copy">
                    <strong>Vision</strong>
                    <span className="value-card-description">We make space for brighter possibilities.</span>
                  </span>
                </button>
              </li>

              <li
                className={`value-stop value-empathy ${activeStrive === 'empathy' ? 'is-selected' : ''}`}
                onMouseEnter={() => setActiveStrive('empathy')}
              >
                <button
                  className="value-select"
                  type="button"
                  aria-controls="strive-detail"
                  aria-pressed={activeStrive === 'empathy'}
                  aria-label="Show Empathy value details"
                  onClick={() => setActiveStrive(activeStrive === 'empathy' ? null : 'empathy')}
                  onFocus={() => setActiveStrive('empathy')}
                  onBlur={() => setActiveStrive(null)}
                >
                  <span className="value-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M20.8 8.8c0 5.1-8.8 11-8.8 11s-8.8-5.9-8.8-11A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z" /></svg>
                  </span>
                  <span className="value-marker" aria-hidden="true">E</span>
                  <span className="value-copy">
                    <strong>Empathy</strong>
                    <span className="value-card-description">We listen closely and respond with care.</span>
                  </span>
                </button>
              </li>
            </ol>

            <article className="value-detail value-detail-live" id="strive-detail" aria-live="polite" aria-atomic="true">
              <span className="value-detail-letter" aria-hidden="true">{striveDetail.letter}</span>
              <div className="value-detail-copy">
                <h3>{striveDetail.title}</h3>
                <p>{striveDetail.description}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section partners-showcase" aria-labelledby="partners-title">
        <div className="container">
          <div className="partners-showcase-heading">
            <div>
              <h2 className="section-title" id="partners-title">Progress, built together.</h2>
            </div>
            <p>We work alongside committed partners to bring learning and opportunity closer to every family in Lyari.</p>
          </div>
          <div className="partner-slider" aria-label="HOL Foundation partners continuous slider">
            <div className="partner-slider-track">
              <ul className="partner-logo-group" aria-label="HOL Foundation partners">
                <li className="partner-logo-card"><img loading="lazy" src="/assets/images/partners/kiran-foundation.png" alt="Kiran Foundation" /></li>
                <li className="partner-logo-card"><img loading="lazy" src="/assets/images/partners/bano-kabil.png" alt="Bano Qabil" /></li>
                <li className="partner-logo-card"><img loading="lazy" src="/assets/images/partners/ke.png" alt="K-Electric" /></li>
                <li className="partner-logo-card"><img loading="lazy" src="/assets/images/partners/al-ikhlas.png" alt="Al-Ikhlas" /></li>
                <li className="partner-logo-card"><img loading="lazy" src="/assets/images/partners/rotaract.png" alt="Rotaract" /></li>
                <li className="partner-logo-card"><img loading="lazy" src="/assets/images/partners/rotary.png" alt="Rotary" /></li>
              </ul>
              <ul className="partner-logo-group" aria-hidden="true">
                <li className="partner-logo-card"><img loading="lazy" src="/assets/images/partners/kiran-foundation.png" alt="Kiran Foundation" /></li>
                <li className="partner-logo-card"><img loading="lazy" src="/assets/images/partners/bano-kabil.png" alt="Bano Qabil" /></li>
                <li className="partner-logo-card"><img loading="lazy" src="/assets/images/partners/ke.png" alt="K-Electric" /></li>
                <li className="partner-logo-card"><img loading="lazy" src="/assets/images/partners/al-ikhlas.png" alt="Al-Ikhlas" /></li>
                <li className="partner-logo-card"><img loading="lazy" src="/assets/images/partners/rotaract.png" alt="Rotaract" /></li>
                <li className="partner-logo-card"><img loading="lazy" src="/assets/images/partners/rotary.png" alt="Rotary" /></li>
              </ul>
            </div>
          </div>
          <div className="partners-showcase-footer">
            <span aria-hidden="true" /> Shared effort. Lasting impact.
          </div>
        </div>
      </section>
    </main>
  );
}
