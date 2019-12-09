import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as footerLinksIdAction from '../../../actions/footerLinksIdAction';

import './Links.scss';

class Links extends Component {
  onClick(event) {
    const { onFooterLinkClick } = this.props.onFooterLinkClick;
    onFooterLinkClick(event.target.getAttribute('linkgroupid'));
  }

  render() {
    return (
      <div className="footer-menu">
        <ul className="footer-menu-list">
          <li className="footer-menu-list-header">{this.props.link.title}</li>
          {this.props.link.links.map(item => <li key={item._id} className="footer-menu-list-item"><Link linkgroupid={this.props.link._id} onClick={this.onClick.bind(this)} to={item.url}>{item.description}</Link ></li>)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    id: state.footerLinksId.id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onFooterLinkClick: bindActionCreators(footerLinksIdAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Links);
