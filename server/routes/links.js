const express = require("express");
const router = express.Router();
const passport = require("passport");
const { check } = require('express-validator');

//Import controllers
const {
  addLink,
  updateLink,
  getLinks,
  deleteLink,
  getLinkById
} = require("../controllers/links");

// @route   POST /links
// @desc    Create new link
// @access  Private
router.post(
  "/",
  check('title', 'Title is required')
    .not()
    .isEmpty(),
  check('links', 'Links is required')
    .not()
    .isEmpty(),
  addLink
);

// @route   GET /links/:id
// @desc    Get link by id
// @access  Public
router.get(
  "/:id",
  getLinkById
);

// @route   PUT /links/:id
// @desc    Update existing link
// @access  Private
router.put(
  "/:id",
  check('title', 'Title is required')
    .not()
    .isEmpty(),
  check('links', 'Links is required')
    .not()
    .isEmpty(),
  updateLink
);

// @route   GET /links
// @desc    GET existing links
// @access  Public
router.get("/", getLinks);

// @route   DELETE /links/:id
// @desc    Delete link
// @access  Private
router.delete("/:id", deleteLink);

module.exports = router;
