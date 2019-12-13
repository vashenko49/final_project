import * as HEADER from '../constants/header';

const initState = {
  rootCategories: [],
  childCategories: [],
  loading: false,
  error: {
    status: false,
    msg: ''
  }
};

export default function(state = initState, action) {
  switch (action.type) {
    case HEADER.GET_API_ROOT_CATEGORIES_REQUEST:
      return {
        ...state,
        ...{
          loading: true
        }
      };

    case HEADER.GET_API_ROOT_CATEGORIES_SUCCEEDED:
      return {
        ...state,
        ...{
          rootCategories: action.payload,
          loading: false
        }
      };

    case HEADER.GET_API_ROOT_CATEGORIES_FAILED:
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

    case HEADER.GET_API_CHILD_CATEGORIES_REQUEST:
      return {
        ...state,
        ...{
          loading: true
        }
      };

    case HEADER.GET_API_CHILD_CATEGORIES_SUCCEEDED:
      return {
        ...state,
        ...{
          childCategories: action.payload,
          loading: false
        }
      };

    case HEADER.GET_API_CHILD_CATEGORIES_FAILED:
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
