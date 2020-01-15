const express = require("express");
const router = express.Router();
const passport = require("passport");
const { check } = require("express-validator");

//Import controllers
const {
  placeOrder,
  updateOrder,
  cancelOrder,
  deleteOrder,
  getOrdersByCustomer,
  getOrderById,
  getOrders
} = require("../controllers/orders");

// @route   POST /orders
// @desc    Place Order
// @access  Private
router.post(
  "/",
  [
    passport.authenticate("jwt", { session: false }),
    check("delivery", "delivery is require").notEmpty(),
    check("email", "email is require").isEmail(),
    check("mobile", "mobile is require")
      .not()
      .isEmpty()
  ],
  placeOrder
);

// @route   PUT /orders/:id
// @desc    Update order
// @access  Private
router.put(
  "/",
  [
    passport.authenticate("jwt", { session: false }),
    check("idOrder", "idOrder is require")
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
    passport.authenticate("jwt-admin", { session: false }),
    check("idOrder", "idOrder is require")
      .not()
      .isEmpty()
  ],
  cancelOrder
);

// @route   DELETE /orders/:id
// @desc    Delete order
// @access  Private
router.delete("/:idOrder", passport.authenticate("jwt-admin", { session: false }), deleteOrder);

// @route   GET /orders
// @desc    Get all orders
// @access  Private
router.post(
  "/customer",
  [
    passport.authenticate("jwt", { session: false }),
    check("page", "page is require")
      .not()
      .isEmpty(),
    check("limit", "limit is require")
      .not()
      .isEmpty()
  ],
  getOrdersByCustomer
);

// @route   GET /orders/:idOrder
// @desc    Get one order by orderNo
// @access  Private
router.get("/:idOrder", passport.authenticate("jwt", { session: false }), getOrderById);

router.get("/", passport.authenticate("jwt-admin", { session: false }), getOrders);

module.exports = router;
