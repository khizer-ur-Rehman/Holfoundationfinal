import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function SchoolPreparatoryPage() {
  useScrollReveal();

  return (
    <main className="spp-page">

    {/*  ========================================================================
         Consistent Master Hero Section (Matching website theme)
         ========================================================================  */}
    <section className="unified-hero" aria-labelledby="spp-hero-title">
      <div className="unified-hero-container">
        <div className="unified-hero-grid">
          <div className="unified-hero-copy">
            <Link className="unified-hero-back" to="/our-work">&#8592; &nbsp; Back to Our Work</Link>
            <h1 id="spp-hero-title" className="unified-hero-title">School Preparatory Program.</h1>
            <p className="unified-hero-lead">An accelerated foundation education initiative by HOL Foundation in Lyari, Karachi, supporting out-of-school children with fundamental learning, confidence, and mainstream school readiness.</p>
            <div className="unified-hero-actions">
              <Link className="button gold" to="/donate">Sponsor This Program <span aria-hidden="true">&#8599;</span></Link>
              <a className="unified-hero-link" href="#preparatory-narrative">Explore Program <span aria-hidden="true">&#8595;</span></a>
            </div>
          </div>
          <figure className="unified-hero-visual">
            <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/hol_preparetory_pogram_hero_section.jpg?v=1791553501"
                 alt="School Preparatory Program - HOL Foundation"
                 width="1672"
                 height="1115"
                 fetchPriority="high" />
          </figure>
        </div>
      </div>
    </section>

    {/*  ========================================================================
         MAIN PROGRAM CONTENT
         Image Rows, Editorial Narrative & Partner Recognition Badge
         ========================================================================  */}
    <section id="preparatory-narrative" className="spp-main-section" aria-label="School Preparatory Learning and Impact">
      <div className="spp-container">

        {/*  FIRST IMAGE ROW (3 IMAGES GRID)  */}
        <div className="spp-image-grid-3" role="region" aria-label="Classroom and practical life activities">
          {/*  Image 01  */}
          <figure className="spp-image-card">
            <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/image_1.jpg?v=1791553959"
                 alt="Child participating in learning activity peeling fruit into a bowl"
                 loading="lazy"
                 width="640"
                 height="480" />
          </figure>

          {/*  Image 02  */}
          <figure className="spp-image-card">
            <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/image_4.jpg?v=1791553996"
                 alt="Teacher explaining lesson with chart paper in classroom"
                 loading="lazy"
                 width="640"
                 height="480" />
          </figure>

          {/*  Image 03  */}
          <figure className="spp-image-card">
            <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/image_2.jpg?v=1791553972"
                 alt="Student proudly displaying handmade graduation achievement frame"
                 loading="lazy"
                 width="640"
                 height="480" />
          </figure>
        </div>

        {/*  EDITORIAL NARRATIVE SECTION  */}
        <div className="spp-narrative-block">
          <header className="spp-narrative-header">
            <h2 className="spp-narrative-title">Rebuilding Pathways into <span>Formal Education</span>.</h2>
          </header>
          <div className="spp-lead-paragraphs">
            <p>
              Since 2014, our HOL School Preparatory Program has been transforming the lives of out-of-school children in Lyari, especially those from the fisherman community who missed their early years of schooling due to financial hardships.
            </p>
            <p>
              Through interactive teaching, life-skills activities, and holistic development, we provide students with the confidence and curiosity they need to thrive. Our mission is not just to prepare children academically, but to empower them socially and emotionally so they are ready for mainstream schools and beyond.
            </p>
          </div>
        </div>

        {/*  SECOND IMAGE ROW (3 IMAGES GRID)  */}
        <div className="spp-image-grid-3" role="region" aria-label="School activities and creative work">
          {/*  Image 04  */}
          <figure className="spp-image-card">
            <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/image_3.jpg?v=1791553987"
                 alt="Children participating in school activity with Pakistan flag"
                 loading="lazy"
                 width="640"
                 height="480" />
          </figure>

          {/*  Image 05  */}
          <figure className="spp-image-card">
            <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/image_6...jpg?v=1791554059"
                 alt="Students learning inside classroom with miniature desktop flags"
                 loading="lazy"
                 width="640"
                 height="480" />
          </figure>

          {/*  Image 06  */}
          <figure className="spp-image-card">
            <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/iamge_5.jpg?v=1791554053"
                 alt="Group of children displaying creative schoolwork and artwork"
                 loading="lazy"
                 width="640"
                 height="480" />
          </figure>
        </div>

        {/*  PARTNER RECOGNITION BADGE  */}
        <div className="spp-partner-badge-wrapper" role="region" aria-label="Partner Support Recognition">
          <div className="spp-partner-badge">
            5 Classes Partially Supported by RCK Sunset Millennium
          </div>
        </div>

      </div>
    </section>

    {/*  ========================================================================
         SECTION 3: ACCELERATED BRIDGE FRAMEWORK (3 PHASES)
         ========================================================================  */}
    <section className="spp-bridge-section" aria-label="Accelerated Bridge Pathway">
      <div className="spp-container">
        
        <header className="spp-section-head">
          <span className="spp-section-kicker">3-Stage Remedial Pathway</span>
          <h2>The Accelerated Bridge: <span>From Streets to Mainstream Education</span></h2>
          <p>Our proven 12-to-18-month remedial bridge curriculum is purpose-built to help out-of-school children from Lyari&rsquo;s vulnerable fisherman community catch up on lost academic years, gain foundational dignity, and transition successfully into formal schools.</p>
        </header>

        <div className="spp-bridge-grid">
          {/*  Stage 1  */}
          <article className="spp-bridge-card">
            <span className="spp-stage-tag">Phase 01 &bull; 0 to 4 Months</span>
            <h3>Diagnostic Intake &amp; Literacy</h3>
            <p>Every child undergoes a diagnostic baseline assessment followed by intense immersion in Urdu alphabetic phonics, English letter sounds, and fundamental mental math, all within an emotionally supportive classroom sanctuary.</p>
            <ul className="spp-bridge-features">
              <li>Individualized learning diagnostic</li>
              <li>Urdu phonetics &amp; English sounds</li>
              <li>Basic counting &amp; numeric concepts</li>
              <li>Classroom socialization &amp; hygiene</li>
            </ul>
          </article>

          {/*  Stage 2  */}
          <article className="spp-bridge-card">
            <span className="spp-stage-tag">Phase 02 &bull; 5 to 12 Months</span>
            <h3>Accelerated Remedial Mastery</h3>
            <p>Students rapidly advance through condensed primary curricula in mathematics, bilingual comprehension, environmental science, and creative arts, using tactile teaching aids, chart work, and collaborative peer learning.</p>
            <ul className="spp-bridge-features">
              <li>Multi-digit arithmetic &amp; problem solving</li>
              <li>Guided bilingual reading &amp; handwriting</li>
              <li>Interactive charts &amp; life-skill tasks</li>
              <li>Confidence, debate &amp; public speaking</li>
            </ul>
          </article>

          {/*  Stage 3  */}
          <article className="spp-bridge-card">
            <span className="spp-stage-tag">Phase 03 &bull; 13 to 18 Months</span>
            <h3>Mainstream Placement &amp; Aid</h3>
            <p>Graduates are coached for formal school entrance tests, interviews, and social integration. Upon admission into partner formal schools, HOL Foundation maintains ongoing sponsorships covering uniforms, books, and tracking.</p>
            <ul className="spp-bridge-features">
              <li>Entrance test coaching &amp; mock exams</li>
              <li>Interview grooming &amp; family alignment</li>
              <li>Formal admission placement pipeline</li>
              <li>Continuing scholarship &amp; mentorship</li>
            </ul>
          </article>
        </div>

      </div>
    </section>

    {/*  ========================================================================
         SECTION 4: STRATEGIC ALLIANCES & INSTITUTIONAL PARTNERSHIPS
         ========================================================================  */}
    <section className="spp-partnerships-section" aria-label="Strategic Partnerships">
      <div className="spp-container">
        
        <header className="spp-section-head">
          <span className="spp-section-kicker">Unified Community Alliances</span>
          <h2>Strategic Partnerships <span>Powering Educational Equity</span></h2>
          <p>Lasting social impact in Lyari requires trusted partnerships. The School Preparatory Program is strengthened by long-standing institutional champions and cutting-edge educational collaborations.</p>
        </header>

        <div className="spp-partnerships-grid">
          {/*  Partner 1  */}
          <article className="spp-partner-card">
            <div className="spp-partner-icon" aria-hidden="true">&#127891;</div>
            <h3>RCK Sunset Millennium</h3>
            <p>A core philanthropic alliance supporting 5 full preparatory classrooms, underwriting educational supplies, dedicated teacher honorariums, and school nutrition packages for Lyari&rsquo;s most vulnerable youth.</p>
          </article>

          {/*  Partner 2  */}
          <article className="spp-partner-card">
            <div className="spp-partner-icon" aria-hidden="true">&#128218;</div>
            <h3>TAKMIL by JICA Alliance</h3>
            <p>Partnering in 2025 to scale non-formal education frameworks, integrating standardized accelerated curriculums, digitized lesson plans, and rigorous assessment toolkits developed alongside JICA teams.</p>
          </article>

          {/*  Partner 3  */}
          <article className="spp-partner-card">
            <div className="spp-partner-icon" aria-hidden="true">&#127979;</div>
            <h3>Mainstream Formal School Linkages</h3>
            <p>Direct placement pipelines into reputable formal institutions such as Kiran Foundation DCTO School, Pingu&rsquo;s English School Pakistan, and adopted government campuses, backed by continuing scholarships.</p>
          </article>
        </div>

      </div>
    </section>

    {/*  ========================================================================
         SECTION 5: IMPACT METRICS BAND
         ========================================================================  */}
    <section className="spp-metrics-section" aria-label="School Preparatory Impact Numbers">
      <div className="spp-container">
        <div className="spp-metrics-grid">
          <div className="spp-metric-card">
            <div className="spp-metric-number"><span>500</span>+</div>
            <p className="spp-metric-label">Out-of-School Children Successfully Mainstreamed</p>
          </div>
          <div className="spp-metric-card">
            <div className="spp-metric-number"><span>94</span>%</div>
            <p className="spp-metric-label">Retention Rate in Mainstream Formal Classrooms</p>
          </div>
          <div className="spp-metric-card">
            <div className="spp-metric-number"><span>12-18</span> Mo</div>
            <p className="spp-metric-label">Average Accelerated Bridge Duration to Readiness</p>
          </div>
          <div className="spp-metric-card">
            <div className="spp-metric-number"><span>100</span>%</div>
            <p className="spp-metric-label">Fully Sponsored Books, Uniforms, Kits &amp; Nutrition</p>
          </div>
        </div>
      </div>
    </section>

    {/*  ========================================================================
         SECTION 4: FOUNDER QUOTE ACCENT BANNER
         Vibrant green banner with Urdu quote, Hunain Abbas signature and subtitle
         ========================================================================  */}
    <section className="spp-founder-banner" aria-label="Founder Quote">
      <div className="spp-founder-inner">
        <blockquote className="spp-urdu-quote">
          &ldquo;ہمارا کام تب ختم ہوگا،<br />
          جب ہر بچے کے ہاتھ میں قلم ہوگا&rdquo;
        </blockquote>
        <div className="spp-founder-signature">Hunain Abbas</div>
        <div className="spp-founder-subtitles">
          <span className="spp-founder-role">FOUNDER</span>
          <span className="spp-founder-org">HOL FOUNDATION</span>
        </div>
      </div>
    </section>
  
    </main>
  );
}
