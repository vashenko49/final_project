const axios = require('axios');

export default class HeaderAPI {
  static async getRootCategories() {
    return axios.get('/catalog/root/private');
  }

  static async getChildCategories() {
    return axios.get('/catalog/child/private');
  }
}
