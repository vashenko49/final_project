import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import cloudinary from 'cloudinary-core';
import objectToFormData from 'object-to-formdata';

class PartnerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      enabled: false,
      description: '',
      url: '',
      imageUrl: '',
      newImgBase64: ''
    };
  }

  componentDidMount() {
    if (_.isObject(this.props.partnerData)) {
      this.setState(this.props.partnerData);
    }
  }

  onChange = event => {
    this.setState({ [`${event.target.name}`]: event.target.value });
  };
  handleCheckBox = event => {
    this.setState({ [`${event.target.value}`]: event.target.checked });
  };

  handleNewPhoto = event => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.addEventListener(
      'load',
      () => {
        this.setState({
          newImgBase64: reader.result,
          imageUrl: file
        });
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  submit = event => {
    event.preventDefault();
    const { submit } = this.props;
    const newData = _.cloneDeep(this.state);
    delete newData.newImgBase64;
    const options = {
      indices: true,
      nullsAsUndefineds: true
    };
    if (_.isObject(this.props.partnerData)) {
      newData.idPartner = this.props.partnerData._id;
    }
    const formData = objectToFormData(newData, options);
    submit(formData);
  };

  render() {
    const { submit, onChange, handleCheckBox, handleNewPhoto } = this;
    const { name, enabled, description, url, imageUrl, newImgBase64 } = this.state;
    const { load } = this.props;
    const { cloudinary_cloud_name } = this.props.configuration;
    return (
      <Container>
        <ValidatorForm ref="form" onSubmit={submit}>
          <TextValidator
            margin="normal"
            label="Name"
            onChange={onChange}
            name="name"
            fullWidth
            value={name}
            variant="outlined"
            validators={['required']}
            errorMessages={['This field is required']}
            disabled={load}
          />
          <TextValidator
            margin="normal"
            label="Description"
            onChange={onChange}
            name="description"
            fullWidth
            value={description}
            variant="outlined"
            disabled={load}
          />
          <TextValidator
            margin="normal"
            label="Address to site Partner"
            onChange={onChange}
            name="url"
            fullWidth
            value={url}
            variant="outlined"
            disabled={load}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={enabled}
                onChange={handleCheckBox}
                value="enabled"
                disabled={load}
              />
            }
            label="Enabled"
          />
          <div>
            {((_.isString(imageUrl) && imageUrl.length > 0) || newImgBase64.length > 0) && (
              <img
                className="payment-logo"
                src={
                  newImgBase64.length > 0
                    ? newImgBase64
                    : new cloudinary.Cloudinary({
                        cloud_name: cloudinary_cloud_name
                      }).url(imageUrl)
                }
                alt={'Not found'}
              />
            )}
            <div className="change-avatar">
              <input
                className="upload-avatar"
                onChange={handleNewPhoto}
                accept="image/*"
                id="raised-button-file"
                type="file"
              />
              <label htmlFor="raised-button-file">
                <Button component="span">
                  {_.isString(imageUrl) && imageUrl.length > 0 ? 'Change logo' : 'Upload Logo'}
                </Button>
              </label>
            </div>
          </div>
          <div className="position-btn-submit">
            <Button type="submit" disabled={load} variant="contained" color="primary">
              {_.isObject(this.props.partnerData) ? 'Save Changes' : 'Create'}
            </Button>
          </div>
        </ValidatorForm>
      </Container>
    );
  }
}

PartnerDetail.propTypes = {
  submit: PropTypes.func,
  load: PropTypes.bool
};

function mapStateToProps(state) {
  return { configuration: state.configuration };
}

export default connect(mapStateToProps, null)(PartnerDetail);
