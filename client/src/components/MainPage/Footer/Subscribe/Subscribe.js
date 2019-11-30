import React, { Component } from "react";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as footerSubscribeAction from '../../../../actions/footerSubscribeAction';

import './Subscribe.scss';

class Subscribe extends Component {
  render() {
    return (
      <div>
        <p className="footer-menu-list-header">Subscribe to newsletter</p>
          <input className="subscribe-input" type="text" name="email" placeholder="ENTER YOUR EMAIL"/>
        <div className="subscribe-submit">SUBSCRIBE</div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    footerSubscribeAction: bindActionCreators(footerSubscribeAction, dispatch)
  };
}

export default connect(mapDispatchToProps)(Subscribe);
