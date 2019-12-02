const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

const {
  createNewComment,
  editComment,
  removeComment,
  getComments,
  getCommentById,
  getCommentsByUserId,
  getCommentsByProductId
} = require('../controllers/comment');


// @route   POST /catalog/comment
// @desc    POST create a new comment
// @access  Private
router.post(
  '/', [
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

// @route   PUT /catalog/comment
// @desc    PUT Edit comment
// @access  Private
router.put(
  '/', [
    check('commentID', 'authorId is require')
      .not()
      .isEmpty()
  ],
  editComment
);


// @route   DELETE /catalog/comment
// @desc    DELETE remove comment
// @access  Private
router.delete(
  '/:idComment',
  removeComment
);


// @route   GET /catalog/comment
// @desc    GET get all comment for admin
// @access Private
router.get(
  '/',
  getComments
);

// @route   GET /catalog/comment/one/:commentID
// @desc    GET one comment
// @access Public
router.get(
  '/one/:commentID',
  getCommentById
);

// @route   GET /catalog/comment/user/:userID
// @desc    GET all user's comments
// @access Private
router.get(
  '/user/:userID',
  getCommentsByUserId
);


// @route   GET /catalog/comment/product/:productID
// @desc    GET all product's comments
// @access Public
router.get(
  '/product/:productID',
  getCommentsByProductId
);



module.exports = router;
