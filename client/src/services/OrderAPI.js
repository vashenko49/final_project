const axios = require('axios');

export default class OrderAPI {
  static async createOrder(data) {
    return axios.post('/api/orders', data);
  }
  static async getOrdersByUser(option) {
    return axios.post('/api/orders/customer', option).then(res => res.data);
  }
  static async getOrderById(id) {
    return axios.get(`/api/orders/${id}`).then(res => res.data);
  }
}
