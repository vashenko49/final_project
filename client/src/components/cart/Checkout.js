import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Checkout extends Component {
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
