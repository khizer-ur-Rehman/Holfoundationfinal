import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { HEYZINE_REPORT_URL } from '../components/FlipbookModal';

export function AnnualReportPage() {
  useScrollReveal();

  return (
    <main className="annual-report-page">
      <section className="unified-hero" aria-labelledby="report-hero-title">
        <div className="unified-hero-container">
          <div className="unified-hero-grid">
            <div className="unified-hero-copy">
              <h1 id="report-hero-title" className="unified-hero-title">
                Interactive Annual Report.
              </h1>
              <p className="unified-hero-lead">
                Explore our organizational journey, educational impact metrics, and transparent reporting through our interactive digital flipbook.
              </p>
              <div className="unified-hero-actions">
                <a
                  href={HEYZINE_REPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button gold"
                >
                  Open Full Window <span aria-hidden="true">&#8599;</span>
                </a>
                <Link className="unified-hero-link" to="/publications">
                  View Documents <span aria-hidden="true">&#8599;</span>
                </Link>
              </div>
            </div>
            <figure className="unified-hero-visual">
              <img
                src="/assets/images/about/kb-campus-community-event.webp"
                alt="Community members and students gathered at HOL KB Campus in Lyari"
                width="1280"
                height="960"
                fetchPriority="high"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="section report-viewer-section" aria-label="Interactive Annual Report Flipbook">
        <div className="container">
          <div className="report-viewer-card">
            <div className="report-viewer-toolbar">
              <div className="report-toolbar-info">
                <span className="report-badge">Interactive Flipbook</span>
                <h2 className="report-toolbar-title">HOL Foundation Comprehensive Report</h2>
              </div>
              <div className="report-toolbar-actions">
                <a
                  href={HEYZINE_REPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button gold"
                >
                  Open in Full Window <span aria-hidden="true">&#8599;</span>
                </a>
              </div>
            </div>
            <div className="report-frame-container">
              <iframe
                src={HEYZINE_REPORT_URL}
                title="HOL Foundation Annual Report Interactive Flipbook"
                className="report-iframe"
                allow="fullscreen"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="report-viewer-footer">
              <p>Use your mouse, arrows, or swipe to turn pages. Click the full-window button above for expanded view.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
