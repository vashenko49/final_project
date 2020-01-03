import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { bindActionCreators } from 'redux';

// import { getCurrentItems } from '../../actions/cart';

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
        <Link to={`/`}>
          <button className="black-btn">Checkout</button>
        </Link>
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     getCurrentItems: bindActionCreators(getCurrentItems, dispatch)
//   };
// };

export default connect()(Checkout);
