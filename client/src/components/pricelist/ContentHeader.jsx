import React, { useState } from 'react';
import styles from '../../styles/pricelistPage.module.css';
import { useLanguage } from '../../contexts/LanguageContext';

const ContentHeader = () => {
    const [articleSearch, setArticleSearch] = useState('');
    const [productSearch, setProductSearch] = useState('');
    const [advancedMode, setAdvancedMode] = useState(false);
    const { t, language, setLanguage, getLanguageName, getFlagUrl } = useLanguage();

    const handleArticleSearch = (e) => {
        setArticleSearch(e.target.value);
    };

    const handleProductSearch = (e) => {
        setProductSearch(e.target.value);
    };

    const handleNewProduct = () => {
        // TODO: Implement new product functionality
        console.log('New Product clicked');
    };

    const handlePrintList = () => {
        // TODO: Implement print list functionality
        console.log('Print List clicked');
    };

    const handleAdvancedMode = () => {
        setAdvancedMode(!advancedMode);
    };

    return (
        <div className={styles.contentHeader}>
            <div className={styles.searchSection}>
                <div className={styles.searchInputs}>
                    <div className={styles.searchField}>
                        <input
                            type="text"
                            placeholder={t("contentHeader.searchArticleNo")}
                            value={articleSearch}
                            onChange={handleArticleSearch}
                            className={styles.searchInput}
                        />
                        <div className={styles.searchIcon}>
                            🔍
                        </div>
                    </div>
                    <div className={styles.searchField}>
                        <input
                            type="text"
                            placeholder={t("contentHeader.searchProduct")}
                            value={productSearch}
                            onChange={handleProductSearch}
                            className={styles.searchInput}
                        />
                        <div className={styles.searchIcon}>
                            🔍
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={styles.actionButtons}>
                <button 
                    className={styles.actionButton}
                    onClick={handleNewProduct}
                >
                    <span className={styles.buttonText}>{t("contentHeader.newProduct")}</span>
                    <span className={styles.buttonIcon}>➕</span>
                </button>
                
                <button 
                    className={styles.actionButton}
                    onClick={handlePrintList}
                >
                    <span className={styles.buttonText}>{t("contentHeader.printList")}</span>
                    <span className={styles.buttonIcon}>🖨️</span>
                </button>
                
                <button 
                    className={`${styles.actionButton} ${advancedMode ? styles.active : ''}`}
                    onClick={handleAdvancedMode}
                >
                    <span className={styles.buttonText}>{t("contentHeader.advancedMode")}</span>
                    <span className={styles.buttonIcon}>🔧</span>
                </button>
            </div>
        </div>
    );
};

export default ContentHeader;