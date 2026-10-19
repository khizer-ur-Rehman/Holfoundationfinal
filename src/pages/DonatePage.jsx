import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

const causeOptions = [
  {
    id: '01',
    name: 'Sponsor a Child',
    amount: 3000,
    frequency: 'Monthly',
    priceText: 'Rs 3,000 / month',
    altText: 'Rs 36,000 yearly',
    description: 'Your monthly support helps a child access consistent learning and encouragement.'
  },
  {
    id: '02',
    name: 'Sponsor an Entrepreneur',
    amount: 5000,
    frequency: 'One-time',
    priceText: 'Rs 5,000 / course',
    altText: null,
    description: 'Help an aspiring entrepreneur build practical skills through a course.'
  },
  {
    id: '03',
    name: 'Sponsor a Teacher',
    amount: 30000,
    frequency: 'Monthly',
    priceText: 'Rs 30,000 / month',
    altText: 'Rs 360,000 yearly',
    description: 'Support the educators who help students learn and grow.'
  },
  {
    id: '04',
    name: 'Sponsor a Course & Uniform',
    amount: 6000,
    frequency: 'One-time',
    priceText: 'Rs 6,000 / child',
    altText: null,
    description: 'Help a child take part in a course with the uniform they need.'
  },
  {
    id: '05',
    name: 'Support a Single Mother',
    amount: 5000,
    frequency: 'Monthly',
    priceText: 'Rs 5,000 / month',
    altText: null,
    description: 'Offer practical monthly support to a single mother and her family.'
  }
];

export function DonatePage() {
  useScrollReveal();

  const [selectedCauseName, setSelectedCauseName] = useState('Sponsor a Child');
  const [amount, setAmount] = useState(3000);
  const [frequency, setFrequency] = useState('Monthly');
  const [customDescription, setCustomDescription] = useState(null);

  const selectedCause = causeOptions.find((c) => c.name === selectedCauseName);

  const formatPKR = (val) => {
    return 'Rs ' + new Intl.NumberFormat('en-PK').format(Number(val) || 0);
  };

  const handleCauseSelect = (cause) => {
    setSelectedCauseName(cause.name);
    setAmount(cause.amount);
    setFrequency(cause.frequency);
    setCustomDescription(null);
  };

  const handleBrochureCardClick = (title, amt) => {
    setAmount(amt);
    const matching = causeOptions.find((c) => c.name === title);
    if (matching) {
      setSelectedCauseName(matching.name);
      setFrequency(matching.frequency);
      setCustomDescription(null);
    } else {
      setSelectedCauseName(title);
      setFrequency('One-time');
      setCustomDescription(`Support ${title} with your impactful contribution.`);
    }
    const el = document.getElementById('giving-options');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const currentDescription =
    customDescription ||
    (selectedCause
      ? selectedCause.description
      : 'Your contribution helps provide education and opportunities across Lyari.');

  return (
    <main className="donate-page">
      <section className="unified-hero" aria-labelledby="donate-hero-title">
        <div className="unified-hero-container">
          <div className="unified-hero-grid">
            <div className="unified-hero-copy">
              <h1 id="donate-hero-title" className="unified-hero-title">
                Make a Difference Today.
              </h1>
              <p className="unified-hero-lead">
                Every contribution directly empowers children, supports educators, and expands life-changing learning opportunities across Lyari, Karachi.
              </p>
              <div className="unified-hero-actions">
                <a className="button gold" href="#giving-options">
                  Choose A Cause <span aria-hidden="true">&#8595;</span>
                </a>
                <Link className="unified-hero-link" to="/contact">
                  Contact Us <span aria-hidden="true">&#8599;</span>
                </Link>
              </div>
            </div>
            <figure className="unified-hero-visual">
              <img
                src="/assets/images/stories/school-preparatory-support.jpg"
                alt="A student receiving school supplies and support from a teacher in Lyari"
                width="1280"
                height="960"
                fetchPriority="high"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* Brochure Sponsorship Opportunities Section */}
      <section className="brochure-sponsorship-section" aria-labelledby="brochure-title">
        <div className="container">
          <div className="brochure-header-top">
            <div className="brochure-brand-badge">
              <img
                src="/assets/images/logo/hol-logo.png"
                alt="HOL Foundation Logo"
                width="56"
                height="56"
                loading="lazy"
              />
              <div className="brochure-brand-text">
                <strong>HOL FOUNDATION</strong>
                <span className="brochure-urdu-motto" dir="rtl">
                  ہمارا کام تب ختم ہوگا، جب ہر بچے کے ہاتھ میں قلم ہوگا۔
                </span>
              </div>
            </div>
            <h2 className="brochure-main-title" id="brochure-title">
              DONATE NOW!
            </h2>
          </div>

          <div className="brochure-quote-card">
            <span className="brochure-quote-mark quote-open" aria-hidden="true">&ldquo;</span>
            <p className="brochure-quote-text">
              A single donation can open the door to education and give a child the chance to build a brighter future.
            </p>
            <span className="brochure-quote-mark quote-close" aria-hidden="true">&rdquo;</span>
          </div>

          <div className="brochure-boxes-grid" role="list" aria-label="Sponsorship options from brochure">
            {/* 1. Sponsor a Child */}
            <a
              href="#giving-options"
              className="brochure-card"
              role="listitem"
              onClick={(e) => {
                e.preventDefault();
                handleBrochureCardClick('Sponsor a Child', 3000);
              }}
            >
              <div className="brochure-card-info">
                <strong className="brochure-card-title">Sponsor a Child</strong>
                <span className="brochure-card-amount highlight">Rs. 3,000/- month</span>
                <span className="brochure-card-amount">Rs. 36,000/- year</span>
              </div>
              <div className="brochure-card-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M24 6L6 15l18 9 18-9-18-9z" />
                  <path d="M42 15v9" />
                  <path d="M12 18v7c0 6.6 5.4 12 12 12s12-5.4 12-12v-7" />
                  <path d="M16 38c2.5-3 5-4.5 8-4.5s5.5 1.5 8 4.5" />
                  <path d="M14 43l10-4 10 4" />
                </svg>
              </div>
            </a>

            {/* 2. Sponsor a Classroom */}
            <a
              href="#giving-options"
              className="brochure-card"
              role="listitem"
              onClick={(e) => {
                e.preventDefault();
                handleBrochureCardClick('Sponsor a Classroom', 300000);
              }}
            >
              <div className="brochure-card-info">
                <strong className="brochure-card-title">Sponsor a Classroom</strong>
                <span className="brochure-card-amount highlight">Rs. 300,000/-</span>
                <span className="brochure-card-amount">Renovation Work</span>
              </div>
              <div className="brochure-card-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="14" y="6" width="20" height="14" rx="2" />
                  <line x1="24" y1="20" x2="24" y2="24" />
                  <line x1="18" y1="24" x2="30" y2="24" />
                  <rect x="6" y="27" width="14" height="7" rx="1.5" />
                  <path d="M9 34v8m8-8v8" />
                  <rect x="28" y="27" width="14" height="7" rx="1.5" />
                  <path d="M31 34v8m8-8v8" />
                </svg>
              </div>
            </a>

            {/* 3. Sponsor a Teacher */}
            <a
              href="#giving-options"
              className="brochure-card"
              role="listitem"
              onClick={(e) => {
                e.preventDefault();
                handleBrochureCardClick('Sponsor a Teacher', 40000);
              }}
            >
              <div className="brochure-card-info">
                <strong className="brochure-card-title">Sponsor a Teacher</strong>
                <span className="brochure-card-amount highlight">Rs. 40,000/-month</span>
                <span className="brochure-card-amount">Rs. 480,000/-year</span>
              </div>
              <div className="brochure-card-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M24 7L8 15l16 8 16-8-16-8z" />
                  <path d="M40 15v8" />
                  <circle cx="24" cy="25" r="5" />
                  <path d="M12 41c0-6 5.4-10 12-10s12 4 12 10" />
                  <path d="M24 31v7m-3-5l3 5 3-5" />
                </svg>
              </div>
            </a>

            {/* 4. Sponsor a LED */}
            <a
              href="#giving-options"
              className="brochure-card"
              role="listitem"
              onClick={(e) => {
                e.preventDefault();
                handleBrochureCardClick('Sponsor a LED', 110000);
              }}
            >
              <div className="brochure-card-info">
                <strong className="brochure-card-title">Sponsor a LED</strong>
                <span className="brochure-card-amount highlight">Rs. 110,000/-</span>
              </div>
              <div className="brochure-card-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="6" y="10" width="36" height="23" rx="3" />
                  <line x1="18" y1="33" x2="15" y2="40" />
                  <line x1="30" y1="33" x2="33" y2="40" />
                  <line x1="12" y1="40" x2="36" y2="40" />
                  <text x="24" y="24" textAnchor="middle" fontSize="9" fontWeight="800" fill="currentColor" stroke="none">TV</text>
                </svg>
              </div>
            </a>

            {/* 5. Sponsor a Laptop */}
            <a
              href="#giving-options"
              className="brochure-card"
              role="listitem"
              onClick={(e) => {
                e.preventDefault();
                handleBrochureCardClick('Sponsor a Laptop', 50000);
              }}
            >
              <div className="brochure-card-info">
                <strong className="brochure-card-title">Sponsor a Laptop</strong>
                <span className="brochure-card-amount highlight">Rs. 50,000/-</span>
              </div>
              <div className="brochure-card-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="10" y="10" width="28" height="20" rx="2" />
                  <line x1="14" y1="26" x2="34" y2="26" />
                  <path d="M5 34h38a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" />
                  <line x1="20" y1="34" x2="28" y2="34" />
                </svg>
              </div>
            </a>

            {/* 6. Sponsor a Children Desk */}
            <a
              href="#giving-options"
              className="brochure-card"
              role="listitem"
              onClick={(e) => {
                e.preventDefault();
                handleBrochureCardClick('Sponsor a Children Desk', 8000);
              }}
            >
              <div className="brochure-card-info">
                <strong className="brochure-card-title">Sponsor a Children Desk</strong>
                <span className="brochure-card-amount highlight">Rs. 8,000/-</span>
              </div>
              <div className="brochure-card-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="20" y="10" width="22" height="10" rx="2" />
                  <path d="M38 20v22M24 20v22" />
                  <path d="M8 20h8a2 2 0 0 1 2 2v10H6V22a2 2 0 0 1 2-2z" />
                  <path d="M10 32v10M16 32v10" />
                  <line x1="18" y1="30" x2="24" y2="30" />
                </svg>
              </div>
            </a>

            {/* 7. Sponsor a Uniform */}
            <a
              href="#giving-options"
              className="brochure-card brochure-card-7"
              role="listitem"
              onClick={(e) => {
                e.preventDefault();
                handleBrochureCardClick('Sponsor a Uniform', 3000);
              }}
            >
              <div className="brochure-card-info">
                <strong className="brochure-card-title">Sponsor a Uniform</strong>
                <span className="brochure-card-amount highlight">Rs. 3,000/-</span>
              </div>
              <div className="brochure-card-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 8h16l8 8-4 5-6-3v22H18V18l-6 3-4-5 8-8z" />
                  <path d="M21 8l3 5 3-5" />
                  <path d="M24 13l2 8-2 6-2-6 2-8z" />
                </svg>
              </div>
            </a>

            {/* 8. Sponsor a Course */}
            <a
              href="#giving-options"
              className="brochure-card brochure-card-8"
              role="listitem"
              onClick={(e) => {
                e.preventDefault();
                handleBrochureCardClick('Sponsor a Course', 2500);
              }}
            >
              <div className="brochure-card-info">
                <strong className="brochure-card-title">Sponsor a Course</strong>
                <span className="brochure-card-amount highlight">Rs. 2,500/-</span>
              </div>
              <div className="brochure-card-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M8 14l16-6 16 6-16 6-16-6z" />
                  <path d="M8 22l16 6 16-6" />
                  <path d="M8 30l16 6 16-6" />
                  <path d="M8 38l16 6 16-6" />
                </svg>
              </div>
            </a>
          </div>

          <div className="brochure-bottom-feature">
            <figure className="brochure-photo-frame">
              <img
                src="/assets/images/footer/footerimage.jpeg"
                alt="HOL Foundation founders Hunain Abbas and Areeba Hunain sitting with smiling students"
                loading="lazy"
              />
            </figure>
            <div className="brochure-contact-strip">
              <a href="tel:+923226300144" className="brochure-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+92 322 6300144</span>
              </a>
              <a href="https://holwelfare.org" target="_blank" rel="noopener noreferrer" className="brochure-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span>www.holwelfare.org</span>
              </a>
              <div className="brochure-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>holwelfare.org</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Giving Options Section */}
      <section className="section donate-section" id="giving-options">
        <div className="container">
          <div className="donate-heading">
            <h2 className="section-title">Every contribution moves learning forward.</h2>
            <p>Select a giving option to see its suggested amount, or choose a custom amount that works for you.</p>
          </div>
          <div className="donate-layout">
            <div className="donate-main-card">
              <div className="donate-step-label">
                <span>1</span>
                <div>
                  <strong>Choose a cause</strong>
                  <small>Select the support you’d like to provide.</small>
                </div>
              </div>
              <div className="cause-grid" role="group" aria-label="Choose a donation cause">
                {causeOptions.map((c) => {
                  const isSelected = selectedCauseName === c.name;
                  return (
                    <button
                      key={c.id}
                      className={`cause-option ${isSelected ? 'is-selected' : ''}`}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => handleCauseSelect(c)}
                    >
                      <span className="cause-icon" aria-hidden="true">{c.id}</span>
                      <span className="cause-name">{c.name}</span>
                      <span className="cause-price">
                        {c.priceText.split('/')[0]} <small>/{c.priceText.split('/')[1]}</small>
                      </span>
                      {c.altText && <span className="cause-alt">{c.altText}</span>}
                    </button>
                  );
                })}
              </div>

              <div className="donate-divider" />
              <div className="donate-step-label">
                <span>2</span>
                <div>
                  <strong>Set your amount</strong>
                  <small>Use the suggested amount or enter a custom gift.</small>
                </div>
              </div>
              <div className="amount-controls">
                <div className="currency-amount">
                  <label htmlFor="donation-amount">Your donation (PKR)</label>
                  <div className="amount-input-wrap">
                    <span aria-hidden="true">Rs</span>
                    <input
                      id="donation-amount"
                      type="number"
                      min="1"
                      step="1"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      inputMode="numeric"
                      aria-describedby="donation-frequency"
                    />
                  </div>
                </div>
                <div className="frequency-choice">
                  <label htmlFor="donation-frequency">Giving frequency</label>
                  <select
                    id="donation-frequency"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                  >
                    <option>Monthly</option>
                    <option>Yearly</option>
                    <option>One-time</option>
                  </select>
                </div>
              </div>
              <p className="donate-selection" aria-live="polite">
                Selected: <strong>{selectedCauseName}</strong>
              </p>
              <a className="button gold donate-continue" href="#bank-details">
                Continue to bank details <span aria-hidden="true">&#8595;</span>
              </a>
              <p className="secure-note">
                <span aria-hidden="true">&#9679;</span> Your donation is completed directly through your bank. This page does not collect payment information.
              </p>
            </div>

            <aside className="donate-aside">
              <div className="impact-card">
                <div className="impact-card-mark" aria-hidden="true">HOL</div>
                <h3>{selectedCauseName}</h3>
                <p>{currentDescription}</p>
                <div className="impact-card-amount">
                  <span>Suggested gift</span>
                  <strong>{formatPKR(amount)}</strong>
                  <small>{frequency}</small>
                </div>
                <a href="#bank-details" className="text-link">
                  See payment options <span aria-hidden="true">&#8599;</span>
                </a>
              </div>
              <div className="steps-card">
                <ol>
                  <li>
                    <span>1</span>
                    <div>
                      <strong>Choose your impact</strong>
                      <small>Pick a cause and amount.</small>
                    </div>
                  </li>
                  <li>
                    <span>2</span>
                    <div>
                      <strong>Make a transfer</strong>
                      <small>Use the account that suits your gift.</small>
                    </div>
                  </li>
                  <li>
                    <span>3</span>
                    <div>
                      <strong>Let us know</strong>
                      <small>Email your receipt so we can acknowledge it.</small>
                    </div>
                  </li>
                </ol>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Bank Details Section */}
      <section className="section bank-section" id="bank-details">
        <div className="container">
          <div className="bank-heading">
            <h2 className="section-title">Donate via bank transfer</h2>
            <p>
              You can support our mission by making a direct bank transfer using the details below. Your contribution helps us continue empowering communities through education.
            </p>
          </div>
          <div className="bank-grid">
            <article className="bank-card bank-card-featured">
              <div className="bank-card-top">
                <span className="account-icon" aria-hidden="true">PK</span>
                <span className="account-tag">Donations</span>
              </div>
              <h3>Donation Account</h3>
              <dl>
                <div>
                  <dt>Bank name</dt>
                  <dd>Faysal Bank</dd>
                </div>
                <div>
                  <dt>Account title</dt>
                  <dd>House of Learning Foundation Pakistan (Donation)</dd>
                </div>
                <div>
                  <dt>Account number</dt>
                  <dd className="account-number">3554436000014309</dd>
                </div>
                <div>
                  <dt>IBAN</dt>
                  <dd className="account-number">PK89FAYS3554436000014309</dd>
                </div>
              </dl>
            </article>

            <article className="bank-card">
              <div className="bank-card-top">
                <span className="account-icon" aria-hidden="true">PK</span>
                <span className="account-tag zakat-tag">Zakat</span>
              </div>
              <h3>Zakat Account</h3>
              <dl>
                <div>
                  <dt>Bank name</dt>
                  <dd>Faysal Bank</dd>
                </div>
                <div>
                  <dt>Account title</dt>
                  <dd>House of Learning Foundation Pakistan (Zakat)</dd>
                </div>
                <div>
                  <dt>Account number</dt>
                  <dd className="account-number">3554499000019309</dd>
                </div>
                <div>
                  <dt>IBAN</dt>
                  <dd className="account-number">PK91FAYS3554499000019309</dd>
                </div>
              </dl>
            </article>

            <article className="bank-card">
              <div className="bank-card-top">
                <span className="account-icon" aria-hidden="true">PK</span>
                <span className="account-tag general-tag">General</span>
              </div>
              <h3>General Account</h3>
              <dl>
                <div>
                  <dt>Bank name</dt>
                  <dd>Meezan Bank</dd>
                </div>
                <div>
                  <dt>Account title</dt>
                  <dd>House of Learning Foundation Pakistan</dd>
                </div>
                <div>
                  <dt>Account number</dt>
                  <dd className="account-number">01540114151632</dd>
                </div>
              </dl>
            </article>
          </div>
          <div className="international-card">
            <div>
              <h3>International payment</h3>
              <p>
                Contact our team for the current international transfer options. We’ll guide you through the best way to send your contribution.
              </p>
            </div>
            <a
              className="button outline"
              href="mailto:info@holwelfare.org?subject=International%20donation%20details"
            >
              Request international details <span aria-hidden="true">&#8599;</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
