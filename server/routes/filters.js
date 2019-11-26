const express = require("express");
const router = express.Router();
const passport = require("passport");
const {check} = require('express-validator');


//Import controllers
const {
  createFilter,
  updateFilter,
  getAllFilters,
  getOneFilters,
  deleteFilter,
  createSubFilter,
  updateSubFilter,
  getAllSubFilters,
  getOneSubFilter,
  deleteSubFilter
} = require("../controllers/filters");

// @route POST /filters
// @desc Create new filter
// @access Private
router.post(
  "/main/",[
  check('type', 'Type is required')
    .not()
    .isEmpty(),
    check('serviceName', "serviceName is required")
      .not()
      .isEmpty()
  ],
  createFilter);

// @route PUT /filters/:id
// @desc Update filter
// @access Private
router.put(
  "/main/", [
    check('_id', 'Filters id is required')
      .not()
      .isEmpty()],
  updateFilter);

// @route GET /filters/all
// @desc Get all filters
// @access Private
router.get(
  "/main/all",
  getAllFilters
);

// @route GET /filters/one/:_idfilter
// @desc Get one filter by id
// @access Private
router.get(
  "/main/one/:_idfilter",
  getOneFilters
);

// @route   DELETE /filters/:_id
// @desc    Delete filter
// @access  Private
router.delete(
  "/main/:_id",
  deleteFilter
);


//----------------------------------------- subfilter

// @route POST /subfilters
// @desc Create new subfilter
// @access Private
router.post(
  "/sub/",[
    check('_idFilter', 'Give me id filter')
      .not()
      .isEmpty(),
    check('name', 'Name is required')
      .not()
      .isEmpty(),
  ],
  createSubFilter);

// @route PUT /subfilters
// @desc Update subfilter
// @access Private
router.put(
  "/sub/",[
    check('_idSubFilter', 'id SubFilter is required')
      .not()
      .isEmpty(),
    check('name','Name can\'t be empty ')
      .not()
      .isEmpty(),
  ],
  updateSubFilter
);

// @route GET /all/idfilter
// @desc Get all subfilters thought id filter
// @access public
router.get(
  "/sub/all/:_idfilter",
  getAllSubFilters);

// @route GET /subfilters/idfilter
// @desc Get subfilter
// @access Private
router.get(
  "/sub/one/:_idSubfilter",
  getOneSubFilter);


// @route   DELETE /subfilters/:id
// @desc    Delete subfilter
// @access  Private
router.delete(
  "/sub/:_idSubfilter",
  deleteSubFilter
);

module.exports = router;
