import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import * as CheckoutAction from '../../../actions/checkoutAction';
import { connect } from 'react-redux';

import './NavigationButton.scss';

class NavigationButton extends Component {
  render() {
    const { changeStep } = this.props;
    const { activeStep, statusNextStep, numberOfSteps } = this.props.checkout;
    const { isAuthorization } = this.props.authorization;
    return (
      <div className="NavigationButton-container">
        <Button
          disabled={activeStep === 0 || !isAuthorization}
          onClick={() => {
            changeStep(activeStep, false);
          }}
        >
          Back
        </Button>
        <Button
          type="submit"
          disabled={statusNextStep || !isAuthorization}
          variant="contained"
          color="primary"
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
