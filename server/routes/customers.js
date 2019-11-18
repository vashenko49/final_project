const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
    createCustomer,
    loginCustomer,
    getCustomer,
    editCustomerInfo,
    updatePassword,
    createCustomerSocialNetwork,
    confirmCustomer
} = require("../controllers/oauth");

// @route   POST /oauth/customer
// @desc    Register customer
// @access  Public
router.post("/customer", createCustomer);


// @route   POST /oauth/confirm
// @desc    confirm Customer
// @access  Public
router.get('/confirm/:emailtoken', confirmCustomer);


// @route   POST /oauth/login
// @desc    Login Customer / Returning JWT Token
// @access  Public
router.post("/login", loginCustomer);

// @route   POST /oauth/google
// @desc    Login Customer or SignUp / Returning JWT Token
// @access  Public
router.post("/google", passport.authenticate('google-local', {session: false}), createCustomerSocialNetwork);


// @route   POST /oauth/facebook
// @desc    Login Customer or SignUp / Returning JWT Token
// @access  Private
router.post("/facebook", passport.authenticate('facebook-local', {session: false}), createCustomerSocialNetwork);

// @route   POST /oauth/github
// @desc    Login Customer or signUp / Returning JWT Token
// @access  Private
router.post("/github", passport.authenticate('github-local', {session: false}), createCustomerSocialNetwork);

// @route   GET oauth/customer
// @desc    Return current customer
// @access  Private
router.get(
    "/customer",
    passport.authenticate("jwt", {session: false}),
    getCustomer
);

// @route   PUT /oauth
// @desc    Edit current customer
// @access  Private
router.put(
    "/",
    passport.authenticate("jwt", {session: false}),
    editCustomerInfo
);

// @route   POST /oauth/password
// @desc    Обновить пароль
// @access  Private
router.put(
    "/password",
    passport.authenticate("jwt", {session: false}),
    updatePassword
);

module.exports = router;
