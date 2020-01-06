const axios = require('axios');

export default class OrderAPI {
  static async createOrder(data) {
    return axios.post('/orders', data);
  }
}
