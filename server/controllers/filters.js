const Filter = require("../models/Filter");
const SubFilter = require("../models/SubFilter");
const {validationResult } = require('express-validator');

const _ = require("lodash");

exports.createFilter = async (req, res) => {

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const {type,serviceName } = req.body;
    let filter = new Filter({
      type:type,
      serviceName:serviceName
    });

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

    const {type, _id, serviceName, enabled} = req.body;
    let filter = await Filter.findOne({_id: _id});


    if (!filter) {
      return res.status(400).json({
        message: `Filter with id ${req.params.id} is not found`
      })
    }

    filter.type = type?type:filter.type;
    filter.serviceName = serviceName?serviceName:filter.serviceName;
    filter.enabled = typeof enabled ==="boolean"?enabled:filter.enabled;

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
        message: `Filter ${name} already exist`
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
        message: `SubFilter with id ${_idSubFilter} is not found`
      })
    }

    let findDuplicate = await SubFilter.find({name:name});


    if(findDuplicate.length>0){
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

exports.getAllSubFilters = async (req, res) => {
  try {
    const {_idfilter} = req.params;

    const subfilters = await SubFilter.find({_idFilter:_idfilter})
      .populate('_idFilter');

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

    const subfilter = await SubFilter.findById(_idSubfilter)
      .populate({
        path:'populate',
        model:'filters'
      });



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
    let subFilter = await SubFilter.findById(_idSubfilter);

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

