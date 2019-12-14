const Cart = require("../models/Cart");
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Orders = require("../models/Order");
const _ = require("lodash");
const {validationResult} = require('express-validator');
const mongoose = require('mongoose');


exports.placeOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const {idCustomer, delivery, email, mobile} = req.body;
    if (!mongoose.Types.ObjectId.isValid(idCustomer)) {
      return res.status(400).json({
        message: `ID Customer is not valid ${idCustomer}`
      })
    }

    let response = {
      delivery: delivery,
      email: email,
      mobile: mobile,
      canceled: false,
      products: []
    };


    const customer = await Customer.findById(idCustomer);
    if (!customer) {
      return res.status(400).json({
        message: "Customer not found"
      })
    }

    if (_.isString(idCustomer)) {
      response.idCustomer = idCustomer;
    }

    let cart = JSON.parse(JSON.stringify(await Cart.findOne({"customerId": idCustomer})
      .populate('customerId')
      .populate('products.idProduct')));

    if (!cart) {
      return res.status(400).json({
        message: "Cart not found"
      })
    }

    cart.products.forEach(((element, indexProd) => {
      let index = _.findIndex(element.idProduct.model, function (o) {
        return o.modelNo == element.modelNo;
      });
      cart.products[indexProd].modelNo = _.clone(cart.products[indexProd].idProduct.model[index]);
    }));

    cart.products.forEach(element => {
      response.products.push({
        productId: element.idProduct._id,
        modelNo: element.modelNo.modelNo,
        currentPrice: element.modelNo.currentPrice,
        quantity: element.quantity
      })
    });
    response.totalSum = _.sumBy(response.products, function (o) {
      return o.currentPrice * o.quantity;
    });
    response = await (new Orders(response)).save();
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.updateOrder = async (req, res) => {
  try {
    let {idOrder, products} = req.body;
    if (!mongoose.Types.ObjectId.isValid(idOrder)) {
      return res.status(400).json({
        message: `ID Order is not valid ${idOrder}`
      })
    }

    const data = _.cloneDeep(req.body);

    const isOrder = JSON.parse(JSON.stringify(await Orders.findById(idOrder)
      .populate('products.productId')));

    if (!isOrder) {
      return res.status(400).json({
        message: "Orders not found"
      })
    }


    if (_.isArray(products) && !_.isEqual(isOrder.products, products) && products.length > 0) {
      data.products = await Promise.all(products.map(async element => {

        const prod = await Product.findById(element.idProduct);
        let index = _.findIndex(prod.model, function (o) {
          return o.modelNo == element.modelNo;
        });

        return {
          productId: element.idProduct,
          modelNo: element.modelNo,
          currentPrice: prod.model[index].currentPrice,
          quantity: element.quantity
        }
      }));
    }

    data.totalSum = _.sumBy(data.products, function (o) {
      return o.currentPrice * o.quantity;
    });

    let order = await Orders.findByIdAndUpdate(idOrder, {$set: data}, {new: true});
    order = await order.save();
    res.status(200).json(order);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.cancelOrder = async (req, res) => {
  try {

  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};
exports.deleteOrder = async (req, res) => {
  try {

  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.getOrders = async (req, res) => {
  try {

  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.getOrder = async (req, res) => {
  try {

  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};
