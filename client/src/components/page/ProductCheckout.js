import React, { Component, Fragment } from 'react';

import './ProductPage.scss';

export default class ProductCheckout extends Component {
  render() {
    const { productUrlImg, nameProduct, _idChildCategory, currentColor } = this.props;

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
          <img src={productUrlImg[0]} alt="sneaker not found"></img> {/* CLOUNDAIRY */}
          <div className="checkout-info">
            <h5>{nameProduct}</h5>
            <p>{_idChildCategory.name}</p>
            <p className="checkout-field">
              Price: <span>${89}</span>
            </p>
            <p className="checkout-field">
              Color: <span>{currentColor}</span>
            </p>
            <p className="checkout-field">
              Size: <span>{37.5}</span>
            </p>
            <label htmlFor="quantity">Quantity</label>
            <select name="quantity">{amount}</select>
          </div>
        </div>
      </Fragment>
    );
  }
}
