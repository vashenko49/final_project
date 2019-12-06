const Links = require("../models/Links");

const _ = require("lodash");

const { validationResult } = require('express-validator');

exports.addLink = async (req, res, next) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const linkFields = _.cloneDeep(req.body);

  const updatedLink = queryCreator(linkFields);

  try {

    const newLink = new Links(updatedLink);

    const link = await newLink.save();

    res.status(200).json(link);

  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    });
  }
};

exports.updateLink = async (req, res, next) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {

    let link = await Links.findOne({ _id: req.params.id })

    if (!link) {
      return res.status(500).json({
        message: `Link with id "${req.params.id}" is not found.`
      });
    }

    const linkFields = _.cloneDeep(req.body);

    const updatedLink = queryCreator(linkFields);

    link = await Links.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updatedLink },
      { new: true }
    )
    res.status(200).json({ isUpdated: true })
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
};

exports.deleteLink = async (req, res, next) => {
  try {
    await Links.findOneAndRemove({ _id: req.params.id }) //don`t know about params.id

    res.status(200).json({ isDeleted: true })
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
};

exports.getLinks = async (req, res, next) => {
  try {
    const links = await Links.find();

    res.status(200).json(links)
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
};

exports.getLinkById = async (req, res, next) => {
  try {
    const link = await Links.findOne({ _id: req.params.id })

    if (!link) {
      return res.status(400).json({ msg: `Link with id ${req.params.id} not found` })
    }

    res.status(200).json(link)
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
};
