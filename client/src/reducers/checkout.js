import * as CHECKOUT from '../constants/checkout';

const initState = {
  activeStep: 0,
  statusNextStep: false,
  numberOfSteps: 0,
  order: {
    personalData: {
      name: '',
      email: '',
      phone: ''
    }
  }
};

export default function(state = initState, action) {
  switch (action.type) {
    case CHECKOUT.CHANGE_STEP:
      return {
        ...state,
        activeStep: action.payload
      };

    case CHECKOUT.CHANGE_NEXT_STEP:
      return {
        ...state,
        statusNextStep: action.payload
      };

    case CHECKOUT.CHANGE_STEP_OF_LENGTH:
      return {
        ...state,
        numberOfSteps: action.payload
      };
    case CHECKOUT.SPECIFY_PERSONAL_DATA:
      return {
        ...state,
        order: {
          ...state.order,
          personalData: action.payload
        }
      };
    default:
      return state;
  }
}
