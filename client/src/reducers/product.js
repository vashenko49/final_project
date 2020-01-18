import {
  GET_PRODUCT,
  PRODUCT_ERROR,
  REQUEST_PRODUCT,
  GET_COMMENT,
  COMMENT_ERROR,
  EDIT_SELECTED_IMG,
  SELECT_FILTER
} from '../constants/product';

const initialState = {
  product: {
    enabled: false,
    description: '',
    comments: [],
    productUrlImg: [],
    _idChildCategory: '',
    nameProduct: '',
    nameChildCatalog: '',
    nameRootCatalog: '',
    filters: [],
    filterImg: [],
    model: [],
    itemNo: [],
    rating: 5,
    price: '',
    massImg: [],
    pretenderModel: '',
    fitModelCount: 0,
    selectedIndexImg: 0,
    filtersByUser: [],
    selectedFilter: []
  },
  loading: false,
  error: ''
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REQUEST_PRODUCT:
      return {
        ...state,
        loading: true,
        error: ''
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: { ...state.product, ...payload },
        loading: false,
        error: ''
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: 'Not found product'
      };
    case GET_COMMENT:
      return {
        ...state,
        product: {
          ...state.product,
          rating: payload.rating
        }
      };
    case COMMENT_ERROR:
      return {
        ...state,
        product: {
          ...state.product,
          rating: 0
        }
      };
    case EDIT_SELECTED_IMG:
      return {
        ...state,
        product: {
          ...state.product,
          selectedIndexImg: payload.selectedIndexImg
        }
      };
    case SELECT_FILTER:
      return {
        ...state,
        product: {
          ...state.product,
          massImg: payload.massImg,
          filtersByUser: payload.filtersByUser,
          selectedFilter: payload.selectedFilter,
          selectedIndexImg: 0,
          fitModelCount: payload.fitModelCount,
          pretenderModel: payload.pretenderModel
        }
      };
    default:
      return state;
  }
}
