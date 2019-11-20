import * as COMMON from '../constants/common';
import * as ADMIN_PRODUCTS from '../constants/adminProducts';

import AdminProductAPI from '../services/AdminProductAPI';

export function getProducts() {
  return dispatch => {
    dispatch({
      type: COMMON.REQUEST_SEND
    });

    AdminProductAPI.getProducts().then(data => {
      return dispatch({
        type: ADMIN_PRODUCTS.LIST,
        payload: data
      });
    });
  };
}

export function addProduct(data) {
  return dispatch => {
    AdminProductAPI.addProduct(data).then(res => {
      dispatch({
        type: ADMIN_PRODUCTS.ADD,
        payload: res
      });
    });
  };
}
