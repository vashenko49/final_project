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
  getActiveROOTCategories,
  getActiveROOTCategory,
  getActiveChildCategories,
  getActiveChildCategory,
  getChildCategory,
  getROOTCategory,
  getChildCategoriesWithRootID,
  getActiveChildCategoriesWithRootID,
  deleteROOTCatalog,
  deleteChildCatalog,
  getActiveChildCategoryForClient
} = require("../controllers/catalog");

// @route   POST /catalog/root
// @desc    Create new root category
// @access  Private
router.post(
  "/root/", [
    check('name', "Name is require")
      .not()
      .isEmpty()
  ],
  addROOTCatalog
);

// @route   PUT /catalog/root
// @desc    Update existing root category
// @access  Private
router.put(
  "/root",
  [
    check('name', "Name is require")
      .not()
      .isEmpty(),
    check('_idRootCatalog', 'Id catalog is require')
      .not()
      .isEmpty()
  ],
  updateROOTCatalog
);

// @route   DELETE /catalog/root/:id
// @desc    Delete existing root category and child category
// @access  Private
router.delete(
  "/root/:_idrootcatalog",
  deleteROOTCatalog
);

// @route   GET /catalog/root/private
// @desc    GET existing root categories
// @access  Private
router.get(
  "/root/private",
  getROOTCategories
);

// @route   GET /catalog/root/private/:id
// @desc    GET any existing category
// @access  Private
router.get(
  "/root/private/:_idrootcatalog",
  getROOTCategory
);

// @route   GET /catalog/root/public
// @desc    GET active existing root categories
// @access  Public
router.get(
  "/root/public",
  getActiveROOTCategories
);

// @route   GET /catalog/root/public/:id
// @desc    GET active existing category
// @access  Public
router.get(
  "/root/public/:_idrootcatalog",
  getActiveROOTCategory
);


///////////////////////////////////////////////////////////////////////////////////
// @route   POST /catalog
// @desc    Create new a new child category
// @access  Private
router.post(
  "/child", [
    check('name', "Name is require")
      .not()
      .isEmpty(),
    check("parentId", "Parent id is require")
      .not()
      .isEmpty()
  ],
  addChildCatalog
);

// @route   PUT /catalog/child
// @desc    Update existing category
// @access  Private
router.put(
  "/child", [
    check('_id', "Id child catalog is require")
      .not()
      .isEmpty(),
    check('name', "Name is require")
      .not()
      .isEmpty(),
    check("parentId", "Parent id is require")
      .not()
      .isEmpty()
  ],
  updateChildCatalog
);

// @route   DELETE /catalog/root/:id
// @desc    Delete existing category
// @access  Private
router.delete(
  "/child/:id",
  deleteChildCatalog
);

// @route   GET /catalog/child/private
// @desc    GET existing child categories
// @access  Private
router.get(
  "/child/private",
  getChildCategories
);

// @route   GET /catalog/child/private/:id
// @desc    GET any existing child category
// @access  Private
router.get(
  "/child/private/:_idchildcatalog",
  getChildCategory
);

// @route   GET /catalog/child/private/:id
// @desc    GET any existing child category  use id root catalog
// @access  Private
router.get(
  "/child/private/idparent/:_idrootcatalog",
  getChildCategoriesWithRootID
);


// @route   GET /catalog/child/public
// @desc    GET active existing child categories
// @access  Public
router.get(
  "/child/public",
  getActiveChildCategories
);

// @route   GET /catalog/child/public/:id
// @desc    GET active existing child category
// @access  Public
router.get(
  "/child/public/:_idchildcatalog",
  getActiveChildCategory
);

// @route   GET /catalog/child/public/:id
// @desc    GET active existing child category use id root catalog
// @access  Public
router.get(
  "/child/public/idparent/:_idrootcatalog",
  getActiveChildCategoriesWithRootID
);

// @route   GET /catalog/child/:id
// @desc    GET active existing catalog use id child catalog for client (С Ромой обсудили этот роут)
// @access  Public
router.get(
  '/child/:id',
  getActiveChildCategoryForClient
);


module.exports = router;
