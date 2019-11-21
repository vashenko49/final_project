const Filter = require("../models/Filter");
const {validationResult } = require('express-validator');

const _ = require("lodash");

exports.createFilter = async (req, res) => {

  const initialQuery = _.cloneDeep(req.body);
  const newFilter = new Filter(initialQuery);

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const {type} = req.body;
    let filter = await Filter.findOne({type: type});

    if (filter) {
      return res.status(400).json({
        message: `Filter ${filter.type} already exist`
      })
    }
    filter = new Filter(newFilter);

    await filter.save();
    res.status(200).json(filter);

  } catch (err) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.getAllFilters = async (req, res) => {
  try {
    const filters = await Filter.find().sort({data: -1});

    res.status(200).json(filters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
};

exports.getOneFilters = async (req, res) => {
  try {
    const {_idfilter} = req.params;

    const filter = await Filter.findById(_idfilter);

    if(!filter){
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
      return res.status(422).json({ errors: errors.array() });
    }

    const {type, _id} = req.body;
    let filter = await Filter.findOne({_id: _id});


    if (!filter) {
      return res.status(400).json({
        message: `Filter with id ${req.params.id} is not found`
      })
    }

    filter.type = type;

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

    if(!filter){
      return res.status(400).json({
        message: `Filter with id ${req.params._id} is not found`
      })
    }

    await filter.delete();

    res.status(200).json({msg: 'Filter deleted'})
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
};

