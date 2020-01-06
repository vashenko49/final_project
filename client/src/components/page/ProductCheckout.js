import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Image } from 'cloudinary-react';

import './ProductPage.scss';

import { updateQuantity } from '../../actions/cart';

class ProductCheckout extends Component {
  render() {
    const {
      customerId,
      parentId,
      productUrlImg,
      nameProduct,
      _idChildCategory,
      currentColor,
      currentModel,
      currentSize,
      updateQuantity
    } = this.props;

    const amount = [];

    for (let i = 1; i < 10; i++) {
      amount.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return (
      <Fragment>
        <div className="checkout-content">
          <Image
            cloudName="dxge5r7h2"
            publicId={productUrlImg[0]}
            crop="scale"
            alt="sneaker not found"
          />
          <div className="checkout-info">
            <h5>{nameProduct}</h5>
            <p>{_idChildCategory.name}</p>
            <p className="checkout-field">
              Price: <span>${currentModel.currentPrice}</span>
            </p>
            <p className="checkout-field">
              Color: <span>{currentColor}</span>
            </p>
            <p className="checkout-field">
              Size: <span>{currentSize}</span>
            </p>
            <label htmlFor="quantity">Quantity</label>
            <select
              name="quantity"
              onChange={e => {
                updateQuantity(parentId, currentModel.modelNo, e.target.value);
              }}
            >
              {amount}
            </select>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateQuantity: bindActionCreators(updateQuantity, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(ProductCheckout);
