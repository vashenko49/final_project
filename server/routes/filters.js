const express = require("express")
const router = express.Router();
const passport = require("passport");
const {check} = require('express-validator');

//$TODO$ ADD middleware

//Import controllers
const {
  createFilter,
  updateFilter,
  getAllFilters,
  getOneFilters,
  deleteFilter
} = require("../controllers/filters");

// @route POST /filters
// @desc Create new filter
// @access Private
router.post(
  "/",
  check('type', 'Type is required')
    .not()
    .isEmpty(),
  createFilter);

// @route PUT /filters/:id
// @desc Update filter
// @access Private
router.put(
  "/", [
    check('type', 'Type is required')
      .not()
      .isEmpty(),
    check('_id', 'Filters id is required')
      .not()
      .isEmpty()],
  updateFilter);

// @route GET /filters/all
// @desc Get all filters
// @access Private
router.get(
  "/all",
  getAllFilters
);

// @route GET /filters/one/:_idfilter
// @desc Get one filter by id
// @access Private
router.get(
  "/one/:_idfilter",
  getOneFilters
);

// @route   DELETE /filters/:_id
// @desc    Delete filter
// @access  Private
router.delete(
  "/:_id",
  deleteFilter
);

module.exports = router;
