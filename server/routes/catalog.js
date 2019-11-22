const express = require("express");
const router = express.Router();
const passport = require("passport");
const {check} = require('express-validator');

//Import controllers
const {
  addROOTCatalog,
  addChildCatalog,
  updateROOTCatalog,
  updateChildCatalog,
  getROOTCategories,
  getChildCategories,
  getChildCategory,
  getROOTCategory,
  deleteROOTCatalog,
  deleteChildCatalog,
} = require("../controllers/catalog");

// @route   POST /catalog
// @desc    Create new category
// @access  Private
router.post(
  "/root/",[
    check('name',"Name is require")
      .not()
      .isEmpty()
  ],
  addROOTCatalog
);

// @route   PUT /catalog/:id
// @desc    Update existing category
// @access  Private
router.put(
  "/root",
  [
    check('name',"Name is require")
      .not()
      .isEmpty(),
    check('_idRootCatalog','Id catalog is require')
      .not()
      .isEmpty()
  ],
  updateROOTCatalog
);

// @route   DELETE /catalog/:id
// @desc    Delete existing category
// @access  Private
router.delete(
  "/root/:id",
  deleteROOTCatalog
);

// @route   GET /catalog
// @desc    GET existing categories
// @access  Public
router.get(
  "/root/",
  getROOTCategories
);

// @route   GET /catalog/:id
// @desc    GET existing categorie
// @access  Public
router.get(
  "/root/:id",
  getROOTCategory
);


// @route   POST /catalog
// @desc    Create new category
// @access  Private
router.post(
  "/child/",
  addChildCatalog
);

// @route   PUT /catalog/:id
// @desc    Update existing category
// @access  Private
router.put(
  "/child/:id",
  updateChildCatalog
  );

// @route   DELETE /catalog/:id
// @desc    Delete existing category
// @access  Private
router.delete(
  "/child/:id",
  deleteChildCatalog
);

// @route   GET /catalog
// @desc    GET existing categories
// @access  Public
router.get(
  "/child/",
  getChildCategories
);

// @route   GET /catalog/:id
// @desc    GET existing categorie
// @access  Public
router.get(
  "/child/:id",
  getChildCategory
);


module.exports = router;
