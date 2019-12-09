const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Customer = require("../models/Customer");

const { validationResult } = require("express-validator");

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ customerId: req.params.id }).populate("products.product");

    res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ msg: `Error happened on server: "${err}"` });
  }
};

exports.updateCart = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const customer = await Customer.findOne({ _id: req.params.id });
    const product = await Product.findOne({ _id: req.body.productId });
    let cart = await Cart.findOne({ customerId: req.params.id });

    if (!customer) {
      return res.status(404).json({ msg: `Customer with _id ${req.params.id} was not found.` });
    }

    if (!product) {
      return res
        .status(404)
        .json({ msg: `Product with _id ${req.params.productId} was not found.` });
    }

    if (!cart) {
      cart = new Cart();
      cart.customerId = customer._id;
    }

    const foundProduct = cart.products.map(e => e.product._id.toString());

    const productExist = foundProduct.indexOf(req.body.productId);

    if (productExist >= 0) {
      return res.status(409).json({ msg: `Product with _id ${req.body.productId} already exist!` });
    }

    cart.products.push({ product, cartQuantity: req.body.quantity });

    await cart.save();
    res.status(200).json({ cart });
  } catch (err) {
    return res.status(500).json({ msg: `Error happened on server: "${err}"` });
  }
};

exports.updateQuantity = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const customer = await Customer.findOne({ _id: req.body.id });
    const product = await Product.findOne({ _id: req.body.productId });
    let cart = await Cart.findOne({ customerId: req.body.id });

    if (!customer) {
      return res.status(404).json({ msg: `Customer with _id ${req.body.id} was not found.` });
    }

    if (!product) {
      return res
        .status(404)
        .json({ msg: `Product with _id ${req.params.productId} was not found.` });
    }

    const foundProduct = cart.products.map(v => v.product._id.toString());

    const updatedIndex = foundProduct.indexOf(req.body.productId);

    let updatedCart = cart.products[updatedIndex];

    updatedCart.cartQuantity = req.body.quantity;

    await cart.save();
    res.status(200).json({ cart });
  } catch (err) {
    return res.status(500).json({ msg: `Error happened on server: "${err}"` });
  }
};

exports.deleteProductFromCart = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const customer = await Customer.findOne({ _id: req.body.id });
    const product = await Product.findOne({ _id: req.body.productId });
    let cart = await Cart.findOne({ customerId: req.body.id });

    if (!customer) {
      return res.status(404).json({ msg: `Customer with _id ${req.body.id} was not found.` });
    }

    if (!product) {
      return res
        .status(404)
        .json({ msg: `Product with _id ${req.params.productId} was not found.` });
    }

    if (!cart) {
      cart = new Cart();
      cart.customerId = customer._id;
    }

    const foundProduct = cart.products.map(v => v.product._id.toString());
    console.log(foundProduct);
    const removeIndex = foundProduct.indexOf(req.body.productId);

    cart.products.splice(removeIndex, 1);

    await cart.save();
    res.status(200).json({ cart });
  } catch (error) {
    return res.status(500).json({ msg: `Error happened on server: "${err}"` });
  }
};
