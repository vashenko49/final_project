import * as FOOTERSUBSCRIBE from '../constants/footerSubscribe';

import FooterSubscribeAPI from '../services/FooterSubscribeAPI';

export function addSubscriber(email) {
  return async dispatch => {
    dispatch({
      type: FOOTERSUBSCRIBE.ADD_API_REQUEST
    });

    try {
      const res = await FooterSubscribeAPI.addSubscriber(email);
      dispatch({
        type: FOOTERSUBSCRIBE.ADD_API_SUCCEEDED,
        payload: res.data.msg
      });
    } catch (err) {
      dispatch({
        type: FOOTERSUBSCRIBE.ADD_API_FAILED,
        payload: err.response.data.msg
      });
    }
  };
}

export function saveEmailToStore(email) {
  return dispatch => {
    dispatch({
      type: FOOTERSUBSCRIBE.SAVE_EMAIL,
      payload: email
    });
  };
}
