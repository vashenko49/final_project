const Product = require("../models/Product");

const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999999);

const queryCreator = require("../common/queryCreator");
const _ = require("lodash");

// *TODO*
exports.addImages = (req, res, next) => {

};

exports.addProduct = async (req, res, next) => {
  const productFields = _.cloneDeep(req.body);

  productFields.itemNo = rand();

  productFields.name = productFields.name
      .toLowerCase()
      .trim()
      .replace(/\s\s+/g, " "); //replace few whitespace


  const updatedProduct = queryCreator(productFields);
  try {

    const newProduct = new Product(updatedProduct);

    const product = await newProduct.save()

    res.json(product)

  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {

    let product = await Product.findOne({ _id: req.params.id })

    if (!product) {
          return res.status(500).json({
            message: `Product with id "${req.params.id}" is not found.`
          });
      }

    const productFields = _.cloneDeep(req.body);

    productFields.name = productFields.name
          .toLowerCase()
          .trim()
          .replace(/\s\s+/g, " ");

    const updatedProduct = queryCreator(productFields);

    product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updatedProduct },
      { new: true }
    )
    res.json(product)
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
};

exports.deleteProduct = async (req, res, next) => {
    try {
      await Product.findOneAndRemove({ _id: req.params.id }) //don`t know about params.id

      res.json({ })
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
};

exports.getProducts = async (req, res, next) => {
  try{
    const product = await Product.find();

    res.status(200).json(product)
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
};

exports.getProductById = (req, res, next) => {

};

exports.getProductsFilterParams = async (req, res, next) => {

};

exports.searchProducts = async (req, res, next) => {

};
