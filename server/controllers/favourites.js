const Favourites = require("../models/Favourites");
const Product = require('../models/Product');
const _ = require("lodash");
const mongoose = require('mongoose');

exports.addToFavourites = async (req, res) => {
  try {
    const {_id: idCustomer} = req.user;
    const {idProduct} = req.params;

    if (!mongoose.Types.ObjectId.isValid(idProduct)) {
      return res.status(400).json({
        message: `idProduct is not valid ${idProduct}`
      });
    }

    const isProduct = await Product.findById(idProduct);

    if (!isProduct) {
      return res.status(400).json({
        message: `Product ${idProduct} not found`
      });
    }


    let favoriteList = await Favourites.findOne({idCustomer: idCustomer});

    if (!favoriteList) {
      favoriteList = await (new Favourites({
        idCustomer: idCustomer,
        idProduct: [idProduct]
      })).save()
    } else {
      const isInList = _.findIndex(favoriteList.idProduct, function (o) {
        return o.toString() === idProduct;
      });

      if (isInList < 0) {
        favoriteList.idProduct.push(idProduct);
        favoriteList = await favoriteList.save();
      } else {
        return res.status(400).json({
          message: `Product ${idProduct} exist in list`
        });
      }
    }

    res.status(200).json(favoriteList);

  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.getFavourites = async (req, res) => {
  try {
    const {_id: idCustomer} = req.user;
    let favoriteList = await Favourites.findOne({idCustomer: idCustomer})
      .populate({
        path:'idProduct',
        populate: [
          {
            path: "_idChildCategory",
            select: "-filters",
            populate: {
              path: "parentId"
            }
          },
          {
            path: "filters.filter",
            select: "enabled _id type serviceName"
          },
          {
            path: "filters.subFilter"
          },
          {
            path: "model.filters.filter",
            select: "enabled _id type serviceName"
          }, {
            path: "model.filters.subFilter"
          }, {
            path: "filterImg._idFilter",
            select: "enabled _id type serviceName"
          },
          {
            path: "filterImg._idSubFilters",
          }
        ]
      });



    res.status(200).json(favoriteList);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.productIsFavourites = async (req, res) => {
  try {
    const {_id: idCustomer} = req.user;
    const {idProduct} = req.params;
    const isProduct = await Product.findById(idProduct);

    if (!mongoose.Types.ObjectId.isValid(idProduct)) {
      return res.status(400).json({
        message: `idProduct is not valid ${idProduct}`
      });
    }

    if (!isProduct) {
      return res.status(400).json({
        message: `Product ${idProduct} not found`
      });
    }

    let favoriteList = await Favourites.findOne({idCustomer: idCustomer});
    const isInList = _.findIndex(favoriteList.idProduct, function (o) {
      return o.toString() === idProduct;
    });

    let response = false;

    if(isInList>=0){
      response =true
    }

    res.status(200).json({
      status:response
    })
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.removeFromFavourites = async (req, res) => {
  try {
    const {_id: idCustomer} = req.user;
    const {idProduct} = req.params;

    const isProduct = await Product.findById(idProduct);

    if (!mongoose.Types.ObjectId.isValid(idProduct)) {
      return res.status(400).json({
        message: `idProduct is not valid ${idProduct}`
      });
    }

    if (!isProduct) {
      return res.status(400).json({
        message: `Product ${idProduct} not found`
      });
    }

    let favoriteList = await Favourites.findOne({idCustomer: idCustomer});
    const isInList = _.findIndex(favoriteList.idProduct, function (o) {
      return o.toString() === idProduct;
    });

    if(isInList<0){
      return res.status(400).json({
        message: `Product ${idProduct} is not exist`
      });
    }else {
      favoriteList.idProduct.splice(isInList,1);
      favoriteList = await favoriteList.save();
    }

    res.status(200).json(favoriteList);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};
