import React, { useState, useEffect, useCallback } from 'react';
import styles from "../../styles/pricelistPage.module.css";
import { useLanguage } from "../../contexts/LanguageContext";
import { productService } from '../../services/productService.js';
import { ProductsAPI } from '../../api/products.js';
import { formatPrice } from '../../utils/formatters.js';
import { useToast } from "../../contexts/ToastContext";

const ContentTable = () => {
    const { t, language } = useLanguage();
    const { showToast } = useToast();
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingCell, setEditingCell] = useState(null);
    const [editingValue, setEditingValue] = useState('');
    const [saving, setSaving] = useState(false);
    const [activeRow, setActiveRow] = useState(null);

    // Fetch products from database
    const fetchProducts = useCallback(async () => {
        try {
            const fetchedProducts = await productService.fetchProducts(setLoading);
            console.log('fetchedProducts', fetchedProducts);
            setProducts(fetchedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
            showToast('Failed to load products', 'error');
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    // Load products on component mount
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Handle row click to set active row
    const handleRowClick = (productId) => {
        setActiveRow(productId);
    };

    // Handle cell edit start
    const handleEditStart = (productId, field, currentValue) => {
        setEditingCell(`${productId}-${field}`);
        setEditingValue(currentValue || '');
        setActiveRow(productId); // Set this row as active when editing
    };

    // Handle cell edit cancel
    const handleEditCancel = () => {
        setEditingCell(null);
        setEditingValue('');
    };

    // Handle cell edit save
    const handleEditSave = async (productId, field) => {
        if (saving) return;
        
        try {
            setSaving(true);
            
            // Convert value based on field type
            let processedValue = editingValue;
            if (field === 'in_price' || field === 'price') {
                processedValue = parseFloat(editingValue) || 0;
            } else if (field === 'in_stock') {
                processedValue = parseInt(editingValue) || 0;
            }

            // Update product in database
            const updatedProduct = await ProductsAPI.updateProductField(productId, field, processedValue);
            
            // Update local state
            setProducts(prevProducts => 
                prevProducts.map(product => 
                    product.id === productId 
                        ? { ...product, [field]: processedValue }
                        : product
                )
            );
            
            setEditingCell(null);
            setEditingValue('');
            showToast('Product updated successfully', 'success');
        } catch (error) {
            console.error('Error updating product:', error);
            showToast('Failed to update product', 'error');
        } finally {
            setSaving(false);
        }
    };

    // Handle key press in edit mode
    const handleKeyPress = (e, productId, field) => {
        if (e.key === 'Enter') {
            handleEditSave(productId, field);
        } else if (e.key === 'Escape') {
            handleEditCancel();
        }
    };

    // Render editable cell
    const renderEditableCell = (product, field, value, type = 'text') => {
        const cellId = `${product.id}-${field}`;
        const isEditing = editingCell === cellId;
        
        if (isEditing) {
            return (
                <input
                    type={type}
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, product.id, field)}
                    onBlur={() => handleEditSave(product.id, field)}
                    className={styles.editableInput}
                    autoFocus
                />
            );
        }
        
        return (
            <div 
                className={styles.editableCell}
                onClick={() => handleEditStart(product.id, field, value)}
                title="Click to edit"
            >
                {value || '-'}
            </div>
        );
    };

    if (loading) {
        return (
            <div className={styles.contentTable}>
                <div className={styles.loadingMessage}>Loading products...</div>
            </div>
        );
    }

    return (
        <div className={styles.contentTable}>
            {/* Header */}
            <div className={styles.contentTableHeader}>
                <div className={styles.contentTableHeaderItem}></div>
                <div className={styles.contentTableHeaderItem}>{t("contentTable.header.articleNo")}</div>
                <div className={styles.contentTableHeaderItem}>{t("contentTable.header.product")}/{t("contentTable.header.service")}</div>
                <div className={styles.contentTableHeaderItem}>{t("contentTable.header.inPrice")}</div>
                <div className={styles.contentTableHeaderItem}>{t("contentTable.header.price")}</div>
                <div className={styles.contentTableHeaderItem}>{t("contentTable.header.unit")}</div>
                <div className={styles.contentTableHeaderItem}>{t("contentTable.header.inStock")}</div>
                <div className={styles.contentTableHeaderItem}>{t("contentTable.header.description")}</div>
                <div className={styles.contentTableHeaderItem}> </div>
            </div>

            {/* Body */}
            <div className={styles.contentTableBody}>
                {products && products?.length === 0 ? (
                    <div className={styles.emptyMessage}>
                        No products found. 
                    </div>
                ) : (
                    products && products?.length > 0 && products?.map((product) => (
                        <div key={product.id} className={styles.contentTableRow} onClick={() => handleRowClick(product.id)}>
                            <div className={`${styles.contentTableBodyItem} ${styles.rightArrow} ${activeRow === product.id ? styles.active : ''}`}>
                                ⟶
                            </div>
                            <div className={styles.contentTableBodyItem}>
                                {renderEditableCell(product, 'article_no', product.article_no)}
                            </div>
                            <div className={styles.contentTableBodyItem}>
                                {renderEditableCell(product, language === 'sv' ? 'name_sv' : 'name', language === 'sv' ? product.name_sv : product.name)}
                            </div>
                            <div className={styles.contentTableBodyItem}>
                                {renderEditableCell(product, 'in_price', product.in_price, 'number')}
                            </div>
                            <div className={styles.contentTableBodyItem}>
                                {renderEditableCell(product, 'price', product.price, 'number')}
                            </div>
                            <div className={styles.contentTableBodyItem}>
                                {renderEditableCell(product, 'unit', product.unit)}
                            </div>
                            <div className={styles.contentTableBodyItem}>
                                {renderEditableCell(product, 'in_stock', product.in_stock, 'number')}
                            </div>
                            <div className={styles.contentTableBodyItem}>
                                {renderEditableCell(product, language === 'sv' ? 'description_sv' : 'description', language === 'sv' ? product.description_sv : product.description)}
                            </div>
                            <div className={`${styles.contentTableBodyItem}  ${styles.threeDots}`}>⋯</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ContentTable;