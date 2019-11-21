import * as PRODUCTS from '../constants/adminProducts';

import AdminProductAPI from '../services/AdminProductAPI';

export function getProducts() {
  return dispatch => {
    dispatch({
      type: PRODUCTS.GET_API_REQUEST
    });

    AdminProductAPI.getProducts()
      .then(res => {
        return dispatch({
          type: PRODUCTS.GET_API_SUCCEEDED,
          payload: res
        });
      })

      .catch(err => {
        return dispatch({
          type: PRODUCTS.GET_API_FAILED,
          payload: err
        });
      });
  };
}
