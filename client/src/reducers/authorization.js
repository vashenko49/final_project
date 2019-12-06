import * as AUTHORIZATION from '../constants/authorization';

const initialState = {
  loading: true,
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
  },
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case AUTHORIZATION.LOG_IN_API_REQUEST:
      return {
        ...state,
        loading: true,
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
        isAdmin: payload.isAdmin,
        enabled: payload.enabled,
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
        ...state,
        loading: false,
        error: "Failed to log in."
      };
    default:
      return state;
  }
}
