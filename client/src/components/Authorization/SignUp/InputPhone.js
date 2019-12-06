import React from 'react';
import { ValidatorComponent } from 'react-form-validator-core';
import PhoneInput from 'material-ui-phone-number';

export default class TextValidator extends ValidatorComponent {
  render() {
    /* eslint-disable no-unused-vars */
    const {
      error,
      errorMessages,
      validators,
      requiredError,
      helperText,
      validatorListener,
      withRequiredValidator,
      ...rest
    } = this.props;
    const { isValid } = this.state;
    return (
      <PhoneInput
        {...rest}
        id="PhoneUser"
        error={!isValid || error}
        helperText={(!isValid && this.getErrorMessage()) || helperText}
      />
    );
  }
}
