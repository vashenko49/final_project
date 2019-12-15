const customCloudinaryInstrument = require("../common/customCloudinaryInstrument");

const _ = require('lodash');
const {validationResult} = require('express-validator');
const mongoose = require('mongoose');


const commonProduct = require('../common/commonProduct ');
const Product = require("../models/Product");
const ChildCatalog = require('../models/ChildCatalog');
const uniqueRandom = require("unique-random");
const rand = uniqueRandom(100000, 999999);

exports.addProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    let itemNo = (rand()).toString();
    let {_idChildCategory} = req.body;
    let {productUrlImg, filterImg} = req.files;
    const folder = `final-project/products/catalog-${_idChildCategory}/${encodeURI(itemNo)}`;


    if (_.isArray(productUrlImg) && productUrlImg.length > 0) {
      let urlProductOnCloudinary = await customCloudinaryInstrument.uploadArrayImgToCloudinary(productUrlImg, folder);
      urlProductOnCloudinary.forEach(element => {
        _.set(req.body, element.field, element.url);
      })
    }

    if (_.isArray(filterImg) && filterImg.length > 0) {
      for (let i = 0; i < filterImg.length; i++) {
        if (_.isArray(filterImg[i].urlImg) && filterImg[i].urlImg.length > 0) {
          let urlProductOnCloudinary = await customCloudinaryInstrument.uploadArrayImgToCloudinary(filterImg[i].urlImg, folder);
          urlProductOnCloudinary.forEach(element => {
            if (element.field) {
              _.set(req.body, element.field, element.url);
            }
          })
        }
      }
    }


    let product = _.cloneDeepWith(req.body, (value => {
      if (_.isString(value) || _.isBoolean(value) || _.isArray(value)) {
        return value;
      }
    }));


    product.model = product.model.map(element => {
      element.modelNo = rand();
      return element;
    });


    let filter = product.filters;
    product.model.forEach(element => {
      filter = _.concat(filter, element.filters);
    });

    filter = _.map(
      _.uniq(
        _.map(filter, function (obj) {
          return JSON.stringify(obj);
        })
      ), function (obj) {
        return JSON.parse(obj);
      }
    );

    let childCatalog = await ChildCatalog.findById(product._idChildCategory);


    //добавляем в каталог ранее не используемые под фильтры
    commonProduct.addNewSubFilterToCategory(filter, childCatalog);
    await childCatalog.save();

    product.itemNo = itemNo;


    let newProduct = new Product(product);
    await newProduct.save();


    res.status(200).json(newProduct);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.addModelForProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }
    let model = _.cloneDeepWith(req.body, (value => {
      if (_.isString(value) || _.isBoolean(value) || _.isArray(value)) {
        return value;
      }
    }));

    const product = await Product.findById(model._idProduct);

    if (!product) {
      return res.status(400).json({
        message: `Product with id ${model._idProduct} is not found`
      })
    }

    let filter = model.filters;

    filter = _.map(
      _.uniq(
        _.map(filter, function (obj) {
          return JSON.stringify(obj);
        })
      ), function (obj) {
        return JSON.parse(obj);
      }
    );

    //добавляем в каталог ранее не используемые под фильтры
    let childCatalog = await ChildCatalog.findById(product._idChildCategory);
    commonProduct.addNewSubFilterToCategory(filter, childCatalog);
    await childCatalog.save();


    model = _.omit(model, '_idProduct');
    model.modelNo = rand();

    product.model.push(model);
    await product.save();
    res.status(200).json(product)
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const {_idProduct, warning, htmlPage, isBigImg, enabled, filters, description, nameProduct, _idChildCategory} = req.body;
    let {model} = req.body;

    const product = await Product.findById(_idProduct);

    if (!product) {
      res.status(400).json({
        message: "Product not found"
      })
    }

    const folder = `final-project/products/catalog-${_idChildCategory}/${encodeURI(product.itemNo)}`;
    let {productUrlImg, filterImg} = req.files;


    if (_.isArray(productUrlImg) && productUrlImg.length > 0) {
      let urlProductOnCloudinary = await customCloudinaryInstrument.uploadArrayImgToCloudinary(productUrlImg, folder);
      urlProductOnCloudinary.forEach(element => {
        _.set(req.body, element.field, element.url);
      })
    }

    if (_.isArray(filterImg) && filterImg.length > 0) {
      for (let i = 0; i < filterImg.length; i++) {
        if (_.isArray(filterImg[i].urlImg) && filterImg[i].urlImg.length > 0) {
          let urlProductOnCloudinary = await customCloudinaryInstrument.uploadArrayImgToCloudinary(filterImg[i].urlImg, folder);
          urlProductOnCloudinary.forEach(element => {
            if (element.field) {
              _.set(req.body, element.field, element.url);
            }
          })
        }
      }
    }
    let oldImgProduct = [];
    if (_.isArray(req.body.productUrlImg) && req.body.productUrlImg.length > 0) {
      oldImgProduct = product.productUrlImg.filter(commonProduct.comparerImg(req.body.productUrlImg));


      product.filterImg.forEach(oldElement => {
        req.body.filterImg.forEach(newElement => {
          if (oldElement._idSubFilters.toString() === newElement._idSubFilters.toString()) {
            oldImgProduct.push(...oldElement.urlImg.filter(commonProduct.comparerImg(newElement.urlImg)))
          }
        });
      });


      //удаляем старые фотки, которые не используем
      if (_.isArray(oldImgProduct) && oldImgProduct.length > 0) {
        await customCloudinaryInstrument.removeImgFromCloudinaryUseArray(oldImgProduct);
      }
    }


    if (_.isArray(filters) || _.isArray(model)) {

      let newFilter = _.isArray(filters) ? filters : [];

      if (_.isArray(model)) {

        model.forEach(element => {
          newFilter = _.concat(newFilter, element.filters);
        });
      }

      newFilter = _.map(
        _.uniq(
          _.map(newFilter, function (obj) {
            return JSON.stringify(obj);
          })
        ), function (obj) {
          return JSON.parse(obj);
        }
      );


      let oldFilter = product.filters;

      product.model.forEach(element => {
        oldFilter = _.concat(oldFilter, element.filters);
      });

      oldFilter = oldFilter.map(element => {
        const {filter, subFilter} = element;
        return {filter, subFilter};
      });

      let onlyNewFilter = newFilter.filter(commonProduct.comparer(oldFilter));

      let onlyOldFilter = oldFilter.filter(commonProduct.comparer(newFilter));

      let childCatalog = await ChildCatalog.findById(product._idChildCategory);

      //добавляем в каталог ранее не используемые под фильтры
      commonProduct.addNewSubFilterToCategory(onlyNewFilter, childCatalog);

      if (_.isArray) {
        model = model.map(element => {
          if (!element.modelNo) {
            element.modelNo = (rand()).toString();
          }
          return element;
        });
      }


      product.model = _.isArray(model) ? model : product.model;
      product.filters = _.isArray(filters) ? filters : product.filters;

      await product.save();
      await childCatalog.save();

      //контроль не используемых подфильтров в категории при удалении
      await commonProduct.removeSubFilterFromChildCategoryCheckProduct(onlyOldFilter, product._idChildCategory);
    }


    product.enabled = _.isBoolean(enabled) ? enabled : product.enabled;
    product.description = _.isString(description) ? description : product.description;
    product.nameProduct = _.isString(nameProduct) ? nameProduct : product.nameProduct;
    product.htmlPage = _.isString(htmlPage) ? htmlPage : product.htmlPage;
    product._idChildCategory = _.isString(_idChildCategory) ? _idChildCategory : product._idChildCategory;
    product.warning = _.isArray(warning) ? warning : product.warning;
    product.productUrlImg = _.isArray(req.body.productUrlImg) ? req.body.productUrlImg : product.productUrlImg;
    product.filterImg = _.isArray(req.body.filterImg) ? req.body.filterImg : product.filterImg;
    product.isBigImg = _.isBoolean(isBigImg) ? isBigImg : product.isBigImg;


    await product.save();
    res.status(200).json(product);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.updateModelForProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const {_idProduct, modelNo, filters, modelUrlImg, enabled, quantity, currentPrice, previousPrice} = req.body;


    let product = await Product.findById(_idProduct);

    let indexModel = -1;
    product.model.forEach((element, index) => {
      if (element.modelNo === modelNo) {
        indexModel = index;
      }
    });

    if (indexModel < 0) {
      res.status(400).json({
        message: "Product or model not found"
      })
    }

    if (_.isArray(filters)) {
      let oldFilter = product.model[indexModel].filters;

      product.model.forEach(element => {
        oldFilter = _.concat(oldFilter, element.filters);
      });

      oldFilter = oldFilter.map(element => {
        const {filter, subFilter} = element;
        return {filter, subFilter};
      });

      let onlyNewFilter = filters.filter(commonProduct.comparer(oldFilter));
      let onlyOldFilter = oldFilter.filter(commonProduct.comparer(filters));


      let childCatalog = await ChildCatalog.findById(product._idChildCategory);

      //добавляем в каталог ранее не используемые под фильтры
      commonProduct.addNewSubFilterToCategory(onlyNewFilter, childCatalog);

      product.model[indexModel].filters = _.isArray(filters) ? filters : product.model[indexModel].filters;

      await product.save();
      await childCatalog.save();
      //контроль не используемых подфильтров в категории при удалении
      await commonProduct.removeSubFilterFromChildCategoryCheckProduct(onlyOldFilter, product._idChildCategory);
    }

    product.model[indexModel].modelUrlImg = _.isArray(modelUrlImg) ? modelUrlImg : product.model[indexModel].modelUrlImg;
    product.model[indexModel].enabled = _.isBoolean(enabled) ? enabled : product.model[indexModel].enabled;
    product.model[indexModel].quantity = _.isNumber(quantity) ? quantity : product.model[indexModel].quantity;
    product.model[indexModel].currentPrice = _.isNumber(currentPrice) ? currentPrice : product.model[indexModel].currentPrice;
    product.model[indexModel].previousPrice = _.isNumber(previousPrice) ? currentPrice : product.model[indexModel].previousPrice;

    await product.save();
    res.status(200).json(product);
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const {id} = req.params;
    let product = await Product.findById(id);

    if (!product) {
      return res.status(400).json({
        message: `Product with id ${id} is not found`
      })
    }


    let filter = product.filters;
    product.model.forEach(element => {
      filter = _.concat(filter, element.filters);
    });

    filter = filter.map(element => {
      const {filter, subFilter} = element;
      return {filter, subFilter};
    });

    filter = _.map(
      _.uniq(
        _.map(filter, function (obj) {
          return JSON.stringify(obj);
        })
      ), function (obj) {
        return JSON.parse(obj);
      }
    );


    //контроль не используемых подфильтров в категории
    await commonProduct.removeSubFilterFromChildCategoryCheckProduct(filter, product._idChildCategory);


    //удаляем фотки товара
    await customCloudinaryInstrument.removeImgFromCloudinaryUseArray(product.productUrlImg);


    for (let i = 0; i < product.filterImg.length; i++) {
      await customCloudinaryInstrument.removeImgFromCloudinaryUseArray(product.filterImg[i].urlImg);
    }

    await product.delete();
    res.status(200).json({msg: 'Product deleted'})
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
};

exports.deleteModelProduct = async (req, res) => {
  try {
    const {id, modelno} = req.params;
    let product = await Product.findById(id);

    if (!product) {
      return res.status(400).json({
        message: `Product's model with id ${id} is not found`
      })
    }

    let filter = [];
    product.model.forEach((element, index) => {
      if (element.modelNo === modelno) {
        filter = product.model[index].filters;
        product.model.splice(index, index + 1)
      }
    });

    filter = filter.map(element => {
      const {filter, subFilter} = element;
      return {filter, subFilter};
    });

    filter = _.map(
      _.uniq(
        _.map(filter, function (obj) {
          return JSON.stringify(obj);
        })
      ), function (obj) {
        return JSON.parse(obj);
      }
    );


    //контроль не используемых подфильтров в категории
    await commonProduct.removeSubFilterFromChildCategoryCheckProduct(filter, product._idChildCategory);

    await product.save();
    res.status(200).json({msg: 'Product\'s model deleted'})
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    let products = await Product.find()
      .populate({
        path: '_idChildCategory',
        select: '-filters',
        populate: {
          path: 'parentId'
        }
      })
      .populate({
        path: 'filters.filter',
        select: 'enabled _id type serviceName'
      })
      .populate({
        path: 'filters.subFilter',
      })
      .populate({
        path: 'model.filters.filter',
        select: 'enabled _id type serviceName'
      })
      .populate({
        path: 'model.filters.subFilter',
      });
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const {id} = req.params;
    let product = await Product.findById(id)
      .populate({
        path: '_idChildCategory',
        select: '-filters',
        populate: {
          path: 'parentId'
        }
      })
      .populate({
        path: 'filters.filter',
        select: 'enabled _id type serviceName'
      })
      .populate({
        path: 'filters.subFilter',
      })
      .populate({
        path: 'model.filters.filter',
        select: 'enabled _id type serviceName'
      })
      .populate({
        path: 'model.filters.subFilter',
      });


    if (!product) {
      return res.status(400).json({
        message: `Product with id ${id} is not found`
      })
    }

    res.status(200).json(product);
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.searchProductsHeader = async (req, res, next) => {
  try {
    const {searchheader} = req.params;
    const products = await Product.find({"nameProduct": {$regex: decodeURI(searchheader)}})
      .limit(5)
      .populate({
        path: '_idChildCategory',
        select: '-filters',
        populate: {
          path: 'parentId'
        }
      })
      .populate({
        path: 'filters.filter',
        select: 'enabled _id type serviceName'
      })
      .populate({
        path: 'filters.subFilter',
      })
      .populate({
        path: 'model.filters.filter',
        select: 'enabled _id type serviceName'
      })
      .populate({
        path: 'model.filters.subFilter',
      });
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    });
  }
};

exports.searchProducts = async (req, res, next) => {
  try {
    const {search} = req.params;
    const products = await Product.find({"nameProduct": {$regex: decodeURI(search)}})
      .populate({
        path: '_idChildCategory',
        select: '-filters',
        populate: {
          path: 'parentId'
        }
      })
      .populate({
        path: 'filters.filter',
        select: 'enabled _id type serviceName'
      })
      .populate({
        path: 'filters.subFilter',
      })
      .populate({
        path: 'model.filters.filter',
        select: 'enabled _id type serviceName'
      })
      .populate({
        path: 'model.filters.subFilter',
      });
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    });
  }
};

exports.getProductsFilterParams = async (req, res, next) => {
  try {
    let {subfilters} = req.body;

    subfilters = subfilters.map(element => {
      return mongoose.Types.ObjectId(element);
    });

    const Products = await Product.find({
      $and: [
        {
          "filters.subFilter": {$in: subfilters}
        },
        {
          "model.filters.subFilter": {$in: subfilters}
        }
      ]
    })
      .populate({
        path: '_idChildCategory',
        select: '-filters',
        populate: {
          path: 'parentId'
        }
      })
      .populate({
        path: 'filters.filter',
        select: 'enabled _id type serviceName'
      })
      .populate({
        path: 'filters.subFilter',
      })
      .populate({
        path: 'model.filters.filter',
        select: 'enabled _id type serviceName'
      })
      .populate({
        path: 'model.filters.subFilter',
      });

    res.status(200).json(Products);
  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    });
  }
};

exports.activateOrDeactivateProduct = async (req, res) => {
  try {
    const {_idProduct, status} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    if (!mongoose.Types.ObjectId.isValid(_idProduct)) {
      return res.status(400).json({
        message: `ID is not valid ${_idProduct}`
      })
    }

    let product = await Product.findById(_idProduct);

    if (!product) {
      return res.status(400).json({
        message: `Filter with id ${product} is not found`
      })
    }

    product.enabled = status;

    product = await product.save();

    res.status(200).json(product);


  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.activateOrDeactivateProductModel = async (req, res) => {
  try {
    const {_idProduct, status, modelNo} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    if (!mongoose.Types.ObjectId.isValid(_idProduct)) {
      return res.status(400).json({
        message: `ID is not valid ${_idProduct}`
      })
    }

    let product = await Product.findById(_idProduct);

    if (!product) {
      return res.status(400).json({
        message: `Filter with id ${product} is not found`
      })
    }

    product.model.forEach((element, index) => {
      if (element.modelNo === modelNo) {
        product.model[index].enabled = status;
      }
    });

    product = await product.save();

    res.status(200).json(product);


  } catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};
