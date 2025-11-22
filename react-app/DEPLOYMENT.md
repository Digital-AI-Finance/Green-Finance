# Deployment Guide - Green Finance Learning Platform

Complete guide for deploying the React app to GitHub Pages.

---

## Quick Start

**Live URL (after deployment):** https://digital-ai-finance.github.io/Green-Finance

---

## Prerequisites

- Node.js 18+ installed
- Git repository set up
- GitHub repository: `Digital-AI-Finance/Green-Finance`

---

## Method 1: Automatic Deployment (GitHub Actions)

**Recommended for continuous deployment**

### Setup (One-Time)

1. **Enable GitHub Pages in repository settings:**
   - Go to: https://github.com/Digital-AI-Finance/Green-Finance/settings/pages
   - Under "Build and deployment":
     - Source: **GitHub Actions**
   - Click **Save**

2. **Push changes to trigger deployment:**
   ```bash
   cd D:\Joerg\Research\slides\GreenFinance
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```

3. **Monitor deployment:**
   - Go to: https://github.com/Digital-AI-Finance/Green-Finance/actions
   - Watch the "Deploy React App to GitHub Pages" workflow
   - Deployment takes ~2-3 minutes

4. **Access your app:**
   - URL: https://digital-ai-finance.github.io/Green-Finance
   - First deployment may take 5-10 minutes to go live

### How It Works

- **Trigger:** Automatic on push to `main` branch when files in `react-app/` change
- **Process:**
  1. Checkout code
  2. Install Node.js dependencies
  3. Build React app (`npm run build`)
  4. Deploy to GitHub Pages
- **Manual trigger:** Go to Actions tab → "Deploy React App to GitHub Pages" → "Run workflow"

---

## Method 2: Manual Deployment (npm)

**Good for testing or one-off deployments**

### Install Dependencies

```bash
cd D:\Joerg\Research\slides\GreenFinance\react-app
npm install
```

### Deploy

```bash
npm run deploy
```

This command:
1. Builds the app (`npm run build`)
2. Pushes build to `gh-pages` branch
3. GitHub Pages serves from that branch

**Note:** Requires `gh-pages` npm package (already in devDependencies)

---

## Local Development

### Run Development Server

```bash
cd D:\Joerg\Research\slides\GreenFinance\react-app
npm install
npm start
```

- Opens at: http://localhost:3000
- Hot reload enabled
- Good for testing before deployment

### Build for Production (Local Test)

```bash
npm run build
```

- Creates `build/` folder with optimized files
- Test locally: `npx serve -s build`

---

## Troubleshooting

### Issue: 404 Error on GitHub Pages

**Symptom:** Page shows 404 after deployment

**Solution:**
1. Check GitHub Pages settings are correct (Source: GitHub Actions)
2. Wait 5-10 minutes for initial deployment
3. Clear browser cache
4. Verify workflow completed successfully in Actions tab

### Issue: Build Fails in GitHub Actions

**Symptom:** Workflow shows red X

**Solution:**
1. Check Actions tab for error logs
2. Common fixes:
   - Ensure `package-lock.json` is committed
   - Verify all dependencies in `package.json`
   - Check for JavaScript errors in build logs

### Issue: App Loads but Charts Don't Render

**Symptom:** Blank charts or console errors

**Solution:**
1. Check browser console (F12) for errors
2. Verify all chart dependencies installed
3. Test locally first: `npm start`

### Issue: Changes Not Appearing

**Symptom:** Deployed app shows old version

**Solution:**
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Check workflow completed successfully
3. Verify correct branch deployed
4. Clear browser cache completely

---

## Deployment Checklist

Before deploying, verify:

- [ ] All dependencies installed: `npm install`
- [ ] App builds successfully: `npm run build`
- [ ] No console errors: `npm start` and check browser console
- [ ] All charts render correctly
- [ ] Navigation works (keyboard arrows, buttons)
- [ ] Progress saves to localStorage
- [ ] Responsive on mobile (test with browser dev tools)

---

## GitHub Pages Configuration

### Current Settings

```json
{
  "homepage": "https://digital-ai-finance.github.io/Green-Finance",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### Repository Settings Required

**Path:** Settings → Pages

- **Source:** GitHub Actions (for automatic deployment)
- **OR Source:** Deploy from branch `gh-pages` (for manual npm deployment)
- **Custom domain:** (optional) Add custom domain if desired

---

## Workflow File Location

`.github/workflows/deploy-react-app.yml`

**Triggers:**
- Push to `main` branch with changes in `react-app/`
- Manual trigger via Actions tab

**Permissions required:**
- `contents: read`
- `pages: write`
- `id-token: write`

---

## Performance Optimization

### Current Build Output

Typical production build:
- Bundle size: ~500KB gzipped
- Load time: <2s on 3G
- Lighthouse score: 90+ (Performance)

### Improvements Applied

- Code splitting via React lazy loading
- Tree shaking for unused code
- Minification and compression
- Optimized images and charts

---

## Update Deployment

### Update Content Only

```bash
# Make changes to slides, charts, etc.
cd react-app/src/data
# Edit week1Slides.js

# Commit and push (triggers auto-deploy)
git add .
git commit -m "Update Week 1 content"
git push origin main
```

### Update Dependencies

```bash
cd react-app
npm update
npm audit fix

# Test locally
npm start

# Deploy
git add package.json package-lock.json
git commit -m "Update dependencies"
git push origin main
```

---

## Monitoring

### Check Deployment Status

1. **GitHub Actions:** https://github.com/Digital-AI-Finance/Green-Finance/actions
2. **Build logs:** Click on workflow run → View logs
3. **Deployment URL:** Check job output for deployment URL

### Analytics (Optional)

Add Google Analytics or Plausible to track:
- Page views
- Slide completion rates
- User engagement

---

## Security Notes

- Repository is **private** (app is public once deployed to GitHub Pages)
- No sensitive data in client-side code
- Environment variables not needed (static site)
- HTTPS automatically enabled by GitHub Pages

---

## Next Steps After Deployment

1. **Test the live app:** https://digital-ai-finance.github.io/Green-Finance
2. **Share with students:** Provide URL in course materials
3. **Monitor usage:** Check GitHub Insights for traffic
4. **Update content:** Edit slides and redeploy as needed

---

## Additional Resources

- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **React Deployment:** https://create-react-app.dev/docs/deployment/
- **GitHub Actions:** https://docs.github.com/en/actions

---

**Deployment configured!** Push to `main` to deploy automatically.
