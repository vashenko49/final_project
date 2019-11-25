const Pages = require("../models/Pages");

const queryCreator = require("../common/queryCreator");
const _ = require("lodash");

const { validationResult } = require('express-validator');

exports.addPage = async (req, res, next) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const pageFields = _.cloneDeep(req.body);

  const updatedPage = queryCreator(pageFields);

  try {

    const newPage = new Pages(updatedPage);

    const page = await newPage.save();

    res.status(200).json(page);

  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    });
  }
};

exports.updatePage = async (req, res, next) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {

    let page = await Pages.findOne({ _id: req.params.id })

    if (!page) {
      return res.status(500).json({
        message: `Page with id "${req.params.id}" is not found.`
      });
    }

    const pageFields = _.cloneDeep(req.body);

    const updatedPage = queryCreator(pageFields);

    page = await Pages.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updatedPage },
      { new: true }
    )
    res.status(200).json({ isUpdated: true })
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
};

exports.deletePage = async (req, res, next) => {
  try {
    await Pages.findOneAndRemove({ _id: req.params.id })

    res.status(200).json({ isDeleted: true })
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
};

exports.getPageByCustomId = async (req, res, next) => {
  try {
    const page = await Pages.findOne({ customId: req.params.customId })

    if (!page) {
      return res.status(400).json({ msg: `Page with customId ${req.params.id} not found` })
    }

    res.status(200).json(page)
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
};
