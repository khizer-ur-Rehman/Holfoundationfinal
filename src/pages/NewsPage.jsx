import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { sanityClient, fetchSanityReels } from '../lib/sanity';

export function NewsPage() {
  useScrollReveal();
  const [reels, setReels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let latestRequest = 0;

    async function loadSanityContent() {
      const requestId = ++latestRequest;
      try {
        const rawItems = await fetchSanityReels();
        if (!isMounted || requestId !== latestRequest) return;

        // Deduplicate Sanity items by their unique document ID
        const seenIds = new Set();
        const freshReels = [];

        for (const item of rawItems) {
          if (!item.id || seenIds.has(item.id)) {
            continue;
          }
          seenIds.add(item.id);
          freshReels.push(item);
        }

        setReels(freshReels);
        setLoadError(false);

        // Recalculate Lenis scroll dimensions and GSAP ScrollTrigger
        requestAnimationFrame(() => {
          if (window.__lenis) {
            window.__lenis.resize();
          }
          if (window.ScrollTrigger) {
            window.ScrollTrigger.refresh();
          }
        });
      } catch (err) {
        console.error('[NewsPage] Error in loadSanityContent:', err);
        if (isMounted && requestId === latestRequest) setLoadError(true);
      } finally {
        if (isMounted && requestId === latestRequest) setIsLoading(false);
      }
    }

    loadSanityContent();

    // Listen to all reel mutations; refetch applies publish, draft, archive, and delete state.
    let subscription;
    try {
      subscription = sanityClient
        .listen('*[_type == "instagramReel"]', {}, { visibility: 'query' })
        .subscribe({
          next: () => {
            loadSanityContent();
          },
          error: (err) => {
            console.warn('[Sanity Listener] Notice:', err.message || err);
          }
        });
    } catch (e) {
      console.warn('[Sanity Listener] Could not initialize listener:', e);
    }

    return () => {
      isMounted = false;
      subscription?.unsubscribe?.();
    };
  }, []);

  return (
    <main className="news-page">
      <section className="unified-hero" aria-labelledby="news-hero-title">
        <div className="unified-hero-container">
          <div className="unified-hero-grid">
            <div className="unified-hero-copy">
              <h1 id="news-hero-title" className="unified-hero-title">
                Stories that move us forward.
              </h1>
              <p className="unified-hero-lead">
                Real moments of learning, resilience, and community progress from our schools and classrooms across Lyari.
              </p>
              <div className="unified-hero-actions">
                <a className="button gold" href="#news-reels">
                  Explore Stories <span aria-hidden="true">&#8595;</span>
                </a>
                <Link className="unified-hero-link" to="/our-journey">
                  Our Journey <span aria-hidden="true">&#8599;</span>
                </Link>
              </div>
            </div>
            <figure className="unified-hero-visual">
              <img
                src="/assets/images/stories/lyari-literacy-community.webp"
                alt="Community members and children celebrating learning together in Lyari"
                width="1200"
                height="900"
                fetchPriority="high"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="news-feed" id="news-reels" aria-labelledby="news-feed-title">
        <div className="news-shell">
          <header className="news-feed-heading">
            <div>
              <h2 id="news-feed-title">A window into life at HOL.</h2>
              <p>Learning, community and the moments in between.</p>
            </div>
            <a
              className="news-instagram-link"
              href="https://www.instagram.com/holfoundations/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore on Instagram <span aria-hidden="true">&#8599;</span>
            </a>
          </header>

          <div className="news-reel-grid" aria-label="HOL Foundation Instagram stories">
            {reels.map((item) => (
              <article className="news-reel-card" key={item.id}>
                <a
                  className="news-reel-cover"
                  href={item.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch Instagram reel: ${item.title}`}
                >
                  <img
                    src={item.img}
                    alt={`${item.title} Instagram reel thumbnail`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/assets/images/stories/lyari-literacy-community.webp';
                    }}
                  />
                  <span className="news-reel-shade" aria-hidden="true" />
                  <span className="news-reel-caption">
                    <strong>{item.title}</strong>
                    <span>
                      Watch on Instagram <b aria-hidden="true">&#8594;</b>
                    </span>
                  </span>
                  <span className="news-reel-play" aria-hidden="true">&#9654;</span>
                </a>
              </article>
            ))}
          </div>
          {isLoading && <p className="news-reel-status" role="status">Loading Instagram reels…</p>}
          {!isLoading && loadError && reels.length === 0 && (
            <p className="news-reel-status" role="status">Instagram stories are temporarily unavailable. Please try again soon.</p>
          )}
          {!isLoading && !loadError && reels.length === 0 && (
            <p className="news-reel-status" role="status">New stories are on their way. Please check back soon.</p>
          )}
        </div>
      </section>
    </main>
  );
}
