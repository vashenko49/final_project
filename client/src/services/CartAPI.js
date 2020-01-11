import axios from 'axios';

export default class CartAPI {
  static async getCustomerCart() {
    return await axios.get(`/api/cart`);
  }

  static getCustomerCartUsingToken = token => {
    const options = {
      headers: {
        Authorization: token
      }
    };
    return axios.get('/api/cart', options).then(res => res.data);
  };

  static async addOrRemoveProduct(idProduct, modelNo, quantity) {
    return await axios.put(`/api/cart/product`, { idProduct, modelNo, quantity });
  }

  static async updateQuantity(idProduct, modelNo, quantity) {
    return await axios.put(`/api/cart/product`, { idProduct, modelNo, quantity });
  }
}
