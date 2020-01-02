import * as CHECKOUT from '../constants/checkout';

export function changeStep(step) {
  return dispatch => {
    dispatch({
      type: CHECKOUT.CHANGE_STEP,
      payload: step
    });
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
