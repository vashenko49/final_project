import React, { Component } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import InputAdornment from '@material-ui/core/InputAdornment';
import { RemoveRedEye, VisibilityOff } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import * as AuthorizationActions from '../../../actions/authorizationAction';
import { connect } from 'react-redux';
import DialogTextWindow from '../DialogTextWindow/DialogTextWindow';
import AuthorizationAPI from '../../../services/AuthorizationAPI';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

import './ChangePassword.scss';
import Box from '@material-ui/core/Box';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: { data: '', status: true },
      newPasswordOne: { data: '', status: true },
      newPasswordTwo: { data: '', status: true },
      isOldPassword: true,
      response: ''
    };
  }
  componentDidMount() {
    AuthorizationAPI.isPassword().then(res => {
      const { status } = res;
      this.setState({ isOldPassword: status });
    });
    ValidatorForm.addValidationRule('isPasswordMatch', () => {
      const {
        newPasswordOne: { data: newPasswordOne },
        newPasswordTwo: { data: newPasswordTwo }
      } = this.state;
      return newPasswordOne === newPasswordTwo;
    });
  }
  componentWillUnmount() {
    ValidatorForm.removeValidationRule('isPasswordMatch');
  }

  togglePasswordMask = event => {
    const name = event.currentTarget.dataset.name;
    this.setState({
      [`${name}`]: { ...this.state[`${name}`], status: !this.state[`${name}`].status }
    });
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [`${name}`]: { ...this.state[`${name}`], data: value } });
  };
  submit = event => {
    event.preventDefault();
    const { resetPassword } = this.props;

    const {
      newPasswordOne: { data: newPasswordOne },
      currentPassword: { data: currentPassword },
      isOldPassword
    } = this.state;
    const newData = { newPassword: newPasswordOne };
    if (isOldPassword) {
      newData.password = currentPassword;
    }

    resetPassword(newData);
    this.setState({
      currentPassword: { data: '', status: true },
      newPasswordOne: { data: '', status: true },
      newPasswordTwo: { data: '', status: true }
    });
  };

  activeAccount = () => {
    AuthorizationAPI.enablesAccountCustom()
      .then(res => {
        this.setState({ response: res.message });
      })
      .catch(err => {
        this.setState({ response: err.response.data.message });
      });
  };

  render() {
    const { submit, togglePasswordMask, handleChange, activeAccount } = this;
    const { currentPassword, newPasswordOne, newPasswordTwo, isOldPassword, response } = this.state;
    const { resetError } = this.props;
    const { load, error, enabled } = this.props.authorization;
    return (
      <div>
        <ValidatorForm ref="form" onSubmit={submit}>
          {isOldPassword && (
            <TextValidator
              type={currentPassword.status ? 'password' : 'text'}
              margin="normal"
              label="Current password"
              onChange={handleChange}
              name="currentPassword"
              fullWidth
              variant="outlined"
              value={currentPassword.data}
              disabled={load}
              validators={['required']}
              errorMessages={['This field is required']}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    data-name={'currentPassword'}
                    onClick={togglePasswordMask}
                    className="password-eyes"
                  >
                    {currentPassword.status ? <RemoveRedEye /> : <VisibilityOff />}
                  </InputAdornment>
                )
              }}
            />
          )}

          <TextValidator
            type={newPasswordOne.status ? 'password' : 'text'}
            margin="normal"
            label="New Password"
            onChange={handleChange}
            name="newPasswordOne"
            fullWidth
            variant="outlined"
            disabled={load}
            value={newPasswordOne.data}
            validators={['required']}
            errorMessages={['This field is required']}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  data-name={'newPasswordOne'}
                  onClick={togglePasswordMask}
                  className="password-eyes"
                >
                  {newPasswordOne.status ? <RemoveRedEye /> : <VisibilityOff />}
                </InputAdornment>
              )
            }}
          />
          <TextValidator
            type={newPasswordTwo.status ? 'password' : 'text'}
            margin="normal"
            label="Confirm new password"
            onChange={handleChange}
            name="newPasswordTwo"
            fullWidth
            disabled={load}
            variant="outlined"
            value={newPasswordTwo.data}
            validators={['required', 'isPasswordMatch']}
            errorMessages={['This field is required', 'isPasswordMatch']}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  data-name={'newPasswordTwo'}
                  onClick={togglePasswordMask}
                  className="password-eyes"
                >
                  {newPasswordTwo.status ? <RemoveRedEye /> : <VisibilityOff />}
                </InputAdornment>
              )
            }}
          />
          <Button
            type="submit"
            disabled={
              !_.findKey(this.state, function(o) {
                const { data } = o;
                if (_.isString(data)) {
                  return o.data.length > 0;
                } else {
                  return true;
                }
              }) || load
            }
            variant="contained"
            color="primary"
          >
            Save Changes
          </Button>
          {load && <CircularProgress className="preloader" />}
          <DialogTextWindow
            open={error.length > 0}
            onClose={() => {
              resetError();
            }}
            error={error}
          />
        </ValidatorForm>
        {!enabled && (
          <Box mt={1}>
            {_.isString(response) && response.length > 0 && <Typography>{response}</Typography>}
            <Typography variant={'h6'}>Your account is nor activate</Typography>
            <div className="container-active-account">
              <Button onClick={activeAccount} variant="contained" color="primary">
                Active account
              </Button>
            </div>
          </Box>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authorization: state.authorization };
}

function mapDispatchToProps(dispatch) {
  return {
    resetError: bindActionCreators(AuthorizationActions.resetError, dispatch),
    resetPassword: bindActionCreators(AuthorizationActions.resetPassword, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
