import React, { Component } from 'react';
import NavigationButton from '../NavigationButton/NavigationButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CheckoutAction from '../../../actions/checkoutAction';
import PaymentMethodsAPI from '../../../services/paymentMethodsAPI';
import { ValidatorForm } from 'react-material-ui-form-validator';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import PaymentFrom from './PaymentFrom/PaymentFrom';
import _ from 'lodash';
class PayMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payments: [],
      selectedMethodPayment: '',
      cardNumber: '',
      mm_yy: '',
      cvc: ''
    };
  }

  componentDidMount() {
    const { selectedMethodPayment, cardNumber, mm_yy, cvc } = this.props.checkout.order.payment;
    PaymentMethodsAPI.getActivePaymentMethods().then(res => {
      console.log(res);
      this.setState({
        payments: res,
        selectedMethodPayment:
          selectedMethodPayment.length > 0 ? selectedMethodPayment : res[0]._id,
        cardNumber: cardNumber,
        mm_yy: mm_yy,
        cvc: cvc
      });
    });
  }

  handleChange = event => {
    this.setState({ [`${event.target.name}`]: event.target.value });
  };

  submit = () => {
    const { payments, selectedMethodPayment, cardNumber, mm_yy, cvc } = this.state;

    const indexSelected = _.findIndex(payments, function(o) {
      return o._id === selectedMethodPayment;
    });
    const { specifyPaymentData, changeStep } = this.props;
    const { activeStep } = this.props.checkout;
    specifyPaymentData({
      nameMethodPayment: payments[indexSelected].name,
      selectedMethodPayment,
      cardNumber,
      mm_yy,
      cvc
    });
    changeStep(activeStep, true);
  };

  render() {
    const { submit, handleChange } = this;
    const { selectedMethodPayment, payments, cardNumber, mm_yy, cvc } = this.state;
    return (
      <ValidatorForm ref="form" onSubmit={submit}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Delivery Company</FormLabel>
          <RadioGroup
            aria-label="selectedMethodPayment"
            name="selectedMethodPayment"
            value={selectedMethodPayment}
            onChange={handleChange}
          >
            {payments.map(item => {
              const { name, _id, isPayOnline } = item;
              return (
                <div key={_id}>
                  <FormControlLabel
                    label={name}
                    value={_id}
                    control={<Radio className="radio-color" />}
                  />
                  {selectedMethodPayment === _id && isPayOnline && (
                    <PaymentFrom
                      handleChange={handleChange}
                      cardData={{ cardNumber, mm_yy, cvc }}
                    />
                  )}
                </div>
              );
            })}
          </RadioGroup>
        </FormControl>
        <NavigationButton />
      </ValidatorForm>
    );
  }
}

function mapStateToProps(state) {
  return {
    checkout: state.checkout
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeStep: bindActionCreators(CheckoutAction.changeStep, dispatch),
    specifyPaymentData: bindActionCreators(CheckoutAction.specifyPaymentData, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PayMethod);
