import {
  GET_PRODUCT,
  PRODUCT_ERROR,
  REQUEST_PRODUCT,
  COMMENT_ERROR,
  GET_COMMENT,
  EDIT_SELECTED_IMG
} from '../constants/product';
import ProductAPI from '../services/ProductAPI';
import _ from 'lodash';

export const getCurrentProduct = productId => async dispatch => {
  try {
    const res = await ProductAPI.getCurrentProduct(productId);

    dispatch({
      type: REQUEST_PRODUCT
    });
    const massImg = [];
    const {
      enabled,
      description,
      comments,
      productUrlImg,
      nameProduct,
      _idChildCategory: {
        name: nameChildCatalog,
        _id: _idChildCategory,
        parentId: { name: nameRootCatalog }
      },
      filters,
      filterImg,
      model,
      itemNo,
      htmlPage
    } = res;

    filterImg.forEach(item => {
      massImg.push(...item.urlImg);
    });
    massImg.push(...productUrlImg);

    dispatch({
      type: GET_PRODUCT,
      payload: {
        enabled,
        description,
        comments,
        productUrlImg,
        _idChildCategory,
        nameProduct,
        nameChildCatalog,
        nameRootCatalog,
        filters,
        filterImg,
        model,
        itemNo,
        htmlPage,
        price: `${
          _.minBy(model, function(o) {
            return o.currentPrice;
          }).currentPrice
        } - ${
          _.maxBy(model, function(o) {
            return o.currentPrice;
          }).currentPrice
        }`,
        selectedIndexImg: 0,
        massImg
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

export const changeImg = selectedIndexImg => dispatch => {
  dispatch({
    type: EDIT_SELECTED_IMG,
    payload: {
      selectedIndexImg: selectedIndexImg
    }
  });
};
