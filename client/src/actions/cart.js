import CartAPI from '../services/CartAPI';

import { GET_ITEMS, UPDATE_ITEM, UPDATE_ITEMS, DELETE_ITEM, ITEMS_ERROR } from '../constants/cart';

// Get items
export function getCurrentItems() {
  return async dispatch => {
    try {
      const res = await CartAPI.getCustomerCart();

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

export function getCurrentItemsUsingToken(token) {
  return async dispatch => {
    try {
      const res = await CartAPI.getCustomerCartUsingToken(token);
      dispatch({
        type: GET_ITEMS,
        payload: res
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
export const addOrRemoveProduct = (productId, modelNo, quantity) => async dispatch => {
  try {
    const res = await CartAPI.addOrRemoveProduct(productId, modelNo, quantity);
    dispatch({
      type: UPDATE_ITEMS,
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

export function updateQuantity(productId, modelNo, quantity) {
  return async dispatch => {
    try {
      const res = await CartAPI.updateQuantity(productId, modelNo, parseFloat(quantity));
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

export function deleteProduct(productId, modelNo, quantity) {
  return async dispatch => {
    try {
      const res = await CartAPI.updateQuantity(productId, modelNo, parseFloat(quantity));
      dispatch({
        type: DELETE_ITEM,
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
