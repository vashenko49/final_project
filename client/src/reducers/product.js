import { GET_PRODUCT, PRODUCT_ERROR } from '../constants/product';

const initialState = {
  product: null,
  products: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  console.log(payload);

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
