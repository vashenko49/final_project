import * as CONFIGURATION from '../constants/configuration';
import ConfigurationAPI from '../services/ConfigurationAPI';

export function getConfigForSystem() {
  return dispatch => {
    dispatch({
      type: CONFIGURATION.CONFIGURATION_API_REQUEST
    });

    ConfigurationAPI.getConfigForClient()
      .then(res => {
        dispatch({
          type: CONFIGURATION.CONFIGURATION_API_SUCCEEDED,
          payload: res
        });
      })
      .catch(() => {
        dispatch({
          type: CONFIGURATION.CONFIGURATION_API_FAILED
        });
      });
  };
}
