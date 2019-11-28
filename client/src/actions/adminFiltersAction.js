import * as FILTERS from '../constants/adminFilters';

import AdminFiltersAPI from '../services/AdminFiltersAPI';

export function getFilters() {
  return dispatch => {
    dispatch({
      type: FILTERS.GET_API_FILTERS_REQUEST
    });

    AdminFiltersAPI.getFilters()
      .then(res => {
        return dispatch({
          type: FILTERS.GET_API_FILTERS_SUCCEEDED,
          payload: res
        });
      })

      .catch(err => {
        return dispatch({
          type: FILTERS.GET_API_FILTERS_FAILED,
          payload: err
        });
      });
  };
}

export function getFiltersById(id) {
  return dispatch => {
    dispatch({
      type: FILTERS.GET_ID_API_FILTERS_REQUEST
    });

    AdminFiltersAPI.getFiltersById(id)
      .then(res => {
        return dispatch({
          type: FILTERS.GET_ID_API_FILTERS_SUCCEEDED,
          payload: res
        });
      })

      .catch(err => {
        return dispatch({
          type: FILTERS.GET_ID_API_FILTERS_FAILED,
          payload: err
        });
      });
  };
}

export function addFilters(data) {
  return dispatch => {
    dispatch({
      type: FILTERS.ADD_API_FILTERS_REQUEST
    });

    AdminFiltersAPI.addFilters(data)
      .then(res => {
        return dispatch({
          type: FILTERS.ADD_API_FILTERS_SUCCEEDED,
          payload: res
        });
      })
      .catch(err => {
        return dispatch({
          type: FILTERS.ADD_API_FILTERS_FAILED,
          payload: err
        });
      });
  };
}
