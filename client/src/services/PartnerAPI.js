const axios = require('axios');

export default class PartnerAPI {
  static async getActivePartners() {
    return axios.get('/api/partners/active');
  }
}
