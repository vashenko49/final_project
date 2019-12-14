import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import './Cart.scss';

class Bag extends Component {
  render() {
    debugger;
    const { items, loading } = this.props.cart;
    return (
      <Fragment>
        {loading ? (
          <h5>Preloader</h5>
        ) : (
          <div className="bag">
            <h2>BAG</h2>
            <div>
              <p className="about-item">
                {items.length} items |{' '}
                <span className="price">
                  $
                  {/* {items.reduce((acc, curr) => {
                    return acc.product.model[0].currentPrice + curr.product.model[0].currentPrice;
                  })} */}
                </span>
              </p>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

export default connect(mapStateToProps)(Bag);
