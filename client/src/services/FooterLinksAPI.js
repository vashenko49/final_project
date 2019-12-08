const axios = require('axios');

export default class FooterLinksAPI {
  static async getFooterLinks() {
    return axios.get('http://localhost:5000/links');
  }

  static async getFooterLinkPageByCustomId(customId, linkGroupId) {
    return await axios.get(`http://localhost:5000/links/content/${customId}?_id=${linkGroupId}`);
  }
}
