import axios from 'axios';

export default class CartAPI {
  static async getComments(productId) {
    return await axios.get(`/api/comment/product/${productId}`);
  }

  static createComment(productID, score, text) {
    return axios.post(`/api/comment`, { productID, score, text }).then(value => value.data);
  }
}
