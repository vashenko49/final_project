const axios = require('axios');

export default class FooterLinksAPI {
  static async getFooterLinks() {
    return axios.get('/links');
  }

  static async getFooterLinkPageByCustomId(customId, linkGroupId) {
    return await axios.get(`/links/content/${customId}?_id=${linkGroupId}`);
  }
}
