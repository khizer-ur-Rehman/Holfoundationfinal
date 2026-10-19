import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function HolPreschoolPage() {
  useScrollReveal();

  return (
    <main className="preschool-page">

    {/*  ========================================================================
         Consistent Master Hero Section (Matching website theme)
         ========================================================================  */}
    <section className="unified-hero" aria-labelledby="preschool-hero-title">
      <div className="unified-hero-container">
        <div className="unified-hero-grid">
          <div className="unified-hero-copy">
            <Link className="unified-hero-back" to="/our-work">&#8592; &nbsp; Back to Our Work</Link>
            <h1 id="preschool-hero-title" className="unified-hero-title">HOL Preschool.</h1>
            <p className="unified-hero-lead">A nurturing early childhood learning initiative in partnership with Kiran Foundation, bringing holistic education and emotional well-being to young children in Lyari.</p>
            <div className="unified-hero-actions">
              <Link className="button gold" to="/donate">Support HOL Preschool <span aria-hidden="true">&#8599;</span></Link>
              <a className="unified-hero-link" href="#preschool-story">Explore Story <span aria-hidden="true">&#8595;</span></a>
            </div>
          </div>
          <figure className="unified-hero-visual">
            <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/pre_school_banner.png?v=1791555398"
                 alt="HOL Preschool - Fully Supported by Kiran Foundation"
                 width="1672"
                 height="1115"
                 fetchPriority="high" />
          </figure>
        </div>
      </div>
    </section>

    {/*  ========================================================================
         SECTION 2: OVERLAPPING PARTNERSHIP BADGE & STORY SPREAD
         ========================================================================  */}
    <section id="preschool-story" className="ps-story-section" aria-label="Partnership and Foundation Story">
      <div className="ps-container">
        
        {/*  Overlapping Bright Green Partnership Badge  */}
        <div className="ps-badge-wrapper">
          <div className="ps-partner-badge">
            <span className="ps-badge-icon" aria-hidden="true">&#9733;</span>
            <span>Fully Supported by Kiran Foundation</span>
          </div>
        </div>

        <header className="ps-story-header">
          <h2 className="ps-story-title">A Journey of Mentorship &amp; <span>Holistic Education</span>.</h2>
        </header>

        {/*  Editorial Narrative Paragraphs  */}
        <div className="ps-lead-paragraphs">
          <p>
            The story is deeply rooted in inspiration, mentorship, and a dream to bring transformation to Lyari. For 8 years, Areeba Hunain (Co-Founder HOL Foundation) worked closely with Mama Sabina Khatri, the visionary founder of Kiran Foundation, and was lovingly nurtured under her wings. During this time, Areeba experienced firsthand how compassion, resilience, and holistic education could change not just children, but entire families and communities.
          </p>
          <p>
            Carrying forward this light, Areeba replicated the Kiran School Model in a government school—GBSS Kara Bhai Karim Jee in Lyari. Today, this program extended to 150 students which are being nurtured under the Kiran School System. All 150 students are proudly supported by Kiran Foundation.
          </p>
        </div>

      </div>
    </section>

    {/*  ========================================================================
         SECTION 3: 8-IMAGE FEATURE GALLERY GRID
         Desktop (md+): 4 columns x 2 rows grid
         Mobile (default): 2 columns x 4 rows grid
         ========================================================================  */}
    <section className="ps-gallery-section" aria-label="Feature Gallery and Campus Transformations">
      <div className="ps-container">
        
        <header className="ps-gallery-header">
          <h2 className="ps-gallery-title">HOL Preschool Campus Transformations</h2>
          <p className="ps-gallery-desc">8 pillars of holistic early childhood development at our Lyari campus.</p>
        </header>

        <div className="ps-gallery-grid" role="region" aria-label="Preschool Photo Gallery Grid">
          
          {/*  Card 01: Building Renovation and Paint  */}
          <article className="ps-gallery-card">
            <div className="ps-card-title-strip" title="01 Building Renovation and Paint">
              01 Building Renovation and Paint
            </div>
            <figure className="ps-card-photo">
              <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/1_2809a233-55c5-48e7-bc9c-d4354535525b.jpg?v=1791554776"
                   alt="01 Building Renovation and Paint"
                   loading="lazy"
                   width="600"
                   height="450" />
            </figure>
          </article>

          {/*  Card 02: Classroom Furniture & Uplifting  */}
          <article className="ps-gallery-card">
            <div className="ps-card-title-strip" title="02 Classroom Furniture &amp; Uplifting">
              02 Classroom Furniture &amp; Uplifting
            </div>
            <figure className="ps-card-photo">
              <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/2_57e056b8-8def-4e3e-9726-9f3b7d83eff5.jpg?v=1791554780"
                   alt="02 Classroom Furniture &amp; Uplifting"
                   loading="lazy"
                   width="600"
                   height="450" />
            </figure>
          </article>

          {/*  Card 03: Library & AV Room  */}
          <article className="ps-gallery-card">
            <div className="ps-card-title-strip" title="03 Library &amp; AV Room">
              03 Library &amp; AV Room
            </div>
            <figure className="ps-card-photo">
              <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/3_94cd9350-65d1-4723-99e7-135e69cdc1e7.jpg?v=1791554783"
                   alt="03 Library &amp; AV Room"
                   loading="lazy"
                   width="600"
                   height="450" />
            </figure>
          </article>

          {/*  Card 04: Mothers Empowerment  */}
          <article className="ps-gallery-card">
            <div className="ps-card-title-strip" title="04 Mothers Empowerment">
              04 Mothers Empowerment
            </div>
            <figure className="ps-card-photo">
              <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/4_7c7e76c9-1bf5-45dd-bbaf-385688053e80.jpg?v=1791554788"
                   alt="04 Mothers Empowerment"
                   loading="lazy"
                   width="600"
                   height="450" />
            </figure>
          </article>

          {/*  Card 05: Theme Based Learning  */}
          <article className="ps-gallery-card">
            <div className="ps-card-title-strip" title="05 Theme Based Learning">
              05 Theme Based Learning
            </div>
            <figure className="ps-card-photo">
              <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/5_8182cdba-cdda-4692-9cf5-413a4f71ac79.jpg?v=1791554791"
                   alt="05 Theme Based Learning"
                   loading="lazy"
                   width="600"
                   height="450" />
            </figure>
          </article>

          {/*  Card 06: Field Trips  */}
          <article className="ps-gallery-card">
            <div className="ps-card-title-strip" title="06 Field Trips">
              06 Field Trips
            </div>
            <figure className="ps-card-photo">
              <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/6_45fda10e-3037-4bc5-8273-08adf1b75a5d.jpg?v=1791554796"
                   alt="06 Field Trips"
                   loading="lazy"
                   width="600"
                   height="450" />
            </figure>
          </article>

          {/*  Card 07: Safe Playgrounds  */}
          <article className="ps-gallery-card">
            <div className="ps-card-title-strip" title="07 Safe Playgrounds">
              07 Safe Playgrounds
            </div>
            <figure className="ps-card-photo">
              <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/7_b044f216-db5d-4488-b06a-f99368e311ba.jpg?v=1791554800"
                   alt="07 Safe Playgrounds"
                   loading="lazy"
                   width="600"
                   height="450" />
            </figure>
          </article>

          {/*  Card 08: Birthday Celebrations  */}
          <article className="ps-gallery-card">
            <div className="ps-card-title-strip" title="08 Birthday Celebrations">
              08 Birthday Celebrations
            </div>
            <figure className="ps-card-photo">
              <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/88.jpg?v=1791554804"
                   alt="08 Birthday Celebrations"
                   loading="lazy"
                   width="600"
                   height="450" />
            </figure>
          </article>

        </div>

      </div>
    </section>

    {/*  ========================================================================
         SECTION 4: MINDFUL EARLY LEARNING & DAILY METHODOLOGY
         Theme Wrap, Mindful Mela, Daily Nutrition & Field Excursions
         ========================================================================  */}
    <section className="ps-framework-section" aria-label="Methodology and Daily Framework">
      <div className="ps-container">
        
        <header className="ps-section-head">
          <span className="ps-section-kicker">Kiran Satellite Pedagogy</span>
          <h2>Mindful Early Learning: <span>The Daily Rhythm &amp; Framework</span></h2>
          <p>Rooted in the compassionate philosophy of the Kiran School System, HOL Preschool blends cognitive readiness, emotional safety, creative expression, and daily nutrition into an enriching early childhood sanctuary.</p>
        </header>

        <div className="ps-framework-grid">
          {/*  Card 1: Theme Wrap Highlights  */}
          <article className="ps-framework-card">
            <div className="ps-card-icon" aria-hidden="true">&#127912;</div>
            <h3>Theme Wrap Units</h3>
            <p>Monthly immersive units—from &ldquo;All About Me&rdquo; to natural science and community life—integrating phonics, creative art, storytelling, and hands-on discovery.</p>
          </article>

          {/*  Card 2: Mindful Mela  */}
          <article className="ps-framework-card">
            <div className="ps-card-icon" aria-hidden="true">&#127960;</div>
            <h3>Mindful Mela System</h3>
            <p>Our Positive Behaviour Management System lets children earn &ldquo;Mindful Coins&rdquo; through kindness and empathy, shopping at community fairs to learn sharing and delayed gratification.</p>
          </article>

          {/*  Card 3: Daily Warm Nutrition  */}
          <article className="ps-framework-card">
            <div className="ps-card-icon" aria-hidden="true">&#127858;</div>
            <h3>Warm Nutrition &amp; Health</h3>
            <p>Every child starts their morning with a warm nutritious breakfast to combat early malnutrition, supported by routine growth monitoring, pediatric checkups, and hygiene routines.</p>
          </article>

          {/*  Card 4: Exploratory Excursions  */}
          <article className="ps-framework-card">
            <div className="ps-card-icon" aria-hidden="true">&#128652;</div>
            <h3>Discovery Field Trips</h3>
            <p>Guided exploratory excursions across Karachi’s botanical gardens, science centers, and seaside parks, expanding our young learners’ horizons far beyond neighborhood borders.</p>
          </article>
        </div>

      </div>
    </section>

    {/*  ========================================================================
         SECTION 5: MOTHERS EMPOWERMENT & MINDFUL CIRCLES
         Replicating the Core Mother-Child Loop of the Kiran System
         ========================================================================  */}
    <section className="ps-mother-section" aria-label="Mothers Empowerment Program">
      <div className="ps-container">
        <div className="ps-mother-grid">
          
          <div className="ps-mother-content">
            <span className="ps-section-kicker">Parental Partnership</span>
            <h2>Mothers as Partners: <span>Transforming the Home Learning Loop</span></h2>
            <p className="ps-mother-subtitle">Because sustainable change begins when a mother is honored, heard, and emotionally nurtured.</p>
            <p>At HOL Preschool, a child&rsquo;s educational path is inseparable from the well-being of the mother. Replicating the visionary Kiran School Model, we hold mandatory weekly emotional well-being circles, parenting workshops, and literacy engagement sessions that turn Lyari homes into nurturing sanctuaries of safety and inspiration.</p>
            
            <div className="ps-mother-pillars">
              <div className="ps-mother-pillar-item">
                <span className="ps-pillar-check" aria-hidden="true">&#10003;</span>
                <div>
                  <strong>Weekly Mindful Circles</strong>
                  <p>Confidential, empathetic spaces where mothers decompress emotional stress, receive gentle counseling, and build enduring peer support networks.</p>
                </div>
              </div>
              <div className="ps-mother-pillar-item">
                <span className="ps-pillar-check" aria-hidden="true">&#10003;</span>
                <div>
                  <strong>Positive Parenting &amp; Communication</strong>
                  <p>Guiding mothers in trauma-informed dialogue, positive reinforcement, and active involvement in their children’s early language milestones.</p>
                </div>
              </div>
              <div className="ps-mother-pillar-item">
                <span className="ps-pillar-check" aria-hidden="true">&#10003;</span>
                <div>
                  <strong>Life Skills &amp; Adult Literacy</strong>
                  <p>Empowering mothers with basic functional literacy, household financial management, health awareness, and vocational development pathways.</p>
                </div>
              </div>
            </div>
          </div>

          <figure className="ps-mother-media">
            <img src="/assets/images/programs/hol-preschool-classroom.jpg" 
                 alt="Mothers and young students participating in interactive learning circle at HOL Preschool" 
                 width="800" 
                 height="600" 
                 loading="lazy" />
          </figure>

        </div>
      </div>
    </section>

    {/*  ========================================================================
         SECTION 6: IMPACT METRICS BAND
         ========================================================================  */}
    <section className="ps-metrics-section" aria-label="Preschool Impact Numbers">
      <div className="ps-container">
        <div className="ps-metrics-grid">
          <div className="ps-metric-card">
            <div className="ps-metric-number"><span>150</span>+</div>
            <p className="ps-metric-label">Preschoolers Nurtured Under Kiran Satellite Model</p>
          </div>
          <div className="ps-metric-card">
            <div className="ps-metric-number"><span>100</span>%</div>
            <p className="ps-metric-label">Mother Attendance at Mindful Well-Being Circles</p>
          </div>
          <div className="ps-metric-card">
            <div className="ps-metric-number"><span>8</span>+ Yrs</div>
            <p className="ps-metric-label">Mentorship Legacy with Kiran Foundation Leadership</p>
          </div>
          <div className="ps-metric-card">
            <div className="ps-metric-number"><span>1:15</span></div>
            <p className="ps-metric-label">Educator-to-Child Ratio for Personalized Emotional Care</p>
          </div>
        </div>
      </div>
    </section>

    {/*  ========================================================================
         SECTION 4: FOUNDER QUOTE ACCENT BANNER
         Vibrant green banner with Urdu quote, Hunain Abbas signature and subtitle
         ========================================================================  */}
    <section className="ps-founder-banner" aria-label="Founder Quote">
      <div className="ps-founder-inner">
        <blockquote className="ps-urdu-quote">
          &ldquo;ہمارا کام تب ختم ہوگا،<br />
          جب ہر بچے کے ہاتھ میں قلم ہوگا&rdquo;
        </blockquote>
        <div className="ps-founder-signature">Hunain Abbas</div>
        <div className="ps-founder-subtitles">
          <span className="ps-founder-role">FOUNDER</span>
          <span className="ps-founder-org">HOL FOUNDATION</span>
        </div>
      </div>
    </section>
  
    </main>
  );
}
