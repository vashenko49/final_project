const axios = require('axios');

export default class HeaderSearchAPI {
  static async findFiveProductsBySearchIconClick(searchInputValue) {
    const encodedSearchInputValue = encodeURI(searchInputValue);
    return await axios.get(`/products/searchheader/${encodedSearchInputValue}`);
  }

  static async findProductsBySearchInput(searchInputValue) {
    const encodedSearchInputValue = encodeURI(searchInputValue);
    return await axios.get(`/products/search/${encodedSearchInputValue}`);
  }
}
