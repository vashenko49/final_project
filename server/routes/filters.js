const express = require("express");
const router = express.Router();
const passport = require("passport");
const { check } = require('express-validator');


//Import controllers
const {
  createFilter,
  updateFilter,
  getAllFilters,
  getOneFilters,
  deleteFilter,
  createSubFilter,
  createManySubFilter,
  updateSubFilter,
  getAllSubFilters,
  getOneSubFilter,
  searchInSubFilter,
  searchInFilter,
  deleteSubFilter,
  removeManySubFilters,
  removeManyFilters,
  activateOrDeactivateFilter
} = require("../controllers/filters");

// @route POST /filters
// @desc Create new filter
// @access Private
router.post(
  "/main",[
    passport.authenticate("jwt-admin", {session: false}),
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
  "/main", [
    passport.authenticate("jwt-admin", {session: false}),
    check('_id', 'Filters id is required')
      .not()
      .isEmpty()],
  updateFilter);

// @route   PUT /filters/main/activateordeactivate
// @desc    activate or deactivate existing model
// @access  Private
router.put(
  '/main/activateordeactivate',
  [
    passport.authenticate("jwt-admin", {session: false}),
    check('_idFilter', '_idFilter')
      .not()
      .isEmpty(),
    check('status','status is require')
      .isBoolean()
  ],
  activateOrDeactivateFilter
);



// @route GET /filters/all
// @desc Get all filters
// @access Private
router.get(
  "/main/all",
  getAllFilters
);

// @route GET /filters/all
// @desc Get all filters
// @access Private
router.get(
  "/main/all/:searchWord",
  searchInFilter
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
  passport.authenticate("jwt-admin", {session: false}),
  deleteFilter
);


// @route   DELETE /filters/main/many
// @desc    Delete many filter
// @access  Private
router.put(
  "/main/many",
  passport.authenticate("jwt-admin", {session: false}),
  check('_idFiltersForDeletion','_idFiltersForDeletion is require'),
  removeManyFilters
);


//----------------------------------------- subfilter

// @route POST /subfilters
// @desc Create new subfilter
// @access Private
router.post(
  "/sub",[
    passport.authenticate("jwt-admin", {session: false}),
    check('name', 'Name is required')
      .not()
      .isEmpty(),
  ],
  createSubFilter);

// @route POST /subfilters
// @desc Create new subfilter
// @access Private
router.post(
  "/sub/many",[
    passport.authenticate("jwt-admin", {session: false}),
    check('names', 'Name is required')
      .isArray(),
  ],
  createManySubFilter);

// @route PUT /subfilters
// @desc Update subfilter
// @access Private
router.put(
  "/sub",[
    passport.authenticate("jwt-admin", {session: false}),
    check('_idSubFilter', 'id SubFilter is required')
      .not()
      .isEmpty(),
    check('name','Name can\'t be empty ')
      .not()
      .isEmpty(),
  ],
  updateSubFilter
);

// @route GET /all/searchWord
// @desc Search subfilter by name
// @access public
router.get(
  "/sub/all/:searchWord",
  searchInSubFilter);

// @route GET /all
// @desc Get all subfilters thought id filter
// @access public
router.get(
  "/sub/all",
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
  passport.authenticate("jwt-admin", {session: false}),
  deleteSubFilter
);

// @route   DELETE /filters/sub/many
// @desc    Delete many filter
// @access  Private
router.put(
  "/sub/many",
  passport.authenticate("jwt-admin", {session: false}),
  check('_idSubFiltersForDeletion','_idSubFiltersForDeletion is require')
    .not()
    .notEmpty(),
  removeManySubFilters
);


module.exports = router;
