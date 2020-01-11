const axios = require('axios');

export default class FooterSubscribeAPI {
  static async addSubscriber(email) {
    return await axios.post('/api/subscriber', { email });
  }
}
