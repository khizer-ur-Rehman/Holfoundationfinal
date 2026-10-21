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
              <nav className="footer-socials" aria-label="Follow HOL Foundation">
                <a href="https://www.facebook.com/holwelfare.org/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3a5 5 0 0 0-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1Z" /></svg>
                </a>
                <a href="https://www.instagram.com/holfoundations/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle className="footer-social-dot" cx="17.5" cy="6.5" r="1" /></svg>
                </a>
                <a href="https://www.tiktok.com/@holfoundation" target="_blank" rel="noopener noreferrer" aria-label="TikTok" title="TikTok">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3v11.2a4.2 4.2 0 1 1-3.5-4.1v3.5a.9.9 0 1 0 0 1.8c.6 0 1-.4 1-1V3h3.2c.3 2.4 1.7 4 4.3 4.3v3.3a8 8 0 0 1-5-2V3Z" /></svg>
                </a>
                <a href="https://www.youtube.com/channel/UC87D_eYmXERKTqKZEcSeIaw" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.5 12a31 31 0 0 0 .5 3.8 3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22.5 12a31 31 0 0 0-.5-3.8ZM10 15.2V8.8l5.5 3.2-5.5 3.2Z" /></svg>
                </a>
                <a href="https://www.linkedin.com/company/holwelfareorg/home/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9H2v13h3V9ZM3.5 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM22 14.2c0-3.9-2.1-5.7-4.8-5.7a4.2 4.2 0 0 0-3.8 2.1V9h-3v13h3v-7.2c0-1.9.4-3.8 2.8-3.8s2.5 2.2 2.5 3.9V22h3v-7.8Z" /></svg>
                </a>
              </nav>
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
            <span className="footer-credit">
              Designed &amp; Developed by{' '}
              <a href="https://iterativelab.lk/" target="_blank" rel="noopener noreferrer">
                Iterative Lab
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
