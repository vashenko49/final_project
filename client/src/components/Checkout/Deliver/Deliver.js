import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationButton from '../NavigationButton/NavigationButton';

class Deliver extends Component {
  render() {
    const { activeStep, changeStep, stepLength } = this.props;
    return (
      <div>
        <div>2</div>
        <NavigationButton activeStep={activeStep} changeStep={changeStep} stepLength={stepLength} />
      </div>
    );
  }
}

Deliver.propTypes = {
  changeStep: PropTypes.func,
  activeStep: PropTypes.number,
  stepLength: PropTypes.number
};

export default Deliver;
