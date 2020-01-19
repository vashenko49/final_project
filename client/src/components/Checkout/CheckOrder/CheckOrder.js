import NavigationButton from '../NavigationButton/NavigationButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as CheckoutAction from '../../../actions/checkoutAction';
import OrderAPI from '../../../services/OrderAPI';
import './CheckOrder.scss';
import TableProduct from '../../TableProduct/TableProduct';
import TableAboutOrder from '../../Order/TableAboutOrder/TableAboutOrder';
import * as cartAction from '../../../actions/authorizationAction';

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
    const {
      cart: { items }
    } = this.props.authorization;
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
    const { changeStep, triggerModalOrder, resetCart } = this.props;
    const { statusAgree, totalSum } = this.state;
    if (statusAgree) {
      const {
        cart: { items }
      } = this.props.authorization;
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
          resetCart();
        })
        .catch(() => {
          triggerModalOrder(true, false);
        });
    }
  };

  render() {
    const { submit, handleAgree } = this;
    const {
      cart: { items }
    } = this.props.authorization;
    const { totalSum, freeDelivery, statusAgree } = this.state;
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
          <TableProduct
            product={items}
            costValue={costValue}
            freeDelivery={freeDelivery}
            totalSum={totalSum}
          />
        )}
        <Typography className="title-table" variant={'h6'}>
          Entered data
        </Typography>
        {(() => {
          const delMethOpt = {
            status: deliveryMethod
          };

          if (deliveryMethod === 'address') {
            delMethOpt.data = {
              country,
              city,
              postal,
              street,
              houseNumber
            };
          } else {
            delMethOpt.data = {
              nameSelectedAddress
            };
          }
          return (
            <TableAboutOrder
              className="total-data-about-order"
              name={name}
              email={email}
              telephone={telephone}
              nameDeliveryMethod={nameDeliveryMethod}
              deliveryMethod={delMethOpt}
              methodPayment={{
                status: true,
                data: nameMethodPayment
              }}
            />
          );
        })()}

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
    authorization: state.authorization
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeStep: bindActionCreators(CheckoutAction.changeStep, dispatch),
    triggerModalOrder: bindActionCreators(CheckoutAction.triggerModalOrder, dispatch),
    resetCart: bindActionCreators(cartAction.resetCart, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOrder);
