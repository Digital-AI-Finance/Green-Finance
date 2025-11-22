# Quick Start: Deploy React App to GitHub Pages

**Live App URL:** https://digital-ai-finance.github.io/Green-Finance

---

## One-Time Setup (Do This Once)

### Step 1: Enable GitHub Pages

1. Go to: https://github.com/Digital-AI-Finance/Green-Finance/settings/pages
2. Under **"Build and deployment"**:
   - Source: Select **"GitHub Actions"**
3. Click **Save**

### Step 2: Install Dependencies

```powershell
cd D:\Joerg\Research\slides\GreenFinance\react-app
npm install
```

### Step 3: Deploy

```powershell
cd D:\Joerg\Research\slides\GreenFinance
git add .
git commit -m "Add GitHub Pages deployment configuration"
git push origin main
```

---

## Watch Deployment

1. Go to: https://github.com/Digital-AI-Finance/Green-Finance/actions
2. Click on the running workflow
3. Wait 2-3 minutes for deployment to complete
4. Visit: https://digital-ai-finance.github.io/Green-Finance

---

## Future Updates (Automatic)

Any changes to `react-app/` automatically deploy when pushed to `main`:

```powershell
# Make your changes...

git add .
git commit -m "Update React app"
git push origin main

# App automatically rebuilds and deploys!
```

---

## Manual Deployment (Alternative)

If you prefer manual control:

```powershell
cd react-app
npm run deploy
```

---

## Test Locally Before Deploying

```powershell
cd react-app
npm start
# Opens at http://localhost:3000
```

---

## Troubleshooting

**App not loading?**
- Wait 5-10 minutes for first deployment
- Hard refresh: Ctrl+Shift+R
- Check Actions tab for deployment status

**Build failing?**
- Check Actions → Workflow logs
- Ensure `npm install` completes without errors
- Test locally: `npm run build`

---

## Files Created/Modified

- ✅ `react-app/package.json` - Added homepage and deploy scripts
- ✅ `.github/workflows/deploy-react-app.yml` - Auto-deployment workflow
- ✅ `react-app/DEPLOYMENT.md` - Complete deployment documentation
- ✅ This file - Quick start guide

---

**Ready to deploy!** Follow Step 1 above to enable GitHub Pages.
