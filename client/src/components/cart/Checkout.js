import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '5df3e7aeace3e149fcc94957'
    };
  }

  render() {
    return (
      <div className="checkout">
        <Link to={`/checkout`}>
          <button className="black-btn">Checkout</button>
        </Link>
      </div>
    );
  }
}

export default connect()(Checkout);
