import axios from 'axios';

export default class ProductAPI {
  static getProductProductByFilter = (idCatalog, subfilters) => {
    return axios
      .post('/products/filter', {
        idCatalog: idCatalog,
        subfilters: subfilters
      })
      .then(value => value.data);
  };
}
