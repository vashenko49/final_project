import * as COMMON from '../constants/common';
import * as ADMIN_PRODUCTS from '../constants/adminProducts';

const initState = {
  products: [],
  filters: [],
  loading: false
};

export default function(state = initState, action) {
  switch (action.type) {
    case COMMON.REQUEST_SEND:
      return {
        ...state,
        ...{
          loading: true
        }
      };

    case ADMIN_PRODUCTS.ADD:
      return {
        ...state,
        ...{
          products: [...state.products, ...[action.payload]]
        }
      };

    case ADMIN_PRODUCTS.LIST:
      return {
        ...state,
        ...{
          products: action.payload,
          loading: false
        }
      };
    default:
      return state;
  }
}
