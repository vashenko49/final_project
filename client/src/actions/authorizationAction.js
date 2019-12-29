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
        localStorage.removeItem('Authorization');
        return dispatch({
          type: AUTHORIZATION.LOG_IN_API_FAILED
        });
      });
  };
}

export function failSocial() {
  return dispatch => {
    localStorage.removeItem('Authorization');
    dispatch({
      type: AUTHORIZATION.LOG_IN_API_FAILED
    });
  };
}

export function openWindowAuth() {
  return dispatch => {
    dispatch({
      type: AUTHORIZATION.OPEN_WINDOW_AUTH
    });
  };
}

export function closeWindowAuth() {
  return dispatch => {
    dispatch({
      type: AUTHORIZATION.CLOSE_WINDOW_AUTH
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
        localStorage.removeItem('Authorization');
        return dispatch({
          type: AUTHORIZATION.LOG_IN_API_FAILED
        });
      });
  };
}

export function signOut() {
  return dispatch => {
    dispatch({
      type: AUTHORIZATION.LOG_OUT
    });
  };
}
