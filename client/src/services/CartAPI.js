import axios from 'axios';

export default class CartAPI {
  static async getCustomerCart() {
    return await axios.get(`/cart`);
  }

  static async addOrRemoveProduct(idProduct, modelNo, quantity) {
    return await axios.put(`/cart/product`, { idProduct, modelNo, quantity });
  }

  static async updateQuantity(idCustomer, idProduct, modelNo, quantity) {
    return await axios.put(`/cart/product`, { idProduct, modelNo, quantity });
  }
}
