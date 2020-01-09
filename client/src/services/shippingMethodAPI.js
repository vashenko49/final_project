import axios from 'axios';

export default class shippingMethodAPI {
  static getActiveShippingMethod = response => {
    return axios.get('/api/shippingmethods/active').then(value => value.data);
  };
}
