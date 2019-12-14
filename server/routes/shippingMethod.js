const express = require("express");
const router = express.Router();
const {check} = require('express-validator');

const {
  addShippingMethod,
  updateShippingMethod,
  deleteShippingMethod,
  getShippingMethods,
  getActiveShippingMethods,
  getShippingMethodById,
  activateOrDeactivateShippingMethod
} = require("../controllers/shippingMethod");

// @route   POST /shipping-methods
// @desc    Create new shipping method
// @access  Private
router.post(
  "/",
  [
    check('name','name is require')
      .not()
      .isEmpty(),
    check('default','default is require')
      .isBoolean(),
    check('enabled','enabled is require')
      .isBoolean(),
    check('costValue','costValue is require')
      .not()
      .isEmpty(),
  ],
  addShippingMethod
);

// @route   PUT /shipping-methods/:customId
// @desc    Update existing shipping method
// @access  Private
router.put(
  "/",[
    check('idShippingMethod','idShippingMethod is require')
      .not()
      .isEmpty()
  ],
  updateShippingMethod
);

// @route   PUT /shipping-methods/activateordeactivate
// @desc    activate or deactivate existing model
// @access  Private
router.put(
  "/activateordeactivate",  [
    check('idShippingMethod', 'idShippingMethod is require')
      .not()
      .isEmpty(),
    check('status','status is require')
      .isBoolean()
  ],
  activateOrDeactivateShippingMethod
);

// @route   DELETE /shipping-methods/:customId
// @desc    DELETE existing shipping method
// @access  Private
router.delete(
  "/:idShippingMethod",
  deleteShippingMethod
);

// @route   GET /shipping-methods
// @desc    GET existing shipping methods
// @access  Public
router.get("/", getShippingMethods);


// @route   GET /shipping-methods
// @desc    GET existing shipping methods
// @access  Public
router.get("/active", getActiveShippingMethods);

// @route   GET /shipping-methods/:customId
// @desc    GET existing shipping methods by customId
// @access  Public
router.get("/:idShippingMethod", getShippingMethodById);

module.exports = router;
