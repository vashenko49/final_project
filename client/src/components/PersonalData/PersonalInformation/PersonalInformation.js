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
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { Box, Typography } from '@material-ui/core';
import AdminProductAPI from '../../../services/AdminProductsAPI';

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
      newImgBase64: '',
      isLocalCart: false,
      itemCart: []
    };
  }

  componentDidMount() {
    let localCart = JSON.parse(localStorage.getItem('localCart'));
    if (_.isArray(localCart) && localCart.length > 0) {
      this.getLocalCart(localCart).then(res => {
        this.setState({ itemCart: res });
      });
      this.setState({ isLocalCart: true });
    }
  }

  getLocalCart = async localCart => {
    return await Promise.all(
      localCart.map(async item => {
        let { idProduct, modelNo, quantity } = item;
        idProduct = (await AdminProductAPI.getProductsById(idProduct)).data;
        idProduct.model.forEach(mod => {
          if (modelNo === mod.modelNo.toString()) {
            modelNo = mod;
          }
        });
        return {
          idProduct,
          modelNo,
          quantity
        };
      })
    );
  };

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

    for (let key in this.state) {
      if (_.isBoolean(this.state[`${key}`].changed)) {
        this.setState({ [`${key}`]: { ...this.state[`${key}`], changed: false } });
      }
    }
  };

  replaceWithOnlineCart = () => {
    this.setState({ isLocalCart: false });
    this.props.replaceWithOnlineCart();
  };

  render() {
    const { submit, handleChange, getData, handleNewPhoto, replaceWithOnlineCart } = this;
    const { newImgBase64, isLocalCart, itemCart } = this.state;
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
                newImgBase64.length > 0
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
        {isLocalCart && (
          <Box mt={2}>
            <Typography variant={'h5'}>You local cart</Typography>
            <Box my={2}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name product</TableCell>
                      <TableCell>Product number</TableCell>
                      <TableCell>Model number</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Price USD</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {itemCart.map(item => {
                      const {
                        quantity,
                        idProduct: { _id, nameProduct, itemNo, productUrlImg, filterImg },
                        modelNo: { modelNo, currentPrice }
                      } = item;
                      const currentImg =
                        productUrlImg.length > 0
                          ? productUrlImg[0]
                          : filterImg.length > 0
                          ? filterImg[0]
                          : 'final-project/products/product_without_photo_sample/product_without_phot_ldw3px';
                      return (
                        <TableRow key={_id + modelNo}>
                          <TableCell component="th" scope="row">
                            <div>
                              {cloudinary_cloud_name.length <= 0 ? (
                                <CircularProgress />
                              ) : (
                                <img
                                  className="img-check-table"
                                  alt="Not found"
                                  src={new cloudinary.Cloudinary({
                                    cloud_name: cloudinary_cloud_name
                                  }).url(currentImg)}
                                />
                              )}
                              <Typography variant={'body2'}>{nameProduct}</Typography>
                            </div>
                          </TableCell>
                          <TableCell>{itemNo}</TableCell>
                          <TableCell>{modelNo}</TableCell>
                          <TableCell>{quantity}</TableCell>
                          <TableCell>{currentPrice * quantity}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Button onClick={replaceWithOnlineCart} variant="contained" color="primary">
              Replace the online cart with the local cart
            </Button>
          </Box>
        )}
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
    resetError: bindActionCreators(AuthorizationActions.resetError, dispatch),
    replaceWithOnlineCart: bindActionCreators(AuthorizationActions.replaceWithOnlineCart, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformation);
