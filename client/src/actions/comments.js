import CommentAPI from '../services/CommentAPI';

import { GET_COMMENTS, COMMENT_ERROR } from '../constants/comments';

// Get items
export function getCurrentComments(productId) {
  return async dispatch => {
    try {
      debugger;
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
