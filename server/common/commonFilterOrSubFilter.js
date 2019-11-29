const SubFilter = require('../models/SubFilter');
const _ = require('lodash');
const ChildCatalog = require('../models/ChildCatalog');
const Product = require('../models/Product');
const Filter = require("../models/Filter");


exports.sortingSubFilter = (filter)=>{
  return Promise.all(
    filter._idSubFilters.map(async element => {
      if (!_.isUndefined(element._idSubFilter)) {
        const subfilter = await SubFilter.findById(element._idSubFilter);
        if (subfilter) {
          return element._idSubFilter;
        }
      } else {
        const subfilter = await SubFilter.findOne({"name": {$regex: element.name}});

        if (subfilter) {
          return subfilter._id;
        }

        let newSubFilter = new SubFilter({
          name: element.name
        });

        newSubFilter = await newSubFilter.save();
        return newSubFilter._id;
      }
    })
  );
};

exports.validateRemoveFilter = async filter=>{
  let modelFilter = await Product.find({'model.filters.filter': filter});

  if (modelFilter.length > 0) {
    return {
      message: `Filter is used a product'\s model `,
      use: modelFilter
    }
  }

  let productFilter = await Product.find({'filters.filter': filter});

  if (productFilter.length > 0) {
    return {
      message: `Filter is used a product `,
      use: productFilter
    }
  }

  let catalog = await ChildCatalog.find({"filters.filter": filter});

  if (catalog.length > 0) {
    return {
      message: `Filter is used a catalog `,
      use: catalog
    }
  }
};

exports.validateRemoveSubFilters = async _idSubfilter =>{
  let modelFilter = await Product.find({'model.filters.subFilter': _idSubfilter});

  if (modelFilter.length > 0) {
    return {
      message: `subfilter is using a product'\s model `,
      use: modelFilter
    }
  }

  let productFilter = await Product.find({'filters.subFilter': _idSubfilter});

  if (productFilter.length > 0) {
    return {
      message: `subfilter is using a product `,
      use: productFilter
    }
  }

  let catalog = await ChildCatalog.find({"filters.subfilters": _idSubfilter});

  if (catalog.length > 0) {
    return{
      message: `subfilter is using a catalog `,
      use: catalog
    }
  }

  let filter = await Filter.find({"_idSubFilters": _idSubfilter});

  if (filter.length > 0) {
    return {
      message: `subfilter is used a filter `,
      use: filter
    }
  }
};
