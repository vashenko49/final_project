import React, { Component } from 'react';
import NavigationButton from '../NavigationButton/NavigationButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CheckoutAction from '../../../actions/checkoutAction';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import ShippingMethodAPI from '../../../services/shippingMethodAPI';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import _ from 'lodash';

import './Deliver.scss';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DialogWindowToPayShip from '../DialogWindowToPayShip/DialogWindowToPayShip';

class Deliver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliver: [],
      chooseDeliveryMethod: '',
      indexSelected: -1,
      deliveryMethod: '',
      selectedAddress: '',
      country: '',
      city: '',
      postal: '',
      street: '',
      houseNumber: '',
      openDialog: false,
      nameDialog: '',
      descriptionDialog: '',
      imageUrlDialog: ''
    };
  }

  componentDidMount() {
    const {
      chooseDeliveryMethod,
      indexSelected,
      deliveryMethod,
      selectedAddress,
      country,
      city,
      postal,
      street,
      houseNumber
    } = this.props.checkout.order.delivery;
    ShippingMethodAPI.getActiveShippingMethod().then(res => {
      this.setState({ deliver: res });
      if (res.length > 0) {
        this.setState({
          chooseDeliveryMethod: chooseDeliveryMethod.length > 0 ? chooseDeliveryMethod : res[0]._id,
          indexSelected: indexSelected,
          deliveryMethod:
            deliveryMethod.length > 0
              ? deliveryMethod
              : res[0].address.length > 0
              ? 'pickup'
              : 'address',
          selectedAddress:
            selectedAddress.length > 0
              ? selectedAddress
              : res[0].address.length > 0
              ? res[0].address[0]._id
              : '',
          country: country,
          city: city,
          postal: postal,
          street: street,
          houseNumber: houseNumber
        });
      }
    });
  }

  submit = event => {
    event.preventDefault();
    const { specifyDeliveryData, changeStep } = this.props;
    const {
      deliver,
      chooseDeliveryMethod,
      deliveryMethod,
      selectedAddress,
      country,
      city,
      postal,
      street,
      houseNumber
    } = this.state;
    const indexSelected = _.findIndex(deliver, function(o) {
      return o._id === chooseDeliveryMethod;
    });
    const indexSelectedAddress = _.findIndex(deliver[indexSelected].address, function(o) {
      return o._id === selectedAddress;
    });
    const { activeStep } = this.props.checkout;
    specifyDeliveryData({
      chooseDeliveryMethod,
      indexSelected,
      deliveryMethod,
      selectedAddress,
      country,
      city,
      postal,
      street,
      houseNumber,
      costValue: deliver[indexSelected].costValue,
      freeShippingOrderSum: deliver[indexSelected].freeShippingOrderSum,
      nameDeliveryMethod: deliver[indexSelected].name,
      nameSelectedAddress: deliver[indexSelected].address[indexSelectedAddress].address
    });
    changeStep(activeStep, true);
  };

  handleChangeRadio = (event, reset) => {
    const { deliver } = this.state;
    this.setState({
      [`${event.target.name}`]: event.target.value
    });
    if (reset === true) {
      const indexSelected = _.findIndex(deliver, function(o) {
        return o._id === event.target.value;
      });
      this.setState({
        deliveryMethod: deliver[indexSelected].address.length > 0 ? 'pickup' : 'address',
        selectedAddress:
          deliver[indexSelected].address.length > 0 ? deliver[indexSelected].address[0]._id : ''
      });
    }
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  handleOpenDialog = event => {
    const id = event.target.dataset.id;
    const { deliver } = this.state;
    const select = _.findIndex(deliver, function(o) {
      return o._id === id;
    });
    const { name, imageUrl, description } = deliver[select];

    this.setState({
      openDialog: true,
      nameDialog: name,
      descriptionDialog: description,
      imageUrlDialog: imageUrl
    });
  };

  render() {
    const { submit, handleChangeRadio, handleCloseDialog, handleOpenDialog } = this;
    const {
      chooseDeliveryMethod,
      deliver,
      deliveryMethod,
      selectedAddress,
      country,
      city,
      postal,
      street,
      houseNumber,
      openDialog,
      nameDialog,
      descriptionDialog,
      imageUrlDialog
    } = this.state;
    return (
      <ValidatorForm ref="form" onSubmit={submit}>
        <FormControl className="delivery-form" component="fieldset">
          <FormLabel component="legend">Delivery Company</FormLabel>
          <RadioGroup
            aria-label="chooseDeliveryMethod"
            name="chooseDeliveryMethod"
            value={chooseDeliveryMethod}
            onChange={event => {
              handleChangeRadio(event, true);
            }}
          >
            {deliver.map(item => {
              const { name, _id, address, isDeliveryAddress } = item;
              return (
                <div key={_id}>
                  <FormControlLabel
                    label={name}
                    value={_id}
                    control={<Radio className="radio-color" />}
                  />
                  <span className="more-information" onClick={handleOpenDialog} data-id={_id}>
                    More
                  </span>
                  {chooseDeliveryMethod === _id && (
                    <div className="type-delivery">
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Choosing a Delivery Method</FormLabel>
                        <RadioGroup
                          aria-label="deliveryMethod"
                          name="deliveryMethod"
                          value={deliveryMethod}
                          onChange={handleChangeRadio}
                        >
                          {deliveryMethod.length > 0 && (
                            <div>
                              {address.length > 0 && (
                                <div className="position-deliveryMethod">
                                  <FormControlLabel
                                    label={'Pich Up'}
                                    value={'pickup'}
                                    control={<Radio className="radio-color" />}
                                  />
                                  {deliveryMethod === 'pickup' && (
                                    <FormControl>
                                      <InputLabel id="demo-simple-select-label">Address</InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="selectedAddress"
                                        value={selectedAddress}
                                        onChange={handleChangeRadio}
                                      >
                                        {address.map(itemAddress => {
                                          return (
                                            <MenuItem value={itemAddress._id} key={itemAddress._id}>
                                              {itemAddress.address}
                                            </MenuItem>
                                          );
                                        })}
                                      </Select>
                                    </FormControl>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                          {isDeliveryAddress && (
                            <div>
                              <FormControlLabel
                                label={'Сourier at your address'}
                                value={'address'}
                                control={<Radio className="radio-color" />}
                              />
                              {deliveryMethod === 'address' && (
                                <div className="position-deliveryMethod">
                                  <TextValidator
                                    margin="normal"
                                    label="Your country"
                                    onChange={handleChangeRadio}
                                    name="country"
                                    fullWidth
                                    value={country}
                                    variant="outlined"
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                  />
                                  <TextValidator
                                    margin="normal"
                                    label="Your city"
                                    onChange={handleChangeRadio}
                                    name="city"
                                    fullWidth
                                    value={city}
                                    variant="outlined"
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                  />
                                  <TextValidator
                                    margin="normal"
                                    label="Your postal"
                                    onChange={handleChangeRadio}
                                    name="postal"
                                    fullWidth
                                    value={postal}
                                    variant="outlined"
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                  />
                                  <TextValidator
                                    margin="normal"
                                    label="Your street"
                                    onChange={handleChangeRadio}
                                    name="street"
                                    fullWidth
                                    value={street}
                                    variant="outlined"
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                  />
                                  <TextValidator
                                    margin="normal"
                                    label="Your houseNumber"
                                    onChange={handleChangeRadio}
                                    name="houseNumber"
                                    fullWidth
                                    value={houseNumber}
                                    variant="outlined"
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </RadioGroup>
                      </FormControl>
                    </div>
                  )}
                </div>
              );
            })}
          </RadioGroup>
        </FormControl>
        <NavigationButton />
        <DialogWindowToPayShip
          name={nameDialog}
          description={descriptionDialog}
          handleClose={handleCloseDialog}
          imageUrl={imageUrlDialog}
          open={openDialog}
        />
      </ValidatorForm>
    );
  }
}

function mapStateToProps(state) {
  return {
    checkout: state.checkout
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeStep: bindActionCreators(CheckoutAction.changeStep, dispatch),
    specifyDeliveryData: bindActionCreators(CheckoutAction.specifyDeliveryData, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Deliver);
