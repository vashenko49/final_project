import { GET_COMMENTS, COMMENT_ERROR, ADD_COMMENT } from '../constants/comments';

const initialState = {
  comment: {},
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
    case ADD_COMMENT:
      return {
        ...state,
        comment: payload,
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
