import axios from 'axios';

export default class CartAPI {
  _apiBase = 'http://localhost:5000/api/cart';

  static async getCustomerCart(id) {
    return await axios.get(`/cart/${id}`);
  }

  static async addNewProduct(id, quantity) {
    const body = JSON.stringify({ id, quantity });
    return await axios.post(`/cart`, body);
  }

  static async updateQuantity(id, productId, quantity) {
    const body = JSON.stringify({ productId, quantity });
    return await axios.put(`/cart/${id}`, body);
  }
}
