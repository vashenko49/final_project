const axios = require('axios');

export default class FooterSubscribeAPI {
  static async addSubscriber(email) {
    return axios.post('http://localhost:5000/links', { email });
  }
}
