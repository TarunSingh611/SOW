# SOW - Terms & Pricelist Application

A modern full-stack web application built with React, Fastify, and PostgreSQL, featuring a terms page and an editable pricelist with responsive design and internationalization support.

## 🚀 Features

- **Terms Page**: Displays terms and conditions with responsive design
- **Pricelist Page**: Editable table with inline editing capabilities
- **Language Support**: English and Swedish with automatic locale detection
- **Responsive Design**: Adapts to desktop, tablet, and mobile devices
- **PostgreSQL Database**: Robust data storage with Sequelize ORM
- **Modern UI**: Clean, professional interface with hamburger navigation
- **404 Page**: Custom 404 page for better user experience
- **Client-Side Routing**: React Router with server-side support

## 🛠️ Technology Stack

### Frontend
- **React 18** with Vite for fast development
- **Vanilla CSS** for styling (no frameworks)
- **React Router DOM** for navigation
- **Context API** for language management
- **Vite** for build tooling and development server

### Backend
- **Fastify** for high-performance API server
- **Sequelize ORM** for database operations
- **PostgreSQL** for data storage
- **CORS** enabled for cross-origin requests
- **Nodemon** for development hot reload

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database (Neon, AWS RDS, or local)
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/TarunSingh611/SOW.git
cd SOW
```

### 2. Install Dependencies
```bash
# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

### 3. Environment Setup
Create environment files for both client and server:

**server/.env**
```env
PORT=3001
NODE_ENV=development
DATABASE_URL=your_postgresql_connection_string
```

**client/.env**
```env
VITE_API_URL=http://localhost:3001
```

### 4. Build and Start
```bash
# Build the frontend
cd client && npm run build

# Start the server (serves both API and built frontend)
cd ../server && npm run dev
```

## 📁 Project Structure

```
SOW/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── locale/         # Translation files
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static assets
│   ├── index.html          # HTML template
│   ├── vite.config.js      # Vite configuration
│   └── package.json
├── server/                 # Fastify backend
│   ├── database/           # Database models and config
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── controllers/        # Request handlers
│   ├── repositories/       # Data access layer
│   ├── utils/              # Utility functions
│   ├── public/             # Built frontend files
│   ├── index.js            # Server entry point
│   └── package.json
├── README.md
└── .gitignore
```

## 🌐 Application URLs

- **Main Application**: http://localhost:3001
- **Terms Page**: http://localhost:3001/terms
- **Pricelist Page**: http://localhost:3001/
- **API Endpoints**: http://localhost:3001/api/*
- **Health Check**: http://localhost:3001/health

## 🗄️ Database Schema

### Products Table
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  article_no VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  name_sv VARCHAR(255),
  in_price DECIMAL(12,2) DEFAULT 0,
  price DECIMAL(12,2) NOT NULL DEFAULT 0,
  unit VARCHAR(255),
  in_stock INTEGER DEFAULT 0,
  description TEXT,
  description_sv TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);
```

### API Endpoints
- `GET /api/pricelist` - Fetch all products
- `POST /api/pricelist` - Create new product
- `PUT /api/pricelist/:id` - Update product
- `DELETE /api/pricelist/:id` - Delete product
- `GET /health` - Health check endpoint

## 🎨 Features

### Responsive Design
- **Desktop**: Full table with all columns visible
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Hamburger menu with collapsible navigation

### Language Support
- **English & Swedish**: Full internationalization
- **Automatic Detection**: Browser locale detection
- **Persistent Preference**: Remembers user's language choice
- **Context Provider**: Site-wide language management

### Client-Side Routing
- **React Router**: Client-side navigation
- **Server Support**: Handles direct URL access
- **404 Page**: Custom not-found page
- **Static File Serving**: Proper content-type handling

## 🔧 Development

### Available Commands

**Client (Frontend)**
```bash
cd client
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

**Server (Backend)**
```bash
cd server
npm run dev          # Start with nodemon
npm start            # Start production server
```

### Development Workflow
1. **Frontend Development**: Run `npm run dev` in `client/` for hot reload
2. **Backend Development**: Run `npm run dev` in `server/` for API development
3. **Production**: Build frontend with `npm run build` in `client/`, then start server

### Key Features
- **Hot Reload**: Both frontend and backend support live reloading
- **Database Sync**: Automatic table creation and schema updates
- **CORS**: Configured for local development
- **Error Handling**: Comprehensive error handling and logging
- **Static File Serving**: Built frontend served by backend

## 🚀 Deployment

### Production Build
```bash
# Build frontend
cd client && npm run build

# Start production server
cd ../server && npm start
```

### Environment Variables
**server/.env**
```env
PORT=3001
NODE_ENV=production
DATABASE_URL=your_production_database_url
```

### Deployment Considerations
- Frontend builds to `server/public/` directory
- Server serves both API and static files
- Single port deployment (3001)
- Database connection required
- CORS configured for production

## 🌍 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 License

MIT License - see LICENSE file for details.

## 👨‍💻 Author

Tarun Singh Rajput

---

**Note**: This application is designed for the SOW project with a focus on simplicity, performance, and user experience. The server serves both the API and the built frontend, making deployment straightforward.
