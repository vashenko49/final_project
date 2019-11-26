const rootCatalog = require("../models/RootCatalog");
const childCatalog = require("../models/ChildCatalog");
const subFilterModel = require('../models/SubFilter');

const {validationResult} = require('express-validator');

exports.addROOTCatalog = async (req, res) => {
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

exports.updateROOTCatalog = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const {name, _idRootCatalog, enabled = false} = req.body;

    const catalog = await rootCatalog.findById(_idRootCatalog);

    if (!catalog) {
      return res.status(400).json({
        message: `Root catalog with id ${_idRootCatalog} is not found`
      })
    }

    const isFilterExists = await rootCatalog.findOne({name: name});
    if (isFilterExists) {
      return res.status(400).json({
        message: `Root catalog ${name} already exists`
      })
    }


    catalog.name = name;
    catalog.enabled = enabled;
    await catalog.save();
    res.status(200).json(catalog);


  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.deleteROOTCatalog = async (req, res) => {
  try {
    const {_idrootcatalog} = req.params;
    const catalog = await rootCatalog.findById(_idrootcatalog);
    if (!catalog) {
      return res.status(400).json({
        message: `Catalog with id "${_idrootcatalog}" is not found.`
      });
    }
    await childCatalog.deleteMany({parentId: catalog._id});

    await catalog.delete();
    res.status(200).json({
      message: `Category witn id "${_idrootcatalog}" is successfully deleted from DB.`,
      deletedCategoryInfo: catalog
    })
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }

};

exports.getActiveROOTCategories = async (req, res) => {
  try {
    const category = await rootCatalog.find({"enabled": "true"});
    res.status(200).json(category);
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.getActiveROOTCategory = async (req, res) => {
  try {
    const {_idrootcatalog} = req.params;
    const catalog = await rootCatalog.find({
      $and: [
        {
          "enabled": "true",
          "_id": _idrootcatalog
        }
      ]
    });
    res.status(200).json(catalog);
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.getROOTCategories = async (req, res) => {
  try {
    const category = await rootCatalog.find();
    res.status(200).json(category);
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.getROOTCategory = async (req, res) => {
  try {
    const {_idrootcatalog} = req.params;
    const catalog = await rootCatalog.findById(_idrootcatalog);
    res.status(200).json(catalog);
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};


///////////////////////////////////////////////////////////////////
exports.addChildCatalog = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }
    const {name, parentId, filters = []} = req.body;

    const isChildCatalogExists = await childCatalog.findOne({name: name});

    if (isChildCatalogExists) {
      return res.status(400).json({
        message: `Child catalog ${name} already exists`
      })
    }

    let catalog = new childCatalog({
      name: name,
      parentId: parentId,
      filters: filters
    });

    catalog = await catalog.save();
    res.status(200).json(catalog)
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.updateChildCatalog = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const {name, _id, enabled = false} = req.body;

    const catalog = await childCatalog.findById(_id);

    if (!catalog) {
      return res.status(400).json({
        message: `Child catalog with id ${_id} is not found`
      })
    }

    const isFilterExists = await childCatalog.findOne({name: name});
    if (isFilterExists) {
      return res.status(400).json({
        message: `Child catalog ${name} already exists`
      })
    }


    catalog.name = name;
    catalog.enabled = enabled;
    await catalog.save();
    res.status(200).json(catalog);


  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.deleteChildCatalog = async (req, res) => {
  try {
    const {id} = req.params;
    const catalog = await childCatalog.findById(id);
    if (!catalog) {
      return res.status(400).json({
        message: `Catalog with id "${id}" is not found.`
      });
    }

    await catalog.delete();
    res.status(200).json({
      message: `Child catalog witn id "${id}" is successfully deleted from DB.`,
      deletedCategoryInfo: catalog
    })

  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.getActiveChildCategoryForClientSelectSubfilter = async (req, res) => {
  try {
    const {id} = req.params;

    const catalog = await childCatalog.findById(id)
      .populate('parentId')
      .populate('filters.filter')
      .populate('filters.subfilters');

    res.status(200).json(catalog);
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.getActiveChildCategoryForClientAnySubfilter = async (req, res) => {
  try {
    const {id} = req.params;

    const catalog = await childCatalog.findById(id)
      .populate('parentId')
      .populate('filters.filter');

    for (let i =0; i <catalog.filters.length;i++){
      catalog.filters[i].subfilters = await subFilterModel.find({"_idFilter":catalog.filters[i].filter._id});
    }

    res.status(200).json(catalog);
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.getChildCategories = async (req, res) => {
  try {
    const category = await childCatalog.find();
    res.status(200).json(category);
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.getChildCategory = async (req, res) => {
  try {
    const {_idchildcatalog} = req.params;
    const catalog = await childCatalog.findById(_idchildcatalog);
    res.status(200).json(catalog);
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.getChildCategoriesWithRootID = async (req, res) => {
  try {
    const {_idrootcatalog} = req.params;
    const catalog = await childCatalog.find({"parentId": _idrootcatalog});
    res.status(200).json(catalog);
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.getActiveChildCategories = async (req, res) => {
  try {
    const category = await childCatalog.find({"enabled": "true"});
    res.status(200).json(category);
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.getActiveChildCategory = async (req, res) => {
  try {
    const {_idchildcatalog} = req.params;
    const catalog = await childCatalog.find({
      $and: [
        {
          "enabled": "true",
          "_id": _idchildcatalog
        }
      ]
    });
    res.status(200).json(catalog);
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.getActiveChildCategoriesWithRootID = async (req, res) => {
  try {
    const {_idrootcatalog} = req.params;
    const catalog = await childCatalog.find({
      $and: [
        {
          "enabled": "true",
          "parentId": _idrootcatalog
        }
      ]
    });
    res.status(200).json(catalog);
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};
