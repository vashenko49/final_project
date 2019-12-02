import axios from 'axios';

export default class AdminCategoriesAPI {
  static apiHost = 'https://5000-f1d638f2-52f2-40ef-b477-c73308c7e1c1.ws-eu01.gitpod.io';

  static getCategories() {
    return axios.get(`${this.apiHost}/catalog/hierarchy`);
  }

  static getCategoriesById(id) {
    // return axios.get(`${this.apiHost}/catalog/main/one/${id}`);

    return new Promise((resolve, reject) => {
      resolve({
        enabled: false,
        _id: '5ddc357ac254453f7cb80eae',
        name: 'Men',
        date: '2019-11-25T20:11:38.074Z',
        __v: 0,
        childCatalog: [
          {
            enabled: false,
            _id: '5de02b89e8a23045f0c1559c',
            name: "Men's Flywire Tennis Shoes",
            parentId: '5ddc357ac254453f7cb80eae',
            filters: [
              {
                _id: '5de02b89e8a23045f0c1559e',
                filter: {
                  _idSubFilters: [
                    '5de0296ce8a23045f0c15582',
                    '5de0296ce8a23045f0c15581',
                    '5de0296de8a23045f0c15583',
                    '5de0296de8a23045f0c15584',
                    '5de0296de8a23045f0c15585',
                    '5de0296ee8a23045f0c15586',
                    '5de0296ee8a23045f0c15587',
                    '5de0296ee8a23045f0c15588'
                  ],
                  enabled: false,
                  _id: '5de027f4e8a23045f0c15580',
                  type: 'Color',
                  serviceName: 'color-something-catalog',
                  date: '2019-11-28T20:03:00.955Z',
                  __v: 1
                }
              },
              {
                _id: '5de02b89e8a23045f0c1559d',
                filter: {
                  _idSubFilters: [
                    '5de02aece8a23045f0c15590',
                    '5de02a12e8a23045f0c1558c',
                    '5de02aece8a23045f0c15598',
                    '5de02aece8a23045f0c15593',
                    '5de02aece8a23045f0c15596',
                    '5de02aece8a23045f0c15591',
                    '5de02aece8a23045f0c15599',
                    '5de02aece8a23045f0c15594',
                    '5de02aece8a23045f0c1558e',
                    '5de02aece8a23045f0c15597',
                    '5de02aece8a23045f0c15592',
                    '5de02aece8a23045f0c1559a',
                    '5de02aece8a23045f0c15595',
                    '5de02aece8a23045f0c1558f'
                  ],
                  enabled: false,
                  _id: '5de02aece8a23045f0c1559b',
                  type: 'Brand',
                  serviceName: 'Brand-something-catalog',
                  date: '2019-11-28T20:15:40.359Z',
                  __v: 0
                }
              }
            ],
            date: '2019-11-28T20:18:17.847Z',
            __v: 6
          }
        ]
      });
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
