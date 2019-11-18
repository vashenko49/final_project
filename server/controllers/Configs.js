let ConfigSchema = require('../models/Config');
const connectDB = require('../config/db');
const getConfig = require('../config/GetConfig');

exports.addConfig = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .json({message: `Get me data`});
  }


  ConfigSchema.findOne({ customId: req.body.customId }).then(config => {
    if (config) {
      return res.status(400).json({
        message: `Config with customId "${config.customId}" already exists`
      });
    } else {
      const newConfig = new ConfigSchema(req.body);
      newConfig
        .save()
        .then(config => res.status(200).json(config))
        .catch(err =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `
          })
        );
    }
  });

};



exports.useSpecifiedConfiguration = (req, res, next) => {
  ConfigSchema.findOne({ customId: req.params.customId })
    .then(config => {
      if(!config){
        res.status(400).json({
          message: `not found this configuration`
        })
      }
      getConfig(req.params.customId)
        .then(() => {
          console.log(process.env.urlDataBase);
          connectDB(process.env.urlDataBase);
          res.status(200).json({
            message: `Success`
          })
        }).catch(err=>{
        res.status(400).json({
          message: `Error happened on server: "${err}" `
        })
      });

    }).catch(err => {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    })
  });
};

exports.updateConfig = (req, res, next) => {
  ConfigSchema.findOne({ customId: req.params.customId })
    .then(config => {
      if (!config) {
        return res.status(400).json({
          message: `Config with customId "${req.params.customId}" is not found.`
        });
      } else {

        ConfigSchema.findOneAndUpdate(
          { customId: req.params.customId },
          { $set: req.body },
          { new: true }
        )
          .then(config => res.json(config))
          .catch(err =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `
            })
          );
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.deleteConfig = (req, res, next) => {
  ConfigSchema.findOne({ customId: req.params.customId }).then(async config => {
    if (!config) {
      return res.status(400).json({
        message: `Config with customId "${req.params.customId}" is not found.`
      });
    } else {
      const configToDelete = await ConfigSchema.findOne({
        customId: req.params.customId
      });

      ConfigSchema.deleteOne({ customId: req.params.customId })
        .then(deletedCount =>
          res.status(200).json({
            message: `Config witn name "${configToDelete.customId}" is successfully deleted from DB `
          })
        )
        .catch(err =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `
          })
        );
    }
  });
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
  ConfigSchema.findOne({ customId: req.params.customId })
    .then(configs => res.status(200).json(configs))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};
