import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Image } from 'cloudinary-react';

// import _ from 'lodash';
import { updateQuantity,addOrRemoveProduct } from '../../actions/cart';

import './Cart.scss';

class Item extends Component {
  render() {
    const { updateQuantity, addOrRemoveProduct } = this.props;
    const { isAuthorization } = this.props.authorization
  

    let items = JSON.parse(localStorage.getItem('items'))
    if(isAuthorization) {
      if(items.length > 0) {
        const isRewrite = window.confirm('Do you want add your item from local cart?')
        if(isRewrite){
          for (let i = 0; i < items.length; i++) {
            addOrRemoveProduct(items[i].idProduct._id, items[i].modelNo.modelNo, items[i].quantity)
            localStorage.setItem('items', JSON.stringify([]))
          }
        } 
      }
      items = this.props.cart.items;
    }

    const _addOrRemoveProduct = (parentId, modelNo) => {
      if(isAuthorization) {
        addOrRemoveProduct(parentId, modelNo, 0);
      } else {
        const index = items.findIndex(v => v.modelNo.modelNo === modelNo)
        items.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(items))
        window.location.reload(true)
      }
    }
    
    const _updateQuantity = (parentId, modelNo, e) => {
      if(isAuthorization) {
        updateQuantity(parentId, modelNo, e.target.value);
      } else {
        const index = items.filter(v => v.modelNo.modelNo === modelNo)[0]
        index.quantity = e.target.value
        localStorage.setItem('items', JSON.stringify(items))
        window.location.reload(true)
      }
    }

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
                    <Link to={`../product/${parentId}`} style={{ textDecoration: 'none' }}>
                      <h2 className="info-title">{nameProduct}</h2>
                    </Link>
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
                    <label htmlFor="quantity">Quantity:</label>
                    <select
                      name="quantity"
                      onChange={e => {
                        _updateQuantity(parentId, modelNo, e);
                      }}
                      value={quantity}
                    >
                      {amount}
                    </select>
                  </div>
                  <div>
                    <p className="about-item">${currentPrice * quantity}</p>
                  </div>
                  <div
                    className="close"
                    onClick={() => {
                      _addOrRemoveProduct(parentId, modelNo);
                    }}
                  ></div>
                </div>
              );
            })}
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    authorization: state.authorization,
    cart: state.cart
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateQuantity: bindActionCreators(updateQuantity, dispatch),
    addOrRemoveProduct: bindActionCreators(addOrRemoveProduct, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
