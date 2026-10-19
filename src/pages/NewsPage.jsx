import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { sanityClient, fetchSanityReels, SANITY_REELS_QUERY } from '../lib/sanity';

// The 11 original Instagram Reels preserved in exact order and styling
const EXISTING_REELS = [
  {
    url: 'https://www.instagram.com/reel/DSUWtSODFv8/',
    img: '/assets/images/news/instagram/instagram-01.jpg',
    title: 'Learning in Lyari'
  },
  {
    url: 'https://www.instagram.com/reel/DU5KENojGdm/',
    img: '/assets/images/news/instagram/instagram-02.jpg',
    title: 'Bright moments'
  },
  {
    url: 'https://www.instagram.com/reel/DWMC-ZIDUsm/',
    img: '/assets/images/news/instagram/instagram-03.jpg',
    title: 'Curiosity in action'
  },
  {
    url: 'https://www.instagram.com/reel/DVtckIkjtNm/',
    img: '/assets/images/news/instagram/instagram-04.jpg',
    title: 'Everyday at HOL'
  },
  {
    url: 'https://www.instagram.com/reel/DQgrPzWiDOg/',
    img: '/assets/images/news/instagram/instagram-05.jpg',
    title: 'Growing together'
  },
  {
    url: 'https://www.instagram.com/reel/DQrgj2oCAfP/',
    img: '/assets/images/news/instagram/instagram-07.jpg',
    title: 'Small moments, big futures'
  },
  {
    url: 'https://www.instagram.com/reel/DQhH-IgjEPn/',
    img: '/assets/images/news/instagram/instagram-08.jpg',
    title: 'Strength in community'
  },
  {
    url: 'https://www.instagram.com/reel/DI_P8TSSNml/',
    img: '/assets/images/news/instagram/instagram-09.jpg',
    title: 'Learning side by side'
  },
  {
    url: 'https://www.instagram.com/reel/DQl2Omtk4KC/',
    img: '/assets/images/news/instagram/instagram-10.jpg',
    title: 'Discovering new things'
  },
  {
    url: 'https://www.instagram.com/reel/DQmL9zECLOH/',
    img: '/assets/images/news/instagram/instagram-11.jpg',
    title: 'Learning with purpose'
  },
  {
    url: 'https://www.instagram.com/reel/DTAqWNEiaSx/',
    img: '/assets/images/news/instagram/instagram-12.jpg',
    title: 'Making space to grow'
  }
];

export function NewsPage() {
  useScrollReveal();
  const [sanityReels, setSanityReels] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadSanityContent() {
      try {
        const rawItems = await fetchSanityReels();
        if (!isMounted) return;

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

        console.log(`[NewsPage] Updating state with ${freshReels.length} reel(s) from Sanity:`, freshReels);
        setSanityReels(freshReels);

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
      }
    }

    loadSanityContent();

    // Real-time subscription so new reels appear automatically when published in Sanity
    let subscription;
    try {
      subscription = sanityClient
        .listen(SANITY_REELS_QUERY)
        .subscribe({
          next: (update) => {
            console.log('[Sanity Listener] Live mutation received:', update);
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

  // The 11 original static reels are preserved at the top; newly published Sanity reels render below them
  const combinedReels = [...EXISTING_REELS, ...sanityReels];
  console.log(`[NewsPage] Rendering ${combinedReels.length} total Reel cards: 11 static + ${sanityReels.length} from Sanity.`);

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
              href="https://www.instagram.com/reel/DSUWtSODFv8/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore on Instagram <span aria-hidden="true">&#8599;</span>
            </a>
          </header>

          <div className="news-reel-grid" aria-label="HOL Foundation Instagram stories">
            {combinedReels.map((item, idx) => (
              <article className="news-reel-card" key={item.id || item.url || idx}>
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
        </div>
      </section>
    </main>
  );
}
