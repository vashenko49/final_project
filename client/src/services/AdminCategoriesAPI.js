import axios from 'axios';

export default class AdminCategoriesAPI {
  static apiHost = 'https://5000-f1d638f2-52f2-40ef-b477-c73308c7e1c1.ws-eu01.gitpod.io';

  static getCategories() {
    return axios.get(`${this.apiHost}/catalog/hierarchy`);
  }

  static getCategoriesById(id) {
    return axios.get(`${this.apiHost}/catalog/hierarchy/one/${id}`);
  }

  static addCategories(data) {
    console.log('addCategories', data);

    return new Promise((resolve, reject) => {
      resolve(data);
    });

    // return axios.post(`${this.apiHost}/catalog/hierarchy`, sendData);
  }

  static updateCategories(data) {
    console.log('updateCategories', data);
    return new Promise((resolve, reject) => {
      resolve(data);
    });
    // return axios.put(`${this.apiHost}/catalog/hierarchy`, sendData);
  }

  static deleteCategories(id) {
    return axios.delete(`${this.apiHost}/catalog/root/${id}`);
  }

  static deleteChildCategories(id) {
    return axios.delete(`${this.apiHost}/catalog/child/${id}`);
  }
}
