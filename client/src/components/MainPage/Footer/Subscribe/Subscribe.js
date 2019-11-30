import React, { Component } from "react";

import './Subscribe.scss';

export default class Subscribe extends Component {
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
