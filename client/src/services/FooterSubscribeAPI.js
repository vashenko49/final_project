const axios = require('axios');

export default class FooterSubscribeAPI {
  static async addSubscriber(email) {
    return await axios.post('http://localhost:5000/subscriber', { email });
  }
}
