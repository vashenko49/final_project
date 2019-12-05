import axios from 'axios';

export default class CartAPI {
  _apiBase = 'http://localhost:5000/cart';

  static async getCustomerCart(id) {
    return await axios.get(`/cart/${id}`);
  }
}
