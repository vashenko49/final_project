import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCurrentItems } from '../../actions/cart';


import Item from './Item';
import Bag from './Bag';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '5de5592bf82b736ff4eb3c08',
    };
  }

  componentDidMount() {
    debugger
    this.props.getCurrentItems(this.state._id);
  }

  render() {
    return (
      <Fragment>
        <Bag 
          user={this.state._id} 
          cartInfo={this.props.cart} />
        <Item 
          customerId={this.state._id} 
          cartInfo={this.props.cart}/>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

const mapDispatchToProps = dispatch => {
  return {
    getCurrentItems: bindActionCreators(getCurrentItems, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
