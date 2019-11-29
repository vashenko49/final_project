import axios from 'axios';

export default class AdminFiltersAPI {
  static data = [
    {
      id: '0',
      title: 'Color',
      serviceName: 'filter for color',
      subFilters: [
        {
          id: '00',
          title: 'blue'
        },
        {
          id: '01',
          title: 'red'
        }
      ]
    },
    {
      id: '1',
      title: 'Filter 2',
      subFilter: [
        {
          id: '10',
          title: 'sub filter 1 1'
        },
        {
          id: '11',
          title: 'sub filter 1 2'
        }
      ]
    },
    {
      id: '2',
      title: 'Filter 3',
      subFilter: [
        {
          id: '20',
          title: 'sub filter 2 1'
        },
        {
          id: '21',
          title: 'sub filter 2 2'
        }
      ]
    }
  ];

  static apiHost = 'https://5000-f1d638f2-52f2-40ef-b477-c73308c7e1c1.ws-eu01.gitpod.io';

  static getFilters() {
    return axios.get(`${this.apiHost}/filters/main/all`);
  }

  static getFiltersById(id) {
    return axios.get(`${this.apiHost}/filters/main/one/${id}`);
  }

  static addFilters(data) {
    const sendData = {
      type: data.title,
      serviceName: data.serviceName,
      _idSubFilters: data.subFilters.map(item => ({ name: item }))
    };

    return axios.post(`${this.apiHost}/filters/main`, sendData);
  }

  static updateFilters(data) {
    const sendData = {
      type: data.title,
      serviceName: data.serviceName,
      _idSubFilters: data.subFilters.map(item => ({ name: item })),
      _id: data.idUpdate,
      enabled: data.enabledFilter
    };

    return axios.put(`${this.apiHost}/filters/main`, sendData);
  }

  static deleteFilters(id) {
    return axios.delete(`${this.apiHost}/filters/main/${id}`);
  }

  static deleteSubFilters(id) {
    return axios.delete(`${this.apiHost}/filters/sub/${id}`);
  }
}
