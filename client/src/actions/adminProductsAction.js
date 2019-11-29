import * as PRODUCTS from '../constants/adminProducts';

<<<<<<< HEAD
import AdminProductsAPI from '../services/AdminProductsAPI';
=======
import AdminProductAPI from '../services/AdminProductAPI';
>>>>>>> ad9f27ab884245c9f9dd3e88a7a2d8ab537dfd17

export function getProducts() {
  return dispatch => {
    dispatch({
<<<<<<< HEAD
      type: PRODUCTS.GET_API_PRODUCTS_REQUEST
    });

    AdminProductsAPI.getProducts()
      .then(res => {
        return dispatch({
          type: PRODUCTS.GET_API_PRODUCTS_SUCCEEDED,
=======
      type: PRODUCTS.GET_API_REQUEST
    });

    AdminProductAPI.getProducts()
      .then(res => {
        return dispatch({
          type: PRODUCTS.GET_API_SUCCEEDED,
>>>>>>> ad9f27ab884245c9f9dd3e88a7a2d8ab537dfd17
          payload: res
        });
      })

      .catch(err => {
        return dispatch({
<<<<<<< HEAD
          type: PRODUCTS.GET_API_PRODUCTS_FAILED,
=======
          type: PRODUCTS.GET_API_FAILED,
>>>>>>> ad9f27ab884245c9f9dd3e88a7a2d8ab537dfd17
          payload: err
        });
      });
  };
}
