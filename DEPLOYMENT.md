# Deployment Guide

## Render Deployment

### Step 1: Sign up for Render
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. No payment method required for free tier

### Step 2: Deploy from GitHub
1. Click "New" → "Web Service"
2. Connect your GitHub repository: `TarunSingh611/SOW`
3. Configure the service:
   - **Name**: `sow-project`
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

### Step 3: Environment Variables
Add these environment variables in Render dashboard:
- `NODE_ENV`: `production`
- `PORT`: `3000`

### Step 4: Deploy
1. Click "Create Web Service"
2. Render will automatically:
   - Install dependencies
   - Build the React frontend
   - Start the Fastify server
   - Provide you with a live URL

### Step 5: Access Your App
Your app will be available at: `https://your-app-name.onrender.com`

## Alternative: Railway Deployment

### Step 1: Sign up for Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub (no payment method required)

### Step 2: Deploy
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your `SOW` repository
4. Railway will automatically detect the configuration

### Step 3: Access Your App
Your app will be available at the provided Railway URL.

## Troubleshooting

### Common Issues:
1. **Build fails**: Check that all dependencies are in package.json
2. **Port issues**: Make sure PORT environment variable is set
3. **Database issues**: SQLite database will be created automatically

### Local Testing:
```bash
# Install all dependencies
npm run install-all

# Build for production
npm run build

# Start production server
npm start
```
