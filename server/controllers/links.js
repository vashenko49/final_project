const Links = require("../models/Links");

const _ = require("lodash");

const { validationResult } = require('express-validator');

exports.addLink = async (req, res, next) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const linkFields = _.cloneDeep(req.body);

  try {

    const newLink = new Links(linkFields);

    const link = await newLink.save();

    res.status(200).json(link);

  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    });
  }
};

exports.updateLink = async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {

    let link = await Links.findOne({ _id: req.params.id })

    if (!link) {
      return res.status(500).json({
        message: `Link list with id "${req.params.id}" is not found.`
      });
    }

    const linkFields = _.cloneDeep(req.body);

    link = await Links.findOneAndUpdate(
      { _id: req.params.id },
      { $set: linkFields },
      { new: true }
    )

    res.status(200).json({ isUpdated: true })
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
};

exports.deleteLinksGroup = async (req, res, next) => {
  try {
    await Links.findOneAndRemove({ _id: req.params.id }) //don`t know about params.id

    res.status(200).json({ isDeleted: true })
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
};

exports.deleteLink = async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {

    let link = await Links.findOne({ _id: req.params.id })

    if (!link) {
      return res.status(500).json({
        message: `Link list with id "${req.params.id}" is not found.`
      });
    }

    const { _id } = req.body;

    await link.links.id(_id).remove();

    await link.save((err) => {
      if (err) return err;
    })

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

exports.getLinkByCustomId = async (req, res, next) => {
  try {
    const { _id } = req.query;

    const links = await Links.findOne({ _id: _id });

    const content = links.links.find(elem => elem.customId === req.params.customId);

    if (!links) {
      return res.status(400).json({ msg: `Content of link with customId - ${req.params.customId} not found!` })
    }

    res.status(200).json(content.htmlContent)
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
};
