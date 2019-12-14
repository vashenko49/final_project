import axios from 'axios';

export default class CartAPI {
  _apiBase = 'http://localhost:5000';

  static async getCustomerCart(id) {
    return await axios.get(`/cart/${id}`);
  }

  static async addNewProduct(id, productId, quantity) {
    return await axios.post(`/cart/${id}`, { productId, quantity });
  }

  static async updateQuantity(id, productId, quantity) {
    return await axios.put(`/cart/${id}`, { productId, quantity });
  }
}
