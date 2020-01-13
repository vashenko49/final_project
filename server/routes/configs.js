const express = require("express");
const router = express.Router();
const passport = require("passport");
const {check} = require('express-validator');

//Import controllers
const {
  addConfig,
  updateConfig,
  deleteConfig,
  getConfigs,
  getConfigById,
  useSpecifiedConfiguration,
  getConfigForClient
} = require("../controllers/Configs");

// @route   GET /configs/use/:customId
// @desc    use specified configuration
// @access  Private
router.get(
  "/use",
    passport.authenticate("jwt-admin", {session: false}),
  useSpecifiedConfiguration
);

// @route   POST /configs
// @desc    Create new config
// @access  Private
router.post(
  "/", [
    passport.authenticate("jwt-admin", {session: false}),
    check('customId', 'Name configuration is require')
      .not()
      .isEmpty(),
    check('development.domen.domenServer', 'Develop domain server is require')
      .not()
      .isEmpty(),
    check('development.domen.domenClient', 'Develop domain client is require')
      .not()
      .isEmpty(),
    check('development.database.uri', 'Develop uri data base is require')
      .not()
      .isEmpty(),
    check('development.nodemailer.email', 'Develop nodemailer email is require')
      .not()
      .isEmpty(),
    check('development.nodemailer.password', 'Develop nodemailer password is require')
      .not()
      .isEmpty(),
    check('development.nodemailer.service', "Develop nodemailer servise is require")
      .not()
      .isEmpty(),
    check('development.cloudinary.cloudName', 'Develop cloudinary cloudName is require')
      .not()
      .isEmpty(),
    check('development.cloudinary.apiKey', 'Develop cloudinary apiKey is require')
      .not()
      .isEmpty(),
    check('development.cloudinary.apiSecret', 'Develop cloudinary apiSecret is require')
      .not()
      .isEmpty(),
    check('development.auth.JWT_SECRET', 'Develop JWT_SECRET is require')
      .not()
      .isEmpty(),
    check('development.auth.JWT_EMAIL_SECRET', 'Develop JWT_EMAIL_SECRET is require')
      .not()
      .isEmpty(),
    check('development.auth.JWT_FORGOT_PASSWORD', 'Develop JWT_FORGOT_PASSWORD is require')
      .not()
      .isEmpty(),
    check('development.auth.usersIdSecret', 'Develop usersIdSecret is require')
      .not()
      .isEmpty(),
    check('development.auth.orderIdSecret', 'Develop orderIdSecret is require')
      .not()
      .isEmpty(),
    check('development.auth.oauth.google.clientID', 'Develop google clientID is require')
      .not()
      .isEmpty(),
    check('development.auth.oauth.google.clientSecret', 'Develop google clientSecret is require')
      .not()
      .isEmpty(),
    check('development.auth.oauth.facebook.clientID', 'Develop facebook clientID is require')
      .not()
      .isEmpty(),
    check('development.auth.oauth.facebook.clientSecret', 'Develop facebook clientSecret is require')
      .not()
      .isEmpty(),
    check('development.auth.oauth.github.clientID', 'Develop github clientID is require')
      .not()
      .isEmpty(),
    check('development.auth.oauth.github.clientSecret', 'Develop github clientSecret is require')
      .not()
      .isEmpty(),
    check('production.domen.domenServer', 'Production domain server is require')
      .not()
      .isEmpty(),
    check('production.domen.domenClient', 'Production domain client is require')
      .not()
      .isEmpty(),
    check('production.database.uri', 'Production uri data base is require')
      .not()
      .isEmpty(),
    check('production.nodemailer.email', 'Production nodemailer email is require')
      .not()
      .isEmpty(),
    check('production.nodemailer.password', 'Production nodemailer password is require')
      .not()
      .isEmpty(),
    check('production.nodemailer.service', "Production nodemailer servise is require")
      .not()
      .isEmpty(),
    check('production.cloudinary.cloudName', 'Production cloudinary cloudName is require')
      .not()
      .isEmpty(),
    check('production.cloudinary.apiKey', 'Production cloudinary apiKey is require')
      .not()
      .isEmpty(),
    check('production.cloudinary.apiSecret', 'Production cloudinary apiSecret is require')
      .not()
      .isEmpty(),
    check('production.auth.JWT_SECRET', 'Production JWT_SECRET is require')
      .not()
      .isEmpty(),
    check('production.auth.JWT_EMAIL_SECRET', 'Production JWT_EMAIL_SECRET is require')
      .not()
      .isEmpty(),
    check('production.auth.JWT_FORGOT_PASSWORD', 'Production JWT_FORGOT_PASSWORD is require')
      .not()
      .isEmpty(),
    check('production.auth.usersIdSecret', 'Production usersIdSecret is require')
      .not()
      .isEmpty(),
    check('production.auth.orderIdSecret', 'Production orderIdSecret is require')
      .not()
      .isEmpty(),
    check('production.auth.oauth.google.clientID', 'Production google clientID is require')
      .not()
      .isEmpty(),
    check('production.auth.oauth.google.clientSecret', 'Production google clientSecret is require')
      .not()
      .isEmpty(),
    check('production.auth.oauth.facebook.clientID', 'Production facebook clientID is require')
      .not()
      .isEmpty(),
    check('production.auth.oauth.facebook.clientSecret', 'Production facebook clientSecret is require')
      .not()
      .isEmpty(),
    check('production.auth.oauth.github.clientID', 'Production github clientID is require')
      .not()
      .isEmpty(),
    check('production.auth.oauth.github.clientSecret', 'Production github clientSecret is require')
      .not()
      .isEmpty(),
  ],
  passport.authenticate("jwt-admin", {session: false}),
  addConfig
);

// @route   PUT /configs/:customId
// @desc    Update existing config
// @access  Private
router.put(
  "/",[
  passport.authenticate("jwt-admin", {session: false}),
  check('_id', '_id configuration is require')
    .not()
    .isEmpty(),
  ],
  updateConfig
);

// @route   DELETE /configs/:customId
// @desc    DELETE existing config
// @access  Private
router.delete(
  "/:customId",
  passport.authenticate("jwt-admin", {session: false}),
  deleteConfig
);

// @route   GET /configs
// @desc    GET existing configs
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt-admin", {session: false}),
  getConfigs
);

// @route   GET /configs/:customId
// @desc    GET existing configs
// @access  Private
router.get(
  "/:customId",
  passport.authenticate("jwt-admin", {session: false}),
  getConfigById
);


// @route   GET /configs/client
// @desc    GET existing configs
// @access  public
router.get(
  "/use/client",
  getConfigForClient
);



module.exports = router;
