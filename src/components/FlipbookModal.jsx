import React, { useEffect } from 'react';

export const HEYZINE_REPORT_URL = 'https://heyzine.com/flip-book/aa55526e62.html#page/1';

export function FlipbookModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.classList.add('flipbook-open');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('flipbook-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`flipbook-modal ${isOpen ? 'is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="HOL Foundation Annual Report Interactive Flipbook"
    >
      <div className="flipbook-modal-backdrop" onClick={onClose} />
      <div className="flipbook-modal-container">
        <div className="flipbook-modal-header">
          <div className="flipbook-modal-title">
            <span className="flipbook-badge">Interactive Report</span>
            <h3>HOL Foundation Annual Report</h3>
          </div>
          <div className="flipbook-modal-actions">
            <a
              href={HEYZINE_REPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flipbook-fullscreen-btn"
              title="Open in full window"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
              <span>Full Window</span>
            </a>
            <button
              type="button"
              className="flipbook-close-btn"
              aria-label="Close flipbook"
              onClick={onClose}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flipbook-frame-wrap">
          <iframe
            src={HEYZINE_REPORT_URL}
            title="HOL Foundation Annual Report Interactive Flipbook"
            allow="fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
