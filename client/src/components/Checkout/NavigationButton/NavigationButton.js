import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

class NavigationButton extends Component {
  render() {
    const { activeStep, changeStep, stepLength } = this.props;
    return (
      <div>
        <Button disabled={activeStep === 0} onClick={() => changeStep(false)}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={() => changeStep(true)}>
          {activeStep === stepLength - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    );
  }
}

NavigationButton.propTypes = {
  changeStep: PropTypes.func,
  activeStep: PropTypes.number,
  stepLength: PropTypes.number
};

export default NavigationButton;
