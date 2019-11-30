import * as FOOTERSUBSCRIBE from '../constants/footerSubscribe';

import FooterSubscribeAPI from '../services/FooterSubscribeAPI';

export function addSubscriber() {
  return async dispatch => {
    dispatch({
      type: FOOTERSUBSCRIBE.ADD_API_REQUEST
    });

    try {
      const res = await FooterSubscribeAPI.addSubscriber();
      dispatch({
        type: FOOTERSUBSCRIBE.ADD_API_SUCCEEDED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FOOTERSUBSCRIBE.ADD_API_FAILED,
        payload: err
      });
    }
  };
}
