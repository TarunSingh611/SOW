import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import { productService } from '../services/productService.js';
import { formatPrice } from '../utils/formatters.js';
import '../components/PricelistPage.css';

const PricelistPage = () => {
  const { language, getLanguageName, t } = useLanguage();
  const { showError, showSuccess, showWarning } = useToast();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [searchArticleNo, setSearchArticleNo] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAdvancedMode, setShowAdvancedMode] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0 });

  // Refs for throttling/debouncing
  const saveTimeoutRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    article_no: '',
    name: '',
    name_sv: '',
    in_price: '',
    price: '',
    unit: '',
    in_stock: '',
    description: '',
    description_sv: ''
  });

  // Edit product form state
  const [editProduct, setEditProduct] = useState({
    article_no: '',
    name: '',
    name_sv: '',
    in_price: '',
    price: '',
    unit: '',
    in_stock: '',
    description: '',
    description_sv: ''
  });

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products when search criteria change
  useEffect(() => {
    const filtered = productService.filterProducts(products, searchArticleNo, searchProduct);
    setFilteredProducts(filtered);
  }, [products, searchArticleNo, searchProduct]);

  // Close actions menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showActionsMenu && !event.target.closest('.col-actions')) {
        setShowActionsMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showActionsMenu]);

  const fetchProducts = async () => {
    try {
      const productsData = await productService.fetchProducts(setLoading, setError);
      setProducts(productsData);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleCellClick = (productId, field, value) => {
    // Handle language-specific fields
    let actualField = field;
    let actualValue = value;
    
    if (field === 'description') {
      actualField = language === 'sv' ? 'description_sv' : 'description';
      actualValue = language === 'sv' ? value : value;
    } else if (field === 'name') {
      actualField = language === 'sv' ? 'name_sv' : 'name';
      actualValue = language === 'sv' ? value : value;
    }
    
    setEditingCell({ productId, field: actualField });
    setEditValue(actualValue || '');
  };

  const handleCellSave = async () => {
    if (!editingCell) return;
    
    try {
      await productService.saveProductField(
        editingCell.productId, 
        editingCell.field, 
        editValue, 
        setProducts
      );
      setEditingCell(null);
      setEditValue('');
      showSuccess(language === 'sv' ? 'Ändringar sparade!' : 'Changes saved successfully!');
    } catch (err) {
      console.error('Error updating product:', err);
      showError(language === 'sv' ? 'Kunde inte spara ändringar. Försök igen.' : 'Failed to save changes. Please try again.');
    }
  };

  const handleCellCancel = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCellSave();
    } else if (e.key === 'Escape') {
      handleCellCancel();
    }
  };

  // Add new product
  const handleAddProduct = async () => {
    try {
      // Validate required fields based on current language
      const nameField = language === 'sv' ? 'name_sv' : 'name';
      const currentName = newProduct[nameField];
      const currentPrice = newProduct.price;
      
      if (!currentName || currentName.trim() === '') {
        showWarning(t('messages.nameRequired'));
        return;
      }
      
      if (!currentPrice || currentPrice <= 0) {
        showWarning(t('messages.priceRequired'));
        return;
      }

      await productService.addProduct(newProduct, setProducts);
      setShowAddModal(false);
      setNewProduct({
        article_no: '',
        name: '',
        name_sv: '',
        in_price: '',
        price: '',
        unit: '',
        in_stock: '',
        description: '',
        description_sv: ''
      });
      showSuccess(t('messages.productAdded'));
    } catch (err) {
      console.error('Error adding product:', err);
      showError(t('messages.failedToAdd'));
    }
  };

  // Edit product (modal form submission)
  const handleEditProductSubmit = async () => {
    try {
      // Validate required fields based on current language
      const nameField = language === 'sv' ? 'name_sv' : 'name';
      const currentName = editProduct[nameField];
      const currentPrice = editProduct.price;
      
      if (!currentName || currentName.trim() === '') {
        showWarning(t('messages.nameRequired'));
        return;
      }
      
      if (!currentPrice || currentPrice <= 0) {
        showWarning(t('messages.priceRequired'));
        return;
      }

      await productService.editProduct(selectedProduct.id, editProduct, setProducts);
      setShowEditModal(false);
      setSelectedProduct(null);
      showSuccess(t('messages.productUpdated'));
    } catch (err) {
      console.error('Error updating product:', err);
      showError(t('messages.failedToUpdate'));
    }
  };

  // Open edit modal from actions menu
  const handleEditProduct = (product) => {
    openEditModal(product);
  };

  // Delete product
  const handleDeleteProduct = async () => {
    try {
      await productService.deleteProduct(selectedProduct.id, setProducts);
      setShowDeleteModal(false);
      setSelectedProduct(null);
      showSuccess(t('messages.productDeleted'));
    } catch (err) {
      console.error('Error deleting product:', err);
      showError(t('messages.failedToDelete'));
    }
  };

  // Print list
  const handlePrint = () => {
    productService.printPricelist();
  };

  // Refresh cache
  const refreshCache = async () => {
    try {
      await productService.refreshProducts(setProducts);
    } catch (err) {
      console.error('Error refreshing products:', err);
    }
  };

  // Handle actions menu click
  const handleActionsClick = (e, productId) => {
    e.stopPropagation();
    
    if (showActionsMenu === productId) {
      setShowActionsMenu(null);
    } else {
      // Calculate position for the menu
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      
      // Menu dimensions
      const menuWidth = 120;
      const menuHeight = 80; // Approximate height for 2 buttons
      
      // Calculate initial position
      let left = rect.right - menuWidth;
      let top = rect.bottom + 5;
      
      // Boundary detection - keep menu within viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Check right boundary
      if (left + menuWidth > viewportWidth) {
        left = viewportWidth - menuWidth - 10; // 10px margin
      }
      
      // Check left boundary
      if (left < 10) {
        left = 10;
      }
      
      // Check bottom boundary - flip to top if needed
      if (top + menuHeight > viewportHeight) {
        top = rect.top - menuHeight - 5; // Show above button
      }
      
      // Check top boundary
      if (top < 10) {
        top = 10;
      }
      
      setShowActionsMenu(productId);
      setMenuPosition({ left, top });
    }
  };

  // Handle delete click
  const handleDeleteClick = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      openDeleteModal(product);
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setEditProduct({
      article_no: product.article_no || '',
      name: product.name || '',
      name_sv: product.name_sv || '',
      in_price: product.in_price || '',
      price: product.price || '',
      unit: product.unit || '',
      in_stock: product.in_stock || '',
      description: product.description || '',
      description_sv: product.description_sv || ''
    });
    setShowEditModal(true);
    setShowActionsMenu(null);
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
    setShowActionsMenu(null);
  };

  if (loading || ((!products || products.length === 0) && !error)) {
    return (
      <div className="pricelist-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>{t('messages.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pricelist-page">
        <div className="error-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pricelist-page">
      {/* Search and Actions Bar */}
      <div className="actions-bar">
        <div className="search-container">
          <div className="search-input-group">
            <input
              type="text"
              placeholder={t('search.articleNo')}
              value={searchArticleNo}
              onChange={(e) => setSearchArticleNo(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          <div className="search-input-group">
            <input
              type="text"
              placeholder={t('search.product')}
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>
        <div className="action-buttons">
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <span className="btn-icon">➕</span>
            {t('actions.add')}
          </button>
          <button className="btn btn-secondary" onClick={handlePrint}>
            <span className="btn-icon">🖨️</span>
            {t('actions.print')}
          </button>
          <button className="btn btn-secondary" onClick={refreshCache}>
            <span className="btn-icon">🔄</span>
            {t('actions.refresh')}
          </button>
          <button 
            className={`btn ${showAdvancedMode ? 'btn-active' : 'btn-secondary'}`}
            onClick={() => setShowAdvancedMode(!showAdvancedMode)}
          >
            <span className="btn-icon">⚙️</span>
            {t('actions.advanced')}
          </button>
        </div>
      </div>
      
      <div className="table-container">
        <table className="pricelist-table">
          <thead>
            <tr>
              <th className="col-arrow"></th>  
              <th className="col-article-no sortable">{t('table.articleNo')} ↓</th>
              <th className="col-product">{t('table.productService')}</th>
              <th className="col-in-price">{t('table.inPrice')}</th>
              <th className="col-price">{t('table.price')}</th>
              <th className="col-unit">{t('table.unit')}</th>
              <th className="col-in-stock">{t('table.inStock')}</th>
              <th className="col-description">{t('table.description')}</th>
              <th className="col-actions"></th>
            </tr>
          </thead>
          <tbody>
            {(filteredProducts || []).length > 0 ? (
              (filteredProducts || []).map((product) => (
                <tr key={product.id}>
                  <td className="col-arrow">
                    <span className="arrow-icon">▶</span>
                  </td>
                  <td 
                    className="col-article-no editable"
                    onClick={() => handleCellClick(product.id, 'article_no', product.article_no)}
                  >
                    {editingCell?.productId === product.id && editingCell?.field === 'article_no' ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleCellSave}
                        onKeyDown={handleKeyPress}
                        autoFocus
                      />
                    ) : (
                      <span className="cell-badge cell-data">{product.article_no || '-'}</span>
                    )}
                  </td>
                  <td 
                    className="col-product editable"
                    onClick={() => handleCellClick(product.id, 'name', language === 'sv' ? product.name_sv : product.name)}
                  >
                    {editingCell?.productId === product.id && (editingCell?.field === 'name' || editingCell?.field === 'name_sv') ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleCellSave}
                        onKeyDown={handleKeyPress}
                        autoFocus
                      />
                    ) : (
                      <span className="cell-badge cell-data">
                        {language === 'sv' && product.name_sv ? product.name_sv : product.name || '-'}
                      </span>
                    )}
                  </td>
                  <td 
                    className="col-in-price editable"
                    onClick={() => handleCellClick(product.id, 'in_price', product.in_price)}
                  >
                    {editingCell?.productId === product.id && editingCell?.field === 'in_price' ? (
                      <input
                        type="number"
                        step="0.01"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleCellSave}
                        onKeyDown={handleKeyPress}
                        autoFocus
                      />
                    ) : (
                      <span className="cell-badge cell-data">{product.in_price ? formatPrice(product.in_price) : '-'}</span>
                    )}
                  </td>
                  <td 
                    className="col-price editable"
                    onClick={() => handleCellClick(product.id, 'price', product.price)}
                  >
                    {editingCell?.productId === product.id && editingCell?.field === 'price' ? (
                      <input
                        type="number"
                        step="0.01"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleCellSave}
                        onKeyDown={handleKeyPress}
                        autoFocus
                      />
                    ) : (
                      <span className="cell-badge cell-data">{formatPrice(product.price)}</span>
                    )}
                  </td>
                  <td 
                    className="col-unit editable"
                    onClick={() => handleCellClick(product.id, 'unit', product.unit)}
                  >
                    {editingCell?.productId === product.id && editingCell?.field === 'unit' ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleCellSave}
                        onKeyDown={handleKeyPress}
                        autoFocus
                      />
                    ) : (
                      <span className="cell-badge cell-data">{product.unit || '-'}</span>
                    )}
                  </td>
                  <td 
                    className="col-in-stock editable"
                    onClick={() => handleCellClick(product.id, 'in_stock', product.in_stock)}
                  >
                    {editingCell?.productId === product.id && editingCell?.field === 'in_stock' ? (
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleCellSave}
                        onKeyDown={handleKeyPress}
                        autoFocus
                      />
                    ) : (
                      <span className="cell-badge cell-data">{product.in_stock || '-'}</span>
                    )}
                  </td>
                  <td 
                    className="col-description editable"
                    onClick={() => handleCellClick(product.id, 'description', language === 'sv' ? product.description_sv : product.description)}
                  >
                    {editingCell?.productId === product.id && (editingCell?.field === 'description' || editingCell?.field === 'description_sv') ? (
                      <textarea
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleCellSave}
                        onKeyDown={handleKeyPress}
                        autoFocus
                      />
                    ) : (
                      <span className="cell-badge cell-data">
                        {language === 'sv' && product.description_sv ? product.description_sv : product.description || '-'}
                      </span>
                    )}
                  </td>
                  <td className="col-actions">
                    <div className="actions-dropdown">
                      <button 
                        className="actions-btn"
                        onClick={(e) => handleActionsClick(e, product.id)}
                      >
                        ⋯
                      </button>
                      {showActionsMenu === product.id && (
                        <div className="actions-menu" style={{ left: menuPosition.left, top: menuPosition.top }}>
                          <button onClick={() => handleEditProduct(product)}>
                            {t('actions.edit')}
                          </button>
                          <button onClick={() => handleDeleteClick(product.id)} style={{ color: 'red' }}>
                            {t('actions.delete')}
                          </button>
                          <button className="cancel-action" onClick={() => setShowActionsMenu(null)}>
                            {t('actions.cancel')}
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-data-message">
                  {loading ? (
                    <div className="loading-message">
                      <span>{t('messages.loading')}</span>
                    </div>
                  ) : error ? (
                    <div className="error-message">
                      <span>{t('messages.error')}</span>
                      <button onClick={fetchProducts} className="retry-btn">
                        {t('actions.retry')}
                      </button>
                    </div>
                  ) : (
                    <div className="empty-message">
                      <span>
                        {searchArticleNo || searchProduct 
                          ? t('messages.noSearchResults')
                          : t('messages.noProducts')
                        }
                      </span>
                      {!searchArticleNo && !searchProduct && (
                        <button onClick={() => setShowAddModal(true)} className="add-first-btn">
                          {t('messages.addFirstProduct')}
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{t('modals.addProduct')}</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>{t('form.articleNo')}</label>
                <input
                  type="text"
                  value={newProduct.article_no}
                  onChange={(e) => setNewProduct({...newProduct, article_no: e.target.value})}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>{t('form.nameEnglish')}</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>{t('form.nameSwedish')}</label>
                  <input
                    type="text"
                    value={newProduct.name_sv}
                    onChange={(e) => setNewProduct({...newProduct, name_sv: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>{t('form.inPrice')}</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.in_price}
                    onChange={(e) => setNewProduct({...newProduct, in_price: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>{t('form.price')}</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>{t('form.unit')}</label>
                  <input
                    type="text"
                    value={newProduct.unit}
                    onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>{t('form.inStock')}</label>
                  <input
                    type="number"
                    value={newProduct.in_stock}
                    onChange={(e) => setNewProduct({...newProduct, in_stock: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>{t('form.description')} (English)</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>{t('form.description')} (Swedish)</label>
                <textarea
                  value={newProduct.description_sv}
                  onChange={(e) => setNewProduct({...newProduct, description_sv: e.target.value})}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                {t('actions.cancel')}
              </button>
              <button className="btn btn-primary" onClick={handleAddProduct}>
                {t('actions.add')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{t('modals.editProduct')}</h2>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>{language === 'sv' ? 'Artikelnummer' : 'Article No.'}</label>
                <input
                  type="text"
                  value={editProduct.article_no}
                  onChange={(e) => setEditProduct({...editProduct, article_no: e.target.value})}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>{language === 'sv' ? 'Namn (Engelska)' : 'Name (English)'}</label>
                  <input
                    type="text"
                    value={editProduct.name}
                    onChange={(e) => setEditProduct({...editProduct, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>{language === 'sv' ? 'Namn (Svenska)' : 'Name (Swedish)'}</label>
                  <input
                    type="text"
                    value={editProduct.name_sv}
                    onChange={(e) => setEditProduct({...editProduct, name_sv: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>{language === 'sv' ? 'Inköpspris' : 'In Price'}</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editProduct.in_price}
                    onChange={(e) => setEditProduct({...editProduct, in_price: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>{language === 'sv' ? 'Pris' : 'Price'}</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editProduct.price}
                    onChange={(e) => setEditProduct({...editProduct, price: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>{language === 'sv' ? 'Enhet' : 'Unit'}</label>
                  <input
                    type="text"
                    value={editProduct.unit}
                    onChange={(e) => setEditProduct({...editProduct, unit: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>{language === 'sv' ? 'I lager' : 'In Stock'}</label>
                  <input
                    type="number"
                    value={editProduct.in_stock}
                    onChange={(e) => setEditProduct({...editProduct, in_stock: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>{language === 'sv' ? 'Beskrivning (Engelska)' : 'Description (English)'}</label>
                <textarea
                  value={editProduct.description}
                  onChange={(e) => setEditProduct({...editProduct, description: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>{language === 'sv' ? 'Beskrivning (Svenska)' : 'Description (Swedish)'}</label>
                <textarea
                  value={editProduct.description_sv}
                  onChange={(e) => setEditProduct({...editProduct, description_sv: e.target.value})}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                {t('actions.cancel')}
              </button>
              <button className="btn btn-primary" onClick={handleEditProductSubmit}>
                {t('actions.save')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <div className="modal-header">
              <h2>{t('modals.deleteProduct')}</h2>
              <button className="modal-close" onClick={() => setShowDeleteModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="delete-warning">
                <div className="warning-icon">⚠️</div>
                <h3>{language === 'sv' ? 'Är du säker?' : 'Are you sure?'}</h3>
                <p>
                  {language === 'sv' 
                    ? 'Du är på väg att ta bort produkten:' 
                    : 'You are about to delete the product:'
                  }
                </p>
                <p className="warning-text">
                  {selectedProduct?.name || selectedProduct?.name_sv || 'Unknown Product'}
                </p>
                <p>
                  {language === 'sv' 
                    ? 'Denna åtgärd kan inte ångras.' 
                    : 'This action cannot be undone.'
                  }
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                {t('actions.cancel')}
              </button>
              <button className="btn btn-danger" onClick={handleDeleteProduct}>
                {t('actions.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricelistPage;
