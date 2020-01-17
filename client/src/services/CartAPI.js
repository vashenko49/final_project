import axios from 'axios';

export default class CartAPI {
  static getCustomerCart() {
    return axios.get(`/api/cart`).then(res => res.data);
  }

  static updateQuantity(idProduct, modelNo, quantity) {
    return axios.put(`/api/cart/product`, { idProduct, modelNo, quantity }).then(res => res.data);
  }

  static updateCart = data => {
    return axios.put('api/cart', data).then(res => res.data);
  };
}
