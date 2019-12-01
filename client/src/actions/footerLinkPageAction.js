import * as FOOTERLINKPAGE from '../constants/footerLinkPage';

import FooterLinkPageAPI from '../services/FooterLinkPageAPI';

export function getFooterLinkPageByCustomId(customId) {
  return async dispatch => {
    dispatch({
      type: FOOTERLINKPAGE.GET_CUSTOMID_API_REQUEST
    });

    try {
      const res = await FooterLinkPageAPI.getFooterLinkPageByCustomId(customId);

      console.log(res);

      dispatch({
        type: FOOTERLINKPAGE.GET_CUSTOMID_API_SUCCEEDED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FOOTERLINKPAGE.GET_CUSTOMID_API_FAILED,
        payload: err.response.data.msg
      });
    }
  };
}
