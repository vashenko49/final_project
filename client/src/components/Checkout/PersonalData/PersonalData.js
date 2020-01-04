import React, { Component, Fragment } from 'react';
import NavigationButton from '../NavigationButton/NavigationButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import * as CheckoutAction from '../../../actions/checkoutAction';
import * as AuthorizationActions from '../../../actions/authorizationAction';

import './PersonalData.scss';
import Button from '@material-ui/core/Button';

class PersonalData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personalData: {
        name: '',
        email: '',
        telephone: ''
      }
    };
  }

  componentDidMount() {
    const { isAuthorization } = this.props.authorization;
    const { openWindowAuth } = this.props;
    if (!isAuthorization) {
      openWindowAuth();
    }
    const {
      order: {
        personalData: { name, email, telephone }
      }
    } = this.props.checkout;
    this.setState({ personalData: { name: name, email: email, telephone: telephone } });
  }

  handleChange = event => {
    const { personalData } = this.state;
    personalData[event.target.name] = event.target.value;
    this.setState({ personalData });
  };

  submit = () => {
    const { specifyPersonalData, changeStep } = this.props;
    const {
      personalData: { name, email, telephone }
    } = this.state;
    const { activeStep } = this.props.checkout;
    specifyPersonalData({
      name: name,
      email: email,
      telephone: telephone
    });
    changeStep(activeStep, true);
  };

  usePersonalData = () => {
    const {
      personalInfo: { firstName, lastName, email, telephone }
    } = this.props.authorization;
    const { personalData } = this.state;
    if (_.isString(firstName) && _.isString(lastName)) {
      personalData.name = `${firstName} ${lastName}`;
    }
    if (_.isString(email)) {
      personalData.email = email;
    }
    if (_.isString(telephone)) {
      personalData.telephone = telephone;
    }
    this.setState({ personalData: personalData });
  };

  render() {
    const { submit, handleChange, usePersonalData } = this;
    const { openWindowAuth } = this.props;
    const { isAuthorization } = this.props.authorization;
    const {
      personalData: { name, email, telephone }
    } = this.state;

    return (
      <ValidatorForm ref="form" onSubmit={submit}>
        {!isAuthorization ? (
          <div className="unAuth">
            <Typography variant={'h5'}>
              You are not authorized.{' '}
              <span onClick={openWindowAuth} className="login-or-register">
                Login or register
              </span>{' '}
              for the operation
            </Typography>
          </div>
        ) : (
          <Fragment>
            <TextValidator
              margin="normal"
              label="Your full name"
              onChange={handleChange}
              name="name"
              fullWidth
              value={name}
              variant="outlined"
              validators={['required']}
              errorMessages={['This field is required']}
            />
            <TextValidator
              margin="normal"
              label="Email"
              onChange={handleChange}
              name="email"
              fullWidth
              value={email}
              variant="outlined"
              validators={['required', 'isEmail']}
              errorMessages={[
                'This field is required',
                'Email is not valid',
                'This mail is already in use'
              ]}
            />
            <TextValidator
              margin="normal"
              label="Your phone"
              onChange={handleChange}
              name="telephone"
              fullWidth
              value={telephone}
              variant="outlined"
              validators={['required']}
              errorMessages={['This field is required']}
            />
          </Fragment>
        )}
        <div className="navigate-button-and-use-personal-data">
          <NavigationButton />
          <Button disabled={!isAuthorization} onClick={usePersonalData}>
            Use personal data
          </Button>
        </div>
      </ValidatorForm>
    );
  }
}

function mapStateToProps(state) {
  return {
    authorization: state.authorization,
    checkout: state.checkout
  };
}

function mapDispatchToProps(dispatch) {
  return {
    specifyPersonalData: bindActionCreators(CheckoutAction.specifyPersonalData, dispatch),
    changeStep: bindActionCreators(CheckoutAction.changeStep, dispatch),
    openWindowAuth: bindActionCreators(AuthorizationActions.openWindowAuth, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalData);
