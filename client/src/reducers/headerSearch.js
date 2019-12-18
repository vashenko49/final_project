import * as HEADERSEARCH from '../constants/headerSearch';

const initState = {
  data: [],
  loading: false,
  error: ''
};

export default function(state = initState, action) {
  switch (action.type) {
    case HEADERSEARCH.FIND_API_PRODUCTS_REQUEST:
      return {
        ...state,
        ...{
          loading: true
        }
      };

    case HEADERSEARCH.FIND_API_PRODUCTS_SUCCEEDED:
      return {
        ...state,
        ...{
          data: action.payload,
          loading: false
        }
      };

    case HEADERSEARCH.FIND_API_PRODUCTS_FAILED:
      return {
        ...state,
        ...{
          loading: false,
          error:
            'Ошибка при выполнении запроса... Попробуйте еще раз и будете вознаграждены за терпение;-)'
        }
      };

    default:
      return state;
  }
}
