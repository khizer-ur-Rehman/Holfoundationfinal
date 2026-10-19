import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

const documents = [
  {
    category: 'ANNUAL REPORT',
    title: 'Annual Report 2024–2026',
    description: 'Comprehensive multi-year report detailing student outcomes, Lyari campus adoption, audited financial records, and community initiatives.',
    files: [
      { name: 'Annual-Report-2024-2026.pdf (7.0 MB)', path: '/assets/documents/publications/annual-report-2024-2026.pdf' },
      { name: 'Interactive Flipbook (Online)', path: 'https://heyzine.com/flip-book/aa55526e62.html#page/1' }
    ]
  },
  {
    category: 'TAX ORDER',
    title: 'Reduced-rate withholding order',
    description: 'Order concerning withholding on profit on debt.',
    files: [
      { name: 'Order file 1', path: '/assets/documents/publications/fbr-order-1591-151-file-1.pdf' },
      { name: 'Order file 2', path: '/assets/documents/publications/fbr-order-1591-151.pdf' }
    ]
  },
  {
    category: 'NPO APPROVAL',
    title: 'Non-profit organisation approval',
    description: 'Order concerning approval status for a non-profit organisation.',
    files: [
      { name: 'Order file 1', path: '/assets/documents/publications/npo-approval-order-236c-file-1.pdf' },
      { name: 'Order file 2', path: '/assets/documents/publications/npo-approval-order-236c.pdf' }
    ]
  },
  {
    category: 'OFFICIAL RECORD',
    title: 'H792069',
    description: 'Official document supplied as H792069.pdf.',
    files: [
      { name: 'H792069.pdf', path: '/assets/documents/publications/H792069.pdf' }
    ]
  },
  {
    category: 'REGISTRATION',
    title: 'Registration certificate',
    description: 'HOL Foundation registration document.',
    files: [
      { name: 'Registration-Certificate.pdf', path: '/assets/documents/publications/registration-certificate.pdf' }
    ]
  },
  {
    category: 'SINDH CHARITY COMMISSION',
    title: 'Charity commission record',
    description: 'HOL Foundation document from the Sindh Charity Commission.',
    files: [
      { name: 'HOL-Sindh-Charity-Com.pdf', path: '/assets/documents/publications/sindh-charity-commission.pdf' }
    ]
  }
];

export function PublicationsPage() {
  useScrollReveal();

  return (
    <main className="publications-page">
      <section className="unified-hero" aria-labelledby="pub-hero-title">
        <div className="unified-hero-container">
          <div className="unified-hero-grid">
            <div className="unified-hero-copy">
              <h1 id="pub-hero-title" className="unified-hero-title">
                Our records, open to all.
              </h1>
              <p className="unified-hero-lead">
                Official annual reports, regulatory orders, certificates, and non-profit approvals that keep our educational mission in Lyari fully transparent, accountable, and publicly verified.
              </p>
              <div className="unified-hero-actions">
                <a className="button gold" href="#annual-report">
                  Annual Report 2024–2026 <span aria-hidden="true">&#8595;</span>
                </a>
                <a className="unified-hero-link" href="#official-documents">
                  Official Certificates <span aria-hidden="true">&#8595;</span>
                </a>
              </div>
            </div>
            <figure className="unified-hero-visual">
              <img
                src="/assets/images/journey/HOL-SPP%208.jpg"
                alt="Students learning together in a HOL School Preparatory Program classroom"
                width="1280"
                height="960"
                fetchPriority="high"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* Redesigned Clean & Premium Annual Report Section */}
      <section className="pub-annual-report-section" id="annual-report" aria-labelledby="pub-report-title">
        <div className="pub-shell">
          <div className="pub-report-card-wrap">
            <header className="pub-report-header">
              <div className="pub-report-header-text">
                <h2 id="pub-report-title" className="pub-report-title">
                  Annual Report
                </h2>
                <p className="pub-report-subtitle">
                  Explore our academic progress, community initiatives, and audited financials.
                </p>
              </div>
              <div className="pub-report-header-actions">
                <a
                  href="/assets/documents/publications/annual-report-2024-2026.pdf"
                  download="HOL-Foundation-Annual-Report-2024-2026.pdf"
                  className="pub-btn-link"
                  title="Download the full PDF document (7 MB)"
                >
                  Download PDF <span aria-hidden="true">&#8595;</span>
                </a>
                <a
                  href="https://heyzine.com/flip-book/aa55526e62.html#page/1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button gold pub-btn-primary"
                  title="Open report in a new tab"
                >
                  Open in New Tab <span aria-hidden="true">&#8599;</span>
                </a>
              </div>
            </header>

            <div className="pub-viewer-container">
              <iframe
                src="https://heyzine.com/flip-book/aa55526e62.html#page/1"
                title="HOL Foundation Annual Report"
                className="pub-viewer-iframe"
                allow="fullscreen"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Certificates & Records Library */}
      <section className="pub-library" id="official-documents" aria-labelledby="pub-library-title">
        <div className="pub-shell">
          <header className="pub-library-heading">
            <div>
              <h2 id="pub-library-title">Certificates &amp; records.</h2>
            </div>
            <p>Open a document to view it, or download a copy.</p>
          </header>
          <div className="pub-doc-grid">
            {documents.map((doc, idx) => (
              <article className="pub-document-card" key={idx}>
                <div className="pub-document-top">
                  <span className="pub-document-icon" aria-hidden="true">PDF</span>
                  <span className="pub-document-category">{doc.category}</span>
                </div>
                <h3>{doc.title}</h3>
                <p>{doc.description}</p>
                <div className="pub-file-list" aria-label="Available PDF files">
                  {doc.files.map((file, fIdx) => (
                    <div className="pub-file-row" key={fIdx}>
                      <span>{file.name}</span>
                      <div>
                        <a href={file.path} target="_blank" rel="noopener noreferrer">
                          View <b aria-hidden="true">&#8599;</b>
                        </a>
                        <a href={file.path} download>
                          Download <b aria-hidden="true">&#8595;</b>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
