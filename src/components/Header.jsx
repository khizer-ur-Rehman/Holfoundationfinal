import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Our Work', href: '/our-work' },
  { label: 'Our Board', href: '/our-board' },
  { label: 'Our Journey', href: '/our-journey' },
  { label: 'News & Stories', href: '/news' },
  { label: 'Careers', href: '/careers' },
  { label: 'Publications', href: '/publications' },
  { label: 'Contact', href: '/contact' },
];

export function Header({ onOpenFlipbook }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile nav on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen]);

  const toggleMobileNav = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const isCurrent = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label="HOL Foundation Home">
          <img src="/assets/images/logo/hol-logo.png" alt="HOL Foundation" width="62" height="62" />
        </Link>
        <nav className="main-navigation" aria-label="Main navigation">
          {navItems.map((item) => {
            if (item.isExternal) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-nav-target={item.label}
                  onClick={(e) => {
                    if (item.isFlipbook && onOpenFlipbook) {
                      e.preventDefault();
                      onOpenFlipbook();
                    }
                  }}
                >
                  {item.label}
                </a>
              );
            }
            return (
              <Link
                key={item.label}
                to={item.href}
                aria-current={isCurrent(item.href) ? 'page' : undefined}
                className={isCurrent(item.href) ? 'is-active' : ''}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link className="button gold" to="/donate">
          Donate Now <span aria-hidden="true">&#8599;</span>
        </Link>
        <button
          className="menu-toggle"
          aria-label={isMobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-nav"
          onClick={toggleMobileNav}
        >
          {isMobileOpen ? '\u00D7' : '\u2630'}
        </button>
      </div>

      <nav
        id="mobile-nav"
        className={`mobile-panel ${isMobileOpen ? 'open' : ''}`}
        aria-label="Mobile navigation"
      >
        <div className="mobile-panel-top">
          <span className="mobile-panel-eyebrow">Explore Pages</span>
        </div>
        <div className="mobile-nav-grid">
          {navItems.map((item) => {
            if (item.isExternal) {
              return (
                <a
                  key={item.label}
                  className="mobile-nav-link"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (item.isFlipbook && onOpenFlipbook) {
                      e.preventDefault();
                      setIsMobileOpen(false);
                      onOpenFlipbook();
                    }
                  }}
                >
                  <span className="mobile-nav-label">{item.label}</span>
                  <span className="mobile-nav-arrow" aria-hidden="true">&#8599;</span>
                </a>
              );
            }
            return (
              <Link
                key={item.label}
                className="mobile-nav-link"
                to={item.href}
                aria-current={isCurrent(item.href) ? 'page' : undefined}
                onClick={() => setIsMobileOpen(false)}
              >
                <span className="mobile-nav-label">{item.label}</span>
                <span className="mobile-nav-arrow" aria-hidden="true">&#8599;</span>
              </Link>
            );
          })}
        </div>
        <Link
          className="button gold mobile-donate-btn"
          to="/donate"
          onClick={() => setIsMobileOpen(false)}
        >
          Donate Now <span aria-hidden="true">&#8599;</span>
        </Link>
      </nav>
    </header>
  );
}
