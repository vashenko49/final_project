import axios from 'axios';

export default class CartAPI {
  _apiBase = 'http://localhost:5000';

  static async getComments(productId) {
    return await axios.get(`/comment/product/${productId}`);
  }
}
