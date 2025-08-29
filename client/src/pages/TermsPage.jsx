import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import '../components/TermsPage.css';

const TermsPage = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="terms-page">
      <div className="terms-background">
          <div className='background-image-container'>
            <img src="https://storage.123fakturera.se/public/wallpapers/sverige43.jpg" alt="" id="background-image" />
          </div>
        <div className="terms-container">
          <h1 className="terms-page-title">{t('terms.title')}</h1>
          <button className="terms-close-button" onClick={handleClose}>
            {t('terms.closeButton')}
          </button>
          <div className="terms-content">
            <div
              className="terms-body"
              dangerouslySetInnerHTML={{ __html: t('terms.content') }}
            />
          </div>
          <button className="terms-close-button terms-bottom-button" onClick={handleClose}>
            {t('terms.closeButton')}
          </button>
        </div>
      </div >
    </div >
  );
};

export default TermsPage;
