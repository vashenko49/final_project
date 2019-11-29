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
<<<<<<< HEAD
    case PRODUCTS.GET_API_PRODUCTS_REQUEST:
=======
    case PRODUCTS.GET_API_REQUEST:
>>>>>>> ad9f27ab884245c9f9dd3e88a7a2d8ab537dfd17
      return {
        ...state,
        ...{
          loading: true
        }
      };

<<<<<<< HEAD
    case PRODUCTS.GET_API_PRODUCTS_SUCCEEDED:
=======
    case PRODUCTS.GET_API_SUCCEEDED:
>>>>>>> ad9f27ab884245c9f9dd3e88a7a2d8ab537dfd17
      return {
        ...state,
        ...{
          data: action.payload,
          loading: false
        }
      };

<<<<<<< HEAD
    case PRODUCTS.GET_API_PRODUCTS_FAILED:
=======
    case PRODUCTS.GET_API_FAILED:
>>>>>>> ad9f27ab884245c9f9dd3e88a7a2d8ab537dfd17
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
