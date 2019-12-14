const _ = require('lodash');
const mongoose = require('mongoose');

const Product = require("../models/Product");
const ChildCatalog = require('../models/ChildCatalog');

exports.addNewSubFilterToCategory = (filter, childCatalog) => {
  filter.forEach((filProd) => {
    let indexFilterInCatalog = _.findIndex(childCatalog.filters, (val) => {
      return val.filter.toString() === filProd.filter.toString();
    });
    if (indexFilterInCatalog >= 0) {
      let indexSubFilterCatalog = _.findIndex(childCatalog.filters[indexFilterInCatalog].subfilters, (val) => {
        return val.toString() === filProd.subFilter.toString();
      });
      if (indexSubFilterCatalog < 0) {
        childCatalog.filters[indexFilterInCatalog].subfilters.push(filProd.subFilter)
      }
    }
  });
};

exports.removeSubFilterFromChildCategoryCheckProduct = async (filterold, _idChildCategory) => {
    for (let i = 0; i < filterold.length; i++) {
      const {subFilter, filter} = filterold[i];
      const isUseSubFilterInProduct = await Product.find({
        $and: [
          {
            $or: [
              {"filters.subFilter": subFilter},
              {"model.filters.subFilter": subFilter}
            ]
          }, {"_id": mongoose.Types.ObjectId(_idChildCategory)}
        ]
      });
      if (isUseSubFilterInProduct.length <= 0) {
        await ChildCatalog
          .updateMany(
            {_id: mongoose.Types.ObjectId(filter)},
            {$pull: {"filters.$[].subfilters": subFilter}},
          )
      }
    }
};

exports.comparer = (otherArray) => {
  return function (current) {
    return otherArray.filter(function (other) {
      return other.filter.toString() === current.filter.toString() && other.subFilter.toString() === current.subFilter.toString()
    }).length === 0;
  }
};

exports.comparerImg = (otherArray) => {
  return function (current) {
    return otherArray.filter(function (other) {
      return other.toString() === current.toString()
    }).length === 0;
  }
};

exports.comparerImg = (otherArray) => {
  return function (current) {
    return otherArray.filter(function (other) {
      return other.toString() === current.toString()
    }).length === 0;
  }
};




