import axios from 'axios';

export default class AdminCategoriesAPI {
  static getCategories() {
    return axios.get(`/api/catalog/hierarchy`);
  }

  static getCategoriesById(id) {
    return axios.get(`/api/catalog/hierarchy/one/${id}`);
  }

  static createCategories(data) {
    return axios.post(`/api/catalog/hierarchy`, data);
  }

  static updateCategories(data) {
    return axios.put(`/api/catalog/hierarchy`, data);
  }

  static deleteRootCategory(id) {
    return axios.delete(`/api/catalog/root/${id}`);
  }

  static deleteSubCategory(id) {
    return axios.delete(`/api/catalog/child/${id}`);
  }

  static deleteFilter(idChildCatalog, idFilter) {
    return axios.delete(`/api/catalog/child/filter/${idChildCatalog}/${idFilter}`);
  }
}
