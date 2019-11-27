import * as FILTERS from '../constants/adminFilters';

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
    case FILTERS.GET_API_FILTERS_REQUEST:
      return {
        ...state,
        ...{
          loading: true
        }
      };

    case FILTERS.GET_API_FILTERS_SUCCEEDED:
      return {
        ...state,
        ...{
          data: action.payload,
          loading: false
        }
      };

    case FILTERS.GET_API_FILTERS_FAILED:
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

    case FILTERS.GET_ID_API_FILTERS_REQUEST:
      return {
        ...state,
        ...{
          loading: true
        }
      };

    case FILTERS.GET_ID_API_FILTERS_SUCCEEDED:
      return {
        ...state,
        ...{
          data: action.payload,
          loading: false
        }
      };

    case FILTERS.GET_ID_API_FILTERS_FAILED:
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
