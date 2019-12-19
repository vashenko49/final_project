import { GET_COMMENTS, COMMENT_ERROR } from '../constants/comments';

const initialState = {
  comments: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: payload,
        loading: false
      };
    case COMMENT_ERROR:
      return {
        ...state,
        items: [],
        err: payload
      };
    default:
      return state;
  }
}
