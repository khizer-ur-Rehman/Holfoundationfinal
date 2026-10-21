import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { FlipbookModal } from './components/FlipbookModal';

// Pages
import { HomePage } from './pages/HomePage';
import { OurWorkPage } from './pages/OurWorkPage';
import { OurBoardPage } from './pages/OurBoardPage';
import { OurJourneyPage } from './pages/OurJourneyPage';
import { DonatePage } from './pages/DonatePage';
import { ContactPage } from './pages/ContactPage';
import { CareersPage } from './pages/CareersPage';
import { NewsPage } from './pages/NewsPage';
import { PublicationsPage } from './pages/PublicationsPage';
import { AnnualReportPage } from './pages/AnnualReportPage';
import { HolKbCampusPage } from './pages/HolKbCampusPage';
import { LyariAcademyPage } from './pages/LyariAcademyPage';
import { HolPreschoolPage } from './pages/HolPreschoolPage';
import { SchoolPreparatoryPage } from './pages/SchoolPreparatoryPage';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [isFlipbookOpen, setIsFlipbookOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateRaf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    window.__lenis = lenis;

    return () => {
      delete window.__lenis;
      gsap.ticker.remove(updateRaf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const footer = document.querySelector('.site-footer');
    if (!footer || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      document.body.classList.toggle('footer-in-view', entry.isIntersecting);
    });
    observer.observe(footer);

    return () => {
      observer.disconnect();
      document.body.classList.remove('footer-in-view');
    };
  }, []);

  const handleOpenFlipbook = () => setIsFlipbookOpen(true);
  const handleCloseFlipbook = () => setIsFlipbookOpen(false);

  return (
    <div className="site-wrapper">
      <ScrollToTop />
      <Header onOpenFlipbook={handleOpenFlipbook} />

      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />
        <Route path="/index.html" element={<HomePage />} />

        {/* Core Pages */}
        <Route path="/our-work" element={<OurWorkPage />} />
        <Route path="/our-work.html" element={<OurWorkPage />} />

        <Route path="/our-board" element={<OurBoardPage />} />
        <Route path="/our-board.html" element={<OurBoardPage />} />
        <Route path="/board-of-directors" element={<OurBoardPage />} />
        <Route path="/board-of-directors.html" element={<OurBoardPage />} />

        <Route path="/our-journey" element={<OurJourneyPage />} />
        <Route path="/our-journey.html" element={<OurJourneyPage />} />

        <Route path="/donate" element={<DonatePage />} />
        <Route path="/donate.html" element={<DonatePage />} />

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/contact.html" element={<ContactPage />} />

        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers.html" element={<CareersPage />} />

        <Route path="/news" element={<NewsPage />} />
        <Route path="/news.html" element={<NewsPage />} />

        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/publications.html" element={<PublicationsPage />} />

        <Route path="/annual-report" element={<Navigate to="/publications#annual-report" replace />} />
        <Route path="/annual-report.html" element={<Navigate to="/publications#annual-report" replace />} />

        {/* Programs */}
        <Route path="/programs/hol-kb-campus" element={<HolKbCampusPage />} />
        <Route path="/programs/hol-kb-campus.html" element={<HolKbCampusPage />} />
        <Route path="/gbss-kara-bhai-karim-jee" element={<HolKbCampusPage />} />
        <Route path="/gbss-kara-bhai-karim-jee.html" element={<HolKbCampusPage />} />
        <Route path="/kara-bhai-report" element={<HolKbCampusPage />} />
        <Route path="/kara-bhai-report/index.html" element={<HolKbCampusPage />} />

        <Route path="/programs/lyari-entrepreneur-academy" element={<LyariAcademyPage />} />
        <Route path="/programs/lyari-entrepreneur-academy.html" element={<LyariAcademyPage />} />

        <Route path="/programs/hol-preschool" element={<HolPreschoolPage />} />
        <Route path="/programs/hol-preschool.html" element={<HolPreschoolPage />} />

        <Route path="/programs/school-preparatory-program" element={<SchoolPreparatoryPage />} />
        <Route path="/programs/school-preparatory-program.html" element={<SchoolPreparatoryPage />} />

        {/* Catch-all redirect to Home */}
        <Route path="*" element={<HomePage />} />
      </Routes>

      <Footer onOpenFlipbook={handleOpenFlipbook} />
      <FlipbookModal isOpen={isFlipbookOpen} onClose={handleCloseFlipbook} />
    </div>
  );
}
