import axios from 'axios';

export default class AuthorizationAPI {
  static responseGoogle = response => {
    return axios
      .post('/api/customers/google', {
        access_token: response.accessToken
      })
      .then(value => value.data);
  };

  static responseFacebook = response => {
    return axios
      .post('/api/customers/facebook', {
        access_token: response.accessToken,
        client_id: response.id
      })
      .then(value => value.data);
  };

  static responseGitHub = response => {
    return axios
      .post('/api/customers/github', {
        code: response.code
      })
      .then(value => value.data);
  };

  static login = userData => {
    return axios.post('/api/customers/login', userData).then(value => value.data);
  };

  static registration = userData => {
    return axios.post('/api/customers', userData).then(value => value.data);
  };

  static getCustomerUsingToken = token => {
    const options = {
      headers: {
        Authorization: token
      }
    };
    return axios.get('/api/customers', options).then(res => res.data);
  };

  static forgotPassword = loginOrEmail => {
    return axios.post('/api/customers/forgotpassword', { loginOrEmail: loginOrEmail });
  };

  static recoveryPassword = (password, token) => {
    let config = {
      headers: {
        Authorization: `Bearer ${decodeURI(token)}`
      }
    };

    return axios.put('/api/customers/forgotpassword', { password: password }, config);
  };

  static isPassword = () => {
    return axios.get('/api/customers/ispassword').then(res => res.data);
  };

  static checkLoginOrEmail = data => {
    return axios.post('/api/customers/check', data).then(res => res.data);
  };

  static updatePersonalData = data => {
    return axios.put('/api/customers', data).then(res => res.data);
  };

  static resetPassword = data => {
    return axios.put('/api/customers/password', data).then(res => res.data);
  };

  static checkInUse = data => {
    return axios.post('/api/customers/check', data).then(res => res.data);
  };

  static getCustomers = () => {
    return axios.get('/api/customers/all').then(res => res.data);
  };

  static editStatusCustomer = data => {
    return axios.put('/api/customers/editstatus', data).then(res => res.data);
  };

  static enablesAccountCustom = () => {
    return axios.get('/api/customers/enablesaccountcustom').then(res => res.data);
  };
}
