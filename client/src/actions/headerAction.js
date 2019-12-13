import * as HEADER from '../constants/header';

import HeaderAPI from '../services/HeaderAPI';

export function getRootCategories() {
  return dispatch => {
    dispatch({
      type: HEADER.GET_API_ROOT_CATEGORIES_REQUEST
    });

    HeaderAPI.getRootCategories()
      .then(res => {
        return dispatch({
          type: HEADER.GET_API_ROOT_CATEGORIES_SUCCEEDED,
          payload: res.data
        });
      })

      .catch(err => {
        return dispatch({
          type: HEADER.GET_API_ROOT_CATEGORIES_FAILED,
          payload: err
        });
      });
  };
}

export function getChildCategories() {
  return dispatch => {
    dispatch({
      type: HEADER.GET_API_CHILD_CATEGORIES_REQUEST
    });

    HeaderAPI.getChildCategories()
      .then(res => {
        return dispatch({
          type: HEADER.GET_API_CHILD_CATEGORIES_SUCCEEDED,
          payload: res.data
        });
      })

      .catch(err => {
        return dispatch({
          type: HEADER.GET_API_CHILD_CATEGORIES_FAILED,
          payload: err
        });
      });
  };
}
