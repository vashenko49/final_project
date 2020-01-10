import axios from 'axios';

export default class CatalogAPI {
  static getCategoriesForPreview = () => {
    return axios.get('/api/catalog/mainpage').then(value => value.data);
  };
  static getCatalogById = idCatalog => {
    return axios.get(`/api/catalog/child/public/${idCatalog}`).then(value => value.data);
  };
}
