const axios = require('axios');

export default class OrderAPI {
  static async createOrder(data) {
    return axios.post('/orders', data);
  }
  static async getOrdersByUser(option) {
    return axios.post('/orders/customer', option).then(res => res.data);
  }
  static async getOrderById(id) {
    return axios.get(`/orders/${id}`).then(res => res.data);
  }
}
