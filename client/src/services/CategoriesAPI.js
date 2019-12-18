import axios from 'axios';

export default class CategoriesAPI {
  static getCategoriesForPreview = () => {
    return axios.get('/catalog/mainpage').then(value => value.data);
  };
}
