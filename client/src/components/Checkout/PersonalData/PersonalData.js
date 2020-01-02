import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationButton from '../NavigationButton/NavigationButton';

class PersonalData extends Component {
  render() {
    const { activeStep, changeStep, stepLength } = this.props;
    return (
      <div>
        <div>1</div>
        <NavigationButton activeStep={activeStep} changeStep={changeStep} stepLength={stepLength} />
      </div>
    );
  }
}

PersonalData.propTypes = {
  changeStep: PropTypes.func,
  activeStep: PropTypes.number,
  stepLength: PropTypes.number
};

export default PersonalData;
