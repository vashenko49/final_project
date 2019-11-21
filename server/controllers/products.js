const Product = require("../models/Product");

const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999999);

const _ = require("lodash");


exports.addProduct = async (req, res, next) => {

  const productFields = _.cloneDeep(req.body);

  productFields.itemNo = rand();

  productFields.name = productFields.name
    .toLowerCase()
    .trim()
    .replace(/\s\s+/g, " "); //replace few whitespace


  try {

    const newProduct = new Product(productFields);

    const product = await newProduct.save();

    res.status(200).json(product)

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

    product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $set: productFields },
      { new: true }
    );
    res.status(200).json({ isUpdated: true })
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.findOneAndRemove({ _id: req.params.id }) //don`t know about params.id

    res.status(200).json({ isDeleted: true })
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json(products)
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id })

    if (!product) {
      return res.status(400).json({ msg: `Product with id ${req.params.id} not found` })
    }

    res.status(200).json(product)
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
};

exports.getProductsFilterParams = async (req, res, next) => {

};

exports.searchProducts = async (req, res, next) => {

};
