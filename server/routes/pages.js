const express = require("express");
const router = express.Router();
const passport = require("passport");
const { check } = require('express-validator');

//Import controllers
const {
  addPage,
  updatePage,
  deletePage,
  getPageByCustomId
} = require("../controllers/pages");

// @route   POST /pages
// @desc    Create new page
// @access  Private
router.post(
  "/",
  check('customId', 'CustomId is required')
    .not()
    .isEmpty(),
  check('title', 'Title is required')
    .not()
    .isEmpty(),
  check('htmlContent', 'HTMLContent is required')
    .not()
    .isEmpty(),
  addPage
);

// @route   GET /pages/:customId
// @desc    Get page by customId
// @access  Public
router.get(
  "/:customId",
  getPageByCustomId
);

// @route   PUT /pages/:id
// @desc    Update existing page
// @access  Private
router.put(
  "/:id",
  check('customId', 'CustomId is required')
    .not()
    .isEmpty(),
  check('title', 'Title is required')
    .not()
    .isEmpty(),
  check('htmlContent', 'HTMLContent is required')
    .not()
    .isEmpty(),
  updatePage
);

// @route   DELETE /pages/:id
// @desc    Delete page
// @access  Private
router.delete("/:id", deletePage);

module.exports = router;
