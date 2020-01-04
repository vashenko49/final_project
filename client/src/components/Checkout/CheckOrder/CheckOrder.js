import React, { Component } from 'react';
import NavigationButton from '../NavigationButton/NavigationButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CheckoutAction from '../../../actions/checkoutAction';
import { ValidatorForm } from 'react-material-ui-form-validator';

class CheckOrder extends Component {
  submit = () => {};

  render() {
    const { submit } = this;
    return (
      <ValidatorForm ref="form" onSubmit={submit}>
        <NavigationButton />
      </ValidatorForm>
    );
  }
}

function mapStateToProps(state) {
  return {
    checkout: state.checkout,
    configuration: state.configuration,
    cart: state.cart
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetOrder: bindActionCreators(CheckoutAction.resetOrder, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOrder);
