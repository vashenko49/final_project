import React, { Component } from 'react';

import './ProductPage.scss';

export default class ProductHeader extends Component {
  render() {
    const { nameProduct, itemNo, currentModel, model } = this.props;

    const modelPrice = () => {
      if (currentModel.currentPrice) {
        return currentModel.currentPrice;
      } else if (model.length === 1) {
        return model[0].currentPrice;
      } else if (model.length > 1) {
        const prices = model.map(e => e.currentPrice).sort((a,b) => a - b)
        return prices[0] + '...' + prices[prices.length - 1]
      }
    };

    return (
      <div className="product-header">
        <div className="header-info">
          <h2>{nameProduct}</h2>
          <h3 className="item-No">{itemNo}</h3>
        </div>
        <p className="item-price">${modelPrice()}</p>
      </div>
    );
  }
}
