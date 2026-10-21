# HOL Foundation - Sanity Studio

This directory contains the standalone **Sanity Studio** for managing **Instagram Reels** on the HOL Foundation website.

- **Project ID**: `tctv8pav`
- **Dataset**: `production`
- **Schema**: Instagram Reels (`instagramReel`) only

---

## Schema Fields for Instagram Reels

When adding a new Reel in the Studio dashboard, you will find these fields:

1. **Title** (`title`): The headline / caption (e.g., *"Learning in Lyari"*).
2. **Reel URL** (`reelUrl`): Direct link to the Instagram reel (e.g., `https://www.instagram.com/reel/DSUWtSODFv8/`).
3. **Thumbnail** (`thumbnail`): Poster image with hotspot cropping support.
4. **Publish Status** (`publishStatus`):
   - **Published**: Visible on the website's News page.
   - **Draft**: Saved in Studio, hidden from the live website.
   - **Archived**: Hidden from the live website.
5. **Display Order** (`displayOrder`): Integer number (e.g. `1`, `2`, `3`...) controlling the order of reels in the News page grid.

---

## How to Run the Studio Locally

### Option 1 (From Project Root)
```bash
npm run studio
```

### Option 2 (From the `studio/` folder)
```bash
cd studio
npx sanity dev
```

The Studio will launch locally (typically at `http://localhost:3333`). Open this URL in your browser and log into your Sanity account with the email associated with project `tctv8pav`.

---

## How to Deploy the Studio to the Cloud

Sanity provides free managed hosting on `*.sanity.studio`:

### Step 1: Deploy with Sanity CLI
From the root directory or `studio/` directory, run:
```bash
cd studio
npx sanity deploy
```
*(Or from root: `npm run studio:deploy`)*

### Step 2: Choose your Studio Hostname
When prompted:
```text
Studio hostname (<subdomain>.sanity.studio): holfoundation
```
Choose an available subdomain (e.g. `holfoundation` or `hol-reels`).

### Step 3: Add CORS Origin in Sanity Management
If accessing the API or Studio from your production domains:
1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Select project **`tctv8pav`**
3. Navigate to **API** > **CORS Origins**
4. Click **Add CORS origin**
5. Add your website URL(s) (e.g. `https://your-domain.com`, `http://localhost:3000`) and check **Allow credentials**.

---

## How it Connects to the Website

- The website's News page queries dataset `production` with real-time updates enabled.
- The News page displays only published reels from Sanity, using the existing card design and responsive layout.
- Publishing a reel makes it appear in the grid; changing it to Draft or Archived, or deleting it, removes it from the grid automatically.
