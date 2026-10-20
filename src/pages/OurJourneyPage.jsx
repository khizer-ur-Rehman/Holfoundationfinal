import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

const milestonesData = [
  {
    year: '2026',
    title: 'Directorate of Literacy & Non-Formal Education Sindh',
    description: 'In 2026, HOL Foundation Pakistan signed a Memorandum of Understanding with the Directorate of Literacy & Non-Formal Education Sindh, under the School Education & Literacy Department, Government of Sindh, to strengthen non-formal and accelerated learning pathways for out-of-school children in District South and District West (Orangi Town).',
    photos: [
      { src: '/assets/images/journey/journey-2024-consulate-visit.jpg', alt: 'Directorate of Literacy and Non-Formal Education Sindh collaboration' },
      { src: '/assets/images/journey/our-journey-22.webp', alt: 'Out-of-school children accelerated learning pathways' }
    ]
  },
  {
    year: '2026',
    title: 'Bahria University Karachi Campus',
    description: 'In 2026, HOL Foundation Pakistan took an important step forward by signing an MoU with Bahria University Karachi Campus, laying the foundation for a meaningful collaboration in learning, innovation, and social impact',
    photos: [
      { src: '/assets/images/journey/our-journey-20.webp', alt: 'Bahria University Karachi Campus collaboration' },
      { src: '/assets/images/journey/our-journey-17.webp', alt: 'Learning and innovation initiative' }
    ]
  },
  {
    year: '2026',
    title: 'Successfully training 10,000 students',
    description: 'In 2026, HOL Foundation Pakistan proudly reached a major milestone — successfully training 10,000 students through its IT education project, expanding digital access and future opportunities for youth',
    photos: [
      { src: '/assets/images/journey/HOL-SPP%208.jpg', alt: 'Students in IT education project training' },
      { src: '/assets/images/programs/50-Alumnis-of-Lyari-Entrepreneur-Academy-got-job-in-reputable-organizations.webp', alt: 'Youth celebrating 10,000 students milestone' }
    ]
  },
  {
    year: '2025',
    title: 'inDrive',
    description: "In 2025, change took center stage as inDrive celebrated five inspiring changemakers across Pakistan — including Irfan Junejo — and we’re proud that Hunain Abbas, founder from the streets of Lyari, was among them. His portrait now shines on a billboard at DHA Phase 8 near Creek Walk, a powerful symbol of how courage and consistency can transform lives. Grateful to inDrive Pakistan for believing in community-led change.",
    photos: [
      { src: '/assets/images/journey/our-journey-16.webp', alt: 'inDrive changemaker celebration with founder Hunain Abbas' },
      { src: '/assets/images/journey/our-journey-13.webp', alt: 'Community-led change recognition' }
    ]
  },
  {
    year: '2025',
    title: 'K-Electric Karachi Award',
    description: 'In 2025, HOL Foundation Pakistan once again proudly received the K-Electric Karachi Award, a continued recognition of its powerful impact in uplifting communities.',
    photos: [
      { src: '/assets/images/journey/KB-Campus-2.jpeg', alt: 'K-Electric Karachi Award recognition' },
      { src: '/assets/images/journey/our-journey-8.webp', alt: 'HOL Foundation team community impact' }
    ]
  },
  {
    year: '2024',
    title: 'Rotary Club of Karachi Sunset Millennium',
    description: 'In 2024, the IT Vocational Center was inaugurated at the HOL Government Adopted School in Lyari, a milestone made possible through the generous support of Rotary Club of Karachi Sunset Millennium, opening new digital learning pathways for students',
    photos: [
      { src: '/assets/images/journey/HOL-SPP%206.jpg', alt: 'Inauguration of IT Vocational Center in Lyari' },
      { src: '/assets/images/journey/HOL-SPP%209.jpeg', alt: 'Students learning digital skills at the IT center' }
    ]
  },
  {
    year: '2024',
    title: 'HOL Karate Club',
    description: 'In 2024, HOL Foundation Pakistan launched the HOL Karate Club for the community, promoting discipline, confidence, and physical strength among youth.',
    photos: [
      { src: '/assets/images/journey/our-journey-5.webp', alt: 'HOL Karate Club youth training' },
      { src: '/assets/images/journey/our-journey-2.webp', alt: 'Karate practice and discipline in the community' }
    ]
  },
  {
    year: '2024',
    title: 'K-Electric Karachi Award',
    description: 'In 2024, HOL Foundation Pakistan proudly received the K-Electric Karachi Award, recognizing its impactful work in education and community development.',
    photos: [
      { src: '/assets/images/journey/journey-2023-campus-community.jpg', alt: 'K-Electric Karachi Award ceremony' },
      { src: '/assets/images/journey/Teachers%20Training.jpeg', alt: 'HOL Foundation educators and leadership' }
    ]
  },
  {
    year: '2024',
    title: 'HOL Preschool',
    description: 'In 2024, HOL Foundation Pakistan established the first HOL Preschool based on the Kiran Satellite model at its adopted government school, bringing quality early education into the public sector.',
    photos: [
      { src: '/assets/images/journey/journey-2024-preschool-awards.jpg', alt: 'HOL Preschool early childhood program' },
      { src: '/assets/images/journey/HOL-SPP%205.jpg', alt: 'Young learners in the preschool classroom' }
    ]
  },
  {
    year: '2024',
    title: 'Margalla Trail Runners',
    description: 'In 2024, students of HOL Foundation Pakistan proudly shined at the HMR Waterfront event with Margalla Trail Runners, sponsored by inDrive, showcasing determination, sportsmanship, and the rising spirit of young talent.',
    photos: [
      { src: '/assets/images/journey/HOL-SPP%2010.jpg', alt: 'Students at HMR Waterfront event with Margalla Trail Runners' },
      { src: '/assets/images/journey/HOL-SPP%204.jpg', alt: 'HOL Foundation young runners celebrating' }
    ]
  },
  {
    year: '2024',
    title: 'German Consulate General Karachi',
    description: 'In 2024, Dr. Lotz from the German Consulate General Karachi visited the HOL Government School Campus three times, recognizing and encouraging the educational work being done for the community.',
    photos: [
      { src: '/assets/images/journey/journey-2024-consulate-visit.jpg', alt: 'Dr. Lotz from German Consulate General Karachi visiting HOL Campus' },
      { src: '/assets/images/journey/HOL-SPP.jpeg', alt: 'German Consulate delegation with HOL students and teachers' }
    ]
  },
  {
    year: '2024',
    title: "Pingu's English School Pakistan",
    description: 'In 2024, HOL Ambassadors — the future leaders of HOL Foundation Pakistan — stepped into new journeys at Pingu’s English School Pakistan and Kiran Foundation DCTO, reflecting the resilience, growth, and powerful potential of Lyari’s youth.',
    photos: [
      { src: '/assets/images/programs/school-preparatory-graduates.jpeg', alt: "HOL Ambassadors journey at Pingu's English School Pakistan" },
      { src: '/assets/images/programs/hol-preschool-classroom.jpg', alt: 'Kiran Foundation DCTO and HOL partnership' }
    ]
  },
  {
    year: '2023',
    title: 'Lyari',
    description: 'In 2023, HOL Foundation Pakistan expanded its mission by adopting a government school in Lyari, bringing quality education closer to the community.',
    photos: [
      { src: '/assets/images/programs/kb-campus-classroom.jpeg', alt: 'Adopted government school in Lyari' },
      { src: '/assets/images/programs/kb-campus-community.jpeg', alt: 'Students and community at HOL adopted campus in Lyari' }
    ]
  },
  {
    year: '2022',
    title: 'Lyari Entrepreneur Academy',
    description: 'In 2022, the Lyari Entrepreneur Academy was established, creating a platform to nurture skills, leadership, and entrepreneurship among local youth.',
    photos: [
      { src: '/assets/images/programs/home-lyari-entrepreneur-academy.webp', alt: 'Establishment of Lyari Entrepreneur Academy' },
      { src: '/assets/images/programs/students-teamwork.jpg', alt: 'Youth participating in entrepreneurship and leadership workshops' }
    ]
  },
  {
    year: '2021',
    title: 'First IT batch',
    description: 'In 2021, HOL Foundation Pakistan launched its very first IT batch with just two laptops, sparking a digital transformation journey for the youth of Lyari.',
    photos: [
      { src: '/assets/images/journey/HOL-SPP%206.jpg', alt: 'First IT batch starting with two laptops' },
      { src: '/assets/images/journey/our-journey-17.webp', alt: 'Digital transformation journey for Lyari youth' }
    ]
  },
  {
    year: '2021',
    title: 'Dosti Project with Kiran Foundation',
    description: 'In 2021, HOL Foundation Pakistan signed an MoU under the Dosti Project with Kiran Foundation, strengthening collaboration to expand educational impact.',
    photos: [
      { src: '/assets/images/stories/community-classroom-learning.jpg', alt: 'Dosti Project signing with Kiran Foundation' },
      { src: '/assets/images/stories/classroom-craft-activity.jpg', alt: 'Collaborative educational impact in Lyari' }
    ]
  },
  {
    year: '2020',
    title: 'Akhuwat Foundation',
    description: 'In 2020, alongside the preschool initiative, Hunain Abbas launched the first HOL Women Entrepreneurship Program at NJV School, a school adopted by Akhuwat Foundation, empowering women toward financial independence.',
    photos: [
      { src: '/assets/images/about/hol-community-women.jpg', alt: 'HOL Women Entrepreneurship Program at NJV School' },
      { src: '/assets/images/stories/school-preparatory-support.jpg', alt: 'Women empowerment and financial independence workshop' }
    ]
  },
  {
    year: '2020',
    title: 'Strong Foundations For Early Childhood',
    description: 'In 2020, a formal preschool was launched under the leadership of Areeba Hunain, laying strong foundations for early childhood education for 200 children.',
    photos: [
      { src: '/assets/images/programs/hol-preschool-learning.jpg', alt: 'Formal preschool launch under leadership of Areeba Hunain' },
      { src: '/assets/images/journey/journey-2024-preschool-awards.jpg', alt: 'Early childhood education for 200 children' }
    ]
  },
  {
    year: '2019',
    title: 'Structured Non-Formal School',
    description: 'In 2019, founders Hunain Abbas and Areeba Yaqoob established a structured non-formal school, opening doors of learning to 50 students.',
    photos: [
      { src: '/assets/images/programs/school-preparatory-children.jpeg', alt: 'Founders establishing structured non-formal school in Lyari' },
      { src: '/assets/images/journey/HOL-SPP%204.jpg', alt: 'Opening doors of learning for 50 students' }
    ]
  },
  {
    year: '2018',
    title: 'Local Youth Came Together',
    description: 'In 2018, the first HOL Community Center in Lyari, where local youth came together to teach and uplift street children through the power of education.',
    photos: [
      { src: '/assets/images/journey/our-journey-2.webp', alt: 'First HOL Community Center in Lyari' },
      { src: '/assets/images/journey/HOL-SPP.jpeg', alt: 'Local youth teaching street children' }
    ]
  },
  {
    year: '2016',
    title: 'Changing Lives Through Education',
    description: 'Started in 2016 from one small room, HOL Foundation began with Hunain’s dream at an adult literacy center — and grew into a movement changing lives through education.',
    photos: [
      { src: '/assets/images/journey/journey-2016-classroom-activity.webp', alt: 'A teacher leads a classroom activity with Lyari students' },
      { src: '/assets/images/journey/journey-2016-celebration-group.webp', alt: 'Students and educators celebrate together at HOL Foundation' }
    ]
  }
];

export function OurJourneyPage() {
  useScrollReveal();

  return (
    <main className="journey-page">
      <section className="unified-hero" aria-labelledby="journey-hero-title">
        <div className="unified-hero-container">
          <div className="unified-hero-grid">
            <div className="unified-hero-copy">
              <h1 id="journey-hero-title" className="unified-hero-title">
                From a small beginning to brighter futures.
              </h1>
              <p className="unified-hero-lead">
                Since 2014, our community-led work in Lyari has opened new paths through education, skills and sustainable opportunity for hundreds of families.
              </p>
              <div className="unified-hero-actions">
                <a className="button gold" href="#journey-milestones">
                  Explore Key Moments <span aria-hidden="true">&#8595;</span>
                </a>
                <Link className="unified-hero-link" to="/our-work">
                  Our Work <span aria-hidden="true">&#8599;</span>
                </Link>
              </div>
            </div>
            <figure className="unified-hero-visual">
              <img
                src="/assets/images/journey/Teachers Training.jpeg"
                alt="HOL Foundation staff and educators during a training session at KB Campus in Lyari"
                width="1280"
                height="960"
                fetchPriority="high"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="journey-milestones" id="journey-milestones" aria-labelledby="journey-milestones-title">
        <div className="journey-shell">
          <header className="journey-section-heading">
            <div>
              <h2 id="journey-milestones-title">Key moments that shaped our mission.</h2>
            </div>
            <p>One community. A growing commitment to learning.</p>
          </header>

          <ol className="journey-milestones-list">
            {milestonesData.map((m, idx) => (
              <li className="journey-milestone" key={idx}>
                <article className="journey-milestone-copy">
                  <span className="journey-milestone-years">{m.year}</span>
                  <h3>{m.title}</h3>
                  <p>{m.description}</p>
                </article>
                <span className="journey-milestone-marker" aria-hidden="true" />
                <figure className="journey-milestone-photos">
                  {m.photos.map((p, pIdx) => (
                    <img
                      key={pIdx}
                      src={p.src}
                      alt={p.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </figure>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
