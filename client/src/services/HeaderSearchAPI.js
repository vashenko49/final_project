const axios = require('axios');

export default class HeaderSearchAPI {
  static async findProductsBySearchIconClick(searchInputValue) {
    const encodedSearchInputValue = encodeURI(searchInputValue);
    return await axios.get(`/api/products/search/${encodedSearchInputValue}`);
  }

  static async findProductsBySearchInput(searchInputValue) {
    const encodedSearchInputValue = encodeURI(searchInputValue);
    return await axios.get(`/api/products/searchheader/${encodedSearchInputValue}`);
  }
}
