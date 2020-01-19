import React, { Component } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { RemoveRedEye, VisibilityOff } from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import AuthorizationAPI from '../../../services/AuthorizationAPI';
import Grid from '@material-ui/core/Grid';
import '../Authorization.scss';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#33333A'
    },
    secondary: {
      main: '#fafafa'
    }
  }
});

class PasswordRecovery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        password: '',
        repeatPassword: ''
      },
      passwordIsMasked: true,
      repeatPasswordIsMasked: true,
      send: false,
      response: ''
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    this.setState(prevState => ({
      send: !prevState.send
    }));

    const token = this.props.match.params.token;
    const { formData } = this.state;
    AuthorizationAPI.recoveryPassword(formData.password, token)
      .then(res => {
        this.setState({ response: res.data.message });
      })
      .catch(err => {
        this.setState({ response: err.response.data.message });
      });
  };

  handleChange = event => {
    const { formData, send } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
    if (send === true) {
      this.setState(prevState => ({
        send: !prevState.send,
        response: ''
      }));
    }
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

  componentDidMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', value => {
      const { formData } = this.state;
      return value === formData.password;
    });
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule('isPasswordMatch');
  }

  render() {
    const { formData, passwordIsMasked, repeatPasswordIsMasked, response, send } = this.state;
    const { handleSubmit, togglePasswordMask, handleChange, toggleRepeatPasswordMask } = this;
    return (
      <MuiThemeProvider theme={theme}>
        <Container>
          <Grid container direction={'column'} justify={'flex-start'} alignItems="stretch">
            <Grid>
              <h2 className="title-login-singup">Reset Password</h2>
            </Grid>
            <Box p={3}>
              <ValidatorForm
                ref="form"
                onSubmit={handleSubmit}
                onError={errors => console.log(errors)}
              >
                {response && (
                  <Grid item xs>
                    <Typography align={'center'} variant="body2">
                      {response}
                    </Typography>
                  </Grid>
                )}
                <TextValidator
                  type={passwordIsMasked ? 'password' : 'text'}
                  margin="normal"
                  label="Password"
                  onChange={handleChange}
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
                        onClick={togglePasswordMask}
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
                  onChange={handleChange}
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
                        onClick={toggleRepeatPasswordMask}
                        className="password-eyes"
                      >
                        {repeatPasswordIsMasked ? <RemoveRedEye /> : <VisibilityOff />}
                      </InputAdornment>
                    )
                  }}
                />
                <Box mt={1}>
                  <Button
                    disabled={send}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Restore
                  </Button>
                </Box>
              </ValidatorForm>
            </Box>
          </Grid>
        </Container>
      </MuiThemeProvider>
    );
  }
}

export default PasswordRecovery;
