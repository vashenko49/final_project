import * as FOOTERLINKS from '../constants/footerLinks';

const initState = {
  links: {
    data: [],
    loading: false,
    error: {
      status: false,
      msg: ''
    }
  },
  articles: {
    article: '',
    loading: false,
    error: {
      status: false,
      msg: ''
    }
  }
};

export default function(state = initState, action) {
  switch (action.type) {
    case FOOTERLINKS.GET_API_REQUEST:
      return {
        links: {
          ...state.links,
          loading: true
        },
        articles: {
          ...state.articles
        }
      };

    case FOOTERLINKS.GET_API_SUCCEEDED:
      return {
        ...state,
        ...{
          links: {
            data: [...action.payload],
            loading: false,
            error: {
              status: false,
              msg: ''
            }
          }
        }
      };

    case FOOTERLINKS.GET_API_FAILED:
      return {
        ...state,
        ...{
          links: {
            data: [],
            loading: false,
            error: {
              status: true,
              msg: action.payload
            }
          }
        }
      };

    case FOOTERLINKS.GET_CUSTOMID_API_REQUEST:
      return {
        links: {
          ...state.links
        },
        articles: {
          ...state.articles,
          loading: true
        }
      };

    case FOOTERLINKS.GET_CUSTOMID_API_SUCCEEDED:
      return {
        ...state,
        ...{
          articles: {
            article: action.payload,
            loading: false,
            error: {
              status: false,
              msg: ''
            }
          }
        }
      };

    case FOOTERLINKS.GET_CUSTOMID_API_FAILED:
      return {
        ...state,
        ...{
          articles: {
            loading: false,
            error: {
              status: true,
              msg: action.payload
            }
          }
        }
      };

    default:
      return state;
  }
}
