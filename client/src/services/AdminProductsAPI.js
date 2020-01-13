import axios from 'axios';

export default class AdminProductAPI {
  static getProducts() {
    return axios.get(`/api/products`);
  }

  static deleteProducts(id) {
    return axios.delete(`/api/products/${id}`);
  }

  static getProductsById(id) {
    return axios.get(`/api/products/${id}`);
  }

  static createProducts(data) {
    return axios.post(`/api/products`, data);
  }

  static updateProducts(data) {
    return axios.put(`/api/products`, data);
  }

  static changeStatusProduct(id, status) {
    return axios.put(`/api/products/activateordeactivate`, { _idProduct: id, status });
  }
}
