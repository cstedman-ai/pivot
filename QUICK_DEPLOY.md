# Quick Deployment Guide

## TL;DR - Deploy in 5 Minutes

### Prerequisites
- [ ] Backend deployed and running (see Backend Setup below)
- [ ] OpenAI API key configured on backend
- [ ] Git repository set up

### Deploy Frontend to GitHub Pages

1. **Configure API URL**
   ```bash
   cd frontend
   echo "VITE_API_URL=https://your-backend-url.com/api" > .env.production
   ```

2. **Deploy**
   ```bash
   npm run deploy
   ```

3. **Enable GitHub Pages**
   - Go to GitHub repo → Settings → Pages
   - Source: `gh-pages` branch
   - Save

4. **Done!** 
   Your app will be live at: `https://cstedman-ai.github.io/pivot/`

---

## Backend Quick Setup Options

### Option 1: Railway (Easiest - 2 minutes)

1. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
2. Select your repo → Configure:
   - Root Directory: `backend`
   - Add variable: `OPENAI_API_KEY` = your_key
3. Copy the URL Railway provides

### Option 2: Render

1. Go to [render.com](https://render.com) → New Web Service
2. Connect repo → Configure:
   - Root: `backend`
   - Build: `npm install && npm run build`
   - Start: `npm start`
   - Add env var: `OPENAI_API_KEY`
3. Copy the URL Render provides

### Option 3: Vercel

```bash
cd backend
npx vercel
# Follow prompts, add OPENAI_API_KEY when asked
```

---

## Automated Deployment with GitHub Actions

The repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to main/master.

### Setup (One-time)

1. Go to GitHub repo → Settings → Secrets → Actions
2. Add secret: `VITE_API_URL` = `https://your-backend-url.com/api`
3. Push to main branch → Auto-deploys!

---

## Quick Commands Reference

```bash
# Install dependencies
npm install

# Development
npm run dev                    # Start frontend + backend
npm run dev:frontend           # Frontend only
npm run dev:backend            # Backend only

# Build
npm run build                  # Build both
npm run build:frontend         # Frontend only
npm run build:backend          # Backend only

# Deploy
npm run deploy                 # Deploy frontend to gh-pages
cd frontend && npm run deploy  # Same as above

# Test deployment
cd frontend && npm run preview # Preview production build locally
```

---

## Environment Variables Checklist

### Backend (.env)
```env
OPENAI_API_KEY=sk-...          ✓ Required
PORT=3001                      ✓ Auto-set by hosting
NODE_ENV=production            ✓ Auto-set by hosting
```

### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend.com/api  ✓ Required
```

---

## Verification Steps

After deployment:

1. **Backend Health Check**
   ```bash
   curl https://your-backend-url.com/api/health
   # Should return: {"status":"ok","message":"Pivot API is running"}
   ```

2. **Frontend**
   - Visit: `https://cstedman-ai.github.io/pivot/`
   - Try uploading a test resume
   - Check browser console for errors

3. **API Connection**
   - Upload a resume
   - Should receive analysis results
   - If fails, check VITE_API_URL and CORS

---

## Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Blank page on GitHub Pages | Check browser console, verify base path in vite.config.ts |
| API calls fail | Verify VITE_API_URL in .env.production |
| CORS errors | Backend already has CORS enabled, check URL |
| Build fails | `rm -rf node_modules && npm install` |
| OpenAI errors | Check API key and credits |

---

## Update Deployment

### Update Frontend
```bash
npm run deploy
```

### Update Backend
- Railway/Render: Just push to GitHub (auto-deploys)
- Vercel: `vercel --prod`
- Heroku: `git push heroku main`

---

## Rollback

If something breaks:

```bash
cd frontend
git checkout gh-pages
git reset --hard HEAD~1
git push -f origin gh-pages
```

---

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)
