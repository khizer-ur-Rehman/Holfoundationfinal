import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function LyariAcademyPage() {
  useScrollReveal();

  return (
    <main className="lea-page">

    {/*  ========================================================================
         Consistent Master Hero Section (Matching website theme)
         ========================================================================  */}
    <section className="unified-hero" aria-labelledby="lea-hero-title">
      <div className="unified-hero-container">
        <div className="unified-hero-grid">
          <div className="unified-hero-copy">
            <Link className="unified-hero-back" to="/our-work">&#8592; &nbsp; Back to Our Work</Link>
            <h1 id="lea-hero-title" className="unified-hero-title">Lyari Entrepreneur Academy.</h1>
            <p className="unified-hero-lead">Transformative vocational training, entrepreneurship incubation, digital IT skills, and youth sports development empowering students, youth, and single mothers in Lyari.</p>
            <div className="unified-hero-actions">
              <Link className="button gold" to="/donate">Sponsor This Program <span aria-hidden="true">&#8599;</span></Link>
              <a className="unified-hero-link" href="#academy-narrative">Explore Academy <span aria-hidden="true">&#8595;</span></a>
            </div>
          </div>
          <figure className="unified-hero-visual">
            <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/hero_sectiion_banner.jpg?v=1791557443"
                 alt="HOL Foundation – Lyari Entrepreneur Academy"
                 width="1672"
                 height="1115"
                 fetchPriority="high" />
          </figure>
        </div>
      </div>
    </section>

    {/*  ========================================================================
         SECTION 2: MAIN ACADEMY NARRATIVE SPREAD
         Max-width 1320px container with narrative, image rows, and skill pills
         ========================================================================  */}
    <section id="academy-narrative" className="lea-narrative-section" aria-label="Academy Overview and Programs">
      <div className="lea-container">
        
        <header className="lea-section-header">
          <h2 className="lea-section-title">Empowering Communities Through <span>Skills &amp; Enterprise</span>.</h2>
        </header>

        {/*  A. Two Editorial Narrative Paragraphs  */}
        <div className="lea-lead-paragraphs">
          <p>
            Lyari Entrepreneur Academy, founded in 2022, is transformative endeavor. We aim to access to quality education and entrepreneurship opportunities, creating a brighter future for the youth of Lyari and beyond. Our mission is to empower aspiring entrepreneurs, including single mothers and youth, with the knowledge and skills needed to thrive in business with seed money to start their business. We embrace inclusivity, unleash creativity, and drive positive change in the community.
          </p>
          <p>
            Additionally, we offer free IT classes covering Basic IT, Web Development, Digital Marketing, Cisco courses, and Video Editing. These classes are open to all members of the community, providing essential digital skills to anyone eager to learn and grow.
          </p>
        </div>

        {/*  B. First Image Row (3 Landscape Image Containers)  */}
        <div className="lea-image-grid-3" role="region" aria-label="Classroom and IT Training Highlights">
          {/*  Image 1  */}
          <figure className="lea-card-image">
            <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/entrepreneur_1.jpg?v=1791557195"
                 alt="Lyari Entrepreneur Academy students collaborating in classroom session"
                 loading="lazy"
                 width="640"
                 height="420" />
          </figure>

          {/*  Image 2  */}
          <figure className="lea-card-image">
            <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/entre_2.jpg?v=1791557201"
                 alt="Students learning computer applications in IT lab"
                 loading="lazy"
                 width="640"
                 height="420" />
          </figure>

          {/*  Image 3  */}
          <figure className="lea-card-image">
            <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/entre_3.jpg?v=1791557204"
                 alt="Youth engaged in digital skill workshop at LEA"
                 loading="lazy"
                 width="640"
                 height="420" />
          </figure>
        </div>

        {/*  C. Vocational, Digital & AI Skill Pill Buttons  */}
        <div className="lea-skills-grid" role="region" aria-label="Vocational, Digital, and AI Skills Offerings">
          {/*  Row 1: Emerging Tech & AI  */}
          <div className="lea-skill-pill">AI &amp; Prompt Tools</div>
          <div className="lea-skill-pill">Python for AI</div>
          <div className="lea-skill-pill">Web Development</div>
          <div className="lea-skill-pill">Digital Marketing</div>

          {/*  Row 2: Digital & Business  */}
          <div className="lea-skill-pill">Amazon &amp; E-Commerce</div>
          <div className="lea-skill-pill">Graphic Designing</div>
          <div className="lea-skill-pill">Video Editing</div>
          <div className="lea-skill-pill">Advance Excel</div>

          {/*  Row 3: Foundations & Soft Skills  */}
          <div className="lea-skill-pill">MS Office Advance</div>
          <div className="lea-skill-pill">MS Office Basic</div>
          <div className="lea-skill-pill">English Language</div>
          <div className="lea-skill-pill">Entrepreneurship</div>

          {/*  Row 4: Vocational & Creative  */}
          <div className="lea-skill-pill">Mehndi &amp; Beautician</div>
          <div className="lea-skill-pill">Art &amp; Craft</div>
          <div className="lea-skill-pill">Bike Riding</div>
          <div className="lea-skill-pill">Music Club</div>
        </div>

        {/*  D. Second Image Row (3 Landscape Image Containers)  */}
        <div className="lea-image-grid-3" role="region" aria-label="Vocational Craftsmanship and Stitching Training">
          {/*  Image 4  */}
          <figure className="lea-card-image">
            <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/entre_4.jpg?v=1791557209"
                 alt="Female students learning stitching and vocational craftsmanship"
                 loading="lazy"
                 width="640"
                 height="420" />
          </figure>

          {/*  Image 5  */}
          <figure className="lea-card-image">
            <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/entre_5.jpg?v=1791557214"
                 alt="Young women practicing tailoring at HOL entrepreneurship hub"
                 loading="lazy"
                 width="640"
                 height="420" />
          </figure>

          {/*  Image 6  */}
          <figure className="lea-card-image">
            <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/entre_6.jpg?v=1791557219"
                 alt="Single mothers learning vocational sewing and textile crafts"
                 loading="lazy"
                 width="640"
                 height="420" />
          </figure>
        </div>

      </div>
    </section>

    {/*  ========================================================================
         SECTION 3: EMPOWERING ENTREPRENEURS - VIDEO, CAMP & FELLOWSHIP
         Entrepreneurship Camp & Fellowship Program with Facebook video embed
         ========================================================================  */}
    <section id="empowering-entrepreneurs" className="lea-fellowship-section" aria-label="Empowering Entrepreneurs: Entrepreneurship Camp and Fellowship Program">
      <div className="lea-container">

        <header className="lea-fellowship-header">
          <h2 className="lea-fellowship-title">Empowering Entrepreneurs: <span>Entrepreneurship Camp &amp; Fellowship Program</span></h2>
          <p className="lea-fellowship-lead">At Lyari Entrepreneur Academy, we bridge grassroots ambition with national business leadership—providing hands-on startup acceleration, executive mentorship, and direct corporate access for youth and emerging founders in Lyari.</p>
        </header>

        {/*  Video Player Showcase  */}
        <div className="lea-video-showcase">
          <div className="lea-video-frame">
            <iframe
              src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fwatch%2F%3Fv%3D770275352610998&show_text=false&width=476&t=0"
              title="Entrepreneurship Camp and Fellowship Program Video Documentary"
              scrolling="no"
              frameborder="0"
              allowfullscreen="true"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
            </iframe>
          </div>
          <div className="lea-video-action-bar">
            <div className="lea-video-caption">
              <h3 className="lea-video-caption-title">Empowering Lyari’s Next-Generation Business Leaders</h3>
              <p className="lea-video-caption-sub">Watch the official documentary highlighting the transformative Entrepreneurship Camp and Fellowship journey.</p>
            </div>
            <a href="https://www.facebook.com/watch/?v=770275352610998" target="_blank" rel="noopener noreferrer" className="lea-video-btn">
              Watch on Facebook <span aria-hidden="true">&#8599;</span>
            </a>
          </div>
        </div>

        {/*  Two Core Impact & Fellowship Narrative Cards  */}
        <div className="lea-program-grid-2">
          {/*  Card 1: Entrepreneurship Camp  */}
          <article className="lea-program-card">
            <figure className="lea-program-card-media">
              <img src="/assets/images/programs/hol_lea_camp_ceos_1791963767837.jpg"
                   alt="HOL Foundation Entrepreneurship Camp with CEO Mentors and Students in Lyari"
                   loading="lazy"
                   width="640"
                   height="400" />
            </figure>
            <div className="lea-program-card-content">
              <h3 className="lea-program-card-title">Entrepreneurship Camp</h3>
              <p className="lea-program-card-text">
                At Lyari Entrepreneur Academy, we believe in providing hands-on experiences and real-world exposure to our students. That’s why we organized the first Entrepreneurship Camp in Lyari, where over 40 multinational company CEOs joined us to train entrepreneurs in various fields of startups, including Human Resources, Digital Marketing, Amazon, Startups Strategic Planning, and Mental Health. This immersive experience provided invaluable insights and practical knowledge to our aspiring entrepreneurs, setting them on the path to success.
              </p>
              <div className="lea-tags-container">
                <span className="lea-tag-pill">40+ Multinational CEOs</span>
                <span className="lea-tag-pill">Human Resources</span>
                <span className="lea-tag-pill">Digital Marketing</span>
                <span className="lea-tag-pill">Amazon &amp; E-Commerce</span>
                <span className="lea-tag-pill">Strategic Planning</span>
                <span className="lea-tag-pill">Mental Health</span>
              </div>
            </div>
          </article>

          {/*  Card 2: Fellowship Program  */}
          <article className="lea-program-card">
            <figure className="lea-program-card-media">
              <img src="/assets/images/programs/hol_lea_fellowship_corporate_1791963784453.jpg"
                   alt="Lyari Fellows meeting executive leadership and visiting National Incubation Centre (NIC)"
                   loading="lazy"
                   width="640"
                   height="400" />
            </figure>
            <div className="lea-program-card-content">
              <h3 className="lea-program-card-title">Fellowship Program</h3>
              <p className="lea-program-card-text">
                Following the successful completion of the Entrepreneurship Camp, we launched the Fellowship Program, where students from Lyari had the opportunity to visit multinational companies and meet their CEOs and Managers. This unique initiative provided our students with firsthand exposure to corporate environments and networking opportunities. They visited renowned companies such as Feroze1888, National Incubation Centre Karachi, Macto Foods, Lucky Textile, and many more, gaining insights into industry best practices and forging meaningful connections.
              </p>
              <div className="lea-tags-container">
                <span className="lea-tag-pill partner">Feroze1888</span>
                <span className="lea-tag-pill partner">NIC Karachi</span>
                <span className="lea-tag-pill partner">Macto Foods</span>
                <span className="lea-tag-pill partner">Lucky Textile</span>
                <span className="lea-tag-pill">Corporate Visits</span>
              </div>
            </div>
          </article>
        </div>

      </div>
    </section>

    {/*  ========================================================================
         SECTION 4: HOL FOUNDATION YOUTH SPORTS DEVELOPMENT
         Evening sports programs empowering students physically and emotionally
         ========================================================================  */}
    <section className="lea-sports-section" aria-label="HOL Foundation Youth Sports Development">
      <div className="lea-container">

        <header className="lea-sports-intro">
          <h2 className="lea-sports-main-heading">HOL Foundation Youth Sports Development</h2>
          <p className="lea-sports-main-desc">Evening sports programs empowering students physically, mentally, and emotionally.</p>
        </header>

        {/*  1. BOXING  */}
        <article className="lea-sport-block" aria-labelledby="sport-boxing-title">
          <header className="lea-sport-header">
            <h3 id="sport-boxing-title" className="lea-sport-title">BOXING</h3>
            <div className="lea-sport-divider" aria-hidden="true">
              <span className="lea-sport-indicator"></span>
            </div>
          </header>
          <p className="lea-sport-desc">Instilling discipline, stamina, and physical endurance through structured youth boxing classes, conditioning drills, and mentorship.</p>
          <div className="lea-image-grid-2">
            <figure className="lea-card-image">
              <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/boxing.jpg?v=1791557234"
                   alt="HOL Foundation Youth Boxing Training"
                   loading="lazy"
                   width="640"
                   height="420" />
            </figure>
            <figure className="lea-card-image">
              <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/boxing_2.jpg?v=1791557244"
                   alt="HOL Foundation Boxing Sparring and Fitness"
                   loading="lazy"
                   width="640"
                   height="420" />
            </figure>
          </div>
        </article>

        {/*  2. KARATE  */}
        <article className="lea-sport-block" aria-labelledby="sport-karate-title">
          <header className="lea-sport-header">
            <h3 id="sport-karate-title" className="lea-sport-title">KARATE</h3>
            <div className="lea-sport-divider" aria-hidden="true">
              <span className="lea-sport-indicator"></span>
            </div>
          </header>
          <p className="lea-sport-desc">Teaching traditional martial arts katas, self-defense techniques, mutual respect, and focus for young boys and girls in Lyari.</p>
          <div className="lea-image-grid-2">
            <figure className="lea-card-image">
              <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/karate_1.jpg?v=1791557224"
                   alt="HOL Foundation Karate Martial Arts Training"
                   loading="lazy"
                   width="640"
                   height="420" />
            </figure>
            <figure className="lea-card-image">
              <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/karate_2.jpg?v=1791557323"
                   alt="HOL Foundation Karate Practice &amp; Form"
                   loading="lazy"
                   width="640"
                   height="420" />
            </figure>
          </div>
        </article>

        {/*  3. FOOTBALL  */}
        <article className="lea-sport-block" aria-labelledby="sport-football-title">
          <header className="lea-sport-header">
            <h3 id="sport-football-title" className="lea-sport-title">FOOTBALL</h3>
            <div className="lea-sport-divider" aria-hidden="true">
              <span className="lea-sport-indicator"></span>
            </div>
          </header>
          <p className="lea-sport-desc">Channeling Lyari's deep-rooted passion for football with coached field practices, competitive teamwork, and athletic league training.</p>
          <div className="lea-image-grid-2">
            <figure className="lea-card-image">
              <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/football_1.jpg?v=1791557344"
                   alt="HOL Foundation Football Team &amp; Practice"
                   loading="lazy"
                   width="640"
                   height="420" />
            </figure>
            <figure className="lea-card-image">
              <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/foot_ball_2.jpg?v=1791557257"
                   alt="HOL Foundation Football Match on Field"
                   loading="lazy"
                   width="640"
                   height="420" />
            </figure>
          </div>
        </article>

        {/*  4. GYMNASTICS  */}
        <article className="lea-sport-block" aria-labelledby="sport-gymnastics-title">
          <header className="lea-sport-header">
            <h3 id="sport-gymnastics-title" className="lea-sport-title">GYMNASTICS</h3>
            <div className="lea-sport-divider" aria-hidden="true">
              <span className="lea-sport-indicator"></span>
            </div>
          </header>
          <p className="lea-sport-desc">Developing agility, balance, flexibility, and athletic coordination through structured acrobatic gymnastics drills with certified youth coaches.</p>
          <div className="lea-image-grid-2">
            <figure className="lea-card-image">
              <img src="/assets/images/programs/lea_gymnastics_sports_1791906052920.jpg"
                   alt="HOL Foundation Youth Gymnastics Training Session"
                   loading="lazy"
                   width="640"
                   height="420" />
            </figure>
            <figure className="lea-card-image">
              <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/karate_2.jpg?v=1791557323"
                   alt="HOL Foundation Athletic Conditioning"
                   loading="lazy"
                   width="640"
                   height="420" />
            </figure>
          </div>
        </article>

        {/*  5. LADIES FITNESS CLASS  */}
        <article className="lea-sport-block" aria-labelledby="sport-ladies-fitness-title">
          <header className="lea-sport-header">
            <h3 id="sport-ladies-fitness-title" className="lea-sport-title">LADIES FITNESS CLASS</h3>
            <div className="lea-sport-divider" aria-hidden="true">
              <span className="lea-sport-indicator"></span>
            </div>
          </header>
          <p className="lea-sport-desc">Dedicated wellness, functional fitness, aerobics, and health empowerment sessions conducted for mothers and young women in an encouraging indoor space.</p>
          <div className="lea-image-grid-2">
            <figure className="lea-card-image">
              <img src="/assets/images/programs/lea_ladies_fitness_1791906086998.jpg"
                   alt="HOL Foundation Community Ladies Fitness and Health Class"
                   loading="lazy"
                   width="640"
                   height="420" />
            </figure>
            <figure className="lea-card-image">
              <img src="https://cdn.shopify.com/s/files/1/1002/1837/2399/files/entre_4.jpg?v=1791557209"
                   alt="HOL Foundation Community Women Wellness and Craft Center"
                   loading="lazy"
                   width="640"
                   height="420" />
            </figure>
          </div>
        </article>

      </div>
    </section>

    {/*  ========================================================================
         SECTION 4: FOUNDER QUOTE ACCENT BANNER
         Vibrant green banner with Urdu quote, Hunain Abbas signature and subtitle
         ========================================================================  */}
    <section className="lea-founder-banner" aria-label="Founder Quote">
      <div className="lea-founder-banner-inner">
        <blockquote className="lea-urdu-quote">
          &ldquo;ہمارا کام تب ختم ہوگا،<br />
          جب ہر بچے کے ہاتھ میں قلم ہوگا&rdquo;
        </blockquote>
        <div className="lea-founder-signature">Hunain Abbas</div>
        <div className="lea-founder-subtitles">
          <span className="lea-founder-role">FOUNDER</span>
          <span className="lea-founder-org">HOL FOUNDATION</span>
        </div>
      </div>
    </section>
  
    </main>
  );
}
