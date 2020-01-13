let ConfigSchema = require('../models/Config');
const connectDB = require('../common/db');
const getConfig = require('../config/GetConfig');
const {validationResult} = require('express-validator');
const _ = require('lodash');


exports.addConfig = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    if (!req.body) {
      return res
        .status(400)
        .json({message: `Get me data`});
    }

    let isConfig = await ConfigSchema.findOne({customId: req.body.customId});
    if (isConfig) {
      return res.status(400).json({
        message: `Config with customId "${config.customId}" already exists`
      });
    }

    if (_.isBoolean(req.body.active) && req.body.active) {
      const alreadyActive = await ConfigSchema.findOne({"active": true});
      alreadyActive.active = false;
      await alreadyActive.save();
    }


    isConfig = new ConfigSchema(req.body);
    isConfig = await isConfig.save();

    res.status(200).json(isConfig);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    });
  }

};

exports.useSpecifiedConfiguration = (req, res, next) => {
  getConfig()
    .then(() => {
      connectDB(process.env.urlDataBase);
      res.status(200).json({
        message: `Success switch`
      })
    }).catch(e => {
    res.status(400).json({
      message: `Server error ${e.message}`
    });
  });
};

exports.updateConfig = async (req, res, next) => {
  try {

    let isConfig = await ConfigSchema.findOne({"_id": req.body._id});
    if (!isConfig) {
      return res.status(400).json({
        message: `Config with customId "${req.body._id}" is not found.`
      });
    }

    if (_.isBoolean(req.body.active) && req.body.active) {
      const alreadyActive = await ConfigSchema.findOne({"active": true});
      alreadyActive.active = false;
      await alreadyActive.save();
    }

    const updatedConfig = await ConfigSchema.findOneAndUpdate(
      {"_id": req.body._id},
      {$set: req.body},
      {new: true}
    );

    res.status(200).json(updatedConfig);
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    });
  }
};

exports.deleteConfig = async (req, res) => {
  try {
    let Config = await ConfigSchema.countDocuments({});
    if (Config <= 1) {
      return res.status(400).json({
        message: `Cloudnt remove last config`
      });
    }

    Config = await ConfigSchema.findOne({"_id": req.params.customId});
    if (!Config) {
      return res.status(400).json({
        message: `Config with Id "${req.params.customId}" is not found.`
      });
    }
    Config = await Config.delete();
    res.status(200).json({
      message: `Config witn name "${Config.customId}" is successfully deleted from DB `
    })
  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    });
  }
};

exports.getConfigs = (req, res, next) => {
  ConfigSchema.find()
    .then(configs => res.status(200).json(configs))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.getConfigById = (req, res, next) => {
  ConfigSchema.findOne({customId: req.params.customId})
    .then(configs => res.status(200).json(configs))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.getConfigForClient = async (req, res) => {
  try {

    const data = {
      cloudinary_cloud_name: process.env.cloudinary_cloud_name,
      google_clientID: process.env.google_clientID,
      facebook_clientID: process.env.facebook_clientID,
      github_clientID: process.env.github_clientID,
    };

    res.status(200).send(data)

  } catch (e) {
    res.status(400).json({
      message: `Server error ${e.message}`
    })
  }
};
