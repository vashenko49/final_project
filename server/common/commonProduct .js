const _ = require('lodash');
const mongoose = require('mongoose');

const Product = require("../models/Product");
const ChildCatalog = require('../models/ChildCatalog');

exports.addNewSubFilterToCategory = async (filter, childCatalog) => {
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

exports.removeSubFilterFromChildCategoryCheckProduct = async (filterold, _idChildCategory, _idProduct) => {
  for (let i = 0; i < filterold.length; i++) {
    const {subFilter, filter} = filterold[i];
    const isUseSubFilterInProduct = await Product.find({
      $and: [
        {
          $or: [
            {
              $and: [
                {"filters.subFilter": subFilter},
                {'enabled': true},
              ]
            },
            {
              $and: [
                {"model.filters.subFilter": subFilter},
                {'model.enabled': true},
              ],
            }
          ]
        }, {
          $and: [
            {"_idChildCategory": _idChildCategory},
            {'_id': {$ne: _idProduct}}
          ]
        }
      ]
    });
    if (isUseSubFilterInProduct.length <= 0) {
      const ChildCat = await ChildCatalog.findById(_idChildCategory);

      let selectFilter = _.findIndex(ChildCat.filters, function (o) {
        return o.filter.toString() === filter.toString();
      });

      if (selectFilter >= 0) {
        let selectSubfilter = _.findIndex(ChildCat.filters[selectFilter].subfilters, function (o) {
          return o.toString() === subFilter.toString();
        });
        if (selectSubfilter >= 0) {
          ChildCat.filters[selectFilter].subfilters.splice(selectSubfilter, 1);
        }
      }

      await ChildCat.save();
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




