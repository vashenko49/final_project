import {
  GET_ITEMS,
  UPDATE_ITEM,
  UPDATE_ITEMS,
  ITEMS_ERROR,
  DELETE_ITEM,
  RESET_ITEM
} from '../constants/cart';

const initialState = {
  items: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_ITEM:
    case GET_ITEMS:
    case UPDATE_ITEMS:
    case DELETE_ITEM:
      return {
        ...state,
        items: payload.products,
        loading: false
      };
    case ITEMS_ERROR:
      return {
        ...state,
        items: [],
        err: payload
      };
    case RESET_ITEM:
      return initialState;
    default:
      return state;
  }
}
