const mongoose = require('mongoose');
let ConfigSchema = require('../models/Config');
let ConfigDataBAse = require('./ConfigDataBase');

module.exports = (nameConfigFile) => {
  return new Promise((resolve, reject) => {

    ConfigSchema.findOne({customId: nameConfigFile}).then(config => {
      if (!config) {
        throw (`${nameConfigFile} configuration not found`);
      }
      let mode = 'development';

      if (process.env.NODE_ENV) {
        mode = 'production';
      }


      process.env.domen = config[`${mode}`].domen.domenServer;
      process.env.domen_client = config[`${mode}`].domen.domenClient;
      process.env.urlDataBase = config[`${mode}`].database.uri;
      process.env.nodemailer_service = config[`${mode}`].nodemailer.service;
      process.env.nodemailer_email = config[`${mode}`].nodemailer.email;
      process.env.nodemailer_password = config[`${mode}`].nodemailer.password;
      process.env.cloudinary_cloud_name = config[`${mode}`].cloudinary.cloudName;
      process.env.cloudinary_apikey = config[`${mode}`].cloudinary.apiKey;
      process.env.cloudinary_apiSecret = config[`${mode}`].cloudinary.apiSecret;
      process.env.JWT_SECRET = config[`${mode}`].auth.JWT_SECRET;
      process.env.JWT_EMAIL_SECRET = config[`${mode}`].auth.JWT_EMAIL_SECRET;
      process.env.JWT_FORGOT_PASSWORD = config[`${mode}`].auth.JWT_FORGOT_PASSWORD;
      process.env.usersIdSecret = config[`${mode}`].auth.usersIdSecret;
      process.env.orderIdSecret = config[`${mode}`].auth.orderIdSecret;
      process.env.google_clientID = config[`${mode}`].auth.oauth.google.clientID;
      process.env.google_clientSecret = config[`${mode}`].auth.oauth.google.clientSecret;
      process.env.facebook_clientID = config[`${mode}`].auth.oauth.facebook.clientID;
      process.env.facebook_clientSecret = config[`${mode}`].auth.oauth.facebook.clientSecret;
      process.env.github_clientID = config[`${mode}`].auth.oauth.github.clientID;
      process.env.github_clientSecret = config[`${mode}`].auth.oauth.github.clientSecret;
      process.env.infinitScrollEnabled = config[`${mode}`].infinitScrollEnabled;
      process.env.minOrderValue = config[`${mode}`].minOrderValue;

      resolve(config[`${mode}`]);
    }).catch(error => {
        throw (error);
    })
  });
};
