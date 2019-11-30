import React, { Component } from "react";
import { Link } from 'react-router-dom';

import './Links.scss';

export default class Links extends Component {
  render() {
    return (
      <div className="footer-menu">
        <ul className="footer-menu-list">
          <li className="footer-menu-list-header">{this.props.link.title}</li>
          {this.props.link.links.map(item => <li className="footer-menu-list-item"><Link to={item.url}>{item.description}</Link></li>)}
        </ul>
      </div>
    )
  }
}
