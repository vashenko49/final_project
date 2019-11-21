const SubFilter = require("../models/SubFilter");
const {validationResult} = require('express-validator');

exports.createSubFilter = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }
    const {_idFilter, name} = req.body;
    let subFilter = await SubFilter.findOne({name: name, _idFilter: _idFilter});


    if (subFilter) {
      return res.status(400).json({
        message: `Filter ${subFilter.type} already exist`
      })
    }
    subFilter = new SubFilter({
      _idFilter: _idFilter,
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
        message: `SubFilter with id ${req.params.id} is not found`
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

exports.getAllSubFilters = async (req, res) => {
  try {
    const {_idfilter} = req.params;

    const subfilters = await SubFilter.find({_idFilter:_idfilter});

    if(!subfilters){
      return res.status(400).json({
        message: `SubFilters with a filter\'s id ${_idfilter} is not found`
      })
    }

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

    if(!subfilter){
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
    let subFilter = await Filter.findById(_idSubfilter);

    if(!subFilter){
      return res.status(400).json({
        message: `SubFilter with id ${_idSubfilter} is not found`
      })
    }

    await subFilter.delete();

    res.status(200).json({msg: 'SubFilter deleted'})
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
};
