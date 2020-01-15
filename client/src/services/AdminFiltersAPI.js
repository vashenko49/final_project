import axios from 'axios';

export default class AdminFiltersAPI {
  static getFilters() {
    return axios.get(`/api/filters/main/all`);
  }

  static getFiltersById(id) {
    return axios.get(`/api/filters/main/one/${id}`);
  }

  static createFilters(data) {
    const sendData = {
      type: data.title,
      serviceName: data.serviceName,
      _idSubFilters: data.subFilters.map(item => ({ name: item }))
    };

    return axios.post(`/api/filters/main`, sendData);
  }

  static updateFilters(data) {
    const sendData = {
      type: data.title,
      serviceName: data.serviceName,
      _idSubFilters: data.subFilters.map(item => ({ name: item })),
      _id: data.idUpdate,
      enabled: data.enabledFilter
    };

    return axios.put(`/api/filters/main`, sendData);
  }

  static deleteFilters(id) {
    return axios.delete(`/api/filters/main/${id}`);
  }

  static deleteSubFilters(id) {
    return axios.delete(`/api/filters/sub/${id}`);
  }

  static changeStatusFilter(id, status) {
    return axios.put(`/api/filters/main/activateordeactivate`, { _idFilter: id, status });
  }
}
