const Cart = require("../models/Cart");
const _ = require("lodash");

exports.getCart = async (idCustomer) => {
  let cart = JSON.parse(JSON.stringify(await Cart.findOne({"customerId": idCustomer})
    .populate('customerId')
    .populate({
      path: 'products.idProduct',
      populate: [
        {
          path: 'filters.filter',
          select: '_id enabled type serviceName'
        },
        {
          path: 'filters.subFilter'
        },
        {
          path: 'model.filters.filter',
          select: '_id enabled type serviceName'
        },
        {
          path: 'model.filters.subFilter'
        }
      ]
    })));


  return cart;
};

exports.getModelByModelNo = (cart)=>{
  cart.products.forEach(((element, indexProd) => {
    let index = _.findIndex(element.idProduct.model, function (o) {
      return o.modelNo == element.modelNo;
    });
    cart.products[indexProd].modelNo = _.clone(cart.products[indexProd].idProduct.model[index]);
  }));

  return cart;
};
