# HOL Foundation - Complete React.js Project (Updated ZIP)

All requested fixes have been implemented and verified in the React codebase:

1. **Restored Hero Banner:** Slide 3 ("A stronger school. A brighter future.") now correctly loads the original GBSS KBKJ Campus entrance banner (`ChatGPT Image Sep 30, 2026, 01_53_20 PM.png`) on desktop and `mobile_banner_3_school_exterior.png` on mobile screens with responsive `<picture>` tags, accurate CSS object-position, and fallback handling.
2. **Restored Floating Scroll-to-Top Button:** The circular floating scroll-to-top button has been restored with its original design, colors (`#5EB93C` brand green, `#173667` navy), original SVG arrow icon, 360px scroll-threshold visibility toggle, and smooth scrolling synced with Lenis and GSAP.

---

### 📥 Download Updated Project ZIP

- **File Name:** `hol-foundation-react.zip`
- **File Size:** ~136 MB (Includes complete React source, components, routes, CSS, and all high-resolution images/assets)
- **Direct Link:** [⬇️ Click here to download `hol-foundation-react.zip`](/hol-foundation-react.zip)

*(Alternatively, you can access the artifact file directly at `hol-foundation-react.zip` in your workspace)*

---

### 🚀 Running Locally

1. **Extract ZIP:**
   ```bash
   unzip hol-foundation-react.zip -d hol-foundation
   cd hol-foundation
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Production Build (Optional):**
   ```bash
   npm run build
   npm start
   ```
