import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function ContactPage() {
  useScrollReveal();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'General inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[${formData.topic}] Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\nTopic: ${formData.topic}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:info@holwelfare.org?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <main className="contact-page">
      <section className="unified-hero" aria-labelledby="contact-title">
        <div className="unified-hero-container">
          <div className="unified-hero-grid">
            <div className="unified-hero-copy">
              <h1 id="contact-title" className="unified-hero-title">
                Let’s start a conversation.
              </h1>
              <p className="unified-hero-lead">
                Reach out to learn more about our schools, partnerships, volunteering, or ways to support community education in Lyari.
              </p>
              <div className="unified-hero-actions">
                <a className="button gold" href="#contact-details">
                  Contact Information <span aria-hidden="true">&#8595;</span>
                </a>
                <a className="unified-hero-link" href="mailto:info@holwelfare.org">
                  info@holwelfare.org <span aria-hidden="true">&#8599;</span>
                </a>
              </div>
            </div>
            <figure className="unified-hero-visual">
              <img
                src="/assets/images/contact/kb-campus-child-14.jpeg"
                alt="Students of HOL KB Campus in their school uniforms outside the campus in Lyari"
                width="2016"
                height="1512"
                fetchPriority="high"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="contact-options" id="contact-details" aria-label="Contact details">
        <div className="contact-shell contact-card-grid">
          <article className="contact-card contact-card-address">
            <span className="contact-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M19 10.2c0 5-7 11-7 11s-7-6-7-11a7 7 0 1 1 14 0Z" />
                <circle cx="12" cy="10" r="2.2" />
              </svg>
            </span>
            <div className="contact-card-copy">
              <h2>Our address</h2>
              <a
                className="contact-detail-link"
                href="https://www.google.com/maps/search/?api=1&query=Bukhari+Terrace,+Mezzanine+Floor,+Opp.+Mariam+Masjid,+Fida+Hussain+Shaikha+Road,+Lyari,+Karachi"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bukhari Terrace, Mezzanine Floor, Opp. Mariam Masjid, Fida Hussain Shaikha Road, Lyari, Karachi{' '}
                <span>
                  Get directions <b aria-hidden="true">↗</b>
                </span>
              </a>
            </div>
          </article>

          <article className="contact-card contact-card-phone">
            <span className="contact-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M7.2 3.5 10 7.4 8.1 9.3a14.7 14.7 0 0 0 6.6 6.6l1.9-1.9 3.9 2.8-.9 3a1.7 1.7 0 0 1-1.8 1.2A18.8 18.8 0 0 1 3 6.4a1.7 1.7 0 0 1 1.2-1.8l3-1.1Z" />
                <path d="M14 4a6 6 0 0 1 6 6M14 1a9 9 0 0 1 9 9" />
              </svg>
            </span>
            <div className="contact-card-copy">
              <h2>Phone</h2>
              <a className="contact-detail-link" href="tel:+923226300144">
                +92 322 6300144
              </a>
              <a className="contact-detail-secondary" href="tel:+922199336014">
                021-99336014 <span>Call <b aria-hidden="true">↗</b></span>
              </a>
            </div>
          </article>

          <article className="contact-card contact-card-email">
            <span className="contact-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m4 7 8 6 8-6" />
              </svg>
            </span>
            <div className="contact-card-copy">
              <h2>Email</h2>
              <a className="contact-detail-link" href="mailto:info@holwelfare.org">
                info@holwelfare.org <span>Send an email <b aria-hidden="true">↗</b></span>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="contact-message-section" aria-labelledby="contact-form-title">
        <div className="contact-shell contact-message-layout">
          <div className="contact-message-copy">
            <h2 id="contact-form-title" style={{ color: '#ffffff' }}>
              We’d love to hear from you.
            </h2>
            <p>Questions about our programs, partnerships, volunteering, or support? Send us a message.</p>
            <div className="contact-copy-rule" aria-hidden="true" />
            <span className="contact-copy-location">HOL Foundation <b>·</b> Lyari, Karachi</span>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-heading">
              <h3>Tell us how we can help.</h3>
            </div>
            <div className="contact-form-grid">
              <div className="contact-field">
                <label htmlFor="contact-name">
                  Your name <span>*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-email">
                  Email address <span>*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-phone">Phone number</label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Optional"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-topic">I’m reaching out about</label>
                <select
                  id="contact-topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                >
                  <option>General inquiry</option>
                  <option>Programs</option>
                  <option>Partnership</option>
                  <option>Volunteering</option>
                  <option>Donation and support</option>
                </select>
              </div>
              <div className="contact-field contact-field-wide">
                <label htmlFor="contact-message">
                  Your message <span>*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="4"
                  placeholder="Write your message here"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact-submit-row contact-field-wide">
                <button className="contact-submit" type="submit">
                  Send message <span aria-hidden="true">↗</span>
                </button>
                <p className="contact-form-note" aria-live="polite">
                  {submitted
                    ? 'Thank you! Your email client has been prepared with your message.'
                    : 'Your email app will open with your message ready to send.'}
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
