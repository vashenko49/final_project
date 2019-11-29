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

  static apiHost = 'http://localhost:5000';

  static getFilters() {
    return new Promise((resolve, reject) => {
      resolve(this.data);
    });
  }

  static getFiltersById(id) {
    return new Promise((resolve, reject) => {
      resolve(this.data.filter(i => i.id === id)[0]);
    });
  }

  static addFilters(data) {
    console.log('addFilters', data);

    const sendData = {
      type: data.title,
      serviceName: data.serviceName,
      _idSubFilters: data.subFilters.map(item => ({ name: item }))
    };

    return axios.post(`${this.apiHost}/filters/main`, sendData);
  }

  static updateFilters(data) {
    console.log('updateFilters', data);
    return new Promise((resolve, reject) => {
      resolve([data]);
    });
  }
}
