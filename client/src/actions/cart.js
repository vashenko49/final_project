import axios from 'axios';

import { GET_ITEMS, ITEMS_ERROR } from '../constants/cart';

// Get items
export const getCurrentItems = id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.get(`/cart/${id}`, config);

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
