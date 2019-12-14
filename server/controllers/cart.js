const Cart = require("../models/Cart");
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const _ = require("lodash");
const {validationResult} = require('express-validator');
const mongoose = require('mongoose');


exports.updateCart = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const {idCustomer, products} = req.body;
    if (!mongoose.Types.ObjectId.isValid(idCustomer)) {
      return res.status(400).json({
        message: `ID Customer is not valid ${idCustomer}`
      })
    }


    const customer = await Customer.findById(idCustomer);
    if (!customer) {
      return res.status(400).json({
        message: "Customer not found"
      })
    }

    for (let i = 0; i < products.length; i++) {
      const {idProduct, modelNo} = products[i];
      if (!mongoose.Types.ObjectId.isValid(idProduct)) {
        return res.status(400).json({
          message: `idProduct is not valid ${idProduct}`
        })
      }
      const isModel = await Product.findOne({
        $and: [
          {"_id": idProduct},
          {"model.modelNo": modelNo}
        ]
      });

      if (!isModel) {
        return res.status(400).json({
          message: `modelNo is not valid ${idProduct}`
        })
      }
    }


    let isCart = await Cart.findOne({"customerId": idCustomer});
    if (!isCart) {
      isCart = await (new Cart({
        customerId: idCustomer,
        products: products
      })).save();
    } else {
      isCart.products = products;
      isCart = await isCart.save();
    }

    res.status(200).json(isCart);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.updateProductFromCart = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const {idCustomer, idProduct, modelNo, quantity} = req.body;

    if (!mongoose.Types.ObjectId.isValid(idCustomer)) {
      return res.status(400).json({
        message: `ID Customer is not valid ${idCustomer}`
      })
    }

    const customer = await Customer.findById(idCustomer);
    if (!customer) {
      return res.status(400).json({
        message: "Customer not found"
      })
    }

    if (!mongoose.Types.ObjectId.isValid(idProduct)) {
      return res.status(400).json({
        message: `idProduct is not valid ${idProduct}`
      })
    }

    const isModel = await Product.findOne({
      $and: [
        {"_id": idProduct},
        {"model.modelNo": modelNo}
      ]
    });

    if (!isModel) {
      res.status(400).json({
        message: `product id ${idProduct} with model ${modelNo} is not model`
      })
    }

    let isCart = await Cart.findOne({"customerId": idCustomer});

    if (!isCart) {
      isCart = await (new Cart({
        customerId: idCustomer,
        products: [{
          idProduct: idProduct,
          modelNo: modelNo,
          quantity: quantity
        }]
      })).save();
    } else {
      let indexProd = _.findIndex(isCart.products,function (o) {
        //documentation recommend use ==
        return (o.idProduct == idProduct && o.modelNo == modelNo)
      });


      if(indexProd=>0){
        isCart.products[indexProd].quantity= quantity;
      }else {
        isCart.products.push({
          idProduct: idProduct,
          modelNo: modelNo,
          quantity: quantity
        })
      }
      isCart = await isCart.save();
    }

    res.status(200).json(isCart);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};


exports.cleanCart = async (req, res) => {
  try {
    const {idCustomer} = req.params;

    if (!mongoose.Types.ObjectId.isValid(idCustomer)) {
      return res.status(400).json({
        message: `ID Customer is not valid ${idCustomer}`
      })
    }

    const customer = await Customer.findById(idCustomer);
    if (!customer) {
      return res.status(400).json({
        message: "Customer not found"
      })
    }


    let cart = await Cart.findOne({"customerId": idCustomer});
    if (!cart) {
      return res.status(400).json({
        message: "Cart not found"
      })
    }

    cart.products = [];
    await cart.save();

    res.status(200).json({
      message: `Cart successfully emptied`,
      cart:cart
    })

  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.getCart = async (req, res) => {
  try {
    const {idCustomer} = req.params;

    if (!mongoose.Types.ObjectId.isValid(idCustomer)) {
      return res.status(400).json({
        message: `ID Customer is not valid ${idCustomer}`
      })
    }

    const customer = await Customer.findById(idCustomer);
    if (!customer) {
      return res.status(400).json({
        message: "Customer not found"
      })
    }


    let cart  = JSON.parse(JSON.stringify(await Cart.findOne({"customerId": idCustomer})
      .populate('customerId')
      .populate('products.idProduct')));
    if (!cart) {
      return res.status(400).json({
        message: "Cart not found"
      })
    }

    if(!cart){
      cart = await (new Cart({
        customerId: idCustomer,
        products:[]
      })).save();
    }


    cart.products.forEach(((element, indexProd)=>{
      let index = _.findIndex(element.idProduct.model,function (o) {
        return o.modelNo == element.modelNo;
      });
     cart.products[indexProd].modelNo = _.clone(cart.products[indexProd].idProduct.model[index]);
    }));

    res.status(200).json(cart);

  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};
