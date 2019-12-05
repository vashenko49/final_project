import { GET_PRODUCT, GET_PRODUCTS } from '../constants/product';

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
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false
      };
    default:
      return state;
  }
}
