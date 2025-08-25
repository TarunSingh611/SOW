# Technology List - SOW Project

This document provides a comprehensive list of all technologies, frameworks, libraries, and tools used in the SOW project.

## 🎯 Project Overview
- **Project Type**: Full-Stack Web Application
- **Architecture**: Client-Server with REST API
- **Database**: PostgreSQL with ORM
- **Deployment**: Node.js hosting platform

## 🖥️ Frontend Technologies

### Core Framework
- **React**: 18.2.0
  - Modern JavaScript library for building user interfaces
  - Component-based architecture
  - Virtual DOM for efficient rendering

### Build Tools
- **Vite**: 4.5.0
  - Fast build tool and development server
  - Hot module replacement (HMR)
  - Optimized production builds

### Routing
- **React Router DOM**: 6.20.1
  - Client-side routing for single-page applications
  - Browser history management
  - Nested routing support

### Styling
- **Vanilla CSS**: Custom stylesheets
  - No CSS frameworks used (as per requirements)
  - Responsive design with media queries
  - CSS Grid and Flexbox for layouts
  - CSS custom properties (variables)
  - CSS animations and transitions

### Development Dependencies (Frontend)
- **@types/react**: 18.2.37
  - TypeScript definitions for React
- **@types/react-dom**: 18.2.15
  - TypeScript definitions for React DOM
- **@vitejs/plugin-react**: 4.1.1
  - Vite plugin for React support

## 🖥️ Backend Technologies

### Runtime Environment
- **Node.js**: Latest LTS version
  - JavaScript runtime for server-side development
  - Event-driven, non-blocking I/O

### Web Framework
- **Fastify**: 4.24.3
  - Fast and low overhead web framework
  - Plugin-based architecture
  - Built-in JSON schema validation
  - Excellent performance characteristics

### Database ORM
- **Sequelize**: 6.35.0
  - Promise-based Node.js ORM
  - Support for PostgreSQL, MySQL, SQLite, and Microsoft SQL Server
  - Database migrations and seeding
  - Model associations and validations

### Database Driver
- **pg**: 8.11.3
  - PostgreSQL client for Node.js
  - Non-blocking PostgreSQL client
- **pg-hstore**: 2.3.4
  - Node.js package for serializing and deserializing JSON data to hstore format

### Database
- **PostgreSQL**: 12+ (recommended)
  - Advanced open-source relational database
  - ACID compliance
  - JSON support
  - Full-text search capabilities

## 🛠️ Development Tools

### Process Management
- **Nodemon**: 3.0.1
  - Utility that monitors changes in source code
  - Automatically restarts server during development
  - File watching and restart capabilities

### Concurrent Execution
- **Concurrently**: 8.2.2
  - Run multiple commands concurrently
  - Used to run frontend and backend simultaneously
  - Cross-platform compatibility

## 📦 Package Management
- **npm**: Latest version
  - Node.js package manager
  - Dependency resolution
  - Script execution

## 🌐 HTTP and API

### CORS
- **fastify-cors**: 8.4.0
  - Cross-Origin Resource Sharing support for Fastify
  - Configurable CORS policies
  - Preflight request handling

### Static File Serving
- **fastify-static**: 4.0.3
  - Serve static files with Fastify
  - Efficient file serving
  - Cache control headers

## 🎨 Design and UI

### Icons and Assets
- **External Assets**: Using 123fakturera storage URLs
  - Flags: SE.png, GB.png
  - Background: sverige43.jpg
  - Logo: diamond.png

### Color Scheme
- **Primary**: #667eea (Purple)
- **Secondary**: #764ba2 (Dark Purple)
- **Success**: #28a745 (Green)
- **Danger**: #dc3545 (Red)
- **Warning**: #ffc107 (Yellow)
- **Info**: #17a2b8 (Blue)

### Typography
- **Font Family**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold)
- **Line Height**: 1.6

## 📱 Responsive Design

### Breakpoints
- **Desktop**: >1024px
- **Tablet**: 768px - 1024px
- **Mobile**: <768px
- **Mobile Landscape**: <768px with landscape orientation

### CSS Features
- **Media Queries**: Responsive breakpoints
- **Flexbox**: Layout system
- **CSS Grid**: Advanced layouts
- **CSS Variables**: Custom properties
- **CSS Transitions**: Smooth animations
- **CSS Transforms**: Visual effects

## 🔧 Development Scripts

### Available Commands
```bash
npm run dev              # Start development servers
npm run server:dev       # Start backend server only
npm run client:dev       # Start frontend dev server only
npm run build           # Build for production
npm run preview         # Preview production build
npm run db:migrate      # Run database migration
npm run db:seed         # Seed database with sample data
```

## 🗄️ Database Schema

### Terms Table
```sql
CREATE TABLE terms (
  id SERIAL PRIMARY KEY,
  language ENUM('en', 'sv') NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  section VARCHAR(100) NOT NULL,
  "order" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  "inPrice" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit VARCHAR(50) NOT NULL DEFAULT 'st',
  vat DECIMAL(5,2) NOT NULL DEFAULT 25.00,
  discount DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  category VARCHAR(100),
  sku VARCHAR(100),
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🌍 Browser Support

### Modern Browsers
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Features Used
- **ES6+ JavaScript**: Arrow functions, destructuring, async/await
- **CSS Grid**: Modern layout system
- **CSS Custom Properties**: Dynamic styling
- **Fetch API**: Modern HTTP requests
- **Promise-based APIs**: Async operations

## 🔒 Security Features

### Frontend
- **Input Validation**: Client-side form validation
- **XSS Prevention**: React's built-in XSS protection
- **CSRF Protection**: Same-origin policy enforcement

### Backend
- **Input Sanitization**: Sequelize ORM protection
- **SQL Injection Prevention**: Parameterized queries
- **CORS Configuration**: Controlled cross-origin requests
- **Error Handling**: Proper error responses

## 📊 Performance Optimizations

### Frontend
- **Code Splitting**: React Router lazy loading
- **Bundle Optimization**: Vite build optimization
- **Image Optimization**: External CDN assets
- **CSS Optimization**: Minified stylesheets

### Backend
- **Database Indexing**: Primary and foreign keys
- **Query Optimization**: Sequelize query optimization
- **Connection Pooling**: Database connection management
- **Caching**: HTTP response caching

## 🧪 Testing Considerations

### Frontend Testing
- **React Testing Library**: Component testing
- **Jest**: JavaScript testing framework
- **User Event Testing**: User interaction testing

### Backend Testing
- **API Testing**: REST endpoint testing
- **Database Testing**: Integration testing
- **Unit Testing**: Individual function testing

## 📈 Monitoring and Logging

### Development
- **Console Logging**: Development debugging
- **Error Boundaries**: React error handling
- **Network Tab**: Browser developer tools

### Production
- **Error Tracking**: Application error monitoring
- **Performance Monitoring**: Application performance
- **Database Monitoring**: Query performance

## 🚀 Deployment Requirements

### Environment Variables
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=sow_project
NODE_ENV=production
PORT=5000
```

### Build Process
1. **Frontend Build**: `npm run build`
2. **Static File Serving**: Fastify static middleware
3. **Database Migration**: `npm run db:migrate`
4. **Environment Configuration**: Production environment variables

## 📋 Version Compatibility

### Node.js
- **Minimum**: 16.0.0
- **Recommended**: 18.0.0+
- **LTS**: 20.0.0+

### PostgreSQL
- **Minimum**: 12.0
- **Recommended**: 14.0+
- **Latest**: 16.0+

### Browser Support
- **Modern Browsers**: 2 years from current date
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+

---

**Note**: This technology stack was chosen to meet the SOW requirements while providing a modern, scalable, and maintainable solution. All versions specified are stable and well-supported in the development community.
