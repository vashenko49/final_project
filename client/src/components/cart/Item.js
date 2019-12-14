import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateQuantity } from '../../actions/cart';

import './Cart.scss';

class Item extends Component {
  render() {
    const { updateQuantity, customerId } = this.props;

    const { items, loading } = this.props.cart;

    const amount = [];

    for (let i = 1; i < 10; i++) {
      amount.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    debugger;
    return (
      <Fragment>
        {loading ? (
          <div>preloader</div>
        ) : (
          <div className="bag-item">
            {items.map(v => {
              // v it's item in products array
              const {
                _id,
                filters: property,
                _idChildCategory,
                nameProduct,
                productUrlImg,
                model: item
              } = v.product;

              let currentQuantity = v.cartQuantity;

              return (
                <div className="sneaker-item" key={_id}>
                  <img src={productUrlImg[0]} alt="product not found"></img>
                  <div className="sneaker-item-info">
                    <h2 className="info-title">{nameProduct}</h2>
                    <p>{_idChildCategory.name}</p>
                    <p>
                      {property
                        .map(v => {
                          if (v.filter.type === 'Color') {
                            return v.subFilter.name;
                          }
                          return [];
                        })
                        .join()}
                    </p>
                    <p>Size {9}</p>
                    <label htmlFor="quantity">Quantity</label>
                    <select
                      name="quantity"
                      onChange={e => {
                        updateQuantity(customerId, _id, e.target.value);
                      }}
                    >
                      {amount}
                    </select>
                  </div>
                  <div>
                    <p className="about-item">${item[0].currentPrice * currentQuantity}</p>
                  </div>
                </div>
              );
            })}
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

function mapDispatchToProps(dispatch) {
  return {
    updateQuantity: bindActionCreators(updateQuantity, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
