import axios from 'axios';

import { GET_PRODUCT, PRODUCT_ERROR } from '../constants/product';
// Get current product
export const getCurrentProduct = productId => async dispatch => {
  try {
    const res = await axios.get(`/products/${productId}`);

    dispatch({
      type: GET_PRODUCT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};
