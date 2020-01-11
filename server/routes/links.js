const express = require("express");
const router = express.Router();
const passport = require("passport");
const { check } = require('express-validator');

//Import controllers
const {
  addLink,
  updateLink,
  getLinks,
  deleteLinksGroup,
  deleteLink,
  getLinkById,
  getLinkByCustomId
} = require("../controllers/links");

// @route   POST /links
// @desc    Create new links group
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt-admin", {session: false}),
  check('title', 'Title is required')
    .not()
    .isEmpty(),
  check('links', 'Links is required')
    .not()
    .isEmpty(),
  addLink
);

// @route   GET /links/:id
// @desc    Get links group by id
// @access  Public
router.get(
  "/:id",
  getLinkById
);

// @route   GET /links/content/:customId
// @desc    Get link content by customId
// @access  Public
router.get(
  "/content/:customId",
  getLinkByCustomId
);

// @route   PUT /links/:id
// @desc    Update existing links group
// @access  Private
router.put(
  "/:id",
  passport.authenticate("jwt-admin", {session: false}),
  check('title', 'Title is required')
    .not()
    .isEmpty(),
  check('links', 'Links is required')
    .not()
    .isEmpty(),
  updateLink
);

// @route   GET /links
// @desc    GET existing links groups
// @access  Public
router.get("/", getLinks);

// @route   DELETE /links/:id
// @desc    Delete links group
// @access  Private
router.delete("/:id",    passport.authenticate("jwt-admin", {session: false}), deleteLinksGroup);

// @route   DELETE /links/delete/:id
// @desc    Delete single link in group
// @access  Private
router.put("/delete/:id",    passport.authenticate("jwt-admin", {session: false}), deleteLink);

module.exports = router;
