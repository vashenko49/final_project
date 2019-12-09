import * as PRODUCTS from '../constants/adminProducts';

const initState = {
  data: [],
  loading: false,
  error: {
    status: false,
    msg: ''
  }
};

export default function(state = initState, action) {
  switch (action.type) {
    case PRODUCTS.GET_API_PRODUCTS_REQUEST:
      return {
        ...state,
        ...{
          loading: true
        }
      };

    case PRODUCTS.GET_API_PRODUCTS_SUCCEEDED:
      return {
        ...state,
        ...{
          data: action.payload,
          loading: false
        }
      };

    case PRODUCTS.GET_API_PRODUCTS_FAILED:
      return {
        ...state,
        ...{
          loading: false,
          error: {
            status: true,
            msg: action.payload
          }
        }
      };

    default:
      return state;
  }
}
