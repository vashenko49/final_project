const DeliveryAddresses = require('../models/DeliveryAddresses');
const _ = require("lodash");
const {validationResult} = require('express-validator');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');

exports.addDeliveryAddress = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }
    const data = _.cloneDeep(req.body);
    let deliveryaddresses = new DeliveryAddresses(data);
    deliveryaddresses = await deliveryaddresses.save();
    res.status(200).json(deliveryaddresses);

  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.addManyDeliveryAddresses = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    let {addresses} = req.body;

    addresses = await Promise.all(addresses.map(async element=>{
      return await (new DeliveryAddresses(element)).save();
    }));

    res.status(200).json(addresses);

  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.updateDeliveryAddresses = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const data = _.cloneDeep(req.body);
    const {idDeliveryAddress} = data;
    if (!mongoose.Types.ObjectId.isValid(idDeliveryAddress)) {
      return res.status(400).json({
        message: `ID is not valid ${idDeliveryAddress}`
      })
    }

    const isDeliveryAddresses = await DeliveryAddresses.findById(idDeliveryAddress);
    if (!isDeliveryAddresses) {
      return res.status(400).json({
        message: `Delivery Addresses with an id "${idDeliveryAddress}" is not found.`
      });
    }


    let deliveryAddresses = await DeliveryAddresses.findByIdAndUpdate(idDeliveryAddress, {$set: data}, {new: true});
    deliveryAddresses = await deliveryAddresses.save();
    res.status(200).json(deliveryAddresses);

  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.activateOrDeactivateDeliveryAddresses = async (req, res) => {
  try {
    const {idDeliveryAddress, status} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    if (!mongoose.Types.ObjectId.isValid(idDeliveryAddress)) {
      return res.status(400).json({
        message: `ID is not valid ${idDeliveryAddress}`
      })
    }

    let deliveryAddresses = await DeliveryAddresses.findById(idDeliveryAddress);

    if (!deliveryAddresses) {
      return res.status(400).json({
        message: `DeliveryAddresses with id ${deliveryAddresses} is not found`
      })
    }

    deliveryAddresses.enabled = status;

    deliveryAddresses = await deliveryAddresses.save();

    res.status(200).json(deliveryAddresses);

  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.deleteDeliveryAddress =  async (req, res) => {
  try {
    const {idDeliveryAddress} = req.params;
    if (!mongoose.Types.ObjectId.isValid(idDeliveryAddress)) {
      return res.status(400).json({
        message: `ID is not valid ${idDeliveryAddress}`
      })
    }
    const deliveryAddress = await DeliveryAddresses.findById(idDeliveryAddress);
    if (!deliveryAddress) {
      return res.status(400).json({
        message: `DeliveryAddresses with an id "${idDeliveryAddress}" is not found.`
      });
    }
    const info = await deliveryAddress.delete();

    res.status(200).json({
      message: `DeliveryAddresses with an id "${idDeliveryAddress}" is successfully deleted from DB.`,
      deletedDeliveryAddressesInfo: info
    })
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.getDeliveryAddresses = async (req, res) => {
  try {
    const deliveryAddress = await DeliveryAddresses.find({});
    res.status(200).json(deliveryAddress);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};
exports.getActiveDeliveryAddresses = async (req, res) => {
  try {
    const deliveryAddress = await DeliveryAddresses.find({enabled: true});
    res.status(200).json(deliveryAddress);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.getDeliveryAddressById = async (req, res) => {
  try {
    const {idDeliveryAddress} = req.params;
    if (!mongoose.Types.ObjectId.isValid(idDeliveryAddress)) {
      return res.status(400).json({
        message: `ID is not valid ${idDeliveryAddress}`
      })
    }
    const deliveryAddresses = await DeliveryAddresses.findById(idDeliveryAddress);
    if (!deliveryAddresses) {
      return res.status(400).json({
        message: `Delivery Addresses with an id "${idDeliveryAddress}" is not found.`
      });
    }
    res.status(200).json(deliveryAddresses);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};
