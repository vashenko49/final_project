import React, { Component } from 'react';
import NavigationButton from '../NavigationButton/NavigationButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CheckoutAction from '../../../actions/checkoutAction';

class CheckOrder extends Component {
  render() {
    return (
      <div>
        <div>4</div>
        <NavigationButton />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    checkout: state.checkout
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeStatusNextStep: bindActionCreators(CheckoutAction.changeStatusNextStep, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOrder);
