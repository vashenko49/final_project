import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import * as CheckoutAction from '../../../actions/checkoutAction';
import { connect } from 'react-redux';

class NavigationButton extends Component {
  handleStep = direction => {
    const { activeStep } = this.props.checkout;
    const { changeStep } = this.props;
    if (direction) {
      changeStep(activeStep + 1);
    } else {
      changeStep(activeStep - 1);
    }
  };

  render() {
    const { activeStep, statusNextStep, numberOfSteps } = this.props.checkout;
    const { isAuthorization } = this.props.authorization;
    const { handleStep } = this;
    return (
      <div>
        <Button disabled={activeStep === 0 || !isAuthorization} onClick={() => handleStep(false)}>
          Back
        </Button>
        <Button
          type="submit"
          disabled={statusNextStep || !isAuthorization}
          variant="contained"
          color="primary"
          onClick={() => handleStep(true)}
        >
          {activeStep === numberOfSteps - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    checkout: state.checkout,
    authorization: state.authorization
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeStep: bindActionCreators(CheckoutAction.changeStep, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationButton);
