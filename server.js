import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { deliverFormEmail, isAllowedFormOrigin } from './server/formEmail.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure root /package.json exists for Cloud Run build environment
try {
  const rootPkg = '/package.json';
  const appPkg = path.join(__dirname, 'package.json');
  if (!fs.existsSync(rootPkg) && fs.existsSync(appPkg)) {
    fs.copyFileSync(appPkg, rootPkg);
  }
} catch (_) {}

const app = express();
app.use(express.json({ limit: '20kb' }));

// Enable CORS for universal public access
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, HEAD");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.options('/api/send-email', (req, res) => {
  const origin = req.headers.origin;
  if (origin && !isAllowedFormOrigin(origin)) return res.sendStatus(403);
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Idempotency-Key');
  res.sendStatus(204);
});

app.post('/api/send-email', async (req, res) => {
  const origin = req.headers.origin;
  if (origin && !isAllowedFormOrigin(origin)) {
    return res.status(403).json({ ok: false, message: 'This website is not allowed to submit this form.' });
  }
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  const result = await deliverFormEmail(req.body, { idempotencyKey: req.headers['idempotency-key'] });
  return res.status(result.status).json(result.body);
});

// Redirect legacy aliases to clean React routes
app.get(['/about', '/about.html'], (req, res) => res.redirect(302, '/'));
app.get(['/board', '/board.html', '/board-of-directors', '/board-of-directors.html'], (req, res) => res.redirect(302, '/our-board'));
app.get(['/kara-bhai', '/kara-bhai.html', '/karabhai', '/karabhai.html', '/gbss', '/gbss.html', '/gbss-kara-bhai', '/gbss-kara-bhai.html', '/hol-kb-campus', '/hol-kb-campus.html', '/programs/kara-bhai', '/programs/kara-bhai.html', '/programs/gbss-kara-bhai', '/programs/gbss-kara-bhai.html', '/programs/gbss-kara-bhai-karim-jee', '/programs/gbss-kara-bhai-karim-jee.html', '/kara-bhai-report', '/kara-bhai-report/index.html'], (req, res) => res.redirect(302, '/programs/hol-kb-campus'));
app.get(['/preschool', '/preschool.html', '/hol-preschool', '/hol-preschool.html', '/programs/preschool'], (req, res) => res.redirect(302, '/programs/hol-preschool'));
app.get(['/lea', '/lea.html', '/academy', '/academy.html', '/programs/lea'], (req, res) => res.redirect(302, '/programs/lyari-entrepreneur-academy'));
app.get(['/spp', '/spp.html', '/school-preparatory', '/school-preparatory.html', '/programs/spp', '/programs/school-preparatory'], (req, res) => res.redirect(302, '/programs/school-preparatory-program'));
app.get(['/annual-report', '/annual-report.html'], (req, res) => res.redirect(302, '/publications#annual-report'));

// Provide valid script response for AI Studio iframe helper requests
app.use((req, res, next) => {
  if (req.path.includes('_aistudio-iframe')) {
    return res.type('application/javascript').send('(function(){window.__AISTUDIO_IFRAME_READY__=true;})();');
  }
  next();
});

// Serve dist static assets first if built
if (fs.existsSync(path.join(__dirname, 'dist'))) {
  app.use(express.static(path.join(__dirname, 'dist'), { index: false }));
}

// Serve public static assets (documents, images, original styles)
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/kara-bhai-report', express.static(path.join(__dirname, 'kara-bhai-report')));

// API proxy for Sanity Instagram Reels
app.get('/api/sanity-reels', async (req, res) => {
  try {
    const query = encodeURIComponent(`*[!(_id in path("drafts.**")) && _type == "instagramReel" && coalesce(publishStatus, "published") == "published"] | order(coalesce(displayOrder, 999999) asc, coalesce(_createdAt, "") asc) {
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
    }`);
    const upstream = await fetch(`https://tctv8pav.api.sanity.io/v2024-03-01/data/query/production?query=${query}`);
    const data = await upstream.json();
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Download project ZIP
app.get('/hol-foundation-react.zip', (req, res) => {
  const zipPath = path.join(__dirname, 'hol-foundation-react.zip');
  if (fs.existsSync(zipPath)) {
    return res.download(zipPath);
  }
  res.status(404).send('ZIP file not found');
});

// Explicitly handle 404 for missing static files so scripts/styles never return HTML
app.use((req, res, next) => {
  const ext = path.extname(req.path).toLowerCase();
  if (ext === '.js' || ext === '.mjs') {
    return res.status(404).type('application/javascript').send('/* 404 Not Found */');
  }
  if (ext === '.css') {
    return res.status(404).type('text/css').send('/* 404 Not Found */');
  }
  if (ext && ext !== '.html') {
    return res.status(404).type('text/plain').send('404 Not Found');
  }
  next();
});

// SPA fallback for all client routes with strict no-cache headers
app.get('*', (req, res) => {
  const indexFile = fs.existsSync(path.join(__dirname, 'dist', 'index.html'))
    ? path.join(__dirname, 'dist', 'index.html')
    : path.join(__dirname, 'index.html');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.sendFile(indexFile);
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
