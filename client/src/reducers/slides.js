import * as SLIDES from '../constants/slides';

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
    case SLIDES.GET_API_SLIDES_REQUEST:
      return {
        ...state,
        ...{
          loading: true
        }
      };

    case SLIDES.GET_API_SLIDES_SUCCEEDED:
      return {
        ...state,
        ...{
          data: action.payload,
          loading: false
        }
      };

    case SLIDES.GET_API_SLIDES_FAILED:
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
