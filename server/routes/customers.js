const express = require("express");
const router = express.Router();
const passport = require("passport");
const {check} = require('express-validator');

//Import controllers
const {
  createCustomer,
  loginCustomer,
  getCustomer,
  editCustomerInfo,
  updatePassword,
  createCustomerSocialNetwork,
  confirmCustomer,
  forgotPassword,
  updatePasswordAfterConfirm,
  confirmForgotCustomer,
  checkLoginOrEmail
} = require("../controllers/customers");

// @route   POST /customer
// @desc    Register customer
// @access  Public
router.post(
  "/",
  [
    check('firstName','firstName is require')
      .not()
      .isEmpty(),
    check('lastName','lastName is require')
      .not()
      .isEmpty(),
    check('login','login is require')
      .not()
      .isEmpty(),
    check('email','email is require')
      .not()
      .isEmpty(),
    check('password','password is require')
      .not()
      .isEmpty(),
    check('gender','gender is require')
      .not()
      .isEmpty(),
  ],
  createCustomer);


// @route   POST /customer/confirm
// @desc    confirm Customer
// @access  Public
router.get('/confirm/:emailtoken', confirmCustomer);


// @route   POST /customer/check
// @desc    confirm Customer
// @access  Public
router.post('/check', checkLoginOrEmail);

// @route   POST /customer/login
// @desc    Login Customer / Returning JWT Token
// @access  Public
router.post("/login",
  [
    check('email','email is require')
      .not()
      .isEmpty(),
    check('password','password is require')
      .not()
      .isEmpty(),
  ],
  loginCustomer);

// @route   POST /customer/google
// @desc    Login Customer or SignUp / Returning JWT Token
// @access  Public
router.post("/google",
  passport.authenticate('google-local', {session: false}),
  createCustomerSocialNetwork
);


// @route   POST /customer/facebook
// @desc    Login Customer or SignUp / Returning JWT Token
// @access  Private
router.post("/facebook",
  passport.authenticate('facebook-local', {session: false}),
  createCustomerSocialNetwork
);

// @route   POST /customer/github
// @desc    Login Customer or signUp / Returning JWT Token
// @access  Private
router.post("/github",
  passport.authenticate('github-local', {session: false}),
  createCustomerSocialNetwork
);

// @route   GET /customer
// @desc    Return current customer
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", {session: false}),
  getCustomer
);

// @route   PUT /customer
// @desc    Edit current customer
// @access  Private
router.put(
  "/",
  passport.authenticate("jwt", {session: false}),
  editCustomerInfo
);

// @route   POST /customer/password
// @desc    Обновить пароль
// @access  Private
router.put(
  "/password",
  passport.authenticate("jwt", {session: false}),
  updatePassword
);

// @route   POST /customer/forgotpassword
// @desc    Отослать клиенту письмо на изменение пароля
// @access  Private
router.post(
  "/forgotpassword",
  forgotPassword
);

// @route   GET /customer/forgotpassword
// @desc    Обработать токен для изменения пароля та перенаправить с ним на страцицу изменения пароля
// @access  Private
router.get(
  "/forgotpassword/:token",
  confirmForgotCustomer
);

// @route   PUT /customer/forgotpassword
// @desc    Замена пароля
// @access  Private
router.put(
  "/forgotpassword",
  passport.authenticate("jwt-email", {session: false}),
  updatePasswordAfterConfirm
);


module.exports = router;
