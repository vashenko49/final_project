const ShippingMethod = require("../models/ShippingMethod");
const _ = require("lodash");
const {validationResult} = require('express-validator');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');

exports.addShippingMethod = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const {imageUrl} = req.files;
    const data = _.cloneDeep(req.body);
    const folder = 'final-project/shippingmethods';

    if (imageUrl && _.isObject(imageUrl)) {
      data.imageUrl = (await cloudinary.uploader.upload(imageUrl.path, {folder: folder})).public_id;
    }

    let shippingMethod = new ShippingMethod(data);
    shippingMethod = await shippingMethod.save();
    res.status(200).json(shippingMethod);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.updateShippingMethod = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }
    const {imageUrl} = req.files;
    const data = _.cloneDeep(req.body);
    const folder = 'final-project/shippingmethods';

    const {idShippingMethod} = data;
    if (!mongoose.Types.ObjectId.isValid(idShippingMethod)) {
      return res.status(400).json({
        message: `ID is not valid ${idShippingMethod}`
      })
    }

    const isShippingMethod = await ShippingMethod.findById(idShippingMethod);
    if (!isShippingMethod) {
      return res.status(400).json({
        message: `Shipping Method with an id "${idShippingMethod}" is not found.`
      });
    }

    if (imageUrl && _.isObject(imageUrl)) {
      data.imageUrl = (await cloudinary.uploader.upload(imageUrl.path, {folder: folder})).public_id;
    }


    let shippingMethod = await ShippingMethod.findByIdAndUpdate(idShippingMethod, {$set: data}, {new: true});
    shippingMethod = await shippingMethod.save();
    res.status(200).json(shippingMethod);

  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.activateOrDeactivateShippingMethod = async (req, res) => {
  try {
    const {idShippingMethod, status} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    if (!mongoose.Types.ObjectId.isValid(idShippingMethod)) {
      return res.status(400).json({
        message: `ID is not valid ${idShippingMethod}`
      })
    }

    let shippingMethod = await ShippingMethod.findById(idShippingMethod);

    if (!shippingMethod) {
      return res.status(400).json({
        message: `ShippingMethod with id ${shippingMethod} is not found`
      })
    }

    shippingMethod.enabled = status;

    shippingMethod = await shippingMethod.save();

    res.status(200).json(shippingMethod);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.deleteShippingMethod = async (req, res) => {
  try {
    const {idShippingMethod} = req.params;
    if (!mongoose.Types.ObjectId.isValid(idShippingMethod)) {
      return res.status(400).json({
        message: `ID is not valid ${idShippingMethod}`
      })
    }
    const shippingMethod = await ShippingMethod.findById(idShippingMethod);
    if (!shippingMethod) {
      return res.status(400).json({
        message: `Shipping Method with an id "${idShippingMethod}" is not found.`
      });
    }
    const info = await shippingMethod.delete();

    res.status(200).json({
      message: `Shipping Method with an id "${idShippingMethod}" is successfully deleted from DB.`,
      deletedShippingMethodInfo: info
    })
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.getShippingMethods = async (req, res) => {
  try {
    const shippingMethods = await ShippingMethod.find({})
      .populate('address');
    res.status(200).json(shippingMethods);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};
exports.getActiveShippingMethods = async (req, res) => {
  try {
    const shippingMethods = await ShippingMethod.find({enabled: true})
      .populate('address');
    res.status(200).json(shippingMethods);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.getShippingMethodById = async (req, res) => {
  try {
    const {idShippingMethod} = req.params;
    if (!mongoose.Types.ObjectId.isValid(idShippingMethod)) {
      return res.status(400).json({
        message: `ID is not valid ${idShippingMethod}`
      })
    }
    const shippingMethod = await ShippingMethod.findById(idShippingMethod)
      .populate('address');
    if (!shippingMethod) {
      return res.status(400).json({
        message: `Shipping Method with an id "${idShippingMethod}" is not found.`
      });
    }
    res.status(200).json(shippingMethod);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};
