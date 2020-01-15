import React, { Component, Fragment } from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';

import './Cart.scss';

class Bag extends Component {
  render() {
    let items = []
    const { isAuthorization } = this.props;
    if(isAuthorization) {
      items = this.props.cart.items
    } else {
      items = JSON.parse(localStorage.getItem('items'))
    }

    const bagPrice = () => {
      let price = 0;
      for (let i = 0; i < items.length; i++) {
        price += _.get(items[i], 'modelNo.currentPrice') * items[i].quantity;
      }
      return price;
    };

    return (
      <Fragment>
        <div className="bag">
          <h2>BAG</h2>
          <div className="about-item">
            {items.length} items
            <div className="stick" />
            <span className="price">${bagPrice()}</span>
          </div>
        </div>
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
