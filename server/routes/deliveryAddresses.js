const express = require("express");
const router = express.Router();
const {check} = require('express-validator');

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
  [
    check('address', 'address is require')
      .not()
      .isEmpty(),
    check('default', 'default is require')
      .isBoolean(),
    check('enabled', 'enabled is require')
      .isBoolean(),
  ],
  addDeliveryAddress
);

// @route   POST /deliveryaddresses
// @desc    Create new deliveryaddresses
// @access  Private
router.post(
  "/many",
  [
    check('addresses', 'address is require')
      .isArray(),
    check('addresses.*.address', 'address is require')
      .not()
      .isEmpty(),
    check('addresses.*.default', 'default is require')
      .isBoolean(),
    check('addresses.*.enabled', 'enabled is require')
      .isBoolean(),
  ],
  addManyDeliveryAddresses
);

// @route   PUT /pdeliveryaddresses
// @desc    Update existing deliveryaddresses
// @access  Private
router.put(
  "/", [
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
  deleteDeliveryAddress
);

// @route   GET /deliveryaddresses
// @desc    GET existing deliveryaddresses
// @access  Public
router.get("/", getDeliveryAddresses);

// @route   GET /deliveryaddresses/active
// @desc    GET existing deliveryaddresses
// @access  Public
router.get("/active", getActiveDeliveryAddresses);

// @route   GET /payment-methods/:customId
// @desc    GET existing deliveryaddresses by idDeliveryAddress
// @access  Public
router.get("/:idDeliveryAddress", getDeliveryAddressById);

module.exports = router;



