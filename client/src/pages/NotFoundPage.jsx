import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const NotFoundPage = () => {
  const { t } = useLanguage();

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-icon">🔍</div>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">{t('notFound.title')}</h2>
        <p className="not-found-description">{t('notFound.description')}</p>
        <Link to="/" className="not-found-link">
          {t('notFound.backHome')}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
