# Deployment Guide for Portfolio Website

## Option 1: Vercel (Recommended - Easiest)

### Prerequisites:
1. GitHub account
2. Vercel account (free)

### Steps:

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Portfolio website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"
   - Your site will be live in ~2 minutes!

3. **Custom Domain (Optional):**
   - In Vercel dashboard, go to your project
   - Settings → Domains
   - Add your custom domain

**Your site URL will be:** `https://your-project-name.vercel.app`

---

## Option 2: Netlify

### Steps:

1. **Push to GitHub** (same as above)

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

**Your site URL will be:** `https://random-name.netlify.app`

---

## Option 3: GitHub Pages

### Steps:

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json:**
   Add these scripts:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist",
     ...
   },
   "homepage": "https://YOUR_USERNAME.github.io/portfolio"
   ```

3. **Update vite.config.js:**
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/portfolio/'  // Replace 'portfolio' with your repo name
   })
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages:**
   - Go to your repo on GitHub
   - Settings → Pages
   - Source: Select "gh-pages" branch
   - Save

**Your site URL will be:** `https://YOUR_USERNAME.github.io/portfolio`

---

## Option 4: Render

### Steps:

1. **Push to GitHub**

2. **Deploy on Render:**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub
   - Click "New" → "Static Site"
   - Connect your repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Create Static Site"

**Your site URL will be:** `https://your-project.onrender.com`

---

## Before Deploying - Important Checks:

1. **Test the build locally:**
   ```bash
   npm run build
   npm run preview
   ```

2. **Update any hardcoded URLs** if needed

3. **Check environment variables** (if any)

4. **Verify all images load correctly**

---

## Recommended: Vercel

Vercel is the best choice because:
- ✅ Zero configuration needed
- ✅ Automatic HTTPS
- ✅ Fast global CDN
- ✅ Automatic deployments on git push
- ✅ Free custom domain support
- ✅ Built specifically for React/Vite

---

## Quick Vercel Deployment (5 minutes):

1. Push code to GitHub
2. Go to vercel.com
3. Import GitHub repo
4. Click Deploy
5. Done! 🎉

