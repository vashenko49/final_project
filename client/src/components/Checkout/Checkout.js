import React, { Component } from 'react';
import { connect } from 'react-redux';
import StepContent from '@material-ui/core/StepContent';
import Container from '@material-ui/core/Container';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import './Checkout.scss';
import PersonalData from './PersonalData/PersonalData';
import Deliver from './Deliver/Deliver';
import PayMethod from './PayMethod/PayMethod';
import CheckOrder from './CheckOrder/CheckOrder';
import { bindActionCreators } from 'redux';
import * as CheckoutAction from '../../actions/checkoutAction';
import * as CartAction from '../../actions/cart';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [],
      component: []
    };
  }
  componentDidMount() {
    const data = {
      steps: [
        'Personal data',
        'Where to deliver?',
        'How convenient is it to pay?',
        'Check your order'
      ],
      component: [PersonalData, Deliver, PayMethod, CheckOrder]
    };
    this.setState(data);

    const { authorization } = this.props;
    console.log(authorization);
    const { changeStepOfLength } = this.props;
    changeStepOfLength(data.steps.length);
  }

  render() {
    const { activeStep } = this.props.checkout;
    const { steps, component } = this.state;
    return (
      <Container>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel className="custom-color-step">{label}</StepLabel>
                <StepContent>{React.createElement(component[index])}</StepContent>
              </Step>
            );
          })}
        </Stepper>
      </Container>
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
    changeStepOfLength: bindActionCreators(CheckoutAction.changeStepOfLength, dispatch),
    getCurrentItems: bindActionCreators(CartAction.getCurrentItems, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
