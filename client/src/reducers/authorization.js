import * as AUTHORIZATION from '../constants/authorization';

const initialState = {
  loading: true,
  openWindowLogIn: false,
  isAuthorization: false,
  isAdmin: false,
  enabled: false,
  jwt: '',
  error: '',
  personalInfo: {
    _id: '',
    customerNo: '',
    firstName: '',
    lastName: '',
    login: '',
    email: '',
    telephone: '',
    birthday: '',
    gender: '',
    avatarUrl: '',
    dateRegistration: ''
  }
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHORIZATION.LOG_IN_API_REQUEST:
    case AUTHORIZATION.UPDATE_PERSONAL_DATA_API_REQUEST:
    case AUTHORIZATION.RESET_PASSWORD_API_REQUEST:
      return {
        ...state,
        loading: false,
        error: ''
      };
    case AUTHORIZATION.LOG_IN_API_GET_TOKEN_SUCCEEDED:
      return {
        ...state,
        loading: false,
        jwt: payload,
        error: ''
      };
    case AUTHORIZATION.LOG_IN_API_SUCCEEDED:
      return {
        ...state,
        isAuthorization: true,
        loading: true,
        isAdmin: payload.isAdmin,
        enabled: payload.enabled,
        error: '',
        jwt: payload.token,
        openWindowLogIn: false,
        personalInfo: {
          customerNo: payload.customerNo,
          firstName: payload.firstName,
          lastName: payload.lastName,
          login: payload.login,
          email: payload.email,
          telephone: payload.telephone,
          birthday: payload.birthday,
          gender: payload.gender,
          avatarUrl: payload.avatarUrl,
          dateRegistration: payload.date
        }
      };
    case AUTHORIZATION.LOG_IN_API_FAILED:
      return {
        ...initialState,
        loading: true,
        openWindowLogIn: true,
        error: 'Failed to log in.'
      };
    case AUTHORIZATION.OPEN_WINDOW_AUTH:
      return {
        ...state,
        openWindowLogIn: true
      };
    case AUTHORIZATION.CLOSE_WINDOW_AUTH:
      return {
        ...state,
        openWindowLogIn: false
      };
    case AUTHORIZATION.LOG_OUT:
      return initialState;
    case AUTHORIZATION.UPDATE_PERSONAL_DATA_API_SUCCEEDED:
      return {
        ...state,
        loading: true,
        error: '',
        personalInfo: {
          customerNo: payload.customerNo,
          firstName: payload.firstName,
          lastName: payload.lastName,
          login: payload.login,
          email: payload.email,
          telephone: payload.telephone,
          birthday: payload.birthday,
          gender: payload.gender,
          avatarUrl: payload.avatarUrl,
          dateRegistration: payload.date
        }
      };
    case AUTHORIZATION.RESET_PASSWORD_DATA_API_SUCCEEDED:
      return {
        ...state,
        error: payload
      };
    case AUTHORIZATION.UPDATE_PERSONAL_DATA_API_ERROR:
    case AUTHORIZATION.RESET_PASSWORD_DATA_API_ERROR:
      return {
        ...state,
        error: payload
      };
    case AUTHORIZATION.RESET_ERROR:
      return {
        ...state,
        error: ''
      };
    default:
      return state;
  }
}
