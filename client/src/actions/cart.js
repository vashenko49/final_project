import CartAPI from '../services/CartAPI';

import { GET_ITEMS, ITEMS_ERROR } from '../constants/cart';

// Get items
export const getCurrentItems = id => async dispatch => {
  try {
    const res = await CartAPI.getCustomerCart(id);
    console.log(res);
    dispatch({
      type: GET_ITEMS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ITEMS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};
