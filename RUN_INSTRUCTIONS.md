# 🚀 How to Run the SOW Project

## 📋 Prerequisites

Before running the project, make sure you have the following installed:

### Required Software
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download here](https://www.postgresql.org/download/)
- **npm** (comes with Node.js)

### Verify Installation
```bash
node --version    # Should be v16 or higher
npm --version     # Should be v8 or higher
psql --version    # Should be v12 or higher
```

---

## 🗄️ Database Setup

### 1. Create PostgreSQL Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE sow_project;

# Verify database creation
\l

# Exit PostgreSQL
\q
```

### 2. Configure Database Connection
The project uses default PostgreSQL settings. If your setup is different, update `server/database/config.js`:

```javascript
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'sow_project',
  logging: false
});
```

---

## 📦 Project Setup

### 1. Install Dependencies
```bash
# Navigate to project directory
cd sow-project

# Install all dependencies (frontend + backend)
npm run install:all
```

### 2. Run Database Migration
```bash
# This will create tables and seed sample data
npm run db:migrate
```

**Expected Output:**
```
Database tables created successfully
Terms data seeded successfully
Products data seeded successfully
Migration completed successfully
```

---

## 🚀 Running the Application

### Option 1: Run Both Frontend and Backend (Recommended)
```bash
# Start both servers simultaneously
npm run dev
```

**Expected Output:**
```
[0] Server running on http://localhost:5000
[1] VITE v4.5.0  ready in 500 ms
[1] ➜  Local:   http://localhost:3000/
[1] ➜  Network: use --host to expose
```

### Option 2: Run Servers Separately

#### Terminal 1 - Backend Server
```bash
npm run server:dev
```

#### Terminal 2 - Frontend Server
```bash
npm run client:dev
```

---

## 🌐 Access the Application

### Frontend (React App)
- **URL**: http://localhost:3000
- **Terms Page**: http://localhost:3000/terms
- **Pricelist Page**: http://localhost:3000/pricelist

### Backend API
- **Health Check**: http://localhost:5000/api/health
- **Terms API**: http://localhost:5000/api/terms/en
- **Pricelist API**: http://localhost:5000/api/pricelist

---

## 📱 Testing the Application

### 1. Terms Page Testing
- Visit: http://localhost:3000/terms
- Test language switching (EN/SV)
- Test hamburger menu on mobile
- Verify responsive design

### 2. Pricelist Page Testing
- Visit: http://localhost:3000/pricelist
- Test responsive layouts:
  - **Desktop**: Full table view
  - **Tablet**: Simplified table
  - **Mobile**: Card layout
- Test inline editing functionality
- Verify auto-calculation

### 3. API Testing
```bash
# Test Terms API
curl http://localhost:5000/api/terms/en

# Test Pricelist API
curl http://localhost:5000/api/pricelist
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend |
| `npm run server:dev` | Start backend server only |
| `npm run client:dev` | Start frontend dev server only |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run db:migrate` | Run database migration |
| `npm run db:seed` | Seed database with sample data |

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 5000
npx kill-port 5000
```

#### 2. Database Connection Error
```bash
# Check if PostgreSQL is running
sudo service postgresql status

# Start PostgreSQL if not running
sudo service postgresql start
```

#### 3. Node Modules Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 4. Database Migration Fails
```bash
# Drop and recreate database
psql -U postgres -c "DROP DATABASE IF EXISTS sow_project;"
psql -U postgres -c "CREATE DATABASE sow_project;"

# Run migration again
npm run db:migrate
```

---

## 📊 Database Verification

### Check Database Tables
```bash
psql -U postgres -d sow_project

# List tables
\dt

# Check terms data
SELECT * FROM terms LIMIT 5;

# Check products data
SELECT * FROM products LIMIT 5;

# Exit
\q
```

---

## 🌍 Production Deployment

### 1. Build for Production
```bash
npm run build
```

### 2. Set Environment Variables
```bash
export DB_HOST=your-db-host
export DB_PORT=5432
export DB_USER=your-db-user
export DB_PASSWORD=your-db-password
export DB_NAME=sow_project
export NODE_ENV=production
```

### 3. Start Production Server
```bash
npm run server:start
```

---

## 📞 Support

If you encounter any issues:

1. **Check the console** for error messages
2. **Verify database connection** settings
3. **Ensure all dependencies** are installed
4. **Check port availability** (3000 and 5000)

### Project Structure
```
sow-project/
├── server/                 # Backend code
├── src/                   # Frontend code
├── package.json          # Dependencies
├── README.md             # Detailed documentation
├── TECHNOLOGY_LIST.md    # Tech stack details
└── TASK.md              # Task requirements
```

---

**🎯 Ready to Test!**

Once you've completed these steps, you should have a fully functional SOW application running with:
- ✅ Terms page with multi-language support
- ✅ Pricelist page with responsive design
- ✅ Database integration
- ✅ API endpoints
- ✅ Hamburger menu functionality
- ✅ External assets integration

**Happy Testing! 🚀**
