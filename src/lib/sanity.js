import { createClient } from '@sanity/client';
import * as sanityImageUrlModule from '@sanity/image-url';

export const SANITY_PROJECT_ID = 'tctv8pav';
export const SANITY_DATASET = 'production';
export const SANITY_API_VERSION = '2024-03-01';

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: false, // Ensures newly published reels appear immediately
});

const createImageUrlBuilder =
  sanityImageUrlModule.createImageUrlBuilder ||
  sanityImageUrlModule.default ||
  sanityImageUrlModule;

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source) {
  if (!source) return '';
  if (typeof source === 'string') return source;
  if (source?.asset?.url) return source.asset.url;
  try {
    return builder.image(source).auto('format').fit('max').url();
  } catch {
    return source?.asset?.url || '';
  }
}

// Strictly queries published Instagram Reels from Sanity
export const SANITY_REELS_QUERY = `*[
  !(_id in path("drafts.**")) &&
  _type == "instagramReel" &&
  coalesce(publishStatus, "published") == "published"
] | order(coalesce(displayOrder, 999999) asc, coalesce(_createdAt, "") asc) {
  _id,
  _type,
  _createdAt,
  title,
  reelUrl,
  url,
  publishStatus,
  displayOrder,
  thumbnail {
    ...,
    asset->
  }
}`;

function transformSanityDocs(docs) {
  if (!Array.isArray(docs)) return [];

  return docs
    .map((doc) => {
      const title = doc.title?.trim() || 'Life at HOL';
      const url = doc.reelUrl?.trim() || doc.url?.trim() || '';

      // Resolve thumbnail image URL from asset expansion or builder
      let img = doc.thumbnail?.asset?.url || '';
      if (!img && doc.thumbnail) {
        img = urlFor(doc.thumbnail);
      }

      // Fallback placeholder image if no image uploaded
      if (!img) {
        img = '/assets/images/stories/lyari-literacy-community.webp';
      }

      return {
        id: doc._id,
        title,
        url,
        img,
        displayOrder: typeof doc.displayOrder === 'number' ? doc.displayOrder : 999,
        createdAt: doc._createdAt,
      };
    })
    .filter((item) => Boolean(item.url || item.title));
}

export async function fetchSanityReels() {
  console.log(`[Sanity] Fetching Instagram Reels from project: "${SANITY_PROJECT_ID}", dataset: "${SANITY_DATASET}"...`);
  console.log(`[Sanity] Query: ${SANITY_REELS_QUERY}`);

  let docs = null;

  // 1. Try direct Sanity client query
  try {
    docs = await sanityClient.fetch(SANITY_REELS_QUERY);
    console.log(`[Sanity] Direct fetch succeeded! Received ${docs?.length || 0} document(s) from Sanity.`);
  } catch (directErr) {
    console.warn('[Sanity] Direct browser fetch error (e.g. CORS origin not registered in Sanity dashboard):', directErr.message || directErr);
    
    // 2. Fallback to local server proxy (/api/sanity-reels)
    try {
      console.log('[Sanity] Attempting proxy fallback via /api/sanity-reels...');
      const proxyRes = await fetch('/api/sanity-reels');
      if (proxyRes.ok) {
        const proxyData = await proxyRes.json();
        docs = proxyData.result || proxyData;
        console.log(`[Sanity] Proxy fallback succeeded! Received ${docs?.length || 0} document(s).`);
      } else {
        console.error(`[Sanity] Proxy responded with status ${proxyRes.status}`);
      }
    } catch (proxyErr) {
      console.error('[Sanity] Proxy fallback failed:', proxyErr.message || proxyErr);
    }
  }

  if (!Array.isArray(docs)) {
    console.warn('[Sanity] No valid documents array returned; returning empty list.');
    return [];
  }

  const transformed = transformSanityDocs(docs);
  console.log(`[Sanity] Parsed and ready ${transformed.length} reel card(s):`, transformed);
  return transformed;
}
