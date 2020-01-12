const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const passport = require("passport");

const {
  createNewComment,
  editComment,
  removeComment,
  getComments,
  getCommentById,
  getCommentsByUserId,
  getCommentsByProductId,
  getMeanRatingProductByProductId
} = require('../controllers/comment');


// @route   POST /comment
// @desc    POST create a new comment
// @access  Private
router.post(
  '/', [
    passport.authenticate("jwt", {session: false}),
    check('authorId', 'authorId is require')
      .not()
      .isEmpty(),
    check('productID', 'productID is require')
      .not()
      .isEmpty(),
    check('score', 'star is require')
      .not()
      .isEmpty(),
    check('text', 'text is require')
      .not()
      .isEmpty()
  ]
  , createNewComment
);

// @route   PUT /comment
// @desc    PUT Edit comment
// @access  Private
router.put(
  '/', [
    passport.authenticate("jwt", {session: false}),
    check('commentID', 'authorId is require')
      .not()
      .isEmpty()
  ],
  editComment
);


// @route   DELETE /comment
// @desc    DELETE remove comment
// @access  Private
router.delete(
  '/:idComment',
  passport.authenticate("jwt", {session: false}),
  removeComment
);


// @route   GET /comment
// @desc    GET get all comment for admin
// @access Private
router.get(
  '/',
  getComments
);

// @route   GET /comment/one/:commentID
// @desc    GET one comment
// @access Public
router.get(
  '/one/:commentID',
  getCommentById
);

// @route   GET /comment/user/:userID
// @desc    GET all user's comments
// @access Private
router.get(
  '/user/:userID',
  getCommentsByUserId
);


// @route   GET /comment/product/:productID
// @desc    GET all product's comments
// @access Public
router.get(
  '/product/:productID',
  getCommentsByProductId
);

// @route   GET /comment/product/:productID
// @desc    GET all product's comments
// @access Public
router.get(
  '/rating/:productID',
  getMeanRatingProductByProductId
);



module.exports = router;
