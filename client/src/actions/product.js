import {
  GET_PRODUCT,
  PRODUCT_ERROR,
  REQUEST_PRODUCT,
  COMMENT_ERROR,
  GET_COMMENT
} from '../constants/product';
import ProductAPI from '../services/ProductAPI';

export const getCurrentProduct = productId => async dispatch => {
  try {
    const res = await ProductAPI.getCurrentProduct(productId);

    dispatch({
      type: REQUEST_PRODUCT
    });

    const {
      enabled,
      description,
      comments,
      productUrlImg,
      nameProduct,
      _idChildCategory: {
        name: nameChildCatalog,
        parentId: { name: nameRootCatalog }
      },
      filters,
      filterImg,
      model,
      itemNo,
      htmlPage
    } = res;

    dispatch({
      type: GET_PRODUCT,
      payload: {
        enabled,
        description,
        comments,
        productUrlImg,
        nameProduct,
        nameChildCatalog,
        nameRootCatalog,
        filters,
        filterImg,
        model,
        itemNo,
        htmlPage
      }
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR
    });
  }
};

export const getMeanRatingProductByProductId = productId => async dispatch => {
  try {
    const res = await ProductAPI.getMeanRatingProductByProductId(productId);
    dispatch({
      type: GET_COMMENT,
      payload: {
        rating: res.rating
      }
    });
  } catch (err) {
    dispatch({
      type: COMMENT_ERROR
    });
  }
};
