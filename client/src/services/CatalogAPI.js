import axios from 'axios';

export default class CatalogAPI {
  static getCategoriesForPreview = () => {
    return axios.get('/catalog/mainpage').then(value => value.data);
  };
  static getCatalogById = idCatalog => {
    return axios.get(`/catalog/child/private/${idCatalog}`).then(value => value.data);
  };
}
