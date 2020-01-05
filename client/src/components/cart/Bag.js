import React, { Component, Fragment } from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';

import './Cart.scss';

class Bag extends Component {
  render() {
    const { items, loading } = this.props.cart;

    const bagPrice = () => {
      if (!loading) {
        let price = 0;
        for (let i = 0; i < items.length; i++) {
          price += _.get(items[i], 'modelNo.currentPrice') * items[i].quantity;
        }
        return price;
      }
    };

    return (
      <Fragment>
        {loading ? (
          <h5>Preloader</h5>
        ) : (
          <div className="bag">
            <h2>BAG</h2>
            <div>
              <p className="about-item">
                {_.isArray(items) ? items.length : 0} items |
                <span className="price">${_.isArray(items) ? bagPrice() : 0}</span>
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
