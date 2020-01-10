import axios from 'axios';

export default class DeliveryAddressesAPI {
  static getDeliveryAddressById = id => {
    return axios.get(`/api/deliveryaddresses/${id}`).then(value => value.data);
  };
  static getActiveDeliveryAddresses = () => {
    return axios.get('/api/deliveryaddresses/active').then(value => value.data);
  };
  static getDeliveryAddresses = () => {
    return axios.get('/api/deliveryaddresses').then(value => value.data);
  };
  static createDeliveryAddress = data => {
    return axios.post('/api/deliveryaddresses', data).then(value => value.data);
  };
  static updateDeliveryAddresses = data => {
    return axios.put('/api/deliveryaddresses', data).then(value => value.data);
  };
  static activateOrDeactivateDeliveryAddresses = data => {
    return axios.put('/api/deliveryaddresses/activateordeactivate', data).then(value => value.data);
  };
  static deleteDeliveryAddress = id => {
    return axios.delete(`/api/deliveryaddresses/${id}`).then(value => value.data);
  };
}
