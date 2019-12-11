import CartAPI from '../services/CartAPI';

import { GET_ITEMS, ADD_ITEMS, UPDATE_ITEM, ITEMS_ERROR } from '../constants/cart';

// Get items
export const getCurrentItems = id => async dispatch => {
  try {
    const res = await CartAPI.getCustomerCart(id);
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

// Add new product
export const addNewProduct = (productId, quantity) => async dispatch => {
  try {
    const res = await CartAPI.addNewProduct(productId, quantity);
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

export const updateQuantity = (id, productId, quantity) => async dispatch => {
  try {
    debugger;
    const res = await CartAPI.updateQuantity(id, productId, quantity);
    dispatch({
      type: UPDATE_ITEM,
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
