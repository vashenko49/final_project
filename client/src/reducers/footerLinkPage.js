import * as FOOTERLINKPAGE from '../constants/footerLinkPage';

const initState = {
  article: {},
  loading: false,
  error: {
    status: false,
    msg: ''
  }
};

export default function(state = initState, action) {
  switch (action.type) {
    case FOOTERLINKPAGE.GET_CUSTOMID_API_REQUEST:
      return {
        ...state,
        ...{
          loading: true
        }
      };

    case FOOTERLINKPAGE.GET_CUSTOMID_API_SUCCEEDED:
      return {
        ...state,
        ...{
          article: action.payload,
          loading: false
        }
      };

    case FOOTERLINKPAGE.GET_CUSTOMID_API_FAILED:
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
