import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cloudinary from 'cloudinary-core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash';
import objectToFormData from 'object-to-formdata';

import './PersonalInformation.scss';
import * as AuthorizationActions from '../../../actions/authorizationAction';
import SelectValidatorElemen from '../../Authorization/SignUp/SelectValidatorElemen';
import DialogTextWindow from '../DialogTextWindow/DialogTextWindow';

class PersonalInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: { data: '', changed: false },
      lastName: { data: '', changed: false },
      login: { data: '', changed: false },
      email: { data: '', changed: false },
      telephone: { data: '', changed: false },
      gender: { data: '', changed: false },
      avatarUrl: { data: '', changed: false },
      newImgBase64: ''
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: { data: event.target.value, changed: true } });
  };

  handleNewPhoto = event => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.addEventListener(
      'load',
      () => {
        this.setState({
          newImgBase64: reader.result,
          avatarUrl: { data: file, changed: true }
        });
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  getData = data => {
    const { personalInfo } = this.props.authorization;
    if (!this.state[`${data}`].changed) {
      return _.isString(personalInfo[`${data}`]) ? personalInfo[`${data}`] : '';
    } else {
      return this.state[`${data}`].data;
    }
  };

  submit = event => {
    event.preventDefault();
    const { updatePersonalData } = this.props;
    const newData = {};
    for (let key in this.state) {
      if (_.isBoolean(this.state[`${key}`].changed) && this.state[`${key}`].changed) {
        newData[`${key}`] = this.state[`${key}`].data;
      }
    }
    const options = {
      indices: true,
      nullsAsUndefineds: true
    };

    const formData = objectToFormData(newData, options);
    updatePersonalData(formData);
  };

  render() {
    const { submit, handleChange, getData, handleNewPhoto } = this;
    const {
      avatarUrl: { changed: newImg },
      newImgBase64
    } = this.state;
    const { resetError } = this.props;
    const { load, error } = this.props.authorization;
    const { cloudinary_cloud_name } = this.props.configuration;
    return (
      <div>
        <div className="personal-info-cont">
          <div className="personal-info-avatar-change-avatar-con">
            <Avatar
              alt={getData('firstName')}
              src={
                newImg
                  ? newImgBase64
                  : new cloudinary.Cloudinary({
                      cloud_name: cloudinary_cloud_name
                    }).url(getData('avatarUrl'))
              }
            />
            <div className="change-avatar">
              <input
                className="upload-avatar"
                onChange={handleNewPhoto}
                accept="image/*"
                id="raised-button-file"
                type="file"
              />
              <label htmlFor="raised-button-file">
                <Button component="span">Upload</Button>
              </label>
            </div>
          </div>
          <ValidatorForm className="personal-info-from" ref="form" onSubmit={submit}>
            <TextValidator
              margin="normal"
              label="Your first name"
              onChange={handleChange}
              name="firstName"
              fullWidth
              value={getData('firstName')}
              variant="outlined"
              validators={['required']}
              errorMessages={['This field is required']}
              disabled={load}
            />
            <TextValidator
              margin="normal"
              label="Your last name"
              onChange={handleChange}
              name="lastName"
              fullWidth
              value={getData('lastName')}
              variant="outlined"
              validators={['required']}
              errorMessages={['This field is required']}
              disabled={load}
            />
            <TextValidator
              margin="normal"
              label="Your login"
              onChange={handleChange}
              name="login"
              fullWidth
              value={getData('login')}
              variant="outlined"
              disabled={load}
            />
            <TextValidator
              margin="normal"
              label="Your email"
              onChange={handleChange}
              name="email"
              fullWidth
              value={getData('email')}
              variant="outlined"
              validators={['required', 'isEmail']}
              errorMessages={['This field is required', 'Email is not valid']}
              disabled={load}
            />
            <TextValidator
              margin="normal"
              label="Your telephone"
              onChange={handleChange}
              name="telephone"
              fullWidth
              value={getData('telephone')}
              variant="outlined"
              disabled={load}
            />
            <SelectValidatorElemen
              labelId="gender"
              id="gender"
              name="gender"
              value={getData('gender')}
              labelWidth={100}
              onChange={handleChange}
            />
            <div className="personal-info-submit-preload-con">
              <Button
                type="submit"
                disabled={!_.findKey(this.state, ['changed', true]) || load}
                variant="contained"
                color="primary"
              >
                Save Changes
              </Button>
              {load && <CircularProgress className="preloader" />}
            </div>
          </ValidatorForm>
        </div>
        <DialogTextWindow
          open={error.length > 0}
          onClose={() => {
            resetError();
          }}
          error={error}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authorization: state.authorization, configuration: state.configuration };
}

function mapDispatchToProps(dispatch) {
  return {
    updatePersonalData: bindActionCreators(AuthorizationActions.updatePersonalData, dispatch),
    resetError: bindActionCreators(AuthorizationActions.resetError, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformation);
