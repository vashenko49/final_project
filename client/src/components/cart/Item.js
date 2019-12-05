import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { getCurrentItems } from '../../actions/cart';

import './Cart.scss';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "5de5592bf82b736ff4eb3c08"
    };
    this.getCurrentItems = this.props.getCurrentItems.bind(this);
  }
  
  componentDidMount() {
    this.props.getCurrentItems(this.state._id)
  }

  render() {
    return <div style={{textAlign: "center"}}>I?n TESTING</div>
    // const { items, loading } = this.props.cart;

    // return (<Fragment>
    //     {loading ? 
    //       <div>preloader</div>
    //     : (items.map(v => {
    //       const { product } = v;
    //         return (<div className="bag-item">
    //          <div className="sneaker-item">
    //            <img
    //              src="https://images.nike.com/is/image/DotCom/AR6631_004_A_PREM?align=0,1&cropN=0,0,0,0&resMode=sharp&bgc=f5f5f5&wid=150&fmt=jpg"
    //              alt="product not found">
    //            </img>
    //            <div className="sneaker-item-info">
    //              <h2 className="info-title">{product.name}</h2>
    //              <p>{product.category}</p>
    //              <p>{product.color}</p>
    //              <p>Size {product.size}</p>
    //              <label htmlFor="quantity">Quantity</label>
    //              <select name="quantity">
    //                <option value="1">1</option>
    //                <option value="2">2</option>
    //                <option value="3">3</option>
    //                <option value="4">4</option>
    //                <option value="5">5</option>
    //                <option value="6">6</option>
    //                <option value="7">7</option>
    //              </select>
    //            </div>
    //            <div>
    //              <p className="about-item">£{product.price}</p>
    //            </div>
    //          </div>
    //        </div>)
    //      })
    //   )}
    // </Fragment>
    // )}
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

const mapDispatchToProps = dispatch => {
  return {
    getCurrentItems: bindActionCreators(getCurrentItems, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
