# PM Grove (product-growth-garden)

Vite + React + TypeScript learning grove: tracks, stems, read / listen / visual.

## Local dev

```bash
npm install
npm run dev
```

Open the URL Vite prints (default port **8080**).

## Deploy via Git

### 1. Create a GitHub repository

On GitHub: **New repository** → note the name (e.g. `product-growth-garden`).  
Do not add a README if you already have this project locally.

### 2. Push this folder as the repo root

From **this directory** (`product-growth-garden`):

```bash
git init
git add .
git commit -m "Initial commit: PM Grove"
git branch -M main
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin main
```

### Option A — Vercel (recommended, HTTPS + easy SPA)

1. Sign in at [vercel.com](https://vercel.com) with GitHub.
2. **Add New Project** → import the repo.
3. Framework: Vite; **Root directory**: `.` (repo root).
4. Deploy. You get a live `https://….vercel.app` URL.

`vercel.json` in this repo sets SPA fallbacks so client routes work.

### Option B — Netlify

1. [netlify.com](https://www.netlify.com) → **Add new site** → import from Git.
2. Build: `npm run build`, publish: `dist` (already in `netlify.toml`).

### Option C — GitHub Pages

1. Push to `main` as above. The workflow **Deploy to GitHub Pages** runs automatically.
2. Repo → **Settings** → **Pages** → **Build and deployment** → **Source: GitHub Actions**.
3. After the workflow succeeds, the site is at:

   `https://YOUR_USER.github.io/YOUR_REPO/`

The build uses `--base=/YOUR_REPO/` so React Router matches that path.

---

**Large assets:** topic audio/images live under `public/topics/`. Keep files under GitHub’s [size limits](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github) (100 MB max per file).
