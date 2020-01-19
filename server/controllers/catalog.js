const Product = require("../models/Product");

const rootCatalog = require("../models/RootCatalog");
const childCatalog = require("../models/ChildCatalog");
const commonCatalog = require("../common/commonCatalog");
const productModel = require("../models/Product");
const CommentSchema = require("../models/Comment");
const _ = require("lodash");

const {validationResult} = require("express-validator");
const mongoose = require("mongoose");

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
      });
    }

    let newRootCatalog = new rootCatalog({
      name: name
    });

    newRootCatalog = await newRootCatalog.save();

    res.status(200).json(newRootCatalog);
  } catch (e) {
    res.status(500).json({
      message: "Server Error!"
    });
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
      });
    }

    const isFilterExists = await rootCatalog.findOne({name: name});
    if (isFilterExists) {
      return res.status(400).json({
        message: `Root catalog ${name} already exists`
      });
    }

    catalog.name = name;
    catalog.enabled = enabled;
    await catalog.save();
    res.status(200).json(catalog);
  } catch (e) {
    res.status(500).json({
      message: "Server Error!"
    });
  }
};

exports.activateOrDeactivateROOTCatalog = async (req, res) => {
  try {
    const {_idRootCatalog, status} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    if (!mongoose.Types.ObjectId.isValid(_idRootCatalog)) {
      return res.status(400).json({
        message: `ID is not valid ${_idRootCatalog}`
      });
    }

    let rootcatalog = await rootCatalog.findById(_idRootCatalog);

    if (!rootcatalog) {
      return res.status(400).json({
        message: `Root catalog with id ${rootcatalog} is not found`
      });
    }

    rootcatalog.enabled = status;

    rootcatalog = await rootcatalog.save();

    res.status(200).json(rootcatalog);
  } catch (e) {
    res.status(500).json({
      message: "Server Error!"
    });
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
      });
    }

    await catalog.delete();
    res.status(200).json({
      message: `Category witn id "${_idrootcatalog}" is successfully deleted from DB.`,
      deletedCategoryInfo: catalog
    });
  } catch (e) {
    res.status(500).json({
      message: "Server Error!"
    });
  }
};

exports.getActiveROOTCategories = async (req, res) => {
  try {
    const category = await rootCatalog.find({enabled: "true"});
    res.status(200).json(category);
  } catch (e) {
    res.status(500).json({
      message: "Server Error!"
    });
  }
};

exports.getActiveROOTCategory = async (req, res) => {
  try {
    const {_idrootcatalog} = req.params;
    const catalog = await rootCatalog.find({
      $and: [
        {
          enabled: "true",
          _id: _idrootcatalog
        }
      ]
    });
    res.status(200).json(catalog);
  } catch (e) {
    res.status(500).json({
      message: "Server Error!"
    });
  }
};

exports.getROOTCategories = async (req, res) => {
  try {
    const category = await rootCatalog.find();
    res.status(200).json(category);
  } catch (e) {
    res.status(500).json({
      message: "Server Error!"
    });
  }
};

exports.getROOTCategory = async (req, res) => {
  try {
    const {_idrootcatalog} = req.params;
    const catalog = await rootCatalog.findById(_idrootcatalog);
    res.status(200).json(catalog);
  } catch (e) {
    res.status(500).json({
      message: "Server Error!"
    });
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
    res.status(200).json(catalog);
  } catch (e) {
    res.status(500).json({
      message: "Server Error!"
    });
  }
};

exports.updateChildCatalog = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const {_id} = req.body;

    const catalog = await childCatalog.findById(_id);

    if (!catalog) {
      return res.status(400).json({
        message: `Child catalog with id ${_id} is not found`
      });
    }

    let data = _.cloneDeep(req.body);
    let updateCatalog = await childCatalog.findByIdAndUpdate(_id, {$set: data}, {new: true});

    updateCatalog = await updateCatalog.save();

    res.status(200).json(updateCatalog);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Server Error!"
    });
  }
};

exports.activateOrDeactivateChildCatalog = async (req, res) => {
  try {
    const {_idChildCatalog, status} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    if (!mongoose.Types.ObjectId.isValid(_idChildCatalog)) {
      return res.status(400).json({
        message: `ID is not valid ${_idChildCatalog}`
      });
    }

    let childcatalog = await childCatalog.findById(_idChildCatalog);

    if (!childcatalog) {
      return res.status(400).json({
        message: `Child catalog with id ${childcatalog} is not found`
      });
    }

    childcatalog.enabled = status;

    childcatalog = await childcatalog.save();

    res.status(200).json(childcatalog);
  } catch (e) {
    res.status(500).json({
      message: "Server Error!"
    });
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

    const product = await Product.find({_idChildCategory: id});

    if (product.length > 0) {
      return res.status(400).json({
        message: `Child catalog is using a product `,
        product: product
      });
    }

    await catalog.delete();

    res.status(200).json({
      message: `Child catalog witn id "${id}" is successfully deleted from DB.`,
      deletedCategoryInfo: catalog
    });
  } catch (e) {
    res.status(500).json({
      message: "Server Error!"
    });
  }
};

exports.deleteChildCatalogFilter = async (req, res) => {
  try {
    const {_idChildCatalog, _idFilter} = req.params;

    if (!mongoose.Types.ObjectId.isValid(_idChildCatalog)) {
      return res.status(400).json({
        message: `ID is not valid`
      });
    }

    let childcatalog = await childCatalog.findById(_idChildCatalog);
    if (!childcatalog) {
      return res.status(400).json({
        message: `Child catalog with id ${childcatalog} is not found`
      });
    }

    for (let i = 0; i < childcatalog.filters.length; i++) {
      if (childcatalog.filters[i].filter.toString() === _idFilter) {
        const product = await Product.find({
          $and: [
            {
              _idChildCategory: mongoose.Types.ObjectId(_idChildCatalog)
            },
            {
              $or: [
                {
                  "filters.filter": mongoose.Types.ObjectId(_idFilter)
                },
                {
                  "model.filters.filter": mongoose.Types.ObjectId(_idFilter)
                }
              ]
            }
          ]
        });

        if (product.length <= 0) {
          childcatalog.filters.splice(i, 1);
        }
      }
    }

    childcatalog = await childcatalog.save();

    res.status(200).json(childcatalog);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Server Error!"
    });
  }
};

exports.getActiveChildCategoryForClientSelectSubfilter = async (req, res) => {
  try {
    const {id} = req.params;

    const catalog = await childCatalog
      .findById(id)
      .populate("parentId")
      .populate("filters.filter")
      .populate("filters.subfilters");

    res.status(200).json(catalog);
  } catch (e) {
    res.status(500).json({
      message: "Server Error!"
    });
  }
};

exports.getActiveChildCategoryForClientAnySubfilter = async (req, res) => {
  try {
    const {id} = req.params;

    const catalog = await childCatalog
      .findById(id)
      .populate("parentId")
      .populate({
        path: "filters.filter",
        populate: {
          path: "_idSubFilters"
        }
      });

    res.status(200).json(catalog);
  } catch (e) {
    res.status(500).json({
      message: "Server Error!"
    });
  }
};

exports.getChildCategories = async (req, res) => {
  try {
    const category = await childCatalog.find();
    res.status(200).json(category);
  } catch (e) {
    res.status(500).json({
      message: "Server Error!"
    });
  }
};

exports.getChildCategory = async (req, res) => {
  try {
    const {_idchildcatalog} = req.params;
    const catalog = await childCatalog
      .findById(_idchildcatalog)
      .populate({
        path: "parentId",
        select: "name"
      })
      .populate("filters.subfilters")
      .populate({
        path: "filters.filter",
        select: "type"
      });
    res.status(200).json(catalog);
  } catch (e) {
    res.status(500).json({
      message: "Server Error!"
    });
  }
};

exports.getChildCategoriesWithRootID = async (req, res) => {
  try {
    const {_idrootcatalog} = req.params;
    const catalog = await childCatalog.find({parentId: _idrootcatalog});
    res.status(200).json(catalog);
  } catch (e) {
    res.status(500).json({
      message: "Server Error!"
    });
  }
};

exports.getActiveChildCategories = async (req, res) => {
  try {
    const category = await childCatalog.find({enabled: "true"});
    res.status(200).json(category);
  } catch (e) {
    res.status(500).json({
      message: "Server Error!"
    });
  }
};

exports.getActiveChildCategory = async (req, res) => {
  try {
    const {_idchildcatalog} = req.params;
    const catalog = await childCatalog
      .findOne({
        $and: [
          {
            enabled: "true",
            _id: _idchildcatalog
          }
        ]
      })
      .populate({
        path: "parentId",
        select: "name"
      })
      .populate("filters.subfilters")
      .populate({
        path: "filters.filter",
        select: "type"
      });
    res.status(200).json(catalog);
  } catch (e) {
    res.status(500).json({
      message: "Server Error!"
    });
  }
};

exports.getActiveChildCategoriesWithRootID = async (req, res) => {
  try {
    const {_idrootcatalog} = req.params;
    const catalog = await childCatalog.find({
      $and: [
        {
          enabled: "true",
          parentId: _idrootcatalog
        }
      ]
    });
    res.status(200).json(catalog);
  } catch (e) {
    res.status(500).json({
      message: "Server Error!"
    });
  }
};

exports.getHierarchyRootChildCatalogFilter = async (req, res) => {
  try {
    let root = JSON.parse(JSON.stringify(await rootCatalog.find({})));

    for (let i = 0; i < root.length; i++) {
      root[i].childCatalog = await childCatalog
        .find({parentId: root[i]._id})
        .select("-filters.subfilters")
        .populate({
          path: "filters.filter",
          populate: "_idSubFilters"
        });
    }
    res.status(200).json(root);
  } catch (e) {
    res.status(500).json({
      message: "Server Error!"
    });
  }
};

exports.getHierarchyRootChildCatalogFilterByRootCatalogID = async (req, res) => {
  try {
    const {_idRootCatalog} = req.params;
    if (!mongoose.Types.ObjectId.isValid(_idRootCatalog)) {
      return res.status(400).json({
        message: `ID is not valid ${_idRootCatalog}`
      });
    }

    let root = await rootCatalog.findById(_idRootCatalog);

    if (!root) {
      return res.status(400).json({
        message: `RootCatalog with id ${root} is not found`
      });
    }

    root = JSON.parse(JSON.stringify(root));

    root.childCatalog = await childCatalog
      .find({parentId: root._id})
      .select("-filters.subfilters")
      .populate("filters.filter");

    res.status(200).json(root);
  } catch (e) {
    res.status(500).json({
      message: "Server Error!"
    });
  }
};

exports.createRootChildCatalogAndAddFilterId = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }
    const {nameRootCatalog, childCatalogs: newchildCatalogs} = req.body;

    let catalog = await rootCatalog.findOne({name: nameRootCatalog});
    if (catalog) {
      return res.status(400).json({
        message: `Root catalog ${catalog.name} already exists`
      });
    }

    let newRootCatalog = new rootCatalog({
      name: nameRootCatalog
    });

    newRootCatalog = await newRootCatalog.save();

    let AllNewChildCatalog = [];

    for (let i = 0; i < newchildCatalogs.length; i++) {
      const {nameChildCatalog, filters} = newchildCatalogs[i];

      let newChildCatalog = new childCatalog({
        name: nameChildCatalog,
        parentId: newRootCatalog._id,
        filters: await commonCatalog.checkFilter(filters)
      });

      newChildCatalog = await newChildCatalog.save();
      AllNewChildCatalog.push(newChildCatalog);
    }

    res.status(200).json({
      newRootCatalog,
      AllNewChildCatalog
    });
  } catch (e) {
    res.status(500).json({
      message: "Server Error!"
    });
  }
};

exports.updateRootChildCatalogAndAddFilterId = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    let response = {};

    response.childcatalog = [];
    let {nameRootCatalog, childCatalogs: editChildCatalogs, _id: _idRootCatalog} = req.body;

    let childCatalogOld;

    if (_.isString(_idRootCatalog) && _.isString(nameRootCatalog)) {
      let rootcatalog = await rootCatalog.findById(_idRootCatalog);
      if (!rootcatalog) {
        return res.status(400).json({
          message: `Catalog with id "${_idRootCatalog}" is not found.`
        });
      }
      rootcatalog.name = nameRootCatalog;

      // Check delete childCatalog
      childCatalogOld = await childCatalog.find({parentId: _idRootCatalog});

      await rootcatalog.save();
      response["rootcatalog"] = rootcatalog;
    }

    if (_.isArray(editChildCatalogs)) {
      for (let i = 0; i < editChildCatalogs.length; i++) {
        let {_id: _idChildCatalog, isRemove, filters, nameChildCatalog} = editChildCatalogs[i];

        if (_.isBoolean(isRemove) && isRemove) {
          const cat = await childCatalog.findById(_idChildCatalog);
          await cat.delete();
        }


        if (_.isUndefined(_idChildCatalog)) {
          let newChildCatalog = new childCatalog({
            name: nameChildCatalog,
            parentId: _idRootCatalog,
            filters: await commonCatalog.checkFilter(filters)
          });

          newChildCatalog = await newChildCatalog.save();
          response["childcatalog"].push(newChildCatalog);
        }

        if (_.isString(_idChildCatalog) && !_.isBoolean(isRemove) && !isRemove) {
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
              };
            });

            await Promise.all(
              childcatalog.filters.map(async element => {
                if (element) {
                  const {filter: filterProd} = element;
                  let productUse = await Product.findOne({
                    $and: [
                      {_idChildCategory: _idChildCatalog},
                      {
                        $or: [
                          {"filters.filter": filterProd},
                          {"model.filters.filter": filterProd}
                        ]
                      }
                    ]
                  });
                  if (productUse) {
                    filters.push({
                      filter: filterProd
                    });
                  }
                }
              })
            );

            filters = _.map(
              _.uniq(
                _.map(filters, function (obj) {
                  return JSON.stringify(obj);
                })
              ),
              function (obj) {
                return JSON.parse(obj);
              }
            );
            childcatalog.filters = filters;
          }
          await childcatalog.save();
          response["childcatalog"].push(childcatalog);
        }
      }
    }
    // Detailer response for admin
    let root = await rootCatalog.findById(_idRootCatalog);

    if (!root) {
      return res.status(400).json({
        message: `RootCatalog with id ${root} is not found`
      });
    }

    responseDetail = JSON.parse(JSON.stringify(root));

    responseDetail.childCatalog = await childCatalog
      .find({parentId: responseDetail._id})
      .select("-filters.subfilters")
      .populate("filters.filter");

    // responseDetail - NEW full res / response old short res
    res.status(200).json(responseDetail);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Server Error!"
    });
  }
};

exports.getCatalogsAndProductForMainPage = async (req, res) => {
  try {
    let childCatalogs = await JSON.parse(
      JSON.stringify(
        await childCatalog.find(
          {
            default: "true",
            enabled: true
          },
          "-filters"
        )
      )
    );

    childCatalogs = await Promise.all(
      childCatalogs.map(async element => {
        const {_id, countProductMainPage} = element;
        let products = JSON.parse(
          JSON.stringify(
            await productModel
              .find({
                _idChildCategory: _id,
                enabled: true
              })
              .populate({
                path: "_idChildCategory",
                select: "-filters",
                populate: {
                  path: "parentId"
                }
              })
              .populate({
                path: "filters.filter",
                select: "enabled _id type serviceName"
              })
              .populate({
                path: "filters.subFilter"
              })
              .populate({
                path: "model.filters.filter",
                select: "enabled _id type serviceName"
              })
              .populate({
                path: "model.filters.subFilter"
              })
              .populate({
                path: 'filterImg._idFilter',
                select: '_id enabled type serviceName'
              })
              .populate('filterImg._idSubFilters')


          )
        )
          .filter(prod => {
            return _.isArray(prod.comments) && prod.comments.length > 0;
          })
          .map(prod => {
            let rating = 0;
            const {comments} = prod;
            if (comments.length > 0) {
              comments.forEach(item => {
                rating += item.score;
              });
              rating = rating / comments.length;
            }
            prod.rating = rating;
            return prod;
          });
        products = _.takeRight(_.orderBy(products, ["rating"]), countProductMainPage);
        element.products = products;
        return element;
      })
    );

    childCatalogs = childCatalogs.filter(catal => {
      return _.isArray(catal.products) && catal.products.length > 0;
    });

    res.status(200).json(childCatalogs);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: `Server error ${e.message}`
    });
  }
};
