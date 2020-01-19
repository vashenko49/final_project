const axios = require('axios');

export default class SlidesAPI {
  static async getActiveSlides() {
    return axios.get('/api/slider/active');
  }
}
