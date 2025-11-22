# ✅ Automatic Deployment Enabled!

Your React app now deploys automatically to GitHub Pages whenever you push changes.

---

## 🚀 How It Works

### Automatic Trigger
Every time you push changes to the `main` branch that affect files in `react-app/`, GitHub Actions automatically:

1. **Checks out your code**
2. **Installs dependencies** (`npm ci`)
3. **Builds the React app** (`npm run build`)
4. **Deploys to GitHub Pages**
5. **Updates live site** (~2-3 minutes)

### Manual Trigger
You can also manually trigger deployment:
1. Go to: https://github.com/Digital-AI-Finance/Green-Finance/actions
2. Click: **"Deploy React App to GitHub Pages"**
3. Click: **"Run workflow"**
4. Select branch: **main**
5. Click: **"Run workflow"**

---

## 📝 Update Workflow

### Make Changes
```powershell
cd D:\Joerg\Research\slides\GreenFinance\react-app

# Edit your files (slides, components, etc.)
# Example: Edit src/data/week1Slides.js
```

### Test Locally (Recommended)
```powershell
npm start
# Opens at http://localhost:3000
# Test your changes before deploying
```

### Deploy
```powershell
cd D:\Joerg\Research\slides\GreenFinance

git add .
git commit -m "Update slides/charts/components"
git push origin main

# Automatic deployment starts immediately!
```

### Monitor Deployment
1. **Go to:** https://github.com/Digital-AI-Finance/Green-Finance/actions
2. **Click:** On the running workflow (green dot = in progress)
3. **Watch:** Build and deploy steps (takes 2-3 minutes)
4. **Wait:** For green checkmark ✅
5. **Visit:** https://digital-ai-finance.github.io/Green-Finance/

---

## 🎯 What Triggers Deployment

### ✅ Triggers Automatic Deployment

- Changes in `react-app/src/**` (source code)
- Changes in `react-app/public/**` (static files)
- Changes in `react-app/package.json` (dependencies)
- Any file in `react-app/` directory

### ❌ Does NOT Trigger Deployment

- Changes to LaTeX files (`.tex`)
- Changes to Python chart scripts
- Changes to documentation files outside `react-app/`
- Changes to `CLAUDE.md`, `README.md`, etc.

---

## 📊 Deployment Status

### Check Current Status
**Actions Tab:** https://github.com/Digital-AI-Finance/Green-Finance/actions

**Workflow Name:** "Deploy React App to GitHub Pages"

**Status Indicators:**
- 🟡 **Yellow dot** - Workflow in progress
- ✅ **Green checkmark** - Deployment successful
- ❌ **Red X** - Deployment failed (check logs)

### View Deployment History
All deployments are logged at:
https://github.com/Digital-AI-Finance/Green-Finance/deployments

---

## 🔧 Workflow Configuration

### Workflow File
`.github/workflows/deploy-react-app.yml`

### Triggers
```yaml
on:
  push:
    branches:
      - main
    paths:
      - 'react-app/**'
  workflow_dispatch:
```

### Build Steps
1. Checkout code
2. Setup Node.js 18
3. Install dependencies (npm ci)
4. Build React app (CI=false to ignore warnings)
5. Configure GitHub Pages
6. Upload build artifact
7. Deploy to Pages

### Permissions Required
- `contents: read` - Read repository
- `pages: write` - Write to Pages
- `id-token: write` - Generate deployment token

---

## 🐛 Troubleshooting

### Deployment Failed (Red X)

**Check the logs:**
1. Go to: https://github.com/Digital-AI-Finance/Green-Finance/actions
2. Click on the failed workflow
3. Click on "build-and-deploy" job
4. Expand failed step to see error

**Common Issues:**

**Build errors:**
```bash
# Test build locally first
cd react-app
npm run build
# Fix any errors before pushing
```

**Dependency issues:**
```bash
# Update package-lock.json
cd react-app
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

**Permission errors:**
- Verify Pages is enabled: Settings → Pages
- Check workflow permissions: Settings → Actions → General → Workflow permissions

### Deployment Succeeds But Site Not Updated

**Wait:** GitHub Pages can take 2-5 minutes to propagate changes

**Clear cache:**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache completely
- Try incognito/private mode

**Check deployment:**
- Go to: https://github.com/Digital-AI-Finance/Green-Finance/deployments
- Verify latest deployment is active

---

## 📈 Performance

### Typical Deployment Times

| Step | Duration |
|------|----------|
| Checkout code | 5 seconds |
| Setup Node.js | 10 seconds |
| Install dependencies | 30 seconds |
| Build React app | 45 seconds |
| Upload & deploy | 30 seconds |
| **Total** | **~2 minutes** |
| Pages propagation | 2-5 minutes |
| **End-to-end** | **4-7 minutes** |

---

## 🎉 Benefits of Automatic Deployment

✅ **No manual steps** - Just push and forget
✅ **Always in sync** - Live site matches latest code
✅ **Build validation** - Catches errors before deployment
✅ **Deployment history** - Track all deployments
✅ **Rollback capability** - Revert to previous deployment if needed
✅ **Zero downtime** - Seamless updates

---

## 🔄 Example Update Workflow

### Scenario: Update Week 1 Slide Content

```powershell
# 1. Navigate to project
cd D:\Joerg\Research\slides\GreenFinance\react-app

# 2. Edit content
# Open src/data/week1Slides.js in your editor
# Make your changes

# 3. Test locally
npm start
# Verify changes at http://localhost:3000

# 4. Commit and push
cd ..
git add react-app/src/data/week1Slides.js
git commit -m "Update Week 1 slide 5 content"
git push origin main

# 5. Monitor deployment
# Visit: https://github.com/Digital-AI-Finance/Green-Finance/actions
# Wait for green checkmark (2-3 min)

# 6. Verify live site
# Visit: https://digital-ai-finance.github.io/Green-Finance/
# Hard refresh: Ctrl+Shift+R
```

---

## 📚 Additional Resources

- **GitHub Actions Docs:** https://docs.github.com/en/actions
- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **Workflow Runs:** https://github.com/Digital-AI-Finance/Green-Finance/actions
- **Deployments:** https://github.com/Digital-AI-Finance/Green-Finance/deployments

---

## ✨ Next Steps

### Your app now auto-deploys! 🎉

Every push to `main` with `react-app/` changes triggers deployment.

**Try it:**
1. Make a small change to `react-app/src/data/week1Slides.js`
2. Commit and push
3. Watch it deploy automatically!

**Live URL:** https://digital-ai-finance.github.io/Green-Finance/

---

**Automatic deployment configured and tested successfully!**
