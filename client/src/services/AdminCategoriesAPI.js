import axios from 'axios';

export default class AdminCategoriesAPI {
  static getCategories() {
    return axios.get(`/catalog/hierarchy`);
  }

  static getCategoriesById(id) {
    return axios.get(`/catalog/hierarchy/one/${id}`);
  }

  static createCategories(data) {
    return axios.post(`/catalog/hierarchy`, data);
  }

  static updateCategories(data) {
    return axios.put(`/catalog/hierarchy`, data);
  }

  static deleteRootCategory(id) {
    return axios.delete(`/catalog/root/${id}`);
  }

  static deleteSubCategory(id) {
    return axios.delete(`/catalog/child/${id}`);
  }

  static deleteFilter(idChildCatalog, idFilter) {
    return axios.delete(`/catalog/child/filter/${idChildCatalog}/${idFilter}`);
  }
}
