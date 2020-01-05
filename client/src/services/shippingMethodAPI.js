import axios from 'axios';

export default class shippingMethodAPI {
  static getActiveShippingMethod = response => {
    return axios.get('/shippingmethods/active').then(value => value.data);
  };
}
