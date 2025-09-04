import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ToastProvider } from './contexts/ToastContext';
import TermsPage from './pages/TermsPage.jsx';
import PricelistPage from './pages/PricelistPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';
import './pages/NotFoundPage.css';

function AppContent() {

  return (
      <main>
        <Routes>
          <Route path="/" element={<PricelistPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} /> 
        </Routes>
      </main>
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
