const Filter = require("../models/Filter");
const SubFilter = require("../models/SubFilter");
const ChildCatalog = require('../models/ChildCatalog');
const Product = require('../models/Product');
const {validationResult} = require('express-validator');
const commonFilterOrSubFilter = require('../common/commonFilterOrSubFilter');
const mongoose = require('mongoose');

const _ = require("lodash");

exports.createFilter = async (req, res) => {

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }


    let filter = _.cloneDeepWith(req.body, (value => {
      if (_.isString(value) || _.isBoolean(value) || _.isArray(value)) {
        return value;
      }
    }));

    const isExist = await Filter.findOne({serviceName: filter.serviceName});

    if (isExist) {
      return res.status(400).json({
        message: `Filter with service name (${filter.serviceName}) already exist`
      })
    }


    if (filter._idSubFilters) {
      filter._idSubFilters = await commonFilterOrSubFilter.sortingSubFilter(filter);
    }


    let newFilter = new Filter(filter);

    //await newFilter.save();
    res.status(200).json(newFilter);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.searchInFilter = async (req, res) => {
  try {
    const {searchWord} = req.params;
    const filters = await Filter.find({"serviceName": {$regex: decodeURI(searchWord)}});
    res.status(200).json(filters);
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    });
  }
};

exports.getAllFilters = async (req, res) => {
  try {
    const filters = await Filter.find().sort({data: -1})
      .populate('_idSubFilters');

    res.status(200).json(filters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
};

exports.getOneFilters = async (req, res) => {
  try {
    const {_idfilter} = req.params;

    const filter = await Filter.findById(_idfilter)
      .populate('_idSubFilters');

    if (!filter) {
      return res.status(400).json({
        message: `Filter with id ${_idfilter} is not found`
      })
    }

    res.status(200).json(filter);

  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    });
  }
};

exports.updateFilter = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }


    let newDataFilter = _.cloneDeepWith(req.body, (value => {
      if (_.isString(value) || _.isBoolean(value) || _.isArray(value)) {
        return value;
      }
    }));
    newDataFilter._idSubFilters = await commonFilterOrSubFilter.sortingSubFilter(newDataFilter);

    let filter = await Filter.findOne({_id: newDataFilter._id});


    if (!filter) {
      return res.status(400).json({
        message: `Filter with id ${newDataFilter._id} is not found`
      })
    }


    filter.type = _.isString(newDataFilter.type) ? newDataFilter.type : filter.type;
    filter.serviceName = _.isString(newDataFilter.serviceName) ? newDataFilter.serviceName : filter.serviceName;
    filter.enabled = _.isBoolean(newDataFilter.enabled) ? newDataFilter.enabled : filter.enabled;
    filter._idSubFilters = _.isArray(newDataFilter._idSubFilters) ? newDataFilter._idSubFilters : filter._idSubFilters;

    await filter.save();

    res.status(200).json(filter);

  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: ${err}`
    })
  }
};

exports.deleteFilter = async (req, res) => {
  try {

    let filter = await Filter.findById(req.params._id);

    if (!filter) {
      return res.status(400).json({
        message: `Filter with id ${req.params._id} is not found`
      })
    }


    let validate = await commonFilterOrSubFilter.validateRemoveFilter(req.params._id);

    if (validate) {
      return res.status(400).json(validate);
    }


    await filter.delete();

    res.status(200).json({msg: 'Filter deleted'})
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
};

exports.removeManyFilters = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    let response = [];

    const {_idFiltersForDeletion} = req.body;

    for (let i = 0; i < _idFiltersForDeletion.length; i++) {

      let responseOneFilter = {};
      let filter = await Filter.findById(_idFiltersForDeletion[i]);

      if (!filter) {
        return res.status(400).json({
          message: `Filter with id ${req.params._id} is not found`
        })
      }


      let validate = await commonFilterOrSubFilter.validateRemoveFilter(_idFiltersForDeletion[i]);

      responseOneFilter._idFilter = _idFiltersForDeletion[i];
      if (validate) {
        responseOneFilter.validate = validate;
        responseOneFilter.status = 400;
      } else {
        responseOneFilter.status = 200;
        await filter.delete();

      }

      response.push(responseOneFilter);
    }
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({
      message: `Error happened on server: "${e}" `
    })
  }
};





/////////////////////////////
exports.createSubFilter = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }
    const {name} = req.body;
    let subFilter = await SubFilter.findOne({name: name});


    if (subFilter) {
      return res.status(400).json({
        message: `Subfilter ${name} already exist`
      })
    }
    subFilter = new SubFilter({
      name: name
    });

    await subFilter.save();
    res.status(200).json(subFilter);

  } catch (err) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.updateSubFilter = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const {_idSubFilter, name} = req.body;

    let subFilter = await SubFilter.findById(_idSubFilter);

    if (!subFilter) {
      return res.status(400).json({
        message: `SubFilter with id ${_idSubFilter} is not found`
      })
    }

    let findDuplicate = await SubFilter.find({name: name});


    if (findDuplicate.length > 0) {
      return res.status(400).json({
        message: `SubFilter with name ${name} is exists`
      })
    }

    subFilter.name = name;

    await subFilter.save();

    res.status(200).json(subFilter);

  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.searchInSubFilter = async (req, res) => {
  try {
    const {searchWord} = req.params;
    const subfilters = await SubFilter.find({"name": {$regex: decodeURI(searchWord)}});
    res.status(200).json(subfilters);
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    });
  }
};

exports.getAllSubFilters = async (req, res) => {
  try {

    const subfilters = await SubFilter.find();

    res.status(200).json(subfilters);

  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    });
  }
};

exports.getOneSubFilter = async (req, res) => {
  try {
    const {_idSubfilter} = req.params;

    const subfilter = await SubFilter.findById(_idSubfilter);

    if (!subfilter) {
      return res.status(400).json({
        message: `SubFilter with id ${_idSubfilter} is not found`
      })
    }

    res.status(200).json(subfilter);

  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    });
  }
};

exports.deleteSubFilter = async (req, res) => {
  try {
    const {_idSubfilter} = req.params;
    let subFilter = await SubFilter.findById(_idSubfilter);

    if (!subFilter) {
      return res.status(400).json({
        message: `SubFilter with id ${_idSubfilter} is not found`
      })
    }


    let validate = await commonFilterOrSubFilter.validateRemoveSubFilters(_idSubfilter);
    if (validate) {
      return res.status(400).json(validate);
    }

    await subFilter.delete();
    res.status(200).json({msg: 'SubFilter deleted'})
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
};

exports.removeManySubFilters = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const {_idSubFiltersForDeletion} = req.body;

    let response = [];


    for (let i = 0; i < _idSubFiltersForDeletion.length; i++) {

      let responseOneSubFilter = {};
      let subfilter = await SubFilter.findById(_idSubFiltersForDeletion[i]);

      if (!subfilter) {
        return res.status(400).json({
          message: `SUbFilter with id ${req.params._id} is not found`
        })
      }


      let validate = await commonFilterOrSubFilter.validateRemoveSubFilters(_idSubFiltersForDeletion[i]);

      responseOneSubFilter._idFilter = _idSubFiltersForDeletion[i];
      if (validate) {
        responseOneSubFilter.validate = validate;
        responseOneSubFilter.status = 400;
      } else {
        responseOneSubFilter.status = 200;
        await subfilter.delete();

      }

      response.push(responseOneSubFilter);
    }
    res.status(200).json(response);


  } catch (e) {
    res.status(500).json({
      message: `Error happened on server: "${e}" `
    })
  }
};
