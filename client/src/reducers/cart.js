import { GET_ITEMS, ADD_ITEMS, UPDATE_ITEM, ITEMS_ERROR } from '../constants/cart';

const initialState = {
  items: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    // debugger;
    // return {
    //   ...state,
    //   items: state.products,
    //   loading: false
    // };
    case UPDATE_ITEM:
    case GET_ITEMS:
    case ADD_ITEMS:
      debugger;
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
    default:
      return state;
  }
}
