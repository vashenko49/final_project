import axios from 'axios';

export default class paymentMethodsAPI {
  static getActivePaymentMethods = response => {
    return axios.get('/api/paymentmethods/active').then(value => value.data);
  };
}
