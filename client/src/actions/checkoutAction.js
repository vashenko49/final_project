import * as CHECKOUT from '../constants/checkout';

export function changeStep(activeStep, direction) {
  return dispatch => {
    if (direction) {
      dispatch({
        type: CHECKOUT.CHANGE_STEP,
        payload: activeStep + 1
      });
    } else {
      dispatch({
        type: CHECKOUT.CHANGE_STEP,
        payload: activeStep - 1
      });
    }
  };
}

export function changeStatusNextStep(status) {
  return dispatch => {
    dispatch({
      type: CHECKOUT.CHANGE_NEXT_STEP,
      payload: status
    });
  };
}

export function changeStepOfLength(length) {
  return dispatch => {
    dispatch({
      type: CHECKOUT.CHANGE_STEP_OF_LENGTH,
      payload: length
    });
  };
}

export function specifyPersonalData(personalData) {
  return dispatch => {
    dispatch({
      type: CHECKOUT.SPECIFY_PERSONAL_DATA,
      payload: personalData
    });
  };
}

export function specifyDeliveryData(deliveryData) {
  return dispatch => {
    dispatch({
      type: CHECKOUT.SPECIFY_DELIVERY_DATA,
      payload: deliveryData
    });
  };
}

export function specifyPaymentData(paymentData) {
  return dispatch => {
    dispatch({
      type: CHECKOUT.SPECIFY_PAYMENT_DATA,
      payload: paymentData
    });
  };
}
