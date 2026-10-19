import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function HolKbCampusPage() {
  useScrollReveal();

  useEffect(() => {
    // Interactive counters and chart animations
    const counters = document.querySelectorAll('[data-kb-counter]');
    const animateCounters = () => {
      counters.forEach((el) => {
        const target = parseFloat(el.getAttribute('data-kb-counter'));
        if (isNaN(target)) return;
        const decimals = parseInt(el.getAttribute('data-kb-decimals') || '0', 10);
        const prefix = el.getAttribute('data-kb-prefix') || '';
        const suffix = el.getAttribute('data-kb-suffix') || '';
        const duration = 1600;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 4);
          const current = target * easeOut;
          el.textContent = prefix + (decimals > 0 ? current.toFixed(decimals) : Math.round(current).toLocaleString('en-US')) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = prefix + (decimals > 0 ? target.toFixed(decimals) : Math.round(target).toLocaleString('en-US')) + suffix;
        };
        requestAnimationFrame(tick);
      });
    };

    // Bars animation
    const bars = document.querySelectorAll('[data-bar-target]');
    const animateBars = () => {
      bars.forEach((b) => {
        const target = b.getAttribute('data-bar-target');
        if (target) b.style.height = target;
      });
    };

    const impactSection = document.querySelector('#campus-impact') || document.querySelector('#team-data');
    if (impactSection && 'IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          animateCounters();
          animateBars();
          obs.disconnect();
        }
      }, { threshold: 0.15 });
      obs.observe(impactSection);
      return () => obs.disconnect();
    } else {
      animateCounters();
      animateBars();
    }
  }, []);

  return (
    <main className="kb-detail-page">

    {/*  ========================================================================
         Consistent Master Hero Section (Matching website theme)
         ========================================================================  */}
    <section className="unified-hero" aria-labelledby="kb-hero-title">
      <div className="unified-hero-container">
        <div className="unified-hero-grid">
          <div className="unified-hero-copy">
            <Link className="unified-hero-back" to="/our-work">&#8592; &nbsp; Back to Our Work</Link>
            <h1 id="kb-hero-title" className="unified-hero-title">GBSS Kara Bhai Karim Jee.</h1>
            <p className="unified-hero-lead">An adopted government school turnaround by HOL Foundation in Lyari, Karachi — delivering free quality education, IT labs, robotics, sports, and holistic community empowerment for over 700 students.</p>
            <div className="unified-hero-actions">
              <Link className="button gold" to="/donate">Sponsor This Campus <span aria-hidden="true">&#8599;</span></Link>
              <a className="unified-hero-link" href="#campus-impact">Explore Impact <span aria-hidden="true">&#8595;</span></a>
            </div>
          </div>
          <figure className="unified-hero-visual">
            <img src="/kara-bhai-report/extracted-img-008.png"
                 
                 alt="GBSS Kara Bhai Karim Jee Students and Faculty Assembly"
                 width="1672"
                 height="1115"
                 fetchPriority="high" />
          </figure>
        </div>
      </div>
    </section>

    {/*  ========================================================================
         SECTION 2: SCHOOL IMPACT STATISTICS (STORY & CIRCULAR INFOGRAPHIC)
         ========================================================================  */}
    <section id="campus-impact" className="kb-impact-section" aria-label="School Transformation Story & Statistics">
      <div className="kb-impact-container">
        
        {/*  Left Column: Editorial Story Narrative  */}
        <div className="kb-editorial-copy">
          <h2 className="kb-section-title">A Beacon of Quality Education in <span className="highlight-green">Lyari</span>.</h2>
          <p className="kb-editorial-lead">In 2023, we adopted a once-abandoned Government School and transformed it into a safe, vibrant learning campus for children. Today, the school provides free education along with IT, English, and life skills training, creating strong foundations for both academic and personal growth. Our campus encourages sports, arts, and extracurricular activities so children can build confidence, discover their talents, and grow in a nurturing environment. We follow a mother-and-child school model, where a mother’s involvement is an important part of the learning journey, strengthening the support system around every child.</p>
          <div className="kb-editorial-actions">
            <Link className="button gold" to="/donate">Support Our Students <span aria-hidden="true">&#8599;</span></Link>
            <a className="unified-hero-link" href="#team-data">View Team &amp; Families Data <span aria-hidden="true">&#8595;</span></a>
          </div>
        </div>

        {/*  Right Column: Connected Overlapping Circular Infographic Canvas  */}
        <div className="kb-infographic-wrap">
          <div className="kb-circles-scaler">
            <div className="kb-circles-canvas" role="region" aria-label="Key Student &amp; Campus Statistics">
            
            {/*  1. Central Circle (Total Students: 590)  */}
            <div className="kb-circle-badge kb-badge-total-students">
              <span className="stat-num" data-kb-counter="590">0</span>
              <span className="stat-label">Students</span>
            </div>

            {/*  2. Top-Left Circle (Boys: 363)  */}
            <div className="kb-circle-badge kb-badge-boys">
              <span className="stat-num" data-kb-counter="363">0</span>
              <span className="stat-label">Boys</span>
            </div>

            {/*  3. Bottom-Left Circle (Girls: 227)  */}
            <div className="kb-circle-badge kb-badge-girls">
              <span className="stat-num" data-kb-counter="227">0</span>
              <span className="stat-label">Girls</span>
            </div>

            {/*  4. Top-Right Circle (Formal Education: 407)  */}
            <div className="kb-circle-badge kb-badge-formal">
              <span className="stat-num" data-kb-counter="407">0</span>
              <span className="stat-sub">Students</span>
              <span className="stat-label">Formal Education</span>
            </div>

            {/*  5. Bottom-Center Circle (Non-Formal Education: 183)  */}
            <div className="kb-circle-badge kb-badge-nonformal">
              <span className="stat-num" data-kb-counter="183">0</span>
              <span className="stat-sub">Students</span>
              <span className="stat-label">Non - Formal Education</span>
            </div>

            {/*  6. Right-Side Circle (Class Rooms: 13)  */}
            <div className="kb-circle-badge kb-badge-classrooms">
              <span className="stat-num" data-kb-counter="13">0</span>
              <span className="stat-label">Class Rooms</span>
            </div>

            </div>
          </div>
        </div>

      </div>
    </section>

    {/*  ========================================================================
         SECTION: FOOTBALL GROUND & SPORTS FACILITIES
         Expansive Campus Turf Visual & Student Athletic Achievements
         ========================================================================  */}
    <section id="football-ground" className="kb-expanded-section bg-subtle" aria-labelledby="heading-football-ground">
      <div className="kb-container">
        
        <figure className="kb-large-showcase-frame">
          <img src="/assets/images/programs/kb_football_ground_large.jpg" 
               alt="Panoramic view of the football turf ground and school building at GBSS Kara Bhai Karim Jee in Lyari" 
               width="1920" 
               height="1080" 
               loading="lazy" />
        </figure>

        <div className="kb-showcase-content-grid" style={{marginTop: "32px"}}>
          <div className="kb-feature-content">
            <h2 id="heading-football-ground" className="kb-feature-title">Football Ground</h2>
            <p className="kb-feature-text">One of our recent collaborations is with Indrive, who during Ramadhan 2025 launched a campaign where 10% from completing 4 rides was donated towards building sports facilities in government schools. HOL KB Campus was proud to be one of the three beneficiaries, giving our students access to better sports infrastructure and opportunities to grow.</p>
            <p className="kb-feature-text">Today, our students actively participate in football, karate, gymnastics, and boxing, and we are proud to share that one of our girls recently represented Pakistan at the South Asian Games, bringing home two bronze medals.</p>
            
            <div className="kb-sports-clean-specs">
              <strong>Active Sports:</strong> Football &bull; Karate &bull; Gymnastics &bull; Boxing
            </div>
          </div>

          <div className="kb-feature-aside">
            <div className="kb-achievement-callout" style={{marginTop: "0"}}>
              <div className="kb-achievement-icon" aria-hidden="true">&#127941;</div>
              <div className="kb-achievement-info">
                <h4>South Asian Games Representation</h4>
                <p>Proudly celebrating our female student athlete who represented Pakistan on the international stage, winning two bronze medals for the nation.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    {/*  ========================================================================
         SECTION: KIRAN SATELLITE PRESCHOOL
         Expansive Classroom Visual & HOL Preschool – Kiran Satellite Model
         ========================================================================  */}
    <section id="kiran-preschool" className="kb-expanded-section bg-white" aria-labelledby="heading-kiran-preschool">
      <div className="kb-container">
        
        <figure className="kb-large-showcase-frame">
          <img src="/assets/images/programs/kb_preschool_large.jpg" 
               alt="Kiran Satellite Preschool classroom at GBSS Kara Bhai Karim Jee in Lyari with children and teacher" 
               width="1920" 
               height="1080" 
               loading="lazy" />
        </figure>

        <div className="kb-showcase-content-grid" style={{marginTop: "32px"}}>
          <div className="kb-feature-content">
            <h2 id="heading-kiran-preschool" className="kb-feature-title">Kiran Satellite Preschool</h2>
            <h3 className="kb-facility-title" style={{color: "var(--kb-green)", marginTop: "-8px", marginBottom: "16px"}}>HOL Preschool – Kiran Satellite Model</h3>
            <p className="kb-feature-text">With the support of Kiran Foundation, HOL Preschool – Kiran Satellite Model is the replication of the Kiran School System, bringing the same values of love, care, and mindful learning to the children of Lyari.</p>
            <p className="kb-feature-text">Currently serving 90 students, the preschool offers a nurturing environment where children grow academically and emotionally. Through Theme Wrap Highlights, Mindful Mela, field trips, and mother engagement programs, learning goes beyond classrooms.</p>
          </div>

          <div className="kb-feature-aside">
            <div className="kb-preschool-highlights-grid" style={{marginTop: "0"}}>
              <div className="kb-highlight-box">
                <div className="title">&#127912; Theme Wrap Highlights</div>
                <p>Creative thematic learning synthesizing monthly discovery units.</p>
              </div>
              <div className="kb-highlight-box">
                <div className="title">&#127960; Mindful Mela</div>
                <p>Experiential community fairs fostering mindfulness &amp; empathy.</p>
              </div>
              <div className="kb-highlight-box">
                <div className="title">&#128652; Field Trips</div>
                <p>Guided exploratory excursions broadening children's horizons.</p>
              </div>
              <div className="kb-highlight-box">
                <div className="title">&#128105;&#8205;&#128103; Mother Engagement</div>
                <p>Active parental collaboration reinforcing the home learning loop.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    {/*  ========================================================================
         SECTION 3: STRENGTHENING OUR TEAM & QUALITY TEAM/FAMILIES DATA
         ========================================================================  */}
    <section id="team-operations" className="kb-expanded-section bg-subtle" aria-labelledby="heading-strengthening-team">
      <div className="kb-container">
        <div className="kb-team-operations-header">
          <h2 id="heading-strengthening-team" className="kb-feature-title">Strengthening Our Team</h2>
          <p className="kb-team-operations-lead">To ensure smooth functioning and quality delivery of our programs, HOL Foundation has built a strong operations and administration team. We have hired dedicated security guards, sweepers, a housekeeping supervisor, an accountant, a marketing team, ESL teachers, specialized preschool teachers, and sports teachers. This diverse team helps us maintain a safe, nurturing, and efficient learning environment for our students while ensuring sustainable growth of our initiatives.</p>
        </div>

        <figure className="kb-team-photo-showcase">
          <img src="/assets/images/programs/kb_operations_team.jpg" 
               alt="HOL Foundation operations, administration, security and teaching team at GBSS Kara Bhai Karim Jee in Lyari" 
               width="1280" 
               height="720" 
               loading="lazy" />
        </figure>

        <div className="kb-team-roles-grid" aria-label="Diverse Team Capabilities">
          <div className="kb-role-card">
            <div className="kb-role-icon-box" aria-hidden="true">&#128737;</div>
            <div className="kb-role-content">
              <h4>Dedicated Security Guards</h4>
              <p>Ensuring campus safety and secure, monitored premises around the clock.</p>
            </div>
          </div>
          <div className="kb-role-card">
            <div className="kb-role-icon-box" aria-hidden="true">&#129529;</div>
            <div className="kb-role-content">
              <h4>Sweepers &amp; Hygiene Crew</h4>
              <p>Maintaining hygienic, sanitized classrooms, corridors, and washrooms.</p>
            </div>
          </div>
          <div className="kb-role-card">
            <div className="kb-role-icon-box" aria-hidden="true">&#128221;</div>
            <div className="kb-role-content">
              <h4>Housekeeping Supervisor</h4>
              <p>Overseeing daily facility maintenance, sanitation, and operations workflows.</p>
            </div>
          </div>
          <div className="kb-role-card">
            <div className="kb-role-icon-box" aria-hidden="true">&#128200;</div>
            <div className="kb-role-content">
              <h4>Accountant</h4>
              <p>Managing financial transparency, payroll, budgeting, and audit reporting.</p>
            </div>
          </div>
          <div className="kb-role-card">
            <div className="kb-role-icon-box" aria-hidden="true">&#128226;</div>
            <div className="kb-role-content">
              <h4>Marketing Team</h4>
              <p>Communicating impact, community outreach, and donor engagement.</p>
            </div>
          </div>
          <div className="kb-role-card">
            <div className="kb-role-icon-box" aria-hidden="true">&#128218;</div>
            <div className="kb-role-content">
              <h4>ESL Teachers</h4>
              <p>Delivering high-quality English language proficiency instruction.</p>
            </div>
          </div>
          <div className="kb-role-card">
            <div className="kb-role-icon-box" aria-hidden="true">&#128118;</div>
            <div className="kb-role-content">
              <h4>Specialized Preschool Teachers</h4>
              <p>Early childhood educators trained in mindful learning methods.</p>
            </div>
          </div>
          <div className="kb-role-card">
            <div className="kb-role-icon-box" aria-hidden="true">&#127939;</div>
            <div className="kb-role-content">
              <h4>Sports Teachers</h4>
              <p>Coaching football, karate, boxing, and gymnastics disciplines.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/*  SECTION 3: STRENGTHENING SCHOOL THROUGH QUALITY TEAM & FAMILIES DATA  */}
    <section id="team-data" className="kb-team-families-section" aria-label="Quality Team &amp; Families Data">
      <div className="kb-team-families-grid">
        
        {/*  Column 1: Strengthening School Through Quality Team  */}
        <div className="kb-team-col">
          <h2 className="kb-col-heading">
            Strengthening School Through <span className="highlight-green">Quality Team</span>
          </h2>
          
          <div className="kb-team-stacks">
            
            {/*  Stack A: Government Staff  */}
            <div className="kb-vertical-stack">
              <div className="kb-stack-badge kb-stack-a-top">
                Government Staff
              </div>
              <div className="kb-stack-badge kb-stack-a-mid">
                <span className="num" data-kb-counter="16">0</span>
                <span className="lbl">Teaching Staff</span>
              </div>
              <div className="kb-stack-badge kb-stack-a-bot">
                <span className="num" data-kb-counter="2">0</span>
                <span className="lbl">Non - Teaching Staff</span>
              </div>
            </div>

            {/*  Stack B: Private Hired Staff  */}
            <div className="kb-vertical-stack">
              <div className="kb-stack-badge kb-stack-b-top">
                Private Hired Staff
              </div>
              <div className="kb-stack-badge kb-stack-b-mid">
                <span className="num" data-kb-counter="21">0</span>
                <span className="lbl">Teaching Staff</span>
              </div>
              <div className="kb-stack-badge kb-stack-b-bot">
                <span className="num" data-kb-counter="15">0</span>
                <span className="lbl">Non - Teaching Staff</span>
              </div>
            </div>

          </div>
        </div>

        {/*  Column 2: Families Data  */}
        <div className="kb-families-col">
          <h2 className="kb-col-heading">
            <span className="highlight-green">Families</span> Data
          </h2>
          
          <div className="kb-families-canvas-wrap">
            <div className="kb-families-scaler">
              <div className="kb-families-canvas" role="region" aria-label="Families Demographics &amp; Financial Eligibility">
              
              {/*  1. Main Primary (Total Families: 464)  */}
              <div className="kb-family-circle kb-fam-total">
                <span className="num" data-kb-counter="464">0</span>
                <span className="lbl">Families</span>
                <span className="sub">Total</span>
              </div>

              {/*  2. Top-Right (Zakat Eligible: 419)  */}
              <div className="kb-family-circle kb-fam-zakat">
                <span className="num" data-kb-counter="419">0</span>
                <span className="lbl">Families</span>
                <span className="sub">Zakat Eligible</span>
              </div>

              {/*  3. Far-Right (Syed: 21)  */}
              <div className="kb-family-circle kb-fam-syed">
                <span className="num" data-kb-counter="21">0</span>
                <span className="lbl">Families</span>
                <span className="sub">Syed</span>
              </div>

              {/*  4. Middle-Right (Non-Zakat: 10)  */}
              <div className="kb-family-circle kb-fam-nonzakat">
                <span className="num" data-kb-counter="10">0</span>
                <span className="lbl">Families</span>
                <span className="sub">Non - Zakat</span>
              </div>

              {/*  5. Bottom (Non Muslim: 14)  */}
              <div className="kb-family-circle kb-fam-nonmuslim">
                <span className="num" data-kb-counter="14">0</span>
                <span className="lbl">Families</span>
                <span className="sub">Non Muslim</span>
              </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>

    {/*  ========================================================================
         SECTION: EPI ROOM (EXPANDED PROGRAM ON IMMUNIZATION)
         Dedicated Healthcare & Community Immunization Center
         ========================================================================  */}
    <section id="epi-room" className="kb-epi-section" aria-labelledby="heading-epi-room">
      <div className="kb-container">
        <div className="kb-epi-grid">
          <figure className="kb-epi-media-frame">
            <img src="/assets/images/programs/kb_epi_room.jpg" 
                 alt="Healthcare physician and nurse providing pediatric vaccination care at the EPI Room in GBSS Kara Bhai Karim Jee" 
                 width="1280" 
                 height="720" 
                 loading="lazy" />
          </figure>

          <div className="kb-feature-content">
            <h2 id="heading-epi-room" className="kb-feature-title">EPI Room</h2>
            <p className="kb-feature-text">We have established an EPI (Expanded Program on Immunization) Room with the collaboration of Rotary Club of Karachi Sunset Millennium, for the community, providing access to essential vaccinations and healthcare services to ensure the well-being of children and families.</p>
            
            <div className="kb-epi-services-list">
              <div className="kb-epi-service-item">
                <span className="icon" aria-hidden="true">&#128137;</span>
                <div>
                  <strong>Essential Vaccinations</strong>
                  <p>Comprehensive pediatric immunization coverage protecting against preventable childhood illnesses.</p>
                </div>
              </div>
              <div className="kb-epi-service-item">
                <span className="icon" aria-hidden="true">&#128106;</span>
                <div>
                  <strong>Community Health Access</strong>
                  <p>Open healthcare services, growth monitoring, and preventive medical counseling for families in Lyari.</p>
                </div>
              </div>
              <div className="kb-epi-service-item">
                <span className="icon" aria-hidden="true">&#129309;</span>
                <div>
                  <strong>Rotary Club Collaboration</strong>
                  <p>Equipped in direct partnership with Rotary Club of Karachi Sunset Millennium for medical supplies.</p>
                </div>
              </div>
            </div>

            <div style={{marginTop: "26px"}}>
              <Link className="button gold" to="/donate">Support Campus Healthcare <span aria-hidden="true">&#8599;</span></Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/*  ========================================================================
         SECTION: CAMPUS FACILITIES & INFRASTRUCTURE
         Clean Layout: Multipurpose Room with Library, Biometric, IT Vocational,
         Water Motors & Filtration Plants, RO Plant, Surveillance, 16 KVA Solar
         ========================================================================  */}
    <section id="campus-facilities" className="kb-expanded-section bg-white" aria-labelledby="heading-campus-facilities">
      <div className="kb-container">
        
        <div className="kb-facilities-intro">
          <h2 id="heading-campus-facilities" className="kb-feature-title">Campus Facilities &amp; <span>Infrastructure</span></h2>
          <p className="kb-editorial-lead" style={{margin: "0 auto", maxWidth: "760px"}}>Transforming GBSS Kara Bhai Karim Jee with state-of-the-art community facilities, healthcare access, digital technology, safe drinking water, and round-the-clock campus security.</p>
        </div>

        <div className="kb-facilities-grid">

          {/*  1. Multipurpose Room with Library:  */}
          <article className="kb-facility-card featured-wide">
            <div>
              <div className="kb-facility-top">
                <div className="kb-facility-icon-wrap" aria-hidden="true">&#128218;</div>
              </div>
              <h3 className="kb-facility-title">Multipurpose Room with Library:</h3>
              <p className="kb-facility-desc">Our Multipurpose Room is a vibrant space at the heart of our campus, fostering growth, collaboration, and community engagement. We would Like to thank our Board member of HOL Foundation Ms. Sabina Khatri, who is the founder of Kiran Foundation to connect us with Rotary Club of Karachi Sunset Millennium. It houses a diverse library, hosts health department training sessions, mothers’ classes, and awareness workshops. With 10 computers available, it also facilitates digital access for faculty and students, promoting technological literacy</p>
            </div>
          </article>

          {/*  2. Biometric Machine  */}
          <article className="kb-facility-card">
            <div>
              <div className="kb-facility-top">
                <div className="kb-facility-icon-wrap" aria-hidden="true">&#128070;</div>
              </div>
              <h3 className="kb-facility-title">Biometric Machine</h3>
              <p className="kb-facility-desc">To streamline administrative processes and ensure efficient attendance tracking, we have implemented a biometric machine, facilitating accurate record-keeping of student and staff attendance.</p>
            </div>
          </article>

          {/*  3. IT Vocational Room  */}
          <article className="kb-facility-card">
            <div>
              <div className="kb-facility-top">
                <div className="kb-facility-icon-wrap" aria-hidden="true">&#128187;</div>
              </div>
              <h3 className="kb-facility-title">IT Vocational Room</h3>
              <p className="kb-facility-desc">Equipped with computers and internet connectivity, our IT Room offers opportunities for digital literacy training and access to online resources, empowering individuals with essential technology skills. The complete room was established by RCK Sunset Millennium.</p>
            </div>
          </article>

          {/*  4. Water Motors and Filtration Plants  */}
          <article className="kb-facility-card">
            <div>
              <div className="kb-facility-top">
                <div className="kb-facility-icon-wrap" aria-hidden="true">&#128167;</div>
              </div>
              <h3 className="kb-facility-title">Water Motors and Filtration Plants</h3>
              <p className="kb-facility-desc">Water motors and 3 filtration plants have been installed to provide clean and reliable water s]upply, promoting health and hygiene among students and community members. Thanks to Kiran Foundation for giving this gift to us.</p>
            </div>
          </article>

          {/*  5. RO Plant for Community  */}
          <article className="kb-facility-card">
            <div>
              <div className="kb-facility-top">
                <div className="kb-facility-icon-wrap" aria-hidden="true">&#127754;</div>
              </div>
              <h3 className="kb-facility-title">RO Plant for Community</h3>
              <p className="kb-facility-desc">In partnership with Saaf Pani Organization C/o Ms. Faiza Naeem, Board member of HOL Foundation, we have established an RO (Reverse Osmosis) plant to provide clean drinking water to the surrounding community, addressing a critical need for safe water access.</p>
            </div>
          </article>

          {/*  6. Surveillance Camera System  */}
          <article className="kb-facility-card">
            <div>
              <div className="kb-facility-top">
                <div className="kb-facility-icon-wrap" aria-hidden="true">&#128247;</div>
              </div>
              <h3 className="kb-facility-title">Surveillance Camera System</h3>
              <p className="kb-facility-desc">To enhance security and ensure the safety of students and staff, a surveillance camera system has been installed across the campus, enabling real-time monitoring and response to any security incidents.</p>
            </div>
          </article>

          {/*  7. 16 KVA Solar System  */}
          <article className="kb-facility-card">
            <div>
              <div className="kb-facility-top">
                <div className="kb-facility-icon-wrap" aria-hidden="true">&#9728;&#65039;</div>
              </div>
              <h3 className="kb-facility-title">16 KVA Solar System</h3>
              <p className="kb-facility-desc">In partnership with Saaf Pani Organization C/o Ms. Faiza Naeem, Board member of HOL Foundation, we have established an RO (Reverse Osmosis) plant to provide clean drinking water to the surrounding community, addressing a critical need for safe water access.</p>
            </div>
          </article>

        </div>

        {/*  Realistic Facility Visual Showcase  */}
        <div className="kb-facility-media-row">
          <figure className="kb-facility-media-item">
            <img src="/assets/images/programs/kb_multipurpose_library.jpg" 
                 alt="Multipurpose room with library and computer stations at GBSS Kara Bhai Karim Jee" 
                 width="800" 
                 height="450" 
                 loading="lazy" />
            <div className="kb-facility-media-caption">
              <h4>Multipurpose Library &amp; Digital Learning</h4>
              <p>10 workstations, mother awareness workshops, and curriculum resources.</p>
            </div>
          </figure>

          <figure className="kb-facility-media-item">
            <img src="/assets/images/programs/kb_clean_water_ro.jpg" 
                 alt="Students drinking clean purified water from RO filtration plant at GBSS Kara Bhai Karim Jee" 
                 width="800" 
                 height="450" 
                 loading="lazy" />
            <div className="kb-facility-media-caption">
              <h4>Safe Drinking Water &amp; RO Filtration</h4>
              <p>Serving clean, reliable drinking water for students and surrounding Lyari community.</p>
            </div>
          </figure>
        </div>

      </div>
    </section>

    {/*  ========================================================================
         SECTION 4: GRADE 10 SINDH BOARD RESULTS (MATRICULATION TRANSFORMATION CHART)
         Interactive, responsive, animated chart with zero overlap & smooth counter
         ========================================================================  */}
    <section className="kb-matric-chart-section" aria-label="Grade 10 Sindh Board Transformation Chart">
      <div className="kb-matric-container">
        
        <div className="kb-chart-interactive" role="region" aria-label="Matriculation Academic Transformation Chart">
          
          {/*  Top Bar: Title & Legend  */}
          <div className="kb-chart-top-bar">
            <div className="kb-chart-title-group">
              <h2 className="kb-chart-main-title">Grade 10 Matriculation Transformation (2023 &mdash; 2025)</h2>
              <p className="kb-chart-desc">Comparative pass rate and academic turnaround at GBSS Kara Bhai Karim Jee under HOL Foundation management</p>
            </div>
            
            <div className="kb-chart-legend" aria-label="Chart Legend">
              <span className="kb-legend-item">
                <span className="kb-legend-dot dot-red" aria-hidden="true"></span>
                <span>Pre-Adoption (2023)</span>
              </span>
              <span className="kb-legend-item">
                <span className="kb-legend-dot dot-amber" aria-hidden="true"></span>
                <span>Year 1 (2024)</span>
              </span>
              <span className="kb-legend-item">
                <span className="kb-legend-dot dot-green" aria-hidden="true"></span>
                <span style={{color: "#009E49", fontWeight: "750"}}>Year 2 Turnaround (2025)</span>
              </span>
            </div>
          </div>

          {/*  Plot Area with Guidelines & 3 Columns  */}
          <div className="kb-chart-plot-wrap">
            
            {/*  Horizontal Guide Lines  */}
            <div className="kb-chart-grid-lines" aria-hidden="true">
              <div className="kb-grid-line"><span className="kb-grid-line-label">100%</span></div>
              <div className="kb-grid-line"><span className="kb-grid-line-label">70%</span></div>
              <div className="kb-grid-line"><span className="kb-grid-line-label">35%</span></div>
              <div className="kb-grid-line"><span className="kb-grid-line-label">0%</span></div>
            </div>

            {/*  3 Columns Grid  */}
            <div className="kb-chart-columns-grid">
              
              {/*  Column 1: 2023  */}
              <div className="kb-column-card kb-card-2023">
                <div className="kb-col-top">
                  <div className="kb-pct-value kb-pct-red" data-kb-counter="0" data-kb-suffix="%">0%</div>
                </div>
                <div className="kb-bar-track">
                  <div className="kb-bar-fill bar-fill-2023" data-bar-target="9%" style={{height: "0%"}}></div>
                </div>
                <div className="kb-col-meta">
                  <div className="kb-col-year">2023</div>
                  <div className="kb-col-era">Pre-Adoption Era</div>
                  <div className="kb-col-sub kb-sub-red">School Abandoned</div>
                </div>
              </div>

              {/*  Column 2: 2024  */}
              <div className="kb-column-card kb-card-2024">
                <div className="kb-col-top">
                  <div className="kb-pct-value kb-pct-amber" data-kb-counter="84" data-kb-suffix="%">0%</div>
                </div>
                <div className="kb-bar-track">
                  <div className="kb-bar-fill bar-fill-2024" data-bar-target="84%" style={{height: "0%"}}></div>
                </div>
                <div className="kb-col-meta">
                  <div className="kb-col-year">2024</div>
                  <div className="kb-col-era">Year 1 Remedial</div>
                  <div className="kb-col-sub kb-sub-amber">52 of 62 Passed</div>
                </div>
              </div>

              {/*  Column 3: 2025 (Excellence)  */}
              <div className="kb-column-card kb-card-2025">
                <div className="kb-col-top">
                  <div className="kb-pct-value kb-pct-green" data-kb-counter="96.8" data-kb-decimals="1" data-kb-suffix="%">0.0%</div>
                </div>
                <div className="kb-bar-track">
                  <div className="kb-bar-fill bar-fill-2025" data-bar-target="96.8%" style={{height: "0%"}}></div>
                </div>
                <div className="kb-col-meta">
                  <div className="kb-col-year">2025</div>
                  <div className="kb-col-era era-green">Academic Turnaround</div>
                  <div className="kb-col-sub kb-sub-green">75 of 78 Passed &middot; 46 A Grades</div>
                </div>
              </div>

            </div>

          </div>

          {/*  Bottom Verification Proof Bar  */}
          <div className="kb-verified-bar">
            <div className="kb-verified-left">
              <span className="kb-verified-icon" aria-hidden="true">&#10003;</span>
              <span className="kb-verified-title">Sindh Education &amp; Literacy Department Verified</span>
              <span className="kb-verified-desc">&middot; Board of Secondary Education Karachi (BSEK) matriculation record for GBSS Kara Bhai Karim Jee (Lyari Campus)</span>
            </div>
            <div className="kb-verified-org">HOL FOUNDATION</div>
          </div>

        </div>

      </div>
    </section>

    {/*  ========================================================================
         SECTION: ADDITIONAL INITIATIVES
         Teachers Training, Mother Classes, Free Uniform and Course,
         Celebration of International Days, Grand Iftar & Eid Celebrations
         ========================================================================  */}
    <section id="additional-initiatives" className="kb-expanded-section bg-subtle" aria-labelledby="heading-additional-initiatives">
      <div className="kb-container">
        
        <div className="kb-initiatives-intro">
          <h2 id="heading-additional-initiatives" className="kb-feature-title">Additional Initiatives</h2>
          <p className="kb-editorial-lead" style={{margin: "0 auto", maxWidth: "760px"}}>In addition to the above facilities, HOL KB Campus also offers the following initiatives</p>
        </div>

        <div className="kb-initiatives-split-layout">
          
          {/*  Left Column: The 5 Initiatives Cards  */}
          <div className="kb-initiatives-cards-list">
            
            {/*  1. Teachers Training  */}
            <article className="kb-initiative-card">
              <div className="kb-initiative-head">
                <div className="kb-initiative-icon" aria-hidden="true">&#128218;</div>
                <h3 className="kb-initiative-title">Teachers Training</h3>
              </div>
              <p className="kb-initiative-desc">We conduct regular training sessions for teachers to enhance their teaching skills and keep them updated with the latest educational practices, ensuring high-quality education for our students.</p>
            </article>

            {/*  2. Mother Classes  */}
            <article className="kb-initiative-card">
              <div className="kb-initiative-head">
                <div className="kb-initiative-icon" aria-hidden="true">&#128105;&#8205;&#127979;</div>
                <h3 className="kb-initiative-title">Mother Classes</h3>
              </div>
              <p className="kb-initiative-desc">We offer classes for mothers three days a week, providing them with essential skills and knowledge to support their children’s education and overall Mostly mothers who never get a chance to study in school enjoy a lot.</p>
            </article>

            {/*  3. Free Uniform and Course  */}
            <article className="kb-initiative-card">
              <div className="kb-initiative-head">
                <div className="kb-initiative-icon" aria-hidden="true">&#128085;</div>
                <h3 className="kb-initiative-title">Free Uniform and Course</h3>
              </div>
              <p className="kb-initiative-desc">We offer classes for mothers three days a week, providing them with essential skills and knowledge to support their children’s education and overall Mostly mothers who never get a chance to study in school enjoy a lot.</p>
            </article>

            {/*  4. Celebration of International Days  */}
            <article className="kb-initiative-card">
              <div className="kb-initiative-head">
                <div className="kb-initiative-icon" aria-hidden="true">&#127757;</div>
                <h3 className="kb-initiative-title">Celebration of International Days</h3>
              </div>
              <p className="kb-initiative-desc">We celebrate various international days and events to promote cultural awareness and global citizenship among students, fostering a sense of unity and inclusivity.</p>
            </article>

            {/*  5. Grand Iftar and Eid Celebrations  */}
            <article className="kb-initiative-card">
              <div className="kb-initiative-head">
                <div className="kb-initiative-icon" aria-hidden="true">&#127769;</div>
                <h3 className="kb-initiative-title">Grand Iftar and Eid Celebrations</h3>
              </div>
              <p className="kb-initiative-desc">During the holy month of Ramadan, we host a grand iftar for students, staff, and community members, fostering a sense of community and We also celebrate Eid with joyous festivities, creating memorable experiences for all.</p>
            </article>

          </div>

          {/*  Right Column: Visual Highlights Card (Grand Iftar & Teacher Training)  */}
          <div className="kb-initiatives-side-showcase">
            <div className="kb-side-media-card">
              <img src="/assets/images/programs/kb_iftar_celebration.jpg" 
                   alt="Grand Ramadan Iftar community gathering with students and mothers at GBSS Kara Bhai Karim Jee" 
                   width="800" 
                   height="450" 
                   loading="lazy" />
              <div className="kb-side-media-body">
                <h4>Grand Iftar &amp; Eid Community Celebrations</h4>
                <p>Bringing families, children, and educators together during Ramadan and festive Eid celebrations under campus canopy lights.</p>
              </div>
            </div>

            <div className="kb-side-media-card">
              <img src="/assets/images/journey/Teachers Training.jpeg" 
                   alt="HOL Foundation teacher training and pedagogical development workshop in Lyari" 
                   width="800" 
                   height="450" 
                   loading="lazy" />
              <div className="kb-side-media-body">
                <h4>Continuous Teacher Development</h4>
                <p>Equipping our educators with modern pedagogy, mindful child engagement methods, and English language instructional excellence.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>

    {/*  ========================================================================
         SECTION 5: FOUNDER QUOTE BANNER (Pre-Footer Accent Banner)
         ========================================================================  */}
    <section className="kb-founder-quote-banner" aria-label="Founder Quote">
      <div className="kb-quote-inner">
        <blockquote className="kb-urdu-quote">
          &ldquo;ہمارا کام تب ختم ہوگا،<br />
          جب ہر بچے کے ہاتھ میں قلم ہوگا&rdquo;
        </blockquote>
        <div className="kb-founder-signature">Hunain Abbas</div>
        <div className="kb-founder-subtitles">
          <span className="kb-founder-role">FOUNDER</span>
          <span className="kb-founder-org">HOL FOUNDATION</span>
        </div>
      </div>
    </section>
  
    </main>
  );
}
