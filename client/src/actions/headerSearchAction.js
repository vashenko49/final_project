import * as HEADERSEARCH from '../constants/headerSearch';

import HeaderSearchAPI from '../services/HeaderSearchAPI';

export function findProductsBySearchIconClick(searchInputValue) {
  return async dispatch => {
    dispatch({
      type: HEADERSEARCH.FIND_API_PRODUCTS_REQUEST
    });

    try {
      const res = await HeaderSearchAPI.findProductsBySearchIconClick(searchInputValue);

      dispatch({
        type: HEADERSEARCH.FIND_API_PRODUCTS_SUCCEEDED,
        payload: res.data
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
      const res = await HeaderSearchAPI.findProductsBySearchInput(searchInputValue);

      dispatch({
        type: HEADERSEARCH.FIND_API_PRODUCTS_SUCCEEDED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: HEADERSEARCH.FIND_API_PRODUCTS_FAILED,
        payload: err
      });
    }
  };
}
