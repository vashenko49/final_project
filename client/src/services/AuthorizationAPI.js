import axios from 'axios';

export default class AuthorizationAPI {
  static registration({ firstName, lastName, login, email, password, telephone, gender }) {
    return axios
      .post('/customer', {
        firstName,
        lastName,
        login,
        email,
        password,
        telephone,
        gender
      })
      .then(res => {
        return res.data;
      });
  }

  static loginInSystem({ loginOrEmail, password }) {
    return axios
      .post('/customers/login', {
        loginOrEmail: loginOrEmail,
        password: password
      })
      .then(res => {
        return res.data;
      });
  }
}
