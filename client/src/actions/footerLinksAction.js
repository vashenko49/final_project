import * as FOOTERLINKS from '../constants/footerLinks';

import FooterLinksAPI from '../services/FooterLinksAPI';

export function getFooterLinks() {
  return async dispatch => {
    dispatch({
      type: FOOTERLINKS.GET_API_REQUEST
    });

    try {
      const res = await FooterLinksAPI.getFooterLinks();
      dispatch({
        type: FOOTERLINKS.GET_API_SUCCEEDED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FOOTERLINKS.GET_API_FAILED,
        payload: err
      });
    }
  };
}
