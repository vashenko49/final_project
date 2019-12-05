import * as PRODUCTS from '../constants/adminProducts';

import AdminProductsAPI from '../services/AdminProductsAPI';

export function getProducts() {
  return dispatch => {
    dispatch({
      type: PRODUCTS.GET_API_PRODUCTS_REQUEST
    });

    AdminProductsAPI.getProducts()
      .then(res => {
        return dispatch({
          type: PRODUCTS.GET_API_PRODUCTS_SUCCEEDED,
          payload: res
        });
      })

      .catch(err => {
        return dispatch({
          type: PRODUCTS.GET_API_PRODUCTS_FAILED,
          payload: err
        });
      });
  };
}
