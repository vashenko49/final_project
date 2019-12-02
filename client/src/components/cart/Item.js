import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCurrentItems } from '../../actions/cart';

import './Cart.scss';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Nike Air Max Tailwind',
      // price: this.props.price,
      category: 'Men`s Shoe',
      color: 'Black/Metallic Pewter/Metallic',
      size: 9,
      quantity: 1,
      getCurrentItems: this.props.getCurrentItems.bind(this),
      customerId: ''
    };
  }

  componentDidMount() {
    debugger;
    getCurrentItems();
  }

  render() {
    return (
      <div className="bag-item">
        <div className="sneaker-item">
          <img
            src="https://images.nike.com/is/image/DotCom/AR6631_004_A_PREM?align=0,1&cropN=0,0,0,0&resMode=sharp&bgc=f5f5f5&wid=150&fmt=jpg"
            alt="product not found"
          ></img>
          <div className="sneaker-item-info">
            <h2 className="info-title">{this.state.name}</h2>
            <p>{this.state.category}</p>
            <p>{this.state.color}</p>
            <p>Size {this.state.size}</p>
            <label for="quantity">Quantity</label>
            <select name="quantity">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </div>
          <div>
            <p className="about-item">£{this.state.price}</p>
          </div>
        </div>
        {/* <div>
          <button>More Options!</button>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps, { getCurrentItems })(Item);
