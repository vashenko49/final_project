import axios from 'axios';

export default class CartAPI {
  static async getComments(productId) {
    return await axios.get(`/comment/product/${productId}`);
  }
}
