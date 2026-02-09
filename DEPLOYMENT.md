# Deployment Guide for Pivot

This guide covers deploying the Pivot application to GitHub Pages (frontend) and a separate hosting service for the backend API.

## Overview

- **Frontend**: React app deployed to GitHub Pages (static hosting)
- **Backend**: Express API that needs separate hosting (Heroku, Railway, Render, Vercel, etc.)

## Prerequisites

1. A GitHub account with access to the repository
2. A hosting service account for the backend (see Backend Deployment section)
3. OpenAI API key for resume analysis features

## Frontend Deployment (GitHub Pages)

### Step 1: Configure the API URL

Before deploying, you need to point the frontend to your backend API:

1. Create a `.env.production` file in the `frontend/` directory:
   ```bash
   VITE_API_URL=https://your-backend-api-url.com/api
   ```
   Replace `your-backend-api-url.com` with your actual backend URL.

### Step 2: Deploy to GitHub Pages

Run the following command from the root directory:

```bash
cd frontend
npm run deploy
```

This will:
1. Build the frontend (`npm run build`)
2. Deploy the built files to the `gh-pages` branch
3. Your site will be available at: `https://cstedman-ai.github.io/pivot/`

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to Settings → Pages
3. Under "Source", select the `gh-pages` branch
4. Click Save

Your site should be live in a few minutes!

## Backend Deployment

The backend API needs to be deployed to a service that supports Node.js applications. Here are some popular options:

### Option 1: Railway (Recommended - Easy & Free Tier)

1. Sign up at [railway.app](https://railway.app)
2. Create a new project
3. Connect your GitHub repository
4. Select the `backend` directory as the root
5. Add environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `NODE_ENV`: production
   - `PORT`: 3001 (or Railway will set it automatically)
6. Deploy!

### Option 2: Render

1. Sign up at [render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure:
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. Add environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `NODE_ENV`: production

### Option 3: Heroku

1. Install the Heroku CLI
2. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```
3. Set environment variables:
   ```bash
   heroku config:set OPENAI_API_KEY=your_api_key
   heroku config:set NODE_ENV=production
   ```
4. Deploy:
   ```bash
   git subtree push --prefix backend heroku main
   ```

### Option 4: Vercel (Serverless)

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to backend directory: `cd backend`
3. Run: `vercel`
4. Follow the prompts
5. Set environment variables in Vercel dashboard

## Environment Variables

### Backend Required Variables

```env
OPENAI_API_KEY=sk-...
NODE_ENV=production
PORT=3001
```

### Frontend Required Variables

```env
VITE_API_URL=https://your-backend-api-url.com/api
```

## Testing the Deployment

1. **Test Backend**: Visit `https://your-backend-url.com/api/health`
   - Should return: `{"status":"ok","message":"Pivot API is running"}`

2. **Test Frontend**: Visit `https://cstedman-ai.github.io/pivot/`
   - The app should load
   - Try uploading a resume to test the API connection

## Updating the Deployment

### Update Frontend

```bash
cd frontend
npm run deploy
```

### Update Backend

Depends on your hosting service:
- **Railway/Render**: Push to GitHub (auto-deploys)
- **Heroku**: `git push heroku main`
- **Vercel**: `vercel --prod`

## Troubleshooting

### Frontend Issues

1. **Blank page after deployment**
   - Check browser console for errors
   - Verify the `base` path in `vite.config.ts` matches your repo name
   - Ensure the `gh-pages` branch exists

2. **API calls failing**
   - Check the `VITE_API_URL` in `.env.production`
   - Verify the backend is running and accessible
   - Check CORS settings in backend

### Backend Issues

1. **OpenAI API errors**
   - Verify `OPENAI_API_KEY` is set correctly
   - Check API key has sufficient credits

2. **CORS errors**
   - The backend already has CORS enabled
   - Ensure the frontend URL is accessible

## GitHub Actions (Optional - Automated Deployment)

You can automate deployments with GitHub Actions. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: |
        cd frontend
        npm ci
    
    - name: Build
      run: |
        cd frontend
        npm run build
      env:
        VITE_API_URL: ${{ secrets.VITE_API_URL }}
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./frontend/dist
```

Don't forget to add `VITE_API_URL` to your repository secrets!

## Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Railway Documentation](https://docs.railway.app/)
- [Render Documentation](https://render.com/docs)

## Support

For issues or questions, please open an issue on the GitHub repository.
