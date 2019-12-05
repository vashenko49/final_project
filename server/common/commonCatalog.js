const FilterModel = require('../models/Filter');
const Product = require('../models/Product');

exports.checkFilter = async (filter) => {
  return Promise.all(filter.map(async filteriD => {
    const isExist = await FilterModel.findById(filteriD);
    if (isExist) {
      return {
        filter: filteriD
      };
    }
  }))
};
