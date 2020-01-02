import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationButton from '../NavigationButton/NavigationButton';

class PayMethod extends Component {
  render() {
    const { activeStep, changeStep, stepLength } = this.props;
    return (
      <div>
        <div>3</div>
        <NavigationButton activeStep={activeStep} changeStep={changeStep} stepLength={stepLength} />
      </div>
    );
  }
}

PayMethod.propTypes = {
  changeStep: PropTypes.func,
  activeStep: PropTypes.number,
  stepLength: PropTypes.number
};

export default PayMethod;
