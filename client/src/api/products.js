
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const API_ENDPOINT = `${API_BASE_URL}/api/pricelist`;


export class ProductsAPI {

  static async fetchProducts() {
    try {

      const response = await fetch(API_ENDPOINT);
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      const products = data.products || [];

      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      // Return empty array as fallback instead of throwing
      return [];
    }
  }

  static async updateProductField(productId, field, value) {
    try {
      const response = await fetch(`${API_ENDPOINT}/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          field: field,
          value: value
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update product: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      return result.product || result;
    } catch (error) {
      console.error('Error updating product field:', error);
      throw error;
    }
  }


  static async createProduct(productData) {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create product: ${response.status} ${response.statusText}`);
      }

      
      const result = await response.json();
      return result.product || result;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }


  static async updateProduct(productId, productData) {
    try {
      const response = await fetch(`${API_ENDPOINT}/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update product: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      return result.product || result;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }


  static async deleteProduct(productId) {
    try {
      const response = await fetch(`${API_ENDPOINT}/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.status} ${response.statusText}`);
      }

    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }


  static async searchProducts(searchCriteria) {
    try {
      const params = new URLSearchParams();
      if (searchCriteria.articleNo) params.append('articleNo', searchCriteria.articleNo);
      if (searchCriteria.name) params.append('name', searchCriteria.name);

      const response = await fetch(`${API_ENDPOINT}/search?${params}`);
      if (!response.ok) {
        throw new Error(`Failed to search products: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.products || [];
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  }


  static async getProductStats() {
    try {
      const response = await fetch(`${API_ENDPOINT}/stats`);
      if (!response.ok) {
        throw new Error(`Failed to get product stats: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error getting product stats:', error);
      return { count: 0, totalValue: 0 };
    }
  }

}
