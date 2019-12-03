const Product = require("../models/Product");

const rootCatalog = require("../models/RootCatalog");
const childCatalog = require("../models/ChildCatalog");
const subFilterModel = require('../models/SubFilter');
const commonCatalog = require('../common/commonCatalog');

const _ = require('lodash');

const {validationResult} = require('express-validator');
const mongoose = require('mongoose');

exports.addROOTCatalog = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
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
      return res.status(400).json({errors: errors.array()});
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


    let childCatalogy = await childCatalog.find({parentId: catalog._id});

    if (childCatalogy.length > 0) {
      return res.status(400).json({
        message: `Root catalog is using a child catalog `,
        product: childCatalogy
      })
    }

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

    const {name, _id, enabled = false, filters} = req.body;

    const catalog = await childCatalog.findById(_id);

    if (!catalog) {
      return res.status(400).json({
        message: `Child catalog with id ${_id} is not found`
      })
    }


    catalog.name = name;
    catalog.enabled = enabled;
    catalog.filters = filters;


    await catalog.save();
    res.status(200).json(catalog);


  } catch (e) {
    console.log(e);
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

    const product = await Product.find({'_idChildCategory': id});

    if (product.length > 0) {
      return res.status(400).json({
        message: `Child catalog is using a product `,
        product: product
      })
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
      .populate({
        path: 'filters.filter',
        populate: {
          path: "_idSubFilters"
        }
      });

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

exports.getHierarchyRootChildCatalogFilter = async (req, res) => {
  try {
    let root = JSON.parse(JSON.stringify(await rootCatalog.find({})));

    for (let i = 0; i < root.length; i++) {
      root[i].childCatalog = await childCatalog.find({"parentId": root[i]._id}).select('-filters.subfilters')
        .populate('filters.filter');
    }
    res.status(200).json(root);
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }

};

exports.getHierarchyRootChildCatalogFilterByRootCatalogID = async (req, res) => {
  try {
    const {_idRootCatalog} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_idRootCatalog)){
      return res.status(400).json({
        message:`ID is not valid ${_idRootCatalog}`
      })
    }

    let root = await rootCatalog.findById(_idRootCatalog);

    if (!root) {
      return res.status(400).json({
        message: `RootCatalog with id ${root} is not found`
      })
    }

    root = JSON.parse(JSON.stringify(root));

    root.childCatalog = await childCatalog.find({"parentId": root._id}).select('-filters.subfilters')
        .populate('filters.filter');

    res.status(200).json(root);
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }

};

exports.createRootChildCatalogAndAddFilterId = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }
    const {nameRootCatalog, nameChildCatalog, filters} = req.body;

    let catalog = await rootCatalog.findOne({name: nameRootCatalog});

    if (catalog) {
      return res.status(400).json({
        message: `Root catalog ${catalog.name} already exists`
      })
    }


    let newRootCatalog = new rootCatalog({
      name: nameRootCatalog
    });

    newRootCatalog = await newRootCatalog.save();

    let newChildCatalog = new childCatalog({
      name: nameChildCatalog,
      parentId: newRootCatalog._id,
      filters: await commonCatalog.checkFilter(filters)
    });

    newChildCatalog = await newChildCatalog.save();

    res.status(200).json({
      newRootCatalog,
      newChildCatalog
    })

  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.updateRootChildCatalogAndAddFilterId = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    let response = {};
    let {nameRootCatalog, nameChildCatalog, filters, _idRootCatalog, _idChildCatalog} = req.body;

    if (_.isString(_idRootCatalog) && _.isString(nameRootCatalog)) {
      let rootcatalog = await rootCatalog.findById(_idRootCatalog);
      if (!rootcatalog) {
        return res.status(400).json({
          message: `Catalog with id "${_idRootCatalog}" is not found.`
        });
      }
      rootcatalog.name = nameRootCatalog;

      await rootcatalog.save();
      response['rootcatalog'] = rootcatalog;
    }

    if (_.isString(_idChildCatalog)) {
      let childcatalog = await childCatalog.findById(_idChildCatalog);

      if (!childcatalog) {
        return res.status(400).json({
          message: `Catalog with id "${_idChildCatalog}" is not found.`
        });
      }

      if (_.isString(nameChildCatalog)) {
        childcatalog.name = nameChildCatalog;
      }

      if (_.isArray(filters)) {


        filters = filters.map(elemen => {
          return {
            filter: elemen
          }
        });

        await Promise.all(childcatalog.filters.map(async element => {
          if (element) {
            const {filter: filterProd} = element;
            let productUse = await Product.findOne({
              $and: [{"_idChildCategory": _idChildCatalog}, {
                $or: [{"filters.filter": filterProd}, {"model.filters.filter": filterProd}]
              }]
            });
            if (productUse) {
              filters.push({
                filter: filterProd
              })
            }
          }
        }));


        filters = _.map(
          _.uniq(
            _.map(filters, function (obj) {
              return JSON.stringify(obj);
            })
          ), function (obj) {
            return JSON.parse(obj);
          }
        );

        childcatalog.filters = filters;


      }
      await childcatalog.save();
      response['childcatalog'] = childcatalog;
    }

    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};
