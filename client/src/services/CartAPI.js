import axios from 'axios';

export default class CartAPI {
  static async getCustomerCart(id) {
    return await axios.get(`/cart/${id}`);
  }

  static async addOrRemoveProduct(idCustomer, idProduct, modelNo, quantity) {
    return await axios.put(`/cart/product`, { idCustomer, idProduct, modelNo, quantity });
  }

  static async updateQuantity(idCustomer, idProduct, modelNo, quantity) {
    return await axios.put(`/cart/product`, { idCustomer, idProduct, modelNo, quantity });
  }
}