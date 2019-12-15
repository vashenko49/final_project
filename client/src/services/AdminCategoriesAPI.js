import axios from 'axios';

export default class AdminCategoriesAPI {
  static getCategories() {
    return axios.get(`/catalog/hierarchy`);
  }

  static getCategoriesById(id) {
    return axios.get(`/catalog/hierarchy/one/${id}`);
  }

  static createCategories(data) {
    console.log('addCategories', data);

    return new Promise((resolve, reject) => {
      resolve(data);
    });

    // return axios.post(`/catalog/hierarchy`, sendData);
  }

  static updateCategories(data) {
    console.log('updateCategories', data);
    return new Promise((resolve, reject) => {
      resolve(data);
    });
    // return axios.put(`/catalog/hierarchy`, sendData);
  }

  static deleteRootCategory(id) {
    return axios.delete(`/catalog/root/${id}`);
  }

  static deleteSubCategory(id) {
    return axios.delete(`/catalog/child/${id}`);
  }

  static deleteFilter(id) {
    console.log('deleteFilter', id);

    return new Promise((resolve, reject) => {
      resolve(id);
    });
    // return axios.delete(`/catalog/child/${id}`);
  }
}
