# Deployment Guide

## Prerequisites
- GitHub account
- Render account (for backend): https://render.com
- Vercel account (for frontend): https://vercel.com

## Step 1: Push to GitHub

After creating your GitHub repository, run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/greenguard-products.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend to Render

1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub account
4. Select the `greenguard-products` repository
5. Configure:
   - **Name**: greenguard-backend
   - **Root Directory**: `backend`
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python app.py`
   - **Plan**: Free
6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. **Copy the URL** (e.g., `https://greenguard-backend.onrender.com`)

## Step 3: Deploy Frontend to Vercel

1. Go to https://vercel.com and sign up/login
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**: Add one:
     - Name: `VITE_API_URL`
     - Value: Your Render backend URL (from Step 2)
5. Click "Deploy"
6. Wait for deployment (2-5 minutes)
7. **Your website is live!** You'll get a URL like `https://greenguard-products.vercel.app`

## Step 4: Update Frontend API URL

After deployment, update your frontend to use the production API:

1. Create `frontend/.env.production`:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

2. Update `frontend/src/App.jsx` to use environment variable:
```javascript
const API_URL = import.meta.env.VITE_API_URL || '';
// Then use `${API_URL}/api/products` instead of `/api/products`
```

3. Commit and push changes - Vercel will auto-redeploy

## Troubleshooting

### Backend Issues
- Check Render logs for errors
- Ensure all dependencies are in requirements.txt
- Verify PORT environment variable is set

### Frontend Issues
- Check Vercel deployment logs
- Ensure API URL is correct
- Check browser console for CORS errors

### CORS Issues
If you get CORS errors, the backend Flask-CORS is already configured to allow all origins.

## Updating Your Site

Whenever you make changes:
```bash
git add .
git commit -m "Description of changes"
git push
```

Both Render and Vercel will automatically redeploy!
