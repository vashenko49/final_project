import * as HEADERSEARCH from '../constants/headerSearch';

import HeaderSearchAPI from '../services/HeaderSearchAPI';

export function findFiveProductsBySearchIconClick(searchInputValue) {
  return async dispatch => {
    dispatch({
      type: HEADERSEARCH.FIND_API_PRODUCTS_REQUEST
    });

    try {
      const res = HeaderSearchAPI.findFiveProductsBySearchIconClick(searchInputValue);

      dispatch({
        type: HEADERSEARCH.FIND_API_PRODUCTS_SUCCEEDED,
        payload: res
      });
    } catch (err) {
      dispatch({
        type: HEADERSEARCH.FIND_API_PRODUCTS_FAILED,
        payload: err
      });
    }
  };
}

export function findProductsBySearchInput(searchInputValue) {
  return async dispatch => {
    dispatch({
      type: HEADERSEARCH.FIND_API_PRODUCTS_REQUEST
    });

    try {
      const res = HeaderSearchAPI.findProductsBySearchInput(searchInputValue);

      dispatch({
        type: HEADERSEARCH.FIND_API_PRODUCTS_SUCCEEDED,
        payload: res
      });
    } catch (err) {
      dispatch({
        type: HEADERSEARCH.FIND_API_PRODUCTS_FAILED,
        payload: err
      });
    }
  };
}
