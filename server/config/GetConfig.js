const mongoose = require('mongoose');
let ConfigSchema = require('../models/Config');
let ConfigDataBAse = require('../config/ConfigDataBase');

module.exports = (nameConfigFile) => {
  return new Promise((resolve, reject) => {

    ConfigSchema.findOne({customId: nameConfigFile}).then(config => {
      if (!config) {
        throw (`${nameConfigFile} configuration not found`);
      }

      if (process.env.NODE_ENV) {
        process.env.domen = config.production.domen.domenServer;
        process.env.domen_client = config.production.domen.domenClient;
        process.env.urlDataBase = config.production.database.uri;
        process.env.nodemailer_service = config.production.nodemailer.service;
        process.env.nodemailer_email = config.production.nodemailer.email;
        process.env.nodemailer_password = config.production.nodemailer.password;
        process.env.JWT_SECRET = config.production.auth.JWT_SECRET;
        process.env.JWT_EMAIL_SECRET = config.production.auth.JWT_EMAIL_SECRET;
        process.env.JWT_FORGOT_PASSWORD = config.production.auth.JWT_FORGOT_PASSWORD;
        process.env.usersIdSecret = config.production.auth.usersIdSecret;
        process.env.orderIdSecret = config.production.auth.orderIdSecret;
        process.env.google_clientID = config.production.auth.oauth.google.clientID;
        process.env.google_clientSecret = config.production.auth.oauth.google.clientSecret;
        process.env.facebook_clientID = config.production.auth.oauth.facebook.clientID;
        process.env.facebook_clientSecret = config.production.auth.oauth.facebook.clientSecret;
        process.env.github_clientID = config.production.auth.oauth.github.clientID;
        process.env.github_clientSecret = config.production.auth.oauth.github.clientSecret;
        process.env.infinitScrollEnabled = config.production.infinitScrollEnabled;
        process.env.minOrderValue = config.production.minOrderValue;
        process.env.someCustomParam = config.production.someCustomParam;


        resolve(config.production);
      } else {
        process.env.domen = config.development.domen.domenServer;
        process.env.domen_client = config.development.domen.domenClient;
        process.env.urlDataBase = config.development.database.uri;
        process.env.nodemailer_service = config.development.nodemailer.service;
        process.env.nodemailer_email = config.development.nodemailer.email;
        process.env.nodemailer_password = config.development.nodemailer.password;
        process.env.JWT_SECRET = config.development.auth.JWT_SECRET;
        process.env.JWT_EMAIL_SECRET = config.development.auth.JWT_EMAIL_SECRET;
        process.env.JWT_FORGOT_PASSWORD = config.production.auth.JWT_FORGOT_PASSWORD;
        process.env.usersIdSecret = config.development.auth.usersIdSecret;
        process.env.orderIdSecret = config.development.auth.orderIdSecret;
        process.env.google_clientID = config.development.auth.oauth.google.clientID;
        process.env.google_clientSecret = config.development.auth.oauth.google.clientSecret;
        process.env.facebook_clientID = config.development.auth.oauth.facebook.clientID;
        process.env.facebook_clientSecret = config.development.auth.oauth.facebook.clientSecret;
        process.env.github_clientID = config.development.auth.oauth.github.clientID;
        process.env.github_clientSecret = config.development.auth.oauth.github.clientSecret;
        process.env.infinitScrollEnabled = config.development.infinitScrollEnabled;
        process.env.minOrderValue = config.development.minOrderValue;
        process.env.someCustomParam = config.development.someCustomParam;
        resolve(config.development);
      }


    }).catch(error => {
        throw (error);
    })
  });
};
