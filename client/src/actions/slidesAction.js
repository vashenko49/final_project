import * as SLIDES from '../constants/slides';

import SlidesAPI from '../services/SlidesAPI';

export function getActiveSlides() {
  return dispatch => {
    dispatch({
      type: SLIDES.GET_API_SLIDES_REQUEST
    });

    SlidesAPI.getActiveSlides()
      .then(res => {
        return dispatch({
          type: SLIDES.GET_API_SLIDES_SUCCEEDED,
          payload: res.data
        });
      })

      .catch(err => {
        return dispatch({
          type: SLIDES.GET_API_SLIDES_FAILED,
          payload: err
        });
      });
  };
}
