# 🚀 Deployment Guide - SOW Project

## 📋 Overview

This project is structured for **separate deployment** of frontend and backend, with the backend serving the built frontend files. This approach allows for:

- ✅ **Separate hosting** of frontend and backend
- ✅ **Backend serves frontend** for production
- ✅ **Independent scaling** of each service
- ✅ **Flexible deployment** options

---

## 🏗️ Project Structure

```
sow-project/
├── client/                 # Frontend (React + Vite)
│   ├── package.json       # Frontend dependencies
│   ├── vite.config.js     # Build configuration
│   ├── index.html         # HTML template
│   └── src/               # React source code
├── server/                # Backend (Fastify + Sequelize)
│   ├── package.json       # Backend dependencies
│   ├── index.js           # Main server file
│   ├── public/            # Built frontend files (generated)
│   └── database/          # Database models and migrations
├── package.json           # Root workspace manager
└── env.example            # Environment variables template
```

---

## 🎯 Deployment Strategies

### **Strategy 1: Backend Serves Frontend (Recommended)**

**How it works:**
1. Frontend builds to `server/public/`
2. Backend serves static files from `server/public/`
3. Single deployment for both frontend and backend

**Benefits:**
- ✅ **Simpler deployment** - one service to manage
- ✅ **No CORS issues** - same origin for API calls
- ✅ **Cost effective** - single hosting service
- ✅ **Easy SSL setup** - one certificate

### **Strategy 2: Separate Hosting**

**How it works:**
1. Frontend deployed to CDN/static hosting (Vercel, Netlify, etc.)
2. Backend deployed to server hosting (Heroku, Railway, etc.)
3. Frontend makes API calls to backend URL

**Benefits:**
- ✅ **Independent scaling** - scale frontend and backend separately
- ✅ **Global CDN** - faster frontend delivery
- ✅ **Specialized hosting** - best tool for each job

---

## 🚀 Deployment Instructions

### **Option 1: Backend Serves Frontend (Recommended)**

#### **Step 1: Build Frontend**
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Build frontend (outputs to server/public/)
npm run build
```

#### **Step 2: Deploy Backend**
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Set environment variables
cp ../env.example .env
# Edit .env with your production values

# Run database migration
npm run db:migrate

# Start production server
npm start
```

#### **Step 3: Configure Hosting**

**For Railway:**
```json
{
  "build": {
    "builder": "nixpacks"
  },
  "deploy": {
    "startCommand": "cd server && npm start",
    "buildCommand": "cd client && npm install && npm run build"
  }
}
```

**For Heroku:**
```json
{
  "scripts": {
    "build": "cd client && npm install && npm run build",
    "start": "cd server && npm start"
  }
}
```

### **Option 2: Separate Hosting**

#### **Frontend Deployment (Vercel/Netlify)**

1. **Connect repository** to Vercel/Netlify
2. **Set build settings:**
   - Build command: `cd client && npm install && npm run build`
   - Output directory: `client/dist`
   - Install command: `npm install`

3. **Set environment variables:**
   ```
   VITE_API_BASE_URL=https://your-backend-url.com
   ```

#### **Backend Deployment (Railway/Heroku)**

1. **Deploy backend** to your chosen platform
2. **Set environment variables:**
   ```
   DB_HOST=your-db-host
   DB_USER=your-db-user
   DB_PASSWORD=your-db-password
   DB_NAME=sow_project
   NODE_ENV=production
   CORS_ORIGIN=https://your-frontend-url.com
   ```

3. **Run database migration:**
   ```bash
   npm run db:migrate
   ```

---

## 🌐 Free Hosting Options

### **Frontend Hosting**
- **Vercel** - Excellent for React apps
- **Netlify** - Great static site hosting
- **GitHub Pages** - Free for public repos
- **Firebase Hosting** - Google's hosting service

### **Backend Hosting**
- **Railway** - Easy deployment, good free tier
- **Heroku** - Classic choice, limited free tier
- **Render** - Good free tier, easy setup
- **Fly.io** - Global deployment, generous free tier

### **Database Hosting**
- **Railway PostgreSQL** - Easy setup
- **Supabase** - PostgreSQL with additional features
- **Neon** - Serverless PostgreSQL
- **PlanetScale** - MySQL alternative

---

## 🔧 Build Process

### **Development Build**
```bash
# Install all dependencies
npm run install:all

# Start development servers
npm run dev
```

### **Production Build**
```bash
# Build frontend
cd client && npm run build

# The build output goes to server/public/
# Backend will serve these files
```

### **Build Output Structure**
```
server/public/
├── index.html          # Main HTML file
├── assets/             # Built JavaScript/CSS
│   ├── index-xxx.js    # Main bundle
│   └── index-xxx.css   # Styles
└── vite.svg            # Static assets
```

---

## 🔒 Environment Variables

### **Development (.env)**
```bash
# Copy example file
cp env.example .env

# Update with your values
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=sow_project
NODE_ENV=development
```

### **Production**
```bash
# Set these in your hosting platform
DB_HOST=your-production-db-host
DB_USER=your-production-user
DB_PASSWORD=your-secure-password
DB_NAME=sow_project_prod
NODE_ENV=production
CORS_ORIGIN=https://your-domain.com
```

---

## 📊 Database Setup

### **Local Development**
```bash
# Create database
psql -U postgres -c "CREATE DATABASE sow_project;"

# Run migration
npm run db:migrate
```

### **Production**
```bash
# Use hosted PostgreSQL service
# Set connection details in environment variables
# Run migration after deployment
npm run db:migrate
```

---

## 🚀 Quick Deployment Checklist

### **Before Deployment**
- [ ] Frontend builds successfully
- [ ] Backend starts without errors
- [ ] Database migration runs
- [ ] Environment variables set
- [ ] CORS configured for production

### **After Deployment**
- [ ] Frontend loads correctly
- [ ] API endpoints respond
- [ ] Database connection works
- [ ] Terms page displays
- [ ] Pricelist page works
- [ ] Responsive design functions

---

## 🐛 Troubleshooting

### **Common Issues**

#### **Build Fails**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### **Database Connection**
```bash
# Check environment variables
echo $DB_HOST $DB_USER $DB_NAME

# Test connection
psql -h $DB_HOST -U $DB_USER -d $DB_NAME
```

#### **CORS Issues**
```bash
# Set correct CORS origin
CORS_ORIGIN=https://your-frontend-domain.com
```

#### **Static Files Not Serving**
```bash
# Check if build output exists
ls -la server/public/

# Rebuild frontend
cd client && npm run build
```

---

## 📞 Support

For deployment issues:

1. **Check hosting platform logs**
2. **Verify environment variables**
3. **Test database connection**
4. **Ensure build process completes**
5. **Check CORS configuration**

---

**🎯 Ready for Deployment!**

Choose your preferred deployment strategy and follow the instructions above. The project is designed to work with both approaches, giving you flexibility in hosting choices.
