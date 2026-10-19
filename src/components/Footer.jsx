import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Footer({ onOpenFlipbook }) {
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  const isDonatePage = location.pathname.includes('/donate');

  return (
    <>
      {isDonatePage && (
        <section className="home-marquee" aria-label="Donate Now marquee">
          <div className="marquee-window">
            <div className="marquee-track">
              <div className="marquee-group">
                <span className="marquee-word">DONATE NOW</span>
                <span className="marquee-dot" aria-hidden="true" />
                <span className="marquee-word marquee-outline">DONATE NOW</span>
                <span className="marquee-dot" aria-hidden="true" />
                <span className="marquee-word">DONATE NOW</span>
                <span className="marquee-dot" aria-hidden="true" />
                <span className="marquee-word marquee-outline">DONATE NOW</span>
                <span className="marquee-dot" aria-hidden="true" />
              </div>
              <div className="marquee-group" aria-hidden="true">
                <span className="marquee-word">DONATE NOW</span>
                <span className="marquee-dot" />
                <span className="marquee-word marquee-outline">DONATE NOW</span>
                <span className="marquee-dot" />
                <span className="marquee-word">DONATE NOW</span>
                <span className="marquee-dot" />
                <span className="marquee-word marquee-outline">DONATE NOW</span>
                <span className="marquee-dot" />
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-identity">
              <Link className="footer-brand" to="/">
                <img src="/assets/images/logo/hol-logo.png" alt="HOL Foundation" width="70" height="98" />
              </Link>
              <p>Learning and opportunity in Lyari.</p>
              <span className="footer-place">
                <i aria-hidden="true" /> Lyari, Karachi
              </span>
            </div>

            <div className="footer-column footer-contact">
              <h3>Get in touch</h3>
              <address>Lyari, Karachi, Pakistan</address>
              <a className="footer-contact-link" href="tel:+923226300144">
                <i aria-hidden="true">&#9742;</i>
                <span>
                  <small>Call our team</small>
                  <strong>+92 322 6300144</strong>
                </span>
              </a>
              <a className="footer-contact-link" href="mailto:info@holwelfare.org">
                <i aria-hidden="true">&#9993;</i>
                <span>
                  <small>Email us</small>
                  <strong>info@holwelfare.org</strong>
                </span>
              </a>
            </div>

            <nav className="footer-column footer-explore" aria-label="Explore HOL">
              <h3>Explore HOL</h3>
              <div className="footer-links">
                <Link to="/">Home</Link>
                <Link to="/our-work">Our work</Link>
                <Link to="/our-board">Our Board</Link>
                <Link to="/our-journey">Our journey</Link>
                <Link to="/publications#annual-report">Annual Report</Link>
                <Link to="/donate">Donate</Link>
              </div>
            </nav>
          </div>

          <div className="footer-bottom">
            <p className="copyright">
              &#169; <span>{currentYear}</span> HOL Foundation. All rights reserved.
            </p>
            <span className="footer-bottom-note">
              Lyari <i /> Since 2014
            </span>
            <Link to="/contact" className="footer-home-link">
              Contact us <span aria-hidden="true">&#8599;</span>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
