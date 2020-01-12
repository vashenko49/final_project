import { GET_PRODUCT, GET_PRODUCTS, PRODUCT_ERROR } from '../constants/product';
import ProductAPI from '../services/ProductAPI';
// Get current product
export const getCurrentProduct = productId => async dispatch => {
  try {
    const res = await ProductAPI.getCurrentProduct(productId);

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

// Get all products
export const getProducts = () => async dispatch => {
  try {
    const res = await ProductAPI.getProducts();

    dispatch({
      type: GET_PRODUCTS,
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
