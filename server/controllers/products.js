const Product = require("../models/Product");
const _ = require('lodash');

const {validationResult} = require('express-validator');

exports.addProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    let product = _.cloneDeepWith(req.body, (value => {
      if (_.isString(value) || _.isBoolean(value) || _.isArray(value)) {
        return value;
      }
    }));


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

    model = _.omit(model, '_idProduct');

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

    const {_idProduct, enabled,model, description, productUrlImg, nameProduct, _idChildCategory} = req.body;

    const product = await Product.findById(_idProduct);

    product.enabled = _.isBoolean(enabled) ? enabled : product.enabled;
    product.description = description ? description : product.description;
    product.productUrlImg = _.isArray(productUrlImg) ? productUrlImg : product.productUrlImg;
    product.nameProduct = _.isString(nameProduct) ? nameProduct : product.nameProduct;
    product._idChildCategory = _.isString(_idChildCategory) ? _idChildCategory : product._idChildCategory;
    product.model = _.isArray(model)?model:product.model;


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

    const {_idProduct, modelNo, filter, modelUrlImg, enabled, quantity, currentPrice, previousPrice} = req.body;


    let product = await Product.findById(_idProduct);

    product.model.forEach((element, index) => {
      if (element.modelNo === modelNo) {
        product.model[index].filter = _.isArray(filter) ? filter : product.model[index].filter;
        product.model[index].modelUrlImg = _.isArray(modelUrlImg) ? modelUrlImg : product.model[index].modelUrlImg;
        product.model[index].enabled = _.isBoolean(enabled) ? enabled : product.enabled;
        product.model[index].quantity = _.isNumber(quantity) ? quantity : product.model[index].quantity;
        product.model[index].currentPrice = _.isNumber(currentPrice) ? currentPrice : product.model[index].currentPrice;
        product.model[index].previousPrice = _.isNumber(previousPrice) ? currentPrice : product.model[index].previousPrice;

      }
    });

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

    if(!product){
      return res.status(400).json({
        message: `Product with id ${id} is not found`
      })
    }
    await product.delete();
    res.status(200).json({msg: 'Product deleted'})
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
};

exports.deleteModelProduct = async  (req, res)=>{
  try {
    const {id, modelno} = req.params;
    let product = await Product.findById(id);

    if(!product){
      return res.status(400).json({
        message: `Product's model with id ${id} is not found`
      })
    }

    product.model.forEach((element, index)=>{
      if(element.modelNo===modelno){
        product.model.splice(index, index+1)
      }
    });
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
    let products = await Product.find();
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
    let product = await Product.findById(id);
    if(!product){
      return res.status(400).json({
        message: `Product with id ${id} is not found`
      })
    }

    res.status(200).json(product);
  }catch (e) {
    res.status(500).json({
      message: 'Server Error!'
    })
  }
};

exports.getProductsFilterParams = async (req, res, next) => {

};

exports.searchProducts = async (req, res, next) => {

};
