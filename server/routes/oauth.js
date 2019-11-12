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
    createCustomerGoogle
} = require("../controllers/oauth");

// @route   POST /oauth
// @desc    Register customer
// @access  Public
router.post("/", createCustomer);

// @route   POST /oauth/google
// @desc    Register customer
// @access  Private вызов авторизации происходит внутри контроллера
router.post('/google', createCustomerGoogle);


// @route   POST /oauth/login
// @desc    Login Customer / Returning JWT Token
// @access  Public
router.post("/login", loginCustomer);


// @route   POST /oauth/login/google
// @desc    Login Customer / Returning JWT Token
// @access  Private
router.post("/login/google", passport.authenticate('google-local', {session: false}), loginCustomer);

// @route   GET oauth/customer
// @desc    Return current customer
// @access  Private
router.get(
    "/customer",
    passport.authenticate("jwt", {session: false}),
    getCustomer
);

// @route   PUT /oauth
// @desc    Return current customer
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
