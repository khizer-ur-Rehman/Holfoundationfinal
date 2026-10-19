import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function CareersPage() {
  useScrollReveal();

  const [activeTab, setActiveTab] = useState('jobs');
  const [jobForm, setJobForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    profile: '',
    intro: ''
  });
  const [internForm, setInternForm] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    field: '',
    availability: 'Flexible',
    intro: ''
  });
  const [volForm, setVolForm] = useState({
    name: '',
    email: '',
    phone: '',
    area: '',
    availability: 'Flexible',
    intro: ''
  });

  const handleJobSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Job Application: ${jobForm.role} - ${jobForm.name}`);
    const body = encodeURIComponent(
      `Full Name: ${jobForm.name}\nEmail: ${jobForm.email}\nPhone: ${jobForm.phone}\nRole of Interest: ${jobForm.role}\nCV/Profile Link: ${jobForm.profile}\n\nIntroduction:\n${jobForm.intro}`
    );
    window.location.href = `mailto:info@holwelfare.org?subject=${subject}&body=${body}`;
  };

  const handleInternSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Internship Application: ${internForm.field} - ${internForm.name}`);
    const body = encodeURIComponent(
      `Full Name: ${internForm.name}\nEmail: ${internForm.email}\nPhone: ${internForm.phone}\nInstitution: ${internForm.institution}\nArea of Interest: ${internForm.field}\nAvailability: ${internForm.availability}\n\nIntroduction:\n${internForm.intro}`
    );
    window.location.href = `mailto:info@holwelfare.org?subject=${subject}&body=${body}`;
  };

  const handleVolSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Volunteer Application: ${volForm.area} - ${volForm.name}`);
    const body = encodeURIComponent(
      `Full Name: ${volForm.name}\nEmail: ${volForm.email}\nPhone: ${volForm.phone}\nArea of Interest: ${volForm.area}\nAvailability: ${volForm.availability}\n\nIntroduction:\n${volForm.intro}`
    );
    window.location.href = `mailto:info@holwelfare.org?subject=${subject}&body=${body}`;
  };

  const openPathway = (tab) => {
    setActiveTab(tab);
    const el = document.getElementById('career-applications');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="careers-page">
      <section className="unified-hero" aria-labelledby="career-title">
        <div className="unified-hero-container">
          <div className="unified-hero-grid">
            <div className="unified-hero-copy">
              <h1 id="career-title" className="unified-hero-title">
                Bring your skills. Grow opportunity.
              </h1>
              <p className="unified-hero-lead">
                Help open new paths for children, youth, and families in Lyari. Discover open positions, educator roles, internships, and volunteering opportunities.
              </p>
              <div className="unified-hero-actions">
                <a className="button gold" href="#career-pathways">
                  Find Your Pathway <span aria-hidden="true">&#8595;</span>
                </a>
                <Link className="unified-hero-link" to="/contact">
                  Contact Us <span aria-hidden="true">&#8599;</span>
                </Link>
              </div>
            </div>
            <figure className="unified-hero-visual">
              <img
                src="/assets/images/about/kb-campus-team.jpeg"
                alt="HOL educators and campus team gathered at KB Campus in Lyari"
                width="1280"
                height="960"
                fetchPriority="high"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="career-pathways" id="career-pathways" aria-labelledby="career-pathways-title">
        <div className="career-shell">
          <header className="career-section-heading">
            <div>
              <h2 id="career-pathways-title">Ways to get involved.</h2>
            </div>
            <p>Choose how you would like to contribute. We will take it from there.</p>
          </header>
          <div className="career-opportunity-grid">
            <article className="career-opportunity-card career-opportunity-job">
              <span className="career-opportunity-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3 12h18M10 12v2h4v-2" />
                </svg>
              </span>
              <h3>Job Opportunities</h3>
              <p>Share your experience and the kind of role you are looking for.</p>
              <button
                type="button"
                className="career-card-link"
                style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', textAlign: 'left' }}
                onClick={() => openPathway('jobs')}
              >
                Explore jobs <span aria-hidden="true">&#8599;</span>
              </button>
            </article>

            <article className="career-opportunity-card career-opportunity-internship">
              <span className="career-opportunity-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2ZM8 7h8M8 11h8" />
                </svg>
              </span>
              <h3>Internship Opportunities</h3>
              <p>Build practical experience while supporting education and community work.</p>
              <button
                type="button"
                className="career-card-link"
                style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', textAlign: 'left' }}
                onClick={() => openPathway('internships')}
              >
                Explore internships <span aria-hidden="true">&#8599;</span>
              </button>
            </article>

            <article className="career-opportunity-card career-opportunity-volunteer">
              <span className="career-opportunity-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
                  <path d="M12 9v6M9 12h6" />
                </svg>
              </span>
              <h3>Volunteer Opportunities</h3>
              <p>Offer your time, skills or support to programs in Lyari.</p>
              <button
                type="button"
                className="career-card-link"
                style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', textAlign: 'left' }}
                onClick={() => openPathway('volunteers')}
              >
                Explore volunteering <span aria-hidden="true">&#8599;</span>
              </button>
            </article>
          </div>
        </div>
      </section>

      <section className="career-application-section" id="career-applications" aria-labelledby="career-application-title">
        <div className="career-shell career-application-layout">
          <div className="career-application-intro">
            <h2 id="career-application-title">Tell us what you bring.</h2>
            <p>Pick a pathway and send a short introduction. Our team will follow up by email.</p>
            <a className="career-contact-email" href="mailto:info@holwelfare.org">
              info@holwelfare.org <span aria-hidden="true">&#8599;</span>
            </a>
            <span className="career-intro-location">HOL FOUNDATION <i aria-hidden="true"></i> LYARI, KARACHI</span>
          </div>

          <div className="career-form-card">
            <div className="career-form-heading">
              <h3>Choose an opportunity.</h3>
            </div>
            <div className="career-tabs" role="tablist" aria-label="Choose an opportunity">
              <button
                type="button"
                role="tab"
                id="career-tab-jobs"
                aria-controls="career-panel-jobs"
                aria-selected={activeTab === 'jobs'}
                className={activeTab === 'jobs' ? 'is-active' : ''}
                onClick={() => setActiveTab('jobs')}
              >
                Jobs
              </button>
              <button
                type="button"
                role="tab"
                id="career-tab-internships"
                aria-controls="career-panel-internships"
                aria-selected={activeTab === 'internships'}
                className={activeTab === 'internships' ? 'is-active' : ''}
                onClick={() => setActiveTab('internships')}
              >
                Internships
              </button>
              <button
                type="button"
                role="tab"
                id="career-tab-volunteers"
                aria-controls="career-panel-volunteers"
                aria-selected={activeTab === 'volunteers'}
                className={activeTab === 'volunteers' ? 'is-active' : ''}
                onClick={() => setActiveTab('volunteers')}
              >
                Volunteering
              </button>
            </div>

            {activeTab === 'jobs' && (
              <section className="career-form-panel" id="career-panel-jobs" role="tabpanel" aria-labelledby="career-tab-jobs">
                <form className="career-form" onSubmit={handleJobSubmit}>
                  <div className="career-form-grid">
                    <div className="career-field">
                      <label htmlFor="job-name">
                        Full name <span>*</span>
                      </label>
                      <input
                        id="job-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        value={jobForm.name}
                        onChange={(e) => setJobForm({ ...jobForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="career-field">
                      <label htmlFor="job-email">
                        Email address <span>*</span>
                      </label>
                      <input
                        id="job-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={jobForm.email}
                        onChange={(e) => setJobForm({ ...jobForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="career-field">
                      <label htmlFor="job-phone">Phone / WhatsApp</label>
                      <input
                        id="job-phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+92"
                        value={jobForm.phone}
                        onChange={(e) => setJobForm({ ...jobForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="career-field">
                      <label htmlFor="job-role">
                        Role of interest <span>*</span>
                      </label>
                      <input
                        id="job-role"
                        type="text"
                        placeholder="Role or area"
                        value={jobForm.role}
                        onChange={(e) => setJobForm({ ...jobForm, role: e.target.value })}
                        required
                      />
                    </div>
                    <div className="career-field career-field-wide">
                      <label htmlFor="job-profile">CV or professional profile link</label>
                      <input
                        id="job-profile"
                        type="url"
                        placeholder="https://"
                        value={jobForm.profile}
                        onChange={(e) => setJobForm({ ...jobForm, profile: e.target.value })}
                      />
                    </div>
                    <div className="career-field career-field-wide">
                      <label htmlFor="job-introduction">
                        Short introduction <span>*</span>
                      </label>
                      <textarea
                        id="job-introduction"
                        rows="3"
                        placeholder="Tell us about your experience and interest."
                        value={jobForm.intro}
                        onChange={(e) => setJobForm({ ...jobForm, intro: e.target.value })}
                        required
                      />
                    </div>
                    <div className="career-submit-row career-field-wide">
                      <button className="career-submit" type="submit">
                        Send your interest <span aria-hidden="true">&#8599;</span>
                      </button>
                      <p className="career-form-note" aria-live="polite">
                        Your email app will open so you can send your application.
                      </p>
                    </div>
                  </div>
                </form>
              </section>
            )}

            {activeTab === 'internships' && (
              <section className="career-form-panel" id="career-panel-internships" role="tabpanel" aria-labelledby="career-tab-internships">
                <form className="career-form" onSubmit={handleInternSubmit}>
                  <div className="career-form-grid">
                    <div className="career-field">
                      <label htmlFor="intern-name">
                        Full name <span>*</span>
                      </label>
                      <input
                        id="intern-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        value={internForm.name}
                        onChange={(e) => setInternForm({ ...internForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="career-field">
                      <label htmlFor="intern-email">
                        Email address <span>*</span>
                      </label>
                      <input
                        id="intern-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={internForm.email}
                        onChange={(e) => setInternForm({ ...internForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="career-field">
                      <label htmlFor="intern-phone">Phone / WhatsApp</label>
                      <input
                        id="intern-phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+92"
                        value={internForm.phone}
                        onChange={(e) => setInternForm({ ...internForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="career-field">
                      <label htmlFor="intern-study">School, college or university</label>
                      <input
                        id="intern-study"
                        type="text"
                        placeholder="Institution"
                        value={internForm.institution}
                        onChange={(e) => setInternForm({ ...internForm, institution: e.target.value })}
                      />
                    </div>
                    <div className="career-field">
                      <label htmlFor="intern-field">
                        Area of interest <span>*</span>
                      </label>
                      <select
                        id="intern-field"
                        value={internForm.field}
                        onChange={(e) => setInternForm({ ...internForm, field: e.target.value })}
                        required
                      >
                        <option value="">Choose an area</option>
                        <option>Education</option>
                        <option>IT and digital skills</option>
                        <option>Community programs</option>
                        <option>Communications</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="career-field">
                      <label htmlFor="intern-availability">Availability</label>
                      <select
                        id="intern-availability"
                        value={internForm.availability}
                        onChange={(e) => setInternForm({ ...internForm, availability: e.target.value })}
                      >
                        <option>Flexible</option>
                        <option>Weekdays</option>
                        <option>Weekends</option>
                      </select>
                    </div>
                    <div className="career-field career-field-wide">
                      <label htmlFor="intern-introduction">
                        What would you like to learn or contribute? <span>*</span>
                      </label>
                      <textarea
                        id="intern-introduction"
                        rows="3"
                        placeholder="A few sentences is enough."
                        value={internForm.intro}
                        onChange={(e) => setInternForm({ ...internForm, intro: e.target.value })}
                        required
                      />
                    </div>
                    <div className="career-submit-row career-field-wide">
                      <button className="career-submit" type="submit">
                        Send your interest <span aria-hidden="true">&#8599;</span>
                      </button>
                      <p className="career-form-note" aria-live="polite">
                        Your email app will open so you can send your application.
                      </p>
                    </div>
                  </div>
                </form>
              </section>
            )}

            {activeTab === 'volunteers' && (
              <section className="career-form-panel" id="career-panel-volunteers" role="tabpanel" aria-labelledby="career-tab-volunteers">
                <form className="career-form" onSubmit={handleVolSubmit}>
                  <div className="career-form-grid">
                    <div className="career-field">
                      <label htmlFor="vol-name">
                        Full name <span>*</span>
                      </label>
                      <input
                        id="vol-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        value={volForm.name}
                        onChange={(e) => setVolForm({ ...volForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="career-field">
                      <label htmlFor="vol-email">
                        Email address <span>*</span>
                      </label>
                      <input
                        id="vol-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={volForm.email}
                        onChange={(e) => setVolForm({ ...volForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="career-field">
                      <label htmlFor="vol-phone">Phone / WhatsApp</label>
                      <input
                        id="vol-phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+92"
                        value={volForm.phone}
                        onChange={(e) => setVolForm({ ...volForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="career-field">
                      <label htmlFor="vol-area">
                        Area of interest <span>*</span>
                      </label>
                      <select
                        id="vol-area"
                        value={volForm.area}
                        onChange={(e) => setVolForm({ ...volForm, area: e.target.value })}
                        required
                      >
                        <option value="">Choose an area</option>
                        <option>Education</option>
                        <option>Community programs</option>
                        <option>Events and activities</option>
                        <option>Fundraising</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="career-field">
                      <label htmlFor="vol-availability">Availability</label>
                      <select
                        id="vol-availability"
                        value={volForm.availability}
                        onChange={(e) => setVolForm({ ...volForm, availability: e.target.value })}
                      >
                        <option>Flexible</option>
                        <option>Weekdays</option>
                        <option>Weekends</option>
                        <option>One-time support</option>
                      </select>
                    </div>
                    <div className="career-field career-field-wide">
                      <label htmlFor="vol-introduction">
                        How would you like to help? <span>*</span>
                      </label>
                      <textarea
                        id="vol-introduction"
                        rows="3"
                        placeholder="Tell us a little about your skills or interests."
                        value={volForm.intro}
                        onChange={(e) => setVolForm({ ...volForm, intro: e.target.value })}
                        required
                      />
                    </div>
                    <div className="career-submit-row career-field-wide">
                      <button className="career-submit" type="submit">
                        Send your interest <span aria-hidden="true">&#8599;</span>
                      </button>
                      <p className="career-form-note" aria-live="polite">
                        Your email app will open so you can send your application.
                      </p>
                    </div>
                  </div>
                </form>
              </section>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
