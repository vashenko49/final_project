const axios = require('axios');

export default class FooterLinksAPI {
  static async getFooterLinks() {
    return axios.get('http://localhost:5000/links');
  }
}
