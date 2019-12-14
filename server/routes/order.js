const express = require("express");
const router = express.Router();
const {check} = require('express-validator');


//Import controllers
const {
  placeOrder,
  updateOrder,
  cancelOrder,
  deleteOrder,
  getOrdersByCustomer,
  getOrderById
} = require("../controllers/orders");

// @route   POST /orders
// @desc    Place Order
// @access  Private
router.post("/",
  [
    check('delivery', 'delivery is require')
      .notEmpty(),
    check('email', 'email is require')
      .isEmail(),
    check('mobile', 'mobile is require')
      .not()
      .isEmpty()
  ],
  placeOrder);

// @route   PUT /orders/:id
// @desc    Update order
// @access  Private
router.put(
  "/",
  [
    check('idOrder', 'idOrder is require')
      .not()
      .isEmpty()
  ],
  updateOrder
);

// @route   PUT /orders/cancel/:id
// @desc    Cancel order
// @access  Private
router.put(
  "/cancel",
  [
    check('idOrder', 'idOrder is require')
      .not()
      .isEmpty()
  ],
  cancelOrder
);

// @route   DELETE /orders/:id
// @desc    Delete order
// @access  Private
router.delete(
  "/:idOrder",
  deleteOrder
);

// @route   GET /orders
// @desc    Get all orders
// @access  Private
router.get("/customer/:idCustomer", getOrdersByCustomer);

// @route   GET /orders/:idOrder
// @desc    Get one order by orderNo
// @access  Private
router.get(
  "/:idOrder",
  getOrderById
);

module.exports = router;
