import axios from 'axios';

export default class CartAPI {
  static async getComments(productId) {
    return await axios.get(`/api/comment/product/${productId}`);
  }

  static async createComment(authorId, productID, score, text) {
    return await axios.post(`/api/comment`, { authorId, productID, score, text });
  }
}
