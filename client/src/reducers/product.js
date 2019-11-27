import { GET_PRODUCT, PRODUCT_ERROR } from '../constants/product';

const initialState = {
  product: '',
  products: [],
  loading: false,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCT:
      return {
        ...state,
        product: payload.description,
        loading: true
      };
    default:
      return state;
  }
}
