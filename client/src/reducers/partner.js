import * as PARTNER from '../constants/partner';

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
    case PARTNER.GET_API_PARTNERS_REQUEST:
      return {
        ...state,
        ...{
          loading: true
        }
      };

    case PARTNER.GET_API_PARTNERS_SUCCEEDED:
      return {
        ...state,
        ...{
          data: action.payload,
          loading: false
        }
      };

    case PARTNER.GET_API_PARTNERS_FAILED:
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
