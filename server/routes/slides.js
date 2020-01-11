const express = require("express");
const router = express.Router();
const {check} = require('express-validator');
const passport = require("passport");

const {
  addSlide,
  updateSlide,
  deleteSlide,
  getSlides,
  getActiveSlides,
  activateOrDeactivateSlide,
  getSlideById
} = require("../controllers/slides");

// @route   POST /slides
// @desc    Create new slide
// @access  Private
router.post(
  "/",
  [
    passport.authenticate("jwt-admin", {session: false}),
    check('title','title is require')
      .not()
      .isEmpty(),
    check('description','description is require')
      .not()
      .isEmpty(),
    check('htmlContent','htmlContent is require')
      .not()
      .isEmpty()
  ],
  addSlide
);

// @route   PUT /slides/:id
// @desc    Update existing slide
// @access  Private
router.put(
  "/",[
    passport.authenticate("jwt-admin", {session: false}),
    check("idSlides","idSlides is require")
      .not()
      .isEmpty()
  ],
  updateSlide
);

// @route   PUT /slides/:id
// @desc    activateordeactivate existing slide
// @access  Private
router.put(
  "/activateordeactivate", [
    passport.authenticate("jwt-admin", {session: false}),
    check('idSlides', 'idSlides is require')
      .not()
      .isEmpty(),
    check('status', 'status is require')
      .isBoolean()
  ],
  activateOrDeactivateSlide
);

// @route   DELETE /slides/:idSlides
// @desc    Delete existing slide
// @access  Private
router.delete(
  "/:idSlides",
  passport.authenticate("jwt-admin", {session: false}),
  deleteSlide
);

// @route   GET /slides
// @desc    GET existing slides
// @access  Public
router.get("/",    passport.authenticate("jwt-admin", {session: false}), getSlides);

// @route   GET /slides/active
// @desc    GET active existing slides
// @access  Public
router.get("/active", getActiveSlides);

// @route   GET /slides/:customId
// @desc    GET  existing slide by id
// @access  Public
router.get("/:idSlides", getSlideById);

module.exports = router;
