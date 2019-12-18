import React, { Component } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AuthorizationAPI from '../../../services/AuthorizationAPI';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        email: ''
      },
      send: false,
      response: ''
    };
  }

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

  handleSubmit = event => {
    event.preventDefault();
    this.setState(prevState => ({
      send: !prevState.send
    }));
    const { formData } = this.state;
    AuthorizationAPI.forgotPassword(formData.email)
      .then(res => {
        this.setState({ response: res.data.message });
      })
      .catch(err => {
        this.setState({ response: err.response.data.message });
      });
  };

  render() {
    const { formData, send, response } = this.state;
    const { toggleForgotPassword } = this.props;
    return (
      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmit}
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
        <Box mt={2} mb={2}>
          <Button disabled={send} type="submit" fullWidth variant="contained" color="primary">
            Restore
          </Button>
        </Box>
        <Grid item xs>
          <Typography
            align={'center'}
            onClick={toggleForgotPassword}
            className="other-account"
            variant="body2"
          >
            {'Already have login and password?'}
          </Typography>
        </Grid>
      </ValidatorForm>
    );
  }
}

export default ForgotPassword;
