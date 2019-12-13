import axios from 'axios';

export default class AdminProductAPI {
  static dataGetProducts = {
    data: [
      {
        _id: '5de02cf4a326f13f8c61f814',
        itemNo: '9207-503473-0048',
        enabled: true,
        nameProduct: 'Court Air Zoom Vapor X',
        description:
          'With Nike Zoom Air and a Dynamic Fit system, the NikeCourt Air Zoom Vapor X provides ultimate control on hard courts. The Dynamic Fit system wraps your foot from the bottom of the arch up to the laces for a glove-like fit. A Zoom Air unit in the heel offers low-profile, resilient cushioning from swing to swing.',
        htmlPage: '<div>Bla bla bla</div',
        productUrlImg: ['jomwedding/34acdbe0-fb2b-11e9-befb-033496442550'],
        filtersImg: [
          {
            filter: {
              _id: '5de027f4e8a23045f0c15580',
              type: 'Color',
              serviceName: 'color-something-catalog'
            },
            subFilter: {
              _id: '5de56ac85ac80a23483fece4',
              name: 'Black'
            },
            img: 'jomwedding/34acdbe0-fb2b-11e9-befb-033496442550',
            enabled: true
          },
          {
            filter: {
              _id: '5de027f4e8a23045f0c155801',
              type: 'Color',
              serviceName: 'color-something-catalog'
            },
            subFilter: {
              _id: '5de56ac85ac80a23483fece41',
              name: 'Black'
            },
            img: 'jomwedding/34acdbe0-fb2b-11e9-befb-033496442550',
            enabled: true
          }
        ],
        childCategory: {
          _id: '5de02b89e8a23045f0c1559c',
          name: "Men's Flywire Tennis Shoes"
        },
        filters: [
          {
            filter: {
              _id: '5de02aece8a23045f0c1559b',
              type: 'Brand',
              serviceName: 'Brand-something-catalog'
            },
            subFilter: {
              _id: '5de02a12e8a23045f0c1558c',
              name: 'Nike Air'
            },
            enabled: true
          },
          {
            filter: {
              _id: '5de02aece8a23045f0c1559b1',
              type: 'Brand',
              serviceName: 'Brand-something-catalog'
            },
            subFilter: {
              _id: '5de02a12e8a23045f0c1558c1',
              name: 'Nike Air'
            },
            enabled: true
          }
        ],
        model: [
          {
            enabled: true,
            modelNo: '9207-502385-9450',
            filters: [
              {
                filter: {
                  _id: '5de027f4e8a23045f0c15580',
                  type: 'Color',
                  serviceName: 'color-something-catalog'
                },
                subFilter: {
                  _id: '5de56ac85ac80a23483fece4',
                  name: 'Black'
                },
                enabled: true
              }
            ],
            quantity: 56,
            currentPrice: 160
          },
          {
            enabled: true,
            modelNo: '9207-502385-9451',
            filters: [
              {
                filter: {
                  _id: '5de027f4e8a23045f0c155801',
                  type: 'Color',
                  serviceName: 'color-something-catalog'
                },
                subFilter: {
                  _id: '5de56ac85ac80a23483fece41',
                  name: 'Black'
                },
                enabled: true
              }
            ],
            quantity: 56,
            currentPrice: 160
          }
        ]
      },
      {
        _id: '5de02cf4a326f13f8c61f811',
        itemNo: '9207-503473-0048',
        enabled: true,
        nameProduct: 'Court Air Zoom Vapor X',
        description:
          'With Nike Zoom Air and a Dynamic Fit system, the NikeCourt Air Zoom Vapor X provides ultimate control on hard courts. The Dynamic Fit system wraps your foot from the bottom of the arch up to the laces for a glove-like fit. A Zoom Air unit in the heel offers low-profile, resilient cushioning from swing to swing.',
        htmlPage: '<div>Bla bla bla</div',
        productUrlImg: ['jomwedding/34acdbe0-fb2b-11e9-befb-033496442550'],
        filtersImg: [
          {
            filter: {
              _id: '5de027f4e8a23045f0c15580',
              type: 'Color',
              serviceName: 'color-something-catalog'
            },
            subFilter: {
              _id: '5de56ac85ac80a23483fece4',
              name: 'Black'
            },
            img: 'jomwedding/34acdbe0-fb2b-11e9-befb-033496442550',
            enabled: true
          },
          {
            filter: {
              _id: '5de027f4e8a23045f0c155801',
              type: 'Color',
              serviceName: 'color-something-catalog'
            },
            subFilter: {
              _id: '5de56ac85ac80a23483fece41',
              name: 'Black'
            },
            img: 'jomwedding/34acdbe0-fb2b-11e9-befb-033496442550',
            enabled: true
          }
        ],
        childCategory: {
          _id: '5de02b89e8a23045f0c1559c',
          name: "Men's Flywire Tennis Shoes"
        },
        filters: [
          {
            filter: {
              _id: '5de02aece8a23045f0c1559b',
              type: 'Brand',
              serviceName: 'Brand-something-catalog'
            },
            subFilter: {
              _id: '5de02a12e8a23045f0c1558c',
              name: 'Nike Air'
            },
            enabled: true
          },
          {
            filter: {
              _id: '5de02aece8a23045f0c1559b1',
              type: 'Brand',
              serviceName: 'Brand-something-catalog'
            },
            subFilter: {
              _id: '5de02a12e8a23045f0c1558c1',
              name: 'Nike Air'
            },
            enabled: true
          }
        ],
        model: [
          {
            enabled: true,
            modelNo: '9207-502385-9450',
            filters: [
              {
                filter: {
                  _id: '5de027f4e8a23045f0c15580',
                  type: 'Color',
                  serviceName: 'color-something-catalog'
                },
                subFilter: {
                  _id: '5de56ac85ac80a23483fece4',
                  name: 'Black'
                },
                enabled: true
              }
            ],
            quantity: 56,
            currentPrice: 160
          },
          {
            enabled: true,
            modelNo: '9207-502385-9451',
            filters: [
              {
                filter: {
                  _id: '5de027f4e8a23045f0c155801',
                  type: 'Color',
                  serviceName: 'color-something-catalog'
                },
                subFilter: {
                  _id: '5de56ac85ac80a23483fece41',
                  name: 'Black'
                },
                enabled: true
              }
            ],
            quantity: 56,
            currentPrice: 160
          }
        ]
      }
    ]
  };

  static apiHost = 'http://localhost:5000';

  static getProducts() {
    return new Promise((resolve, reject) => resolve(this.dataGetProducts));
    // return axios.get(`${this.apiHost}/products`);
  }

  static deleteProducts(id) {
    return new Promise((resolve, reject) =>
      resolve(this.dataGetProducts.data.filter(i => i._id === id))
    );
    // return axios.delete(`${this.apiHost}/products/${id}`);
  }

  static getProductsById(id) {
    return new Promise((resolve, reject) =>
      resolve({ data: this.dataGetProducts.data.filter(i => i._id === id) })
    );
    // return axios.get(`${this.apiHost}/products/${id}`);
  }

  static createProducts(data) {
    return axios.post(`${this.apiHost}/products`, data);
  }
}
