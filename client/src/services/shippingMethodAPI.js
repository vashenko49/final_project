import axios from 'axios';

export default class shippingMethodAPI {
  static getActiveShippingMethod = () => {
    return axios.get('/api/shippingmethods/active').then(value => value.data);
  };
  static getShippingMethod = () => {
    return axios.get('/api//shippingmethods').then(res => res.data);
  };
  static updateShippingMethod = data => {
    return axios.put('/api/shippingmethods').then(res => res.data);
  };
  static removeShippingMethod = id => {
    return axios.delete(`/api/shippingmethods/${id}`).then(res => res.data);
  };
  static createShippingMethod = data => {
    return axios.post('/api/shippingmethods', data).then(res => res.data);
  };
  static activateOrDeactivateShippingMethod = data => {
    return axios.put('/api/shippingmethods/activateordeactivate', data).then(res => res.data);
  };
}
