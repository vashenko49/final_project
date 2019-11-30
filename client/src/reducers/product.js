import { GET_PRODUCT } from '../constants/product';

const initialState = {
  product: {},
  products: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCT:
      return {
        ...state,
        product: payload,
        loading: false
      };
    default:
      return state;
  }
}
