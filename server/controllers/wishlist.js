const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

const { validationResult } = require("express-validator");

exports.getWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({ customerId: req.params.id});
    res.status(200).json(wishlist)
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
}

exports.updateWishlist = async (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {

    let wishlist = await Wishlist.findOne({ customerId: req.params.id }) //change
    const product = await Product.findById(req.body.product)

    if(!wishlist){
      wishlist = new Wishlist({ products: req.body.product });
      wishlist.customerId = req.params.id;

    } else {
      if(!product) {
            return res.status(404).json({ msg: `Product with _id ${req.body.product} not found`})
          }

      if(wishlist.products.includes(req.body.product)) {
        return res.status(409).json({ msg: `Product with _id ${req.body.product} already exist!`})
      }

      const initialQuery = req.body.product; //validation???
      
      wishlist.products.push(initialQuery);
    }

    await wishlist.save();
    res.status(200).json(wishlist)    
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }

}

exports.deleteProduct = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const wishlist = await Wishlist.findOne({ customerId: req.params.id}) //change
    
    if(!wishlist){
      return res.status(400).json({
          msg: `Wishlist for this customer is not found.`
        })
      }  
      
    const foundProduct = wishlist.products.map(v => v.toString());
    
    const removeIndex = foundProduct.indexOf(req.body.product);
    
    wishlist.products.splice(removeIndex, 1)

    await wishlist.save();
    res.status(200).json(wishlist)
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
}
