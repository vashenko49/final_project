const express = require("express");
const router = express.Router();
const {check} = require('express-validator');
const passport = require("passport");

//Import controllers
const {
  addPartner,
  updatePartner,
  activateOrDeactivatePartner,
  deletePartner,
  getPartners,
  getActivePartners,
  getPartnerById
} = require("../controllers/partner");

// @route   POST /partners
// @desc    Create new partner
// @access  Private
router.post(
  "/",
  [
    passport.authenticate("jwt-admin", {session: false}),
    check('name','name is require')
      .not()
      .isEmpty()
  ],
  addPartner
);

// @route   PUT /partners/
// @desc    Update existing partner
// @access  Private
router.put(
  "/",
  [
    passport.authenticate("jwt-admin", {session: false}),
    check('idPartner', "idPartner is require")
      .not()
      .isEmpty()
  ],
  updatePartner
);

// @route   PUT /partners/
// @desc    Update existing partner
// @access  Private
router.put(
  "/activateordeactivate",
  [
    passport.authenticate("jwt-admin", {session: false}),
    check('idPartner', 'idPartner is require')
      .not()
      .isEmpty(),
    check('status','status is require')
      .isBoolean()
  ],
  activateOrDeactivatePartner
);

// @route   DELETE /partners/:customId
// @desc    DELETE existing partner
// @access  Private
router.delete(
  "/:idPartner",
  passport.authenticate("jwt-admin", {session: false}),
  deletePartner
);

// @route   GET /partners
// @desc    GET existing partners
// @access  Public
router.get("/", getPartners);

// @route   GET /partners
// @desc    GET  existing active partners
// @access  Public
router.get("/active", getActivePartners);

// @route   GET /partners
// @desc    GET  existing  partner by id
// @access  Public
router.get( "/:idPartner", getPartnerById);

module.exports = router;
