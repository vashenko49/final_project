import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Image } from 'cloudinary-react';

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
    return (
      <Fragment>
        {loading ? (
          <div>preloader</div>
        ) : (
          <div className="bag-item">
            {items.map(v => {
              const { _id, filters: property, currentPrice, modelNo } = v.modelNo;

              const { _id: parentId, nameProduct, productUrlImg, _idChildCategory } = v.idProduct;

              let quantity = v.quantity;
              return (
                <div className="sneaker-item" key={_id}>
                  <Image
                    cloudName="dxge5r7h2"
                    publicId={productUrlImg[0]}
                    width="400"
                    crop="scale"
                  />
                  <div className="sneaker-item-info">
                    <h2 className="info-title">{nameProduct}</h2>
                    <p>{_idChildCategory.name}</p>
                    <p>
                      {property.map(v => {
                        if (v.filter.type === 'Color') {
                          return v.subFilter.name;
                        }
                        return [];
                      })}
                    </p>
                    <p>
                      Size{' '}
                      {property.map(v => {
                        if (v.filter.type === 'Sizes') {
                          return v.subFilter.name;
                        }
                        return [];
                      })}
                    </p>
                    <label htmlFor="quantity">Quantity</label>
                    <select
                      name="quantity"
                      onChange={e => {
                        updateQuantity(customerId, parentId, modelNo, e.target.value);
                      }}
                      value={quantity}
                    >
                      {amount}
                    </select>
                  </div>
                  <div>
                    <p className="about-item">${currentPrice * quantity}</p>
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
