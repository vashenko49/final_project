import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCurrentItems } from '../../actions/cart';

import Item from './Item';
import Bag from './Bag';
import Checkout from './Checkout';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '5df3e7aeace3e149fcc94957'
    };
  }

  componentDidMount() {
    this.props.getCurrentItems(this.state._id);
  }

  render() {
    return (
      <div className="cart">
        <Bag user={this.state._id} />
        <Item customerId={this.state._id} />
        <Checkout />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentItems: bindActionCreators(getCurrentItems, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(Cart);
