import {
  GET_DATA_THROUGH_JWT_CLIENT_FAILED,
  GET_DATA_THROUGH_JWT_CLIENT_REQUEST,
  GET_DATA_THROUGH_JWT_CLIENT_SUCCEEDED,
  GET_DATA_THROUGH_JWT_CLIENT_SUCCEEDED_BUT_ENABLED
} from '../constants/authorization';

const initialState = {
  loading: true,
  isAuthorization: false,
  isAdmin: false,
  enabled: false,
  jwt: '',
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
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DATA_THROUGH_JWT_CLIENT_SUCCEEDED:
      return {
        ...state,
        loading: false,
        isAuthorization: true,
        isAdmin: false,
        enabled: true,
        jwt: payload.jwt,
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
          dateRegistration: payload.dateRegistration
        }
      };
    default:
      return state;
  }
}
