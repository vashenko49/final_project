const express = require("express")
const router = express.Router();
const passport = require("passport");
const { check } = require('express-validator');

//$TODO$ ADD middleware

//Import controllers
const {
    createFilter,
    updateFilter,
    getAllFilters,
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
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    createFilter)

// @route PUT /filters/:id
// @desc Update filter
// @access Private
router.put(
    "/:id",
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    updateFilter);

// @route GET /filters/all
// @desc Get all filters
// @access Private
router.get(
    "/all",
    getAllFilters);

// @route   DELETE /filters/:id
// @desc    Delete filter
// @access  Private
router.delete(
    "/:id",
    deleteFilter
);

module.exports = router;
