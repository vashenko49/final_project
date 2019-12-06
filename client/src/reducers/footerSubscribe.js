import * as FOOTERSUBSCRIBE from '../constants/footerSubscribe';

const initState = {
  email: '',
  loading: false,
  error: {
    status: false,
    msg: ''
  }
};

export default function(state = initState, action) {
  switch (action.type) {
    case FOOTERSUBSCRIBE.ADD_API_REQUEST:
      return {
        ...state,
        ...{
          loading: true
        }
      };

    case FOOTERSUBSCRIBE.ADD_API_SUCCEEDED:
      return {
        ...state,
        ...{
          email: action.payload,
          loading: false,
          error: {
            status: false,
            msg: ''
          }
        }
      };

    case FOOTERSUBSCRIBE.ADD_API_FAILED:
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

    case FOOTERSUBSCRIBE.SAVE_EMAIL:
      return {
        ...state,
        email: action.payload
      };

    default:
      return state;
  }
}
