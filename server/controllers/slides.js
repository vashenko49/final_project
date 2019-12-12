const Slider = require("../models/Slider");
const _ = require("lodash");
const {validationResult} = require('express-validator');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');

exports.addSlide = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const {imageUrl} = req.files;
    const data = _.cloneDeep(req.body);
    const folder = 'final-project/slider';

    if (imageUrl && _.isObject(imageUrl)) {
      data.imageUrl = (await cloudinary.uploader.upload(imageUrl.path, {folder: folder})).public_id;
    }
    let slider = new Slider(data);
    slider = await slider.save();
    res.status(200).json(slider);

  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.updateSlide = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }
    const {imageUrl} = req.files;
    const data = _.cloneDeep(req.body);
    const folder = 'final-project/slider';

    const {idSlides} = data;
    if (!mongoose.Types.ObjectId.isValid(idSlides)) {
      return res.status(400).json({
        message: `ID is not valid ${idSlides}`
      })
    }

    const isSlider = await Slider.findById(idSlides);
    if (!isSlider) {
      return res.status(400).json({
        message: `Slider with an id "${idSlides}" is not found.`
      });
    }

    if(isSlider.imageUrl){
      await cloudinary.uploader.destroy(isSlider.imageUrl);
    }

    if (imageUrl && _.isObject(imageUrl)) {
      data.imageUrl = (await cloudinary.uploader.upload(imageUrl.path, {folder: folder})).public_id;
    }

    let slider = await Slider.findByIdAndUpdate(idSlides, {$set: data}, {new: true});
    slider = await slider.save();
    res.status(200).json(slider);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.activateOrDeactivateSlide = async (req, res) => {
  try {
    const {idSlides, status} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    if (!mongoose.Types.ObjectId.isValid(idSlides)) {
      return res.status(400).json({
        message: `ID is not valid ${idSlides}`
      })
    }

    let slider = await Slider.findById(idSlides);

    if (!slider) {
      return res.status(400).json({
        message: `Slider with id ${slider} is not found`
      })
    }

    slider.enabled = status;

    slider = await slider.save();

    res.status(200).json(slider);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.deleteSlide = async (req, res) => {
  try {
    const {idSlides} = req.params;
    if (!mongoose.Types.ObjectId.isValid(idSlides)) {
      return res.status(400).json({
        message: `ID is not valid ${idSlides}`
      })
    }
    const slider = await Slider.findById(idSlides);
    if (!slider) {
      return res.status(400).json({
        message: `Slider with an id "${idSlides}" is not found.`
      });
    }

    if(slider.imageUrl){
      await cloudinary.uploader.destroy(slider.imageUrl);
    }

    const info = await slider.delete();

    res.status(200).json({
      message: `Slider with an id "${idSlides}" is successfully deleted from DB.`,
      deletedSliderInfo: info
    })
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.getSlides = async (req, res) => {
  try {
    const slider = await Slider.find({})
      .populate('product')
      .populate('childCatalogs');

    res.status(200).json(slider);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.getActiveSlides = async (req, res) => {
  try {
    const slider = await Slider.find({enabled: true})
      .populate('product')
      .populate('childCatalogs');

    res.status(200).json(slider);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.getSlideById = async (req, res) => {
  try {
    const {idSlides} = req.params;
    if (!mongoose.Types.ObjectId.isValid(idSlides)) {
      return res.status(400).json({
        message: `ID is not valid ${idSlides}`
      })
    }
    const slider = await Slider.findById(idSlides)
      .populate('product')
      .populate('childCatalogs');

    if (!slider) {
      return res.status(400).json({
        message: `Slider with an id "${idSlides}" is not found.`
      });
    }
    res.status(200).json(slider);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};
