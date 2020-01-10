import axios from 'axios';

export default class AdminSliderAPI {
  static getSlider() {
    return axios.get(`/slider`);
  }

  static getSliderById(id) {
    return axios.get(`/slider/${id}`);
  }

  static createSlider(body) {
    return axios.post(`/slider`, body);
  }

  static updateSlider(id, body) {
    return axios.put(`/slider/${id}`, body);
  }

  static deleteSlider(id) {
    return axios.delete(`/slider/${id}`);
  }

  // static changeStatusSlider(id, body) {
  //   return axios.put(`/slides/${id}`, body);
  // }
}
