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
  getActiveChildCategoryForClientSelectSubfilter,
  getActiveChildCategoryForClientAnySubfilter,
  getHierarchyRootChildCatalogFilter,
  createRootChildCatalogAndAddFilterId,
  updateRootChildCatalogAndAddFilterId,
  getHierarchyRootChildCatalogFilterByRootCatalogID,
  activateOrDeactivateROOTCatalog,
  activateOrDeactivateChildCatalog,
  deleteChildCatalogFilter,
  getCatalogsAndProductForMainPage
} = require("../controllers/catalog");

// @route   GET /catalog/hierarchy
// @desc    GET a hierarchical look
// @access  Public
router.get(
  '/hierarchy',
  getHierarchyRootChildCatalogFilter
);

// @route   GET /catalog/hierarchy/one
// @desc    GET a hierarchical look
// @access  Public
router.get(
  '/hierarchy/one/:_idRootCatalog',
  getHierarchyRootChildCatalogFilterByRootCatalogID
);

// @route   POST /catalog/hierarchy
// @desc    create root, child filters and add filter at the same time
// @access  Public
router.post(
  '/hierarchy', [
    passport.authenticate("jwt-admin", {session: false}),
    check('nameRootCatalog', 'nameRootCatalog is require')
      .not()
      .isEmpty(),
    check('childCatalogs', 'childCatalog id require')
      .isArray()
  ],
  createRootChildCatalogAndAddFilterId
);

// @route   PUT /catalog/hierarchy
// @desc    edit root, child filters and add filter at the same time
// @access  Public
router.put(
  '/hierarchy',
  [
    passport.authenticate("jwt-admin", {session: false}),
    check('_id', "_id is require")
      .not()
      .isEmpty()
  ],
  updateRootChildCatalogAndAddFilterId
);


// @route   POST /catalog/root
// @desc    Create new root category
// @access  Private
router.post(
  "/root", [
    passport.authenticate("jwt-admin", {session: false}),
    check('name', "Name is require")
      .not()
      .isEmpty()
  ],
  addROOTCatalog
);

// @route   PUT /catalog/root/activateordeactivate
// @desc    activate or deactivate existing root category
// @access  Private
router.put(
  '/root/activateordeactivate',
  [
    passport.authenticate("jwt-admin", {session: false}),
    check('_idRootCatalog', '_idRootCatalog')
      .not()
      .isEmpty(),
    check('status', 'status is require')
      .isBoolean()
  ],
  activateOrDeactivateROOTCatalog
);

// @route   PUT /catalog/root
// @desc    Update existing root category
// @access  Private
router.put(
  "/root",
  [
    passport.authenticate("jwt-admin", {session: false}),
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
  passport.authenticate("jwt-admin", {session: false}),
  deleteROOTCatalog
);

// @route   GET /catalog/root/private
// @desc    GET existing root categories
// @access  Private
router.get(
  "/root/private",
  passport.authenticate("jwt-admin", {session: false}),
  getROOTCategories
);

// @route   GET /catalog/root/private/:id
// @desc    GET any existing category
// @access  Private
router.get(
  "/root/private/:_idrootcatalog",
  passport.authenticate("jwt-admin", {session: false}),
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
    passport.authenticate("jwt-admin", {session: false}),
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
    passport.authenticate("jwt-admin", {session: false}),
    check('_id', "Id child catalog is require")
      .not()
      .isEmpty()
  ],
  updateChildCatalog
);

// @route   PUT /catalog/child/activateordeactivate
// @desc    activate or deactivate existing child category
// @access  Private
router.put(
  '/child/activateordeactivate',
  [
    passport.authenticate("jwt-admin", {session: false}),
    check('_idChildCatalog', '_idChildCatalog')
      .not()
      .isEmpty(),
    check('status', 'status is require')
      .isBoolean()
  ],
  activateOrDeactivateChildCatalog
);


// @route   DELETE /catalog/root/:id
// @desc    Delete existing category
// @access  Private
router.delete(
  "/child/:id",
  passport.authenticate("jwt-admin", {session: false}),
  deleteChildCatalog
);

router.delete(
  '/child/filter/:_idChildCatalog/:_idFilter',
  passport.authenticate("jwt-admin", {session: false}),
  deleteChildCatalogFilter
);

// @route   GET /catalog/child/private
// @desc    GET existing child categories
// @access  Private
router.get(
  "/child/private",
  passport.authenticate("jwt-admin", {session: false}),
  getChildCategories
);

// @route   GET /catalog/child/private/:id
// @desc    GET any existing child category
// @access  Private
router.get(
  "/child/private/:_idchildcatalog",
  passport.authenticate("jwt-admin", {session: false}),
  getChildCategory
);

// @route   GET /catalog/child/private/:id
// @desc    GET any existing child category  use id root catalog
// @access  Private
router.get(
  "/child/private/idparent/:_idrootcatalog",
  passport.authenticate("jwt-admin", {session: false}),
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

// @route   GET /catalog/child/select/:id
// @desc    GET active existing catalog use id child catalog for client (С Ромой обсудили этот роут)
// @access  Public
router.get(
  '/child/select/:id',
  getActiveChildCategoryForClientSelectSubfilter
);

// @route   GET /catalog/child/any/:id
// @desc    GET active existing catalog use id child catalog for client (С Ромой обсудили этот роут)
// @access  Public
router.get(
  '/child/any/:id',
  getActiveChildCategoryForClientAnySubfilter
);

router.get('/mainpage',
  getCatalogsAndProductForMainPage
);

module.exports = router;
