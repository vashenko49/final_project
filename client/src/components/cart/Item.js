import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import CartAPI from '../../services/CartAPI'

import { getCurrentItems } from '../../actions/cart';

import './Cart.scss';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "5de5592bf82b736ff4eb3c08",
      product: null
    };
    this.getCurrentItems = this.props.getCurrentItems.bind(this);
  }
  
  componentDidMount() {
    this.updateProducts()
  }
  
  componentDidUpdate(prevProps) {
    if (this.props._id !== prevProps._id) {
      this.updateProducts(); 
    }
  }
  
  updateProducts() {
    CartAPI
      .getCustomerCart(this.state._id)
      .then(product => {
        this.setState({ product })
      })
  }

  render() {
    console.log(this.state.product)
    // const { product } = this.state 

    return (
      <div>TEST</div>
      // <div className="bag-item">
      //   <div className="sneaker-item">
      //     <img
      //       src="https://images.nike.com/is/image/DotCom/AR6631_004_A_PREM?align=0,1&cropN=0,0,0,0&resMode=sharp&bgc=f5f5f5&wid=150&fmt=jpg"
      //       alt="product not found"
      //     ></img>
      //     <div className="sneaker-item-info">
      //       <h2 className="info-title">{product.name}</h2>
      //       <p>{product.category}</p>
      //       <p>{product.color}</p>
      //       <p>Size {product.size}</p>
      //       <label htmlFor="quantity">Quantity</label>
      //       <select name="quantity">
      //         <option value="1">1</option>
      //         <option value="2">2</option>
      //         <option value="3">3</option>
      //         <option value="4">4</option>
      //         <option value="5">5</option>
      //         <option value="6">6</option>
      //         <option value="7">7</option>
      //       </select>
      //     </div>
      //     <div>
      //       <p className="about-item">£{product.price}</p>
      //     </div>
      //   </div>
      //   {/* <div>
      //     <button>More Options!</button>
      //   </div> */}
      // </div>
    );
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
