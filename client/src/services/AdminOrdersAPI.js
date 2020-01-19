import axios from 'axios';

export default class AdminOrdersAPI {
  static getOrders() {
    return axios.get(`/api/orders`);
  }

  static cancelOrder(id) {
    return axios.put(`/api/orders/cancel`, { idOrder: id });
  }
}
