const rootCatalog = require("../models/RootCatalog");
const childCatalog = require("../models/ChildCatalog");

const {validationResult} = require('express-validator');

exports.addROOTCatalog = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const {name} = req.body;
    let catalog = await rootCatalog.findOne({name: name});

    if (catalog) {
      return res.status(400).json({
        message: `Root catalog ${catalog.name} already exists`
      })
    }

    let newRootCatalog = new rootCatalog({
      name: name
    });

    newRootCatalog = await newRootCatalog.save();

    res.status(200).json(newRootCatalog);

  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.updateROOTCatalog = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const {name, _idRootCatalog} = req.body;

    const catalog = await rootCatalog.findById(_idRootCatalog);

    if(!catalog){
      return res.status(400).json({
        message: `Root catalog with id ${_idRootCatalog} is not found`
      })
    }

    const isFilterExists = await rootCatalog.findOne({name:name});
    if(isFilterExists){
      return res.status(400).json({
        message: `Root catalog ${name} already exists`
      })
    }


    catalog.name = name;
    await catalog.save();
    res.status(200).json(catalog);


  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.deleteROOTCatalog = (req, res, next) => {

};

exports.getROOTCategories = (req, res, next) => {

};

exports.getROOTCategory = (req, res, next) => {

};


exports.addChildCatalog = (req, res, next) => {

};

exports.updateChildCatalog = (req, res, next) => {

};

exports.deleteChildCatalog = (req, res, next) => {

};

exports.getChildCategories = (req, res, next) => {

};

exports.getChildCategory = (req, res, next) => {

};
