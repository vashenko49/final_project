const PaymentMethod = require("../models/PaymentMethod");
const _ = require("lodash");
const {validationResult} = require('express-validator');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');

exports.addPaymentMethod = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const {imageUrl} = req.files;
    const data = _.cloneDeep(req.body);
    const folder = 'final-project/paymentmethods';

    if (imageUrl && _.isObject(imageUrl)) {
      data.imageUrl = (await cloudinary.uploader.upload(imageUrl.path, {folder: folder})).public_id;
    }


    let paymentMethod = new PaymentMethod(data);
    paymentMethod = await paymentMethod.save();
    res.status(200).json(paymentMethod);

  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.updatePaymentMethod = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }
    const {imageUrl} = req.files;
    const data = _.cloneDeep(req.body);
    const folder = 'final-project/paymentmethods';

    const {idPaymentMethod} = data;
    if (!mongoose.Types.ObjectId.isValid(idPaymentMethod)) {
      return res.status(400).json({
        message: `ID is not valid ${idPaymentMethod}`
      })
    }

    const isPaymentMethod = await PaymentMethod.findById(idPaymentMethod);
    if (!isPaymentMethod) {
      return res.status(400).json({
        message: `Payment Method with an id "${idPaymentMethod}" is not found.`
      });
    }

    if (isPaymentMethod.imageUrl) {
      await cloudinary.uploader.destroy(isPaymentMethod.imageUrl);
    }

    if (imageUrl && _.isObject(imageUrl)) {
      data.imageUrl = (await cloudinary.uploader.upload(imageUrl.path, {folder: folder})).public_id;
    }


    let paymentMethod = await PaymentMethod.findByIdAndUpdate(idPaymentMethod, {$set: data}, {new: true});
    paymentMethod = await paymentMethod.save();
    res.status(200).json(paymentMethod);

  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.activateOrDeactivatePaymentMethod = async (req, res) => {
  try {
    const {idPaymentMethod, status} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    if (!mongoose.Types.ObjectId.isValid(idPaymentMethod)) {
      return res.status(400).json({
        message: `ID is not valid ${idPaymentMethod}`
      })
    }

    let paymentMethod = await PaymentMethod.findById(idPaymentMethod);

    if (!paymentMethod) {
      return res.status(400).json({
        message: `PaymentMethod with id ${paymentMethod} is not found`
      })
    }

    paymentMethod.enabled = status;

    paymentMethod = await paymentMethod.save();

    res.status(200).json(paymentMethod);

  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.deletePaymentMethod = async (req, res) => {
  try {
    const {idPaymentMethod} = req.params;
    if (!mongoose.Types.ObjectId.isValid(idPaymentMethod)) {
      return res.status(400).json({
        message: `ID is not valid ${idPaymentMethod}`
      })
    }
    const paymentMethod = await PaymentMethod.findById(idPaymentMethod);
    if (!paymentMethod) {
      return res.status(400).json({
        message: `Payment Method with an id "${idPaymentMethod}" is not found.`
      });
    }

    if (paymentMethod.imageUrl) {
      await cloudinary.uploader.destroy(paymentMethod.imageUrl);
    }

    const info = await paymentMethod.delete();

    res.status(200).json({
      message: `Payment Method with an id "${idPaymentMethod}" is successfully deleted from DB.`,
      deletedPaymentMethodInfo: info
    })
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.getPaymentMethods = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethod.find({});
    res.status(200).json(paymentMethod);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};
exports.getActivePaymentMethods = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethod.find({enabled: true}).sort({'default': -1});
    ;
    res.status(200).json(paymentMethod);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.getPaymentMethodById = async (req, res) => {
  try {
    const {idPaymentMethod} = req.params;
    if (!mongoose.Types.ObjectId.isValid(idPaymentMethod)) {
      return res.status(400).json({
        message: `ID is not valid ${idPaymentMethod}`
      })
    }
    const paymentMethod = await PaymentMethod.findById(idPaymentMethod);
    if (!paymentMethod) {
      return res.status(400).json({
        message: `Payment Method with an id "${idPaymentMethod}" is not found.`
      });
    }
    res.status(200).json(paymentMethod);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};
