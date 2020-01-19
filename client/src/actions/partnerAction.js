import * as PARTNER from '../constants/partner';

import PartnerAPI from '../services/PartnerAPI';

export function getActivePartners() {
  return dispatch => {
    dispatch({
      type: PARTNER.GET_API_PARTNERS_REQUEST
    });

    PartnerAPI.getActivePartners()
      .then(res => {
        return dispatch({
          type: PARTNER.GET_API_PARTNERS_SUCCEEDED,
          payload: res.data
        });
      })

      .catch(err => {
        return dispatch({
          type: PARTNER.GET_API_PARTNERS_FAILED,
          payload: err
        });
      });
  };
}
