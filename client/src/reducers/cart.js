import { GET_ITEMS, ADD_ITEMS, UPDATE_ITEM, ITEMS_ERROR } from '../constants/cart';

const initialState = {
  items: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case GET_ITEMS:
    case ADD_ITEMS:
    case UPDATE_ITEM:
      return {
        ...state,
        items: payload,
        loading: false
      };
    case ITEMS_ERROR:
      return {
        ...state,
        items: [],
        err: payload
      };
    default:
      return state;
  }
}
