import CartAPI from '../services/CartAPI';

import { GET_ITEMS, ADD_ITEMS, UPDATE_ITEM, ITEMS_ERROR } from '../constants/cart';

// Get items
export function getCurrentItems(id) {
  return async dispatch => {
    try {
      const res = await CartAPI.getCustomerCart(id);

      dispatch({
        type: GET_ITEMS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ITEMS_ERROR,
        payload: err
      });
    }
  };
}

// Add new product
export const addNewProduct = (id, productId, quantity) => async dispatch => {
  try {
    const res = await CartAPI.addNewProduct(id, productId, quantity);
    dispatch({
      type: ADD_ITEMS,
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

export function updateQuantity(id, productId, modelNo, quantity) {
  return async dispatch => {
    try {
      const res = await CartAPI.updateQuantity(id, productId, modelNo, parseFloat(quantity));
      dispatch({
        type: UPDATE_ITEM,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ITEMS_ERROR,
        payload: err
      });
    }
  };
}
