import React from 'react';
import { ValidatorComponent } from 'react-form-validator-core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import './SignUp.scss';

export default class TextValidator extends ValidatorComponent {
  render() {
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
      <FormControl className="select-gender" margin="normal" variant="outlined">
        <InputLabel id="gender">Select gender</InputLabel>
        <Select {...rest} error={!isValid || error}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'male'}>Male</MenuItem>
          <MenuItem value={'female'}>Female</MenuItem>
        </Select>
        {!isValid && (
          <FormHelperText variant={'outlined'}>
            {(!isValid && this.getErrorMessage()) || helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}
