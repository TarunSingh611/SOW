import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ToastProvider } from './contexts/ToastContext';
import TermsPage from './pages/TermsPage';
import PricelistPage from './pages/PricelistPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';
import './pages/NotFoundPage.css';

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { 
    language, 
    toggleLanguage, 
    getLanguageName, 
    getFlagUrl,
    t
  } = useLanguage();
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <button className="hamburger-btn" onClick={toggleSidebar}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="logo-section">
            <img 
              src="https://storage.123fakturera.se/public/icons/diamond.png" 
              alt="Logo" 
              className="logo"
            />
          </div>
        </div>
        <div className="header-right">
          <button className="language-btn" onClick={toggleLanguage}>
            <img 
              src={getFlagUrl(language)}
              alt={getLanguageName(language)} 
              className="flag-icon"
            />
            <span>{getLanguageName(language)}</span>
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <div className="nav-title">{t('navigation.menu')}</div>
          <ul className="nav-list">
            <li>
              <a href="/" className={`nav-link ${isActiveRoute('/') ? 'active' : ''}`} onClick={closeSidebar}>
                <span className="nav-icon">📊</span>
                <span>{t('navigation.priceList')}</span>
                {isActiveRoute('/') && <span className="active-dot"></span>}
              </a>
            </li>
            <li>
              <a href="/terms" className={`nav-link ${isActiveRoute('/terms') ? 'active' : ''}`} onClick={closeSidebar}>
                <span className="nav-icon">📜</span>
                <span>{t('navigation.termsAndConditions')}</span>
                {isActiveRoute('/terms') && <span className="active-dot"></span>}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay */}
      {sidebarOpen && <div className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`} onClick={closeSidebar}></div>}

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<PricelistPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

const App = () => {
  return (
    <LanguageProvider>
      <ToastProvider>
        <Router>
          <AppContent />
        </Router>
      </ToastProvider>
    </LanguageProvider>
  );
};

export default App;
