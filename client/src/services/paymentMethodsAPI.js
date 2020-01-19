import axios from 'axios';

export default class paymentMethodsAPI {
  static getActivePaymentMethods = () => {
    return axios.get('/api/paymentmethods/active').then(value => value.data);
  };
  static getPaymentMethods = () => {
    return axios.get('/api/paymentmethods').then(value => value.data);
  };
  static activateOrDeactivatePaymentMethod = data => {
    return axios.put('/api/paymentmethods/activateordeactivate', data).then(res => res.data);
  };
  static updatePaymentMethod = data => {
    return axios.put('/api/paymentmethods', data).then(res => res.data);
  };
  static createPaymentMethod = data => {
    return axios.post('/api/paymentmethods', data).then(res => res.data);
  };
  static removePaymentMethod = id => {
    return axios.delete(`/api/paymentmethods/${id}`).then(res => res.data);
  };
}
