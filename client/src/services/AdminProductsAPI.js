import axios from 'axios';

export default class AdminProductAPI {
  static getProducts() {
    return axios.get(`/products`);
  }

  static deleteProducts(id) {
    return axios.delete(`/products/${id}`);
  }

  static getProductsById(id) {
    return axios.get(`/products/${id}`);
  }

  static createProducts(data) {
    return axios.post(`/products`, data);
  }

  static updateProducts(data) {
    return axios.put(`/products`, data);
  }
}
