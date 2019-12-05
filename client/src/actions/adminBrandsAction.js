import * as BRANDS from '../constants/adminBrands';

import AdminBrandsAPI from '../services/AdminBrandsAPI';

export function getBrands() {
  return dispatch => {
    dispatch({
      type: BRANDS.GET_API_BRANDS_REQUEST
    });

    AdminBrandsAPI.getBrands()
      .then(res => {
        return dispatch({
          type: BRANDS.GET_API_BRANDS_SUCCEEDED,
          payload: res
        });
      })

      .catch(err => {
        return dispatch({
          type: BRANDS.GET_API_BRANDS_FAILED,
          payload: err
        });
      });
  };
}
