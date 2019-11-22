const Cart = require("../models/Cart")
const Product = require("../models/Product")
const Customer = require("../models/Customer")

const { validationResult } = require("express-validator");

exports.getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ customerId: req.body.id }).populate({
            path: 'products',
            // populate: {
            //     path: 'product'
            // }
        }).exec((err, cart) => res.status(200).json(cart))
    } catch (err) {

    }
}

exports.updateCart = async (req, res, next) => {

    try {
        const customer = await Customer.findOne({ _id: req.body.id });
        const product = await Product.findOne({ _id: req.body.productId });
        let cart = await Cart.findOne({ customerId: req.body.id });

        // if(!customer){ //customer validation with passport?

        // }

        if (!product) {
            return res.status(404).json({ msg: `Product with _id ${req.params.productId} was not found.` })
        }

        if (!cart) {
            cart = new Cart();
            cart.customerId = customer._id;
        }

        if (cart.products.includes(req.body.productId)) {
            return res.status(409).json({ msg: `Product with _id ${req.body.product} already exist!` })
        }

        cart.products.push({ product, cartQuantity: req.body.quantity });

        await cart.save();
        res.status(200).json({ cart })

    } catch (err) {

    }
}