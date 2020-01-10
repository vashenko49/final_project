const express = require("express");
const router = express.Router();
const {check} = require('express-validator');
const passport = require("passport");

//Import controllers
const {
  addDeliveryAddress,
  addManyDeliveryAddresses,
  updateDeliveryAddresses,
  deleteDeliveryAddress,
  getDeliveryAddresses,
  getActiveDeliveryAddresses,
  getDeliveryAddressById,
  activateOrDeactivateDeliveryAddresses
} = require("../controllers/deliveryAddresses");

// @route   POST /deliveryaddresses
// @desc    Create new deliveryAddress
// @access  Private
router.post(
  "/",
  [    passport.authenticate("jwt-admin", {session: false}),
    check('address', 'address is require')
      .not()
      .isEmpty(),
  ],
  addDeliveryAddress
);

// @route   POST /deliveryaddresses
// @desc    Create new deliveryaddresses
// @access  Private
router.post(
  "/many",
  [
    passport.authenticate("jwt-admin", {session: false}),
    check('addresses', 'address is require')
      .isArray(),
    check('addresses.*.address', 'address is require')
      .not()
      .isEmpty()
  ],
  addManyDeliveryAddresses
);

// @route   PUT /pdeliveryaddresses
// @desc    Update existing deliveryaddresses
// @access  Private
router.put(
  "/", [
    passport.authenticate("jwt-admin", {session: false}),
    check('idDeliveryAddress', 'idDeliveryAddress is require')
      .not()
      .isEmpty()
  ],
  updateDeliveryAddresses
);
// @route   PUT /deliveryaddresses
// @desc    activateordeactivate existing deliveryaddresses
// @access  Private
router.put(
  "/activateordeactivate",
  [
    passport.authenticate("jwt-admin", {session: false}),
    check('idDeliveryAddress', 'idDeliveryAddress is require')
      .not()
      .isEmpty(),
    check('status', 'status is require')
      .isBoolean()
  ],
  activateOrDeactivateDeliveryAddresses
);

// @route   DELETE /deliveryaddresses/:idDeliveryAddress
// @desc    DELETE existing deliveryaddresses
// @access  Private
router.delete(
  "/:idDeliveryAddress",
  passport.authenticate("jwt-admin", {session: false}),
  deleteDeliveryAddress
);

// @route   GET /deliveryaddresses
// @desc    GET existing deliveryaddresses
// @access  Public
router.get("/", passport.authenticate("jwt", {session: false}), getDeliveryAddresses);

// @route   GET /deliveryaddresses/active
// @desc    GET existing deliveryaddresses
// @access  Public
router.get("/active", getActiveDeliveryAddresses);

// @route   GET /payment-methods/:customId
// @desc    GET existing deliveryaddresses by idDeliveryAddress
// @access  Public
router.get("/:idDeliveryAddress", getDeliveryAddressById);

module.exports = router;



