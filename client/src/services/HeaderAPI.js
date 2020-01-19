const axios = require('axios');

export default class HeaderAPI {
  static async getRootCategories() {
    return axios.get('/api/catalog/root/public');
  }

  static async getChildCategories() {
    return axios.get('/api/catalog/child/public');
  }
}
