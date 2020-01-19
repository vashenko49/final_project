const axios = require('axios');

export default class PartnerAPI {
  static async getActivePartners() {
    return axios.get('/api/partners/active');
  }
  static async getPartner() {
    return axios.get('/api/partners').then(res => res.data);
  }
  static activateOrDeactivatePartner = data => {
    return axios.put('/api/partners/activateordeactivate', data).then(res => res.data);
  };
  static createPartner = data => {
    return axios.post('/api/partners', data).then(res => res.data);
  };
  static updatePartner = data => {
    return axios.put('/api/partners', data).then(res => res.data);
  };
  static removePartner = id => {
    return axios.delete(`/api/partners/${id}`).then(res => res.data);
  };
}
