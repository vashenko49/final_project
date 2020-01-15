import axios from 'axios';

export default class AdminFooterAPI {
  static getFooter() {
    return axios.get(`/api/links`);
  }

  static getFooterById(id) {
    return axios.get(`/api/links/${id}`);
  }

  static createFooter(body) {
    return axios.post(`/api/links`, body);
  }

  static updateFooter(idGroupLink, body) {
    return axios.put(`/api/links/${idGroupLink}`, body);
  }

  static deleteFooterGroupLinks(idGroupLink) {
    return axios.delete(`/api/links/${idGroupLink}`);
  }

  static deleteFooterLink(idGroupLink, body) {
    return axios.put(`/api/links/delete/${idGroupLink}`, body);
  }

  static changeStatusLink(id, status) {
    return axios.put(`/api/links/activateordeactivate`, {
      _idLink: id,
      status
    });
  }

  static changeStatusLinkChild(id, idChild, status) {
    return axios.put(`/api/links/child/activateordeactivate`, {
      _idLink: id,
      _idLinkChild: idChild,
      status
    });
  }
}
