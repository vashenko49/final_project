import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import InputAdornment from '@material-ui/core/InputAdornment';
import { RemoveRedEye, VisibilityOff } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';

import SelectValidatorElemen from './SelectValidatorElemen';
import * as AuthorizationActions from '../../../actions/authorizationAction';
import TypeLogIn from '../../../services/AuthorizationAPI';

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
        userAvatar: null
      },
      passwordIsMasked: true,
      repeatPasswordIsMasked: true,
      newImgBase64: ''
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', value => {
      const { formData } = this.state;
      return value === formData.password;
    });

    ValidatorForm.addValidationRule('isLoginUse', async value => {
      let result = await TypeLogIn.checkLoginOrEmail({
        type: 'login',
        data: value
      });
      return result.status;
    });

    ValidatorForm.addValidationRule('isEmailUse', async value => {
      let result = await TypeLogIn.checkLoginOrEmail({
        type: 'email',
        data: value
      });
      return result.status;
    });
  }

  handleNewPhoto = event => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.addEventListener(
      'load',
      () => {
        this.setState({
          newImgBase64: reader.result
        });
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  componentWillUnmount() {
    ValidatorForm.removeValidationRule('isPasswordMatch');
    ValidatorForm.removeValidationRule('isLoginUse');
    ValidatorForm.removeValidationRule('isEmailUse');
  }

  handleChange = event => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };
  handleChangeImg = event => {
    console.log(event.target.files[0]);
    const { formData } = this.state;
    formData[event.target.name] = event.target.files[0];
    this.setState({ formData });
    console.log(this.state.formData.userAvatar);
  };

  handleSubmit = event => {
    event.preventDefault();
    const { loginInSystem } = this.props;
    const { formData } = this.state;
    let form = new FormData();
    form.append('firstName', formData.firstName);
    form.append('lastName', formData.lastName);
    form.append('login', formData.login);
    form.append('email', formData.email);
    form.append('gender', formData.gender);
    form.append('password', formData.password);
    form.append('userAvatar', formData.userAvatar);

    loginInSystem(form, TypeLogIn.registration);
  };

  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked
    }));
  };
  toggleRepeatPasswordMask = () => {
    this.setState(prevState => ({
      repeatPasswordIsMasked: !prevState.repeatPasswordIsMasked
    }));
  };

  render() {
    const { handleChangeImg, handleNewPhoto } = this;
    const { formData, passwordIsMasked, repeatPasswordIsMasked, newImgBase64 } = this.state;
    return (
      <ValidatorForm
        ref="form"
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
          errorMessages={[
            'This field is required',
            'Email is not valid',
            'This mail is already in use'
          ]}
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
        <div className={newImgBase64.length > 0 ? 'container-upload' : ''}>
          <Box>
            <input
              multiple
              className="upload-avatar"
              onChange={event => {
                handleChangeImg(event);
                handleNewPhoto(event);
              }}
              id="raised-button-file"
              name="userAvatar"
              type="file"
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload your avatar
              </Button>
            </label>
          </Box>
          {newImgBase64.length > 0 && (
            <Avatar className={'avatar-upload'} alt="error" src={newImgBase64} />
          )}
        </div>
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
              <InputAdornment
                position="end"
                onClick={this.togglePasswordMask}
                className="password-eyes"
              >
                {passwordIsMasked ? <RemoveRedEye /> : <VisibilityOff />}
              </InputAdornment>
            )
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
              <InputAdornment
                position="end"
                onClick={this.toggleRepeatPasswordMask}
                className="password-eyes"
              >
                {repeatPasswordIsMasked ? <RemoveRedEye /> : <VisibilityOff />}
              </InputAdornment>
            )
          }}
        />
        <Box mt={1}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </Button>
        </Box>
      </ValidatorForm>
    );
  }
}

function mapStateToProps(state) {
  return { authorization: state.authorization };
}

function mapDispatchToProps(dispatch) {
  return {
    loginInSystem: bindActionCreators(AuthorizationActions.loginInSystem, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
