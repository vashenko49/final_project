import React, { Component, Fragment } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// import { getCurrentItems } from '../../actions/cart';

import './Cart.scss';

class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { items, loading } = this.props.cartInfo;

    const amount = [];

    for (let i = 1; i < 10; i++) {
      amount.push(<option value={i}>{i}</option>);
    }

    return (
      <Fragment>
        {loading ? (
          <div>preloader</div>
        ) : (
          <div className="bag-item">
            {items.products.map(v => {
              // v it's item in products array
              const {
                filters: property,
                _idChildCategory,
                nameProduct,
                productUrlImg,
                model: item
              } = v.product;

              return (
                <div className="sneaker-item" key={_idChildCategory}>
                  <img src={productUrlImg[0]} alt="product not found"></img>
                  <div className="sneaker-item-info">
                    <h2 className="info-title">{nameProduct}</h2>
                    <p>{_idChildCategory}</p>
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
                    <select name="quantity">{amount}</select>
                  </div>
                  <div>
                    <p className="about-item">${item[0].currentPrice}</p>
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

export default Item;
