import NavigationButton from '../NavigationButton/NavigationButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import React, { Component, Fragment } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import { bindActionCreators } from 'redux';
import cloudinary from 'cloudinary-core';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as CheckoutAction from '../../../actions/checkoutAction';
import OrderAPI from '../../../services/OrderAPI';
import './CheckOrder.scss';

class CheckOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSum: 0,
      freeDelivery: true,
      statusAgree: false
    };
  }

  componentDidMount() {
    const { items } = this.props.cart;
    const {
      order: { delivery: costValue, freeShippingOrderSum }
    } = this.props.checkout;
    let { totalSum } = this.state;
    items.forEach(item => {
      const {
        quantity,
        modelNo: { currentPrice }
      } = item;
      totalSum += currentPrice * quantity;
    });
    if (totalSum > freeShippingOrderSum) {
      totalSum += costValue;
      this.setState({ freeDelivery: false });
    }
    this.setState({ totalSum: totalSum });
  }

  handleAgree = event => {
    this.setState({ statusAgree: event.target.checked });
  };

  submit = event => {
    event.preventDefault();
    const { changeStep, triggerModalOrder } = this.props;
    const { statusAgree, totalSum } = this.state;
    if (statusAgree) {
      const { items } = this.props.cart;
      const {
        order: {
          personalData: { name, email, telephone },
          delivery: {
            chooseDeliveryMethod,
            deliveryMethod,
            country,
            city,
            postal,
            street,
            houseNumber,
            selectedAddress
          }
        },
        activeStep
      } = this.props.checkout;
      const newOrder = { name, email, mobile: telephone };
      newOrder.products = items.map(item => {
        const {
          idProduct: { _id: productId },
          modelNo: { modelNo, currentPrice },
          quantity
        } = item;
        return {
          productId: productId,
          modelNo: modelNo,
          quantity: quantity,
          currentPrice: currentPrice
        };
      });

      newOrder.delivery = {
        idShippingMethod: chooseDeliveryMethod
      };
      if (deliveryMethod === 'address') {
        newOrder.delivery.address = {
          country: country,
          city: city,
          postal: postal,
          street: street,
          houseNumber: houseNumber
        };
      } else {
        newOrder.delivery.storeAddress = selectedAddress;
      }

      newOrder.totalSum = totalSum;
      changeStep(activeStep, true);
      OrderAPI.createOrder(newOrder)
        .then(() => {
          triggerModalOrder(true, true);
        })
        .catch(() => {
          triggerModalOrder(true, false);
        });
    }
  };

  componentWillUnmount() {
    const { resetOrder } = this.props;
    resetOrder();
  }

  render() {
    const { submit, handleAgree } = this;
    const { items } = this.props.cart;
    const { totalSum, freeDelivery, statusAgree } = this.state;
    const { cloudinary_cloud_name } = this.props.configuration;
    const {
      order: {
        personalData: { name, email, telephone },
        delivery: {
          deliveryMethod,
          country,
          city,
          postal,
          street,
          houseNumber,
          costValue,
          nameDeliveryMethod,
          nameSelectedAddress
        },
        payment: { nameMethodPayment }
      }
    } = this.props.checkout;
    return (
      <ValidatorForm ref="form" onSubmit={submit}>
        <Typography className="title-check" variant={'h4'}>
          Check products and entered data
        </Typography>
        <Typography className="title-table" variant={'h6'}>
          Products
        </Typography>
        {_.isArray(items) && items.length > 0 && (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name product</TableCell>
                  <TableCell align="right">Image Product</TableCell>
                  <TableCell align="right">Product number</TableCell>
                  <TableCell align="right">Model number</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price USD</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map(item => {
                  const {
                    _id,
                    quantity,
                    idProduct: { nameProduct, itemNo, productUrlImg, filterImg },
                    modelNo: { modelNo, currentPrice }
                  } = item;
                  const currentImg =
                    productUrlImg.length > 0
                      ? productUrlImg[0]
                      : filterImg.length > 0
                      ? filterImg[0]
                      : 'final-project/products/product_without_photo_sample/product_without_phot_ldw3px';
                  return (
                    <TableRow key={_id}>
                      <TableCell component="th" scope="row">
                        {nameProduct}
                      </TableCell>
                      <TableCell align="right">
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
                      </TableCell>
                      <TableCell align="right">{itemNo}</TableCell>
                      <TableCell align="right">{modelNo}</TableCell>
                      <TableCell align="right">{quantity}</TableCell>
                      <TableCell align="right">{currentPrice * quantity}</TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell colSpan={5}>Cost of delivery</TableCell>
                  <TableCell align="right">{freeDelivery ? '0' : costValue}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5}>Total</TableCell>
                  <TableCell align="right">{totalSum}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Typography className="title-table" variant={'h6'}>
          Entered data
        </Typography>
        <TableContainer className="total-data-about-order" component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Phone</TableCell>
                <TableCell>{telephone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Deliveryman</TableCell>
                <TableCell>{nameDeliveryMethod}</TableCell>
              </TableRow>
              {deliveryMethod === 'address' ? (
                <Fragment>
                  <TableRow>
                    <TableCell>Type delivery</TableCell>
                    <TableCell>Courier delivery</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Country</TableCell>
                    <TableCell>{country}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>City</TableCell>
                    <TableCell>{city}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Postal</TableCell>
                    <TableCell>{postal}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Street</TableCell>
                    <TableCell>{street}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>House number</TableCell>
                    <TableCell>{houseNumber}</TableCell>
                  </TableRow>
                </Fragment>
              ) : (
                <Fragment>
                  <TableRow>
                    <TableCell>Type delivery</TableCell>
                    <TableCell>Pickup</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Selected address</TableCell>
                    <TableCell>{nameSelectedAddress}</TableCell>
                  </TableRow>
                </Fragment>
              )}
              <TableRow>
                <TableCell>Payment</TableCell>
                <TableCell>{nameMethodPayment}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <FormControlLabel
          control={
            <Checkbox
              className="color-checkbox"
              required={true}
              checked={statusAgree}
              onChange={handleAgree}
              value="statusAgree"
            />
          }
          label="I agree with the data that I entered"
        />
        <NavigationButton />
      </ValidatorForm>
    );
  }
}

function mapStateToProps(state) {
  return {
    checkout: state.checkout,
    configuration: state.configuration,
    cart: state.cart
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetOrder: bindActionCreators(CheckoutAction.resetOrder, dispatch),
    changeStep: bindActionCreators(CheckoutAction.changeStep, dispatch),
    triggerModalOrder: bindActionCreators(CheckoutAction.triggerModalOrder, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOrder);
