import CommentAPI from '../services/CommentAPI';

import { GET_COMMENTS, ADD_COMMENT, COMMENT_ERROR } from '../constants/comments';

// Get items
export function getCurrentComments(productId) {
  return async dispatch => {
    try {
      const res = await CommentAPI.getComments(productId);

      dispatch({
        type: GET_COMMENTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: COMMENT_ERROR,
        payload: err
      });
    }
  };
}

export function createNewComment(authorId, productID, score, text) {
  return async dispatch => {
    try {
      const res = await CommentAPI.createComment(authorId, productID, score, text);

      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: COMMENT_ERROR,
        payload: err
      });
    }
  };
}
