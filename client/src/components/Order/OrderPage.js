import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import OrderAPI from '../../services/OrderAPI';
import TableProduct from '../TableProduct/TableProduct';
import TableAboutOrder from './TableAboutOrder/TableAboutOrder';
import _ from 'lodash';

import './OrderPage.scss';

class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNo: '',
      totalSum: 0,
      costValue: 0,
      freeDelivery: false,
      products: [],
      name: '',
      email: '',
      telephone: '',
      nameDeliveryMethod: '',
      deliveryMethod: {
        status: 'cur',
        data: {
          nameSelectedAddress: ''
        }
      }
    };
  }

  componentDidMount() {
    const { idOrder } = this.props;
    OrderAPI.getOrderById(idOrder).then(res => {
      const {
        orderNo,
        products,
        totalSum,
        delivery: {
          idShippingMethod: { costValue, freeShippingOrderSum, name: nameDeliveryMethod }
        },
        name,
        email,
        mobile: telephone
      } = res;

      const deliveryMethod = {};

      if (_.isObject(res.delivery.address) && res.delivery.address.city.length > 0) {
        deliveryMethod.status = 'address';
        deliveryMethod.data = res.delivery.address;
      } else {
        deliveryMethod.status = 'cur';
        deliveryMethod.data = { nameSelectedAddress: res.delivery.storeAddress.address };
      }

      this.setState({
        orderNo,
        products: products.map(element => {
          const {
            productId: { _id, nameProduct, itemNo, productUrlImg, filterImg },
            modelNo: { modelNo },
            currentPrice,
            quantity
          } = element;
          return {
            _id,
            quantity,
            idProduct: { nameProduct, itemNo, productUrlImg, filterImg },
            modelNo: { modelNo, currentPrice }
          };
        }),
        totalSum,
        costValue,
        freeDelivery: totalSum > freeShippingOrderSum,
        name,
        email,
        telephone,
        nameDeliveryMethod,
        deliveryMethod
      });
    });
  }

  render() {
    const {
      orderNo,
      totalSum,
      costValue,
      freeDelivery,
      products,
      name,
      email,
      telephone,
      nameDeliveryMethod,
      deliveryMethod
    } = this.state;
    return (
      <div>
        <Typography
          className={'order-page-title'}
          variant={'h4'}
        >{`Your order ${orderNo}`}</Typography>
        <Typography variant={'h6'}>Products</Typography>
        <TableProduct
          className="table-order-page"
          product={products}
          totalSum={totalSum}
          costValue={costValue}
          freeDelivery={freeDelivery}
        />
        <Typography variant={'h6'}>Specification</Typography>
        <TableAboutOrder
          name={name}
          email={email}
          telephone={telephone}
          nameDeliveryMethod={nameDeliveryMethod}
          methodPayment={{ status: false }}
          deliveryMethod={deliveryMethod}
          className={'table-order-page'}
        />
      </div>
    );
  }
}

OrderPage.propTypes = {
  idOrder: PropTypes.string
};

export default OrderPage;
