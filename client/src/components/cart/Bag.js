import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import './Cart.scss';

class Bag extends Component {
  render() {
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
                {items.length} items |
                <span className="price">
                  $
                  {items.reduce((acc, curr) => {
                    return (
                      acc.modelNo.currentPrice * acc.quantity +
                      curr.modelNo.currentPrice * curr.quantity
                    );
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

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

export default connect(mapStateToProps)(Bag);
