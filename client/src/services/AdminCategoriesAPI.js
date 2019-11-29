import axios from 'axios';

export default class AdminCategoriesAPI {
  static getAllCategories = {
    data: [
      {
        enabled: true,
        _id: '5ddc357ac254453f7cb80eae',
        name: 'Men',
        date: '2019-11-25T20:11:38.074Z',
        __v: 0,
        subCategories: [
          {
            enabled: true,
            _id: '5ddc37242bb9c519bcf00e2b',
            name: 'shirt2',
            parentId: '5ddc357ac254453f7cb80eae',
            date: '2019-11-28T20:03:00.955Z',
            __v: 1,
            filters: [
              {
                enabled: true,
                _id: '5de027f4e8a23045f0c15580',
                type: 'Color',
                serviceName: 'color-something-catalog',
                date: '2019-11-28T20:03:00.955Z',
                __v: 1
              }
            ]
          }
        ]
      }
    ]
  };

  static apiHost = 'https://5000-f1d638f2-52f2-40ef-b477-c73308c7e1c1.ws-eu01.gitpod.io';

  static getCategories() {
    // return axios.get(`${this.apiHost}/catalog/main/all`);

    return new Promise((resolve, reject) => {
      resolve(this.getAllCategories);
    });
  }

  static getCategoriesById(id) {
    // return axios.get(`${this.apiHost}/catalog/main/one/${id}`);

    return new Promise((resolve, reject) => {
      resolve(this.getAllCategories);
    });
  }

  static addCategories(data) {
    const sendData = {
      type: data.title,
      serviceName: data.serviceName,
      _idSubFilters: data.subFilters.map(item => ({ name: item }))
    };

    return axios.post(`${this.apiHost}/catalog/main`, sendData);
  }

  static updateCategories(data) {
    const sendData = {
      type: data.title,
      serviceName: data.serviceName,
      _idSubFilters: data.subFilters.map(item => ({ name: item })),
      _id: data.idUpdate,
      enabled: data.enabledFilter
    };

    return axios.put(`${this.apiHost}/catalog/main`, sendData);
  }

  static deleteCategories(id) {
    return axios.delete(`${this.apiHost}/catalog/main/${id}`);
  }

  static deleteSubFilters(id) {
    return axios.delete(`${this.apiHost}/catalog/sub/${id}`);
  }
}
