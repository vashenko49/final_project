const express = require("express");
const router = express.Router();
const passport = require("passport");
const { check } = require('express-validator');

//$TODO$ ADD middleware

//Import controllers
const {
  createSubFilter,
  updateSubFilter,
  getAllSubFilters,
  getOneSubFilter,
  deleteSubFilter
} = require("../controllers/subfilters");

// @route POST /subfilters
// @desc Create new subfilter
// @access Private
router.post(
  "/",[
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
  "/",[
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
  "/all/:_idfilter",
  getAllSubFilters);

// @route GET /subfilters/idfilter
// @desc Get subfilter
// @access Private
router.get(
  "/one/:_idSubfilter",
  getOneSubFilter);


// @route   DELETE /subfilters/:id
// @desc    Delete subfilter
// @access  Private
router.delete(
  "/:_idSubfilter",
  deleteSubFilter
);

module.exports = router;
