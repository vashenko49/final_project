import * as AUTHORIZATION from '../constants/authorization';
import AuthorizationAPI from '../services/AuthorizationAPI';
import setAuthToken from '../utils/setAuthToken';

export function loginInSystem(userData, callback) {
  return dispatch => {
    dispatch({
      type: AUTHORIZATION.LOG_IN_API_REQUEST
    });

    callback(userData)
      .then(res => {
        const { token } = res;
        dispatch({
          type: AUTHORIZATION.LOG_IN_API_GET_TOKEN_SUCCEEDED,
          payload: token
        });

        AuthorizationAPI.getCustomerUsingToken(token)
          .then(res => {
            localStorage.setItem('Authorization', token);
            setAuthToken(token);
            res.token = token;
            return dispatch({
              type: AUTHORIZATION.LOG_IN_API_SUCCEEDED,
              payload: res
            });
          })
          .catch(e => {
            throw e;
          });
      })
      .catch(() => {
        return dispatch({
          type: AUTHORIZATION.LOG_IN_API_FAILED
        });
      });
  };
}

export function failSocial() {
  return dispatch => {
    dispatch({
      type: AUTHORIZATION.LOG_IN_API_FAILED
    });
  };
}

export function AuthorizationThroughLocalStorage(token) {
  return dispatch => {
    AuthorizationAPI.getCustomerUsingToken(token)
      .then(res => {
        localStorage.setItem('Authorization', token);
        setAuthToken(token);
        res.token = token;
        return dispatch({
          type: AUTHORIZATION.LOG_IN_API_SUCCEEDED,
          payload: res
        });
      })
      .catch(() => {
        return dispatch({
          type: AUTHORIZATION.LOG_IN_API_FAILED
        });
      });
  };
}
