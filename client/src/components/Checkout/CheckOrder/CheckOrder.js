import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationButton from '../NavigationButton/NavigationButton';

class CheckOrder extends Component {
  render() {
    const { activeStep, changeStep, stepLength } = this.props;
    return (
      <div>
        <div>4</div>
        <NavigationButton activeStep={activeStep} changeStep={changeStep} stepLength={stepLength} />
      </div>
    );
  }
}

CheckOrder.propTypes = {
  changeStep: PropTypes.func,
  activeStep: PropTypes.number,
  stepLength: PropTypes.number
};

export default CheckOrder;
