import axios from 'axios';
import _ from 'lodash';
export default class ProductAPI {
  static getProductProductByFilter = (idCatalog, limit, page, sort, subfilters, price) => {
    const data = {
      idCatalog: idCatalog,
      page: page,
      limit: limit,
      sort: sort
    };
    if (_.isArray(subfilters) && subfilters.length > 0) {
      data.subfilters = subfilters;
    }
    if (_.isArray(price) && price.length === 2) {
      data.price = price;
    }

    return axios.post('/api/products/filter', data).then(value => value.data);
  };
  static getCurrentProduct = productId => {
    return axios.get(`/api/products/${productId}`).then(value => value.data);
  };
  static getMeanRatingProductByProductId = productId => {
    return axios.get(`/api/comment/rating/${productId}`).then(value => value.data);
  };
}
