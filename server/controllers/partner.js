const Partner = require("../models/Partner");
const _ = require("lodash");
const {validationResult} = require('express-validator');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');

exports.addPartner = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const {imageUrl} = req.files;
    const data = _.cloneDeep(req.body);
    const folder = 'final-project/partner';

    if (imageUrl && _.isObject(imageUrl)) {
      data.imageUrl = (await cloudinary.uploader.upload(imageUrl.path, {folder: folder})).public_id;
    }


    let partner = new Partner(data);
    partner = await partner.save();
    res.status(200).json(partner);

  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.updatePartner = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }
    const {imageUrl} = req.files;
    const data = _.cloneDeep(req.body);
    const folder = 'final-project/partner';

    const {idPartner} = data;
    if (!mongoose.Types.ObjectId.isValid(idPartner)) {
      return res.status(400).json({
        message: `ID is not valid ${idPartner}`
      })
    }

    const isPartner = await Partner.findById(idPartner);
    if (!isPartner) {
      return res.status(400).json({
        message: `Partner with an id "${idPartner}" is not found.`
      });
    }

    if(isPartner.imageUrl){
      await cloudinary.uploader.destroy(isPartner.imageUrl);
    }

    if (imageUrl && _.isObject(imageUrl)) {
      data.imageUrl = (await cloudinary.uploader.upload(imageUrl.path, {folder: folder})).public_id;
    }

    let partner = await Partner.findByIdAndUpdate(idPartner, {$set: data}, {new: true});
    partner = await partner.save();
    res.status(200).json(partner);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.activateOrDeactivatePartner = async (req, res) => {
  try {
    const {idPartner, status} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    if (!mongoose.Types.ObjectId.isValid(idPartner)) {
      return res.status(400).json({
        message: `ID is not valid ${idPartner}`
      })
    }

    let partner = await Partner.findById(idPartner);

    if (!partner) {
      return res.status(400).json({
        message: `PaymentMethod with id ${partner} is not found`
      })
    }

    partner.enabled = status;

    partner = await partner.save();

    res.status(200).json(partner);

  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.deletePartner = async (req, res) => {
  try {
    const {idPartner} = req.params;
    if (!mongoose.Types.ObjectId.isValid(idPartner)) {
      return res.status(400).json({
        message: `ID is not valid ${idPartner}`
      })
    }
    const partner = await Partner.findById(idPartner);
    if (!partner) {
      return res.status(400).json({
        message: `Partner with an id "${idPartner}" is not found.`
      });
    }

    if(partner.imageUrl){
      await cloudinary.uploader.destroy(partner.imageUrl);
    }

    const info = await partner.delete();

    res.status(200).json({
      message: `Partner with an id "${idPartner}" is successfully deleted from DB.`,
      deletedPartnerInfo: info
    })
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.getPartners = async (req, res) => {
  try {
    const partner = await Partner.find({});
    res.status(200).json(partner);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.getActivePartners = async (req, res) => {
  try {
    const partner = await Partner.find({enabled: true});
    res.status(200).json(partner);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.getPartnerById = async (req, res) => {
  try {
    const {idPartner} = req.params;
    if (!mongoose.Types.ObjectId.isValid(idPartner)) {
      return res.status(400).json({
        message: `ID is not valid ${idPartner}`
      })
    }

    const partner = await Partner.findById(idPartner);
    if (!partner) {
      return res.status(400).json({
        message: `Partner with an id "${idPartner}" is not found.`
      });
    }
    res.status(200).json(partner);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};
