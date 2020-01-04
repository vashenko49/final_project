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
        <div>4</div>
        <NavigationButton />
      </ValidatorForm>
    );
  }
}

function mapStateToProps(state) {
  return {
    checkout: state.checkout,
    configuration: state.configuration
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetOrder: bindActionCreators(CheckoutAction.resetOrder, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOrder);
