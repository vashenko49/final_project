const express = require("express")
const router = express.Router();
const passport = require("passport");

//$TODO$ ADD middleware 

//Import controllers
const { 
    createFilter,
    updateFilter,
    getAllFilters
} = require("../controllers/filters")

// @route POST /filters
// @desc Create new filter
// @access Private
router.post(
    "/", 
    createFilter)

// @route GET /filters/all
// @desc Get all filters
// @access Private
router.get(
    "/all",
    getAllFilters)

// @route   DELETE /filters/:id
// @desc    Delete filter
// @access  Private
router.delete(
    "/:id",
    updateFilter
);

module.exports = router;