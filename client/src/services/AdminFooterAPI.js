import axios from 'axios';

export default class AdminFooterAPI {
  static getFooter() {
    return axios.get(`/links`);
  }

  static getFooterById(id) {
    return axios.get(`/links/${id}`);
  }

  static createFooter(body) {
    return axios.post(`/links`, body);
  }

  static updateFooter(idGroupLink, body) {
    return axios.put(`/links/${idGroupLink}`, body);
  }

  static deleteFooterGroupLinks(idGroupLink) {
    return axios.delete(`/links/${idGroupLink}`);
  }

  static deleteFooterLink(idGroupLink, body) {
    return axios.put(`/links/delete/${idGroupLink}`, body);
  }

  // static changeStatusFooter(idGroupLink, body) {
  //   return axios.put(`/links/${idGroupLink}`, body);
  // }
}
