import React, {Component} from 'react';
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import InputAdornment from "@material-ui/core/InputAdornment";
import {RemoveRedEye, VisibilityOff} from '@material-ui/icons';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import axios from 'axios';
import InputPhone from "./InputPhone";


import SelectValidatorElemen from "./SelectValidatorElemen";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        firstName: '',
        lastName: '',
        login: '',
        email: '',
        gender: '',
        password: '',
        repeatPassword: '',
      },
      passwordIsMasked: true,
      repeatPasswordIsMasked: true,
      indexTimeoutLogin: 0,
      indexTimeoutEmail: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePasswordMask = this.togglePasswordMask.bind(this);
    this.toggleRepeatPasswordMask = this.toggleRepeatPasswordMask.bind(this);
  }

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      const {formData} = this.state;
      if (value !== formData.password) {
        return false;
      }
      return true;
    });

    ValidatorForm.addValidationRule('isLoginUse', async (value) => {
      let result = await axios.post('/customers/check', {
        type: 'login',
        data: value
      });
      return result.data.status;
    });

    ValidatorForm.addValidationRule('isEmailUse', async (value) => {
      let result = await axios.post('/customers/check', {
        type: 'email',
        data: value
      });
      return result.data.status;
    });

  }

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule('isPasswordMatch');
    ValidatorForm.removeValidationRule('isLoginUse');
    ValidatorForm.removeValidationRule('isEmailUse');
  }

  handleChange = (event) => {
    const {formData} = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({formData});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };

  togglePasswordMask = (event) => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked,
    }));
  };
  toggleRepeatPasswordMask = (event) => {
    this.setState(prevState => ({
      repeatPasswordIsMasked: !prevState.repeatPasswordIsMasked,
    }));
  };

  render() {
    const {formData, passwordIsMasked, repeatPasswordIsMasked} = this.state;
    return <ValidatorForm
      ref='form'
      onSubmit={this.handleSubmit}
      onError={errors => console.log(errors)}
    >
      <TextValidator
        margin="normal"
        label="First name"
        onChange={this.handleChange}
        name="firstName"
        fullWidth
        value={formData.firstName}
        variant="outlined"
        validators={['required']}
        errorMessages={['This field is required']}
      />
      <TextValidator
        margin="normal"
        label="Last name"
        onChange={this.handleChange}
        name="lastName"
        fullWidth
        value={formData.lastName}
        variant="outlined"
        validators={['required']}
        errorMessages={['This field is required']}
      />
      <TextValidator
        margin="normal"
        label="Login"
        onChange={this.handleChange}
        name="login"
        fullWidth
        value={formData.login}
        variant="outlined"
        validators={['required', 'isLoginUse']}
        errorMessages={['This field is required', 'This login is already in use']}
      />
      <TextValidator
        margin="normal"
        label="Email"
        onChange={this.handleChange}
        name="email"
        fullWidth
        value={formData.email}
        variant="outlined"
        validators={['required', 'isEmail', 'isEmailUse']}
        errorMessages={['This field is required', 'Email is not valid', 'This mail is already in use']}
      />
      <Box>
        <SelectValidatorElemen
          labelId="gender"
          id="gender"
          name="gender"
          value={formData.gender}
          labelWidth={100}
          onChange={this.handleChange}
          validators={['required']}
          errorMessages={['This field is required']}
        />
      </Box>
      <TextValidator
        type={passwordIsMasked ? 'password' : 'text'}
        margin="normal"
        label="Password"
        onChange={this.handleChange}
        name="password"
        fullWidth
        variant="outlined"
        value={formData.password}
        validators={['required']}
        errorMessages={['This field is required']}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end"
                            onClick={this.togglePasswordMask}
                            className='password-eyes'
            >
              {passwordIsMasked ? <RemoveRedEye/> : <VisibilityOff/>}
            </InputAdornment>
          ),
        }}
      />
      <TextValidator
        type={repeatPasswordIsMasked ? 'password' : 'text'}
        margin="normal"
        label="Repeat password"
        onChange={this.handleChange}
        name="repeatPassword"
        fullWidth
        variant="outlined"
        validators={['isPasswordMatch', 'required']}
        errorMessages={['Password mismatch', 'This field is required']}
        value={formData.repeatPassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end"
                            onClick={this.toggleRepeatPasswordMask}
                            className='password-eyes'
            >
              {repeatPasswordIsMasked ? <RemoveRedEye/> : <VisibilityOff/>}
            </InputAdornment>
          ),
        }}
      />
      <Box
        mt={1}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign Up
        </Button>

      </Box>
    </ValidatorForm>;
  }
}

export default SignUp;
