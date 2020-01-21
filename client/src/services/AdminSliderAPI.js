import axios from 'axios';

export default class AdminSliderAPI {
  static getSlider() {
    return axios.get(`/api/slider`);
  }

  static getSliderById(id) {
    return axios.get(`/api/slider/${id}`);
  }

  static createSlider(body) {
    return axios.post(`/api/slider`, body);
  }

  static updateSlider(body) {
    return axios.put(`/api/slider`, body);
  }

  static deleteSlider(id) {
    return axios.delete(`/api/slider/${id}`);
  }

  static changeStatusSlider(id, status) {
    return axios.put(`/api/slider/activateordeactivate`, { idSlides: id, status });
  }
}
