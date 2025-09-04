import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const NotFoundPage = () => {
  const { t } = useLanguage();

  return (
    <div>
      <h1>Pricelist</h1>
    </div>
  );
};

export default NotFoundPage;
