import React, { Component } from 'react';
import { RemoveRedEye, VisibilityOff } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './Login.scss';
import * as AuthorizationActions from '../../../actions/authorizationAction';
import TypeLogIn from '../../../services/AuthorizationAPI';
import ThroughSocialNetwork from '../ThroughSocialNetwork/ThroughSocialNetwork';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        email: '',
        password: ''
      },
      passwordIsMasked: true
    };
  }

  handleChange = event => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { loginInSystem } = this.props;
    const { formData } = this.state;
    loginInSystem(formData, TypeLogIn.login);
  };

  togglePasswordMask = () => {
    if (this.state.formData.password)
      this.setState(prevState => ({
        passwordIsMasked: !prevState.passwordIsMasked
      }));
  };

  render() {
    const { formData, passwordIsMasked } = this.state;
    const { switchToRegistration, toggleForgotPassword } = this.props;
    return (
      <div>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => console.log(errors)}
        >
          <TextValidator
            margin="normal"
            label="Email"
            onChange={this.handleChange}
            name="email"
            fullWidth
            value={formData.email}
            variant="outlined"
            validators={['required', 'isEmail']}
            errorMessages={['This field is required', 'Email is not valid']}
          />
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
          <Box mt={2} mb={2}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Log In
            </Button>
          </Box>
          <Grid container>
            <Grid item xs>
              <Typography onClick={toggleForgotPassword} className="other-account" variant="body2">
                {'Forgot password?'}
              </Typography>
            </Grid>
            <Grid item>
              <Typography onClick={switchToRegistration} className="other-account" variant="body2">
                {"Don't have an account? Sign Up"}
              </Typography>
            </Grid>
          </Grid>
        </ValidatorForm>
        <ThroughSocialNetwork />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
