const axios = require('axios');

export default class FooterLinksAPI {
  static async getFooterLinks() {
    return axios.get('/api/links');
  }

  static async getFooterLinkPageByCustomId(customId, linkGroupId) {
    return await axios.get(`/api/links/content/${customId}?_id=${linkGroupId}`);
  }
}
