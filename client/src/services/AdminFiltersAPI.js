import axios from 'axios';

export default class AdminFiltersAPI {
  static getFilters() {
    return axios.get(`/filters/main/all`);
  }

  static getFiltersById(id) {
    return axios.get(`/filters/main/one/${id}`);
  }

  static createFilters(data) {
    const sendData = {
      type: data.title,
      serviceName: data.serviceName,
      _idSubFilters: data.subFilters.map(item => ({ name: item }))
    };

    return axios.post(`/filters/main`, sendData);
  }

  static updateFilters(data) {
    const sendData = {
      type: data.title,
      serviceName: data.serviceName,
      _idSubFilters: data.subFilters.map(item => ({ name: item })),
      _id: data.idUpdate,
      enabled: data.enabledFilter
    };

    return axios.put(`/filters/main`, sendData);
  }

  static deleteFilters(id) {
    return axios.delete(`/filters/main/${id}`);
  }

  static deleteSubFilters(id) {
    return axios.delete(`/filters/sub/${id}`);
  }
}
