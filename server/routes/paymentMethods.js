const express = require("express");
const router = express.Router();
const {check} = require('express-validator');

//Import controllers
const {
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  getPaymentMethods,
  getActivePaymentMethods,
  getPaymentMethodById,
  activateOrDeactivatePaymentMethod
} = require("../controllers/paymentMethods");

// @route   POST /payment-methods
// @desc    Create new payment method
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
    check('isPayOnline','isPayOnline is require')
      .isBoolean()
  ],
  addPaymentMethod
);

// @route   PUT /payment-methods
// @desc    Update existing payment method
// @access  Private
router.put(
  "/",[
    check('idPaymentMethod','idPaymentMethod is require')
      .not()
      .isEmpty()
  ],
  updatePaymentMethod
);
// @route   PUT /payment-methods/activateordeactivate
// @desc    activateordeactivate existing payment method
// @access  Private
router.put(
  "/activateordeactivate",
  [
    check('idPaymentMethod', 'idPaymentMethod is require')
      .not()
      .isEmpty(),
    check('status','status is require')
      .isBoolean()
  ],
  activateOrDeactivatePaymentMethod
);

// @route   DELETE /payment-methods/:customId
// @desc    DELETE existing payment method
// @access  Private
router.delete(
  "/:idPaymentMethod",
  deletePaymentMethod
);

// @route   GET /payment-methods
// @desc    GET existing payment methods
// @access  Public
router.get("/", getPaymentMethods);

// @route   GET /payment-methods
// @desc    GET existing payment methods
// @access  Public
router.get("/active", getActivePaymentMethods);

// @route   GET /payment-methods/:customId
// @desc    GET existing payment methods by customId
// @access  Public
router.get("/:idPaymentMethod", getPaymentMethodById);

module.exports = router;
