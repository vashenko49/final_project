import React, { Component, Fragment } from 'react';

import './Cart.scss';

export default class Bag extends Component {

  render() {
    const { items, loading } = this.props.cartInfo;
    return (
      <Fragment>
        {loading ? (
          <h5>Preloader</h5>
        ) : (
          <div className="bag">
            <h2>BAG</h2>
            <div>
              <p className="about-item">
                {items.products.length} items |{' '}
                <span className="price">
                  $
                  {items.products.reduce((acc, curr) => {
                    return acc.product.model[0].currentPrice + curr.product.model[0].currentPrice;
                  })}
                </span>
              </p>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}
