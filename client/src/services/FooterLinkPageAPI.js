const axios = require('axios');

export default class FooterLinkPageAPI {
  static async getFooterLinkPageByCustomId(customId) {
    return await axios.get(`http://localhost:5000/pages/${customId}`);
  }
}
