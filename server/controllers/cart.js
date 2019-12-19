const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const _ = require("lodash");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const commonCart = require("../common/commonCart");

exports.updateCart = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { idCustomer, products } = req.body;
    if (!mongoose.Types.ObjectId.isValid(idCustomer)) {
      return res.status(400).json({
        message: `ID Customer is not valid ${idCustomer}`
      });
    }


    const customer = await Customer.findById(idCustomer);
    if (!customer) {
      return res.status(400).json({
        message: "Customer not found"
      });
    }

    for (let i = 0; i < products.length; i++) {
      const { idProduct, modelNo } = products[i];
      if (!mongoose.Types.ObjectId.isValid(idProduct)) {
        return res.status(400).json({
          message: `idProduct is not valid ${idProduct}`
        });
      }
      const isModel = await Product.findOne({
        $and: [{ _id: idProduct }, { "model.modelNo": modelNo }]
      });

      if (!isModel) {
        return res.status(400).json({
          message: `modelNo is not valid ${idProduct}`
        });
      }
    }

    let isCart = await Cart.findOne({ customerId: idCustomer });
    if (!isCart) {
      await new Cart({
        customerId: idCustomer,
        products: products
      }).save();
    } else {
      isCart.products = products;
      await isCart.save();
    }

    let cart = await commonCart.getCart(idCustomer);
    cart = commonCart.getModelByModelNo(cart);
    res.status(200).json(cart);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    });
  }
};

exports.updateProductFromCart = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { idCustomer, idProduct, modelNo, quantity } = req.body;
    if (!mongoose.Types.ObjectId.isValid(idCustomer)) {
      return res.status(400).json({
        message: `ID Customer is not valid ${idCustomer}`
      });
    }

    const customer = await Customer.findById(idCustomer);
    if (!customer) {
      return res.status(400).json({
        message: "Customer not found"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(idProduct)) {
      return res.status(400).json({
        message: `idProduct is not valid ${idProduct}`
      });
    }

    const isModel = await Product.findOne({
      $and: [{ _id: idProduct }, { "model.modelNo": modelNo }]
    });

    if (!isModel) {
      res.status(400).json({
        message: `product id ${idProduct} with model ${modelNo} is not model`
      });
    }

    let isCart = await Cart.findOne({ customerId: idCustomer });

    if (!isCart && quantity > 0) {
      //коризны нету и добавляем товар
      isCart = new Cart({
        customerId: idCustomer,
        products: [
          {
            idProduct: idProduct,
            modelNo: modelNo,
            quantity: quantity
          }
        ]
      });
    } else {
      let indexProd = _.findIndex(isCart.products, function(o) {
        //documentation recommend use ==
        return o.idProduct == idProduct && o.modelNo == modelNo;
      });

      if (quantity <= 0) {
        //если товар пришел с количеством 0 удалить с корзины этот товар
        if (indexProd >= 0) {
          _.pullAt(isCart.products, [indexProd]);
        }
      } else {
        if (indexProd >= 0) {
          isCart.products[indexProd].quantity = quantity;
        } else {
          isCart.products.push({
            idProduct: idProduct,
            modelNo: modelNo,
            quantity: quantity
          });
        }
      }
    }



    isCart = await Cart.findOneAndUpdate({"customerId": idCustomer}, {$set: {products: isCart.products}}, {new: true});

    isCart = await isCart.save();

    let cart = await commonCart.getCart(isCart.customerId);
    cart = commonCart.getModelByModelNo(cart);

    res.status(200).json(cart);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: `Server error ${e.message}`
    });
  }
};

exports.cleanCart = async (req, res) => {
  try {
    const { idCustomer } = req.params;

    if (!mongoose.Types.ObjectId.isValid(idCustomer)) {
      return res.status(400).json({
        message: `ID Customer is not valid ${idCustomer}`
      });
    }

    const customer = await Customer.findById(idCustomer);
    if (!customer) {
      return res.status(400).json({
        message: "Customer not found"
      });
    }

    let cart = await Cart.findOne({ customerId: idCustomer });
    if (!cart) {
      return res.status(400).json({
        message: "Cart not found"
      });
    }

    cart.products = [];
    await cart.save();

    res.status(200).json({
      message: `Cart successfully emptied`,
      cart: cart
    });
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { idCustomer } = req.params;

    if (!mongoose.Types.ObjectId.isValid(idCustomer)) {
      return res.status(400).json({
        message: `ID Customer is not valid ${idCustomer}`
      });
    }

    const customer = await Customer.findById(idCustomer);
    if (!customer) {
      return res.status(400).json({
        message: "Customer not found"
      });
    }

    let cart = await commonCart.getCart(idCustomer);

    if (!cart) {
      cart = await new Cart({
        customerId: idCustomer,
        products: []
      }).save();
    }

    cart = commonCart.getModelByModelNo(cart);

    res.status(200).json(cart);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    });
  }
};
