import React from 'react';
import { Link } from 'react-router-dom';
import { TeamCarousel } from '../components/TeamCarousel';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function OurBoardPage() {
  useScrollReveal();

  return (
    <main>
      <section className="unified-hero" aria-labelledby="directors-hero-title">
        <div className="unified-hero-container">
          <div className="unified-hero-grid">
            <div className="unified-hero-copy">
              <h1 id="directors-hero-title" className="unified-hero-title">
                Leadership rooted in purpose.
              </h1>
              <p className="unified-hero-lead">
                Guiding HOL Foundation with integrity, empathy, and strategic dedication to empower children and families across Lyari, Karachi.
              </p>
              <div className="unified-hero-actions">
                <a className="button gold" href="#meet-our-team">
                  Meet The Team <span aria-hidden="true">&#8595;</span>
                </a>
                <Link className="unified-hero-link" to="/contact">
                  Contact Us <span aria-hidden="true">&#8599;</span>
                </Link>
              </div>
            </div>
            <figure className="unified-hero-visual">
              <img
                src="/assets/images/team/founder-hunain-community.webp"
                alt="HOL Foundation leadership and founders working alongside community members"
                width="1280"
                height="960"
                fetchPriority="high"
              />
            </figure>
          </div>
        </div>
      </section>

      <TeamCarousel />
    </main>
  );
}
