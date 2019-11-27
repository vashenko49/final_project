const express = require("express");
const router = express.Router();
const passport = require("passport");
const { check } = require('express-validator');

const { addSubsriber, removeSubscriber } = require('../controllers/subscribers')

router.post(
    "/", 
  check("email", "Email is required"), 
  addSubsriber
  )

router.delete(
    "/", 
  check("email", "Email is required"), 
  removeSubscriber
  )

module.exports = router;