# 123Fakturera - Terms & Pricelist Application

A modern web application built with React, Fastify, and PostgreSQL, featuring a terms page and an editable pricelist with responsive design and internationalization support.

## 🚀 Features

- **Terms Page**: Displays terms and conditions with responsive design
- **Pricelist Page**: Editable table with inline editing capabilities
- **Language Support**: English and Swedish with automatic locale detection
- **Responsive Design**: Adapts to desktop, tablet, and mobile devices
- **PostgreSQL Database**: Robust data storage with Sequelize ORM
- **Modern UI**: Clean, professional interface with hamburger navigation

## 🛠️ Technology Stack

### Frontend
- **React 18** with Vite for fast development
- **Vanilla CSS** for styling (no frameworks)
- **React Router DOM** for navigation
- **Context API** for language management

### Backend
- **Fastify** for high-performance API server
- **Sequelize ORM** for database operations
- **PostgreSQL** for data storage
- **CORS** enabled for cross-origin requests

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database (Neon, AWS RDS, or local)
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <repository-url>
cd SOW
npm install
```

### 2. Start Development
```bash
# Start both frontend and backend
npm run dev
```

## 📁 Available Commands

```bash
# Development
npm run dev          # Start both frontend and backend
npm run server:dev   # Backend only
npm run client:dev   # Frontend only
```

## 🌐 Application URLs

- **Frontend**: http://localhost:3000 (or 3001 if 3000 is busy)
- **Backend API**: http://localhost:5000
- **Terms Page**: http://localhost:3000/terms
- **Pricelist Page**: http://localhost:3000/pricelist

## 🗄️ Database Schema

### Tables
- **languages**: Language codes and names
- **terms_sections**: Terms content by language
- **products**: Pricelist items with editable fields

### API Endpoints
- `GET /api/terms?lang=en|sv` - Fetch terms by language
- `GET /api/pricelist` - Fetch all products
- `PATCH /api/pricelist/:id` - Update product field

## 🎨 Responsive Design

### Breakpoints
- **Desktop**: Full table with all columns visible
- **Tablet**: Hides description column
- **Phone Landscape**: Hides in_price and in_stock columns
- **Phone Portrait**: Shows only article_no, name, price, and unit

### Language Switching
- Automatic browser locale detection
- Persistent language preference
- Site-wide language context
- Accessibility support with `lang` attribute

## 🔧 Development

### Project Structure
```
SOW/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── LanguageContext.jsx
│   │   └── main.jsx
│   └── package.json
├── server/                 # Fastify backend
│   ├── database/          # Database models and config
│   ├── routes/            # API routes
│   └── package.json
└── package.json           # Root workspace config
```

### Key Features
- **Hot Reload**: Both frontend and backend support live reloading
- **Database Sync**: Automatic table creation and data seeding
- **CORS**: Configured for local development
- **Error Handling**: Comprehensive error handling and logging

## 🚀 Deployment

### Environment Variables
Create `.env` files in both `client/` and `server/` directories:

**server/.env**
```env
PORT=5000
NODE_ENV=production
```

**client/.env**
```env
VITE_API_URL=http://localhost:5000
```

### Production Build
```bash
# Build frontend
cd client && npm run build

# Start production server
cd server && npm start
```

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

**Note**: This application is designed for the 123Fakturera project with a focus on simplicity, performance, and user experience.
