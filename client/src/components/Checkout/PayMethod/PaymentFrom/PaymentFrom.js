import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextValidator } from 'react-material-ui-form-validator';

class PaymentFrom extends Component {
  handleMAXValue = (event, max) => {
    const { handleChange } = this.props;
    let targetValueLength = event.target.value.length;
    if (targetValueLength <= max) {
      handleChange(event);
    }
  };
  handleMM_YY = event => {
    const { handleChange } = this.props;
    let targetValueLength = event.target.value.length;
    if (targetValueLength <= 5) {
      if (targetValueLength === 2) {
        event.target.value += '/';
      }
      handleChange(event);
    }
  };
  render() {
    const { handleMAXValue, handleMM_YY } = this;
    const { cardNumber, mm_yy, cvc } = this.props.cardData;
    return (
      <div>
        <TextValidator
          margin="normal"
          label="Card number"
          onChange={event => {
            handleMAXValue(event, 16);
          }}
          name="cardNumber"
          fullWidth
          value={cardNumber}
          variant="outlined"
          validators={['required']}
          errorMessages={['This field is required']}
        />
        <TextValidator
          margin="normal"
          label="MM/YY"
          onChange={handleMM_YY}
          name="mm_yy"
          fullWidth
          value={mm_yy}
          variant="outlined"
          validators={['required']}
          errorMessages={['This field is required']}
        />
        <TextValidator
          margin="normal"
          label="CVC"
          onChange={event => {
            handleMAXValue(event, 4);
          }}
          name="cvc"
          fullWidth
          value={cvc}
          variant="outlined"
          validators={['required']}
          errorMessages={['This field is required']}
        />
      </div>
    );
  }
}

PaymentFrom.propTypes = {
  handleChange: PropTypes.func,
  cardData: PropTypes.object
};

export default PaymentFrom;
