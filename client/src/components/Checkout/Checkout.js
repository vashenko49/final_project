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

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      steps: [],
      component: []
    };
  }
  // false - back, true - next
  handleStep = direction => {
    const { activeStep } = this.state;
    if (direction) {
      this.setState({ activeStep: activeStep + 1 });
    } else {
      this.setState({ activeStep: activeStep - 1 });
    }
  };

  componentDidMount() {
    this.setState({
      steps: [
        'Personal data',
        'Where to deliver?',
        'How convenient is it to pay?',
        'Check your order'
      ],
      component: [PersonalData, Deliver, PayMethod, CheckOrder]
    });
  }

  render() {
    const { activeStep, steps, component } = this.state;
    const { handleStep } = this;
    return (
      <Container>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel className="custom-color-step">{label}</StepLabel>
                <StepContent>
                  {React.createElement(component[index], {
                    changeStep: handleStep,
                    activeStep: activeStep,
                    stepLength: steps.length
                  })}
                </StepContent>
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
    authorization: state.authorization,
    configuration: state.configuration
  };
}

export default connect(mapStateToProps, null)(Checkout);
