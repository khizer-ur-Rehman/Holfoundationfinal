import React, { useState, useEffect, useRef } from 'react';

const teamMembers = [
  {
    name: 'Hunain Abbas',
    role: 'Founder & CEO of HOL Foundation',
    image: '/assets/images/team/hunain_abbas.png',
    bio: 'Hunain Abbas is a community-focused leader working to improve education and empower underserved communities in Lyari. He founded the Lyari Entrepreneur Academy and has supported non-formal education through street schools and community learning initiatives since the age of 16.',
  },
  {
    name: 'Areeba Hunain',
    role: 'Co-Founder',
    image: '/assets/images/team/areeba_hunain.png',
    bio: 'Areeba Hunain is a social entrepreneur focused on education and community development. Before HOL, she spent seven years with Kiran Foundation, contributing to marketing, volunteer engagement, and event management. At HOL, she leads academic programs at the government-adopted school, supporting structured learning and children’s holistic development.',
  },
  {
    name: 'Sohail Japan Wala',
    role: 'CEO, Japan Wala Group',
    image: '/assets/images/team/sohail_japan_wala.png',
    bio: 'Sohail Japan Wala has over 25 years of business experience across local and international markets. His profile highlights strategic expansion, operational leadership, financial management, global partnerships, and market development.',
  },
  {
    name: 'Basit Dandiya',
    role: 'Accountant, Food Panda',
    image: '/assets/images/team/basit.png',
    bio: 'Basit Dandiya has over 10 years of experience in e-commerce, digital platforms, and strategic consulting. His profile also mentions digital transformation, marketplace initiatives, business growth, and philanthropic activities.',
  },
  {
    name: 'Faiza Naeem',
    role: 'Philanthropist',
    image: '/assets/images/team/faiza.png',
    bio: 'Faiza Naeem’s profile highlights 17 years of aviation experience and community work focused on mental health, education, clean water, and health awareness. Her initiatives include water projects and support for underserved communities in Interior Sindh, Thar, and Balochistan.',
  },
  {
    name: 'Dr. Fatima Yusra',
    role: 'Industrial Pharmacist',
    image: '/assets/images/team/fatima.png',
    bio: 'Dr. Fatima Yusra has over five years of pharmaceutical industry experience. Her profile mentions account management, strategic growth, partnership development, and advocacy for women’s empowerment and child education.',
  },
  {
    name: 'Fahad Ali',
    role: 'Treasurer / Finance & Operations',
    image: '/assets/images/team/fahad_ali.png',
    bio: 'Fahad Ali’s profile focuses on finance, budgeting, project management, accounts, and operations. It highlights experience in resource management, process optimization, and project execution to support organizational growth.',
  },
  {
    name: 'M FAISAL',
    role: 'Co-opted Member',
    image: '/assets/images/team/m_faisal.png',
    bio: 'M Faisal is a dedicated Co-opted Member of HOL Foundation, bringing extensive advisory, community engagement, and strategic execution skills. He actively contributes to governance initiatives, educational outreach, and youth development programs across underserved communities.',
  },
];

export function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState({});
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount);

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, teamMembers.length - visibleCount);

  useEffect(() => {
    setCurrentIndex((index) => Math.min(index, maxIndex));
  }, [maxIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 2200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, maxIndex]);

  const toggleFlip = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Translate by one card width; translateX percentages are relative to the full track width.
  const itemPercent = 100 / visibleCount;
  const trackTransform = `translateX(-${currentIndex * (100 / teamMembers.length)}%)`;

  return (
    <section
      className="team-carousel-section bg-[#F7F8F4] py-16 sm:py-24 lg:py-28 relative z-10"
      id="meet-our-team"
      aria-labelledby="team-carousel-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="team-carousel-container max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="team-header-block text-center mb-10 sm:mb-14 lg:mb-16">
          <h2
            id="team-carousel-heading"
            className="team-heading font-poppins font-bold text-[30px] sm:text-[38px] md:text-[42px] text-[#222222] tracking-wider uppercase leading-tight"
          >
            MEET OUR TEAM
          </h2>
          <div className="team-heading-accent w-14 sm:w-16 h-1 bg-[#5EB93B] mx-auto mt-2.5 rounded-full" aria-hidden="true" />
        </div>

        <div className="team-carousel-viewport relative overflow-hidden w-full">
          <div
            className="team-carousel-track flex transition-transform duration-500 ease-out"
            style={{ transform: trackTransform }}
          >
            {teamMembers.map((member, i) => {
              const isFlipped = Boolean(flippedCards[i]);
              return (
                <div
                  key={member.name}
                  className="team-carousel-slide flex-shrink-0 px-3"
                  style={{ width: `${itemPercent}%` }}
                >
                  <article className="team-card-wrapper relative w-full max-w-[280px] sm:max-w-[300px] mx-auto flex flex-col items-center select-none">
                    <div
                      className={`team-photo-container w-full aspect-[3/4] rounded-[20px] overflow-hidden relative bg-white cursor-pointer shadow-sm border border-[#E8EBE5] transition-all duration-300 hover:shadow-md ${
                        isFlipped ? 'is-flipped' : ''
                      }`}
                      tabIndex={0}
                      role="button"
                      aria-label={`Toggle ${member.name} biography`}
                      onClick={() => toggleFlip(i)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleFlip(i);
                        }
                      }}
                    >
                      <span className="team-tap-hint sm:hidden" aria-hidden="true">
                        Tap bio
                      </span>
                      <img
                        className="team-portrait-img object-cover object-top w-full h-full"
                        src={member.image}
                        alt={`${member.name}, ${member.role}`}
                        loading={i === currentIndex || i === (currentIndex + visibleCount) % teamMembers.length ? 'eager' : 'lazy'}
                        width="300"
                        height="400"
                      />
                      <div className="team-bio-overlay bg-white rounded-[20px] p-5 sm:p-6 flex flex-col justify-center items-center text-center">
                        <p className="team-bio-text font-inter text-[13px] sm:text-[14px] text-[#222222] leading-[1.62] max-h-[250px] overflow-y-auto px-1">
                          {member.bio}
                        </p>
                      </div>
                    </div>

                    <div className="team-badge bg-white rounded-[16px] shadow-md border border-[#535353]/20 py-3 px-3 sm:px-4 text-center mx-auto -mt-6 sm:-mt-7 relative z-20 w-[92%] transition-all duration-300 hover:shadow-lg hover:border-[#5EB93B]/60">
                      <h3 className="team-badge-name font-poppins font-bold text-[15px] sm:text-[16.5px] text-[#111111] tracking-wide uppercase leading-tight truncate">
                        {member.name}
                      </h3>
                      <p className="team-badge-role font-inter font-medium text-[12px] sm:text-[13px] text-[#5EB93B] mt-1 leading-snug line-clamp-1">
                        {member.role}
                      </p>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        <div className="team-controls-row">
          <button
            type="button"
            className="team-nav-arrow team-nav-prev w-11 h-11 rounded-full bg-white border border-[#E0E0E0] shadow-sm flex items-center justify-center text-gray-700 hover:bg-[#5EB93B] hover:text-white transition-colors"
            aria-label="Previous team members"
            onClick={prevSlide}
          >
            &#8592;
          </button>

          <div className="team-pagination-dots flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`team-dot${idx === currentIndex ? ' is-active' : ''}`}
                aria-label={`Go to slide group ${idx + 1}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>

          <button
            type="button"
            className="team-nav-arrow team-nav-next w-11 h-11 rounded-full bg-white border border-[#E0E0E0] shadow-sm flex items-center justify-center text-gray-700 hover:bg-[#5EB93B] hover:text-white transition-colors"
            aria-label="Next team members"
            onClick={nextSlide}
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
}

