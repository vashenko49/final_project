import React, { Component } from 'react';

import './Cart.scss'

export default class Bag extends Component {
  
  constructor(){
    super();
    this.state = {
      items: 2,
      price: 299
    }
  }
  
  render(){
    return (
      <div className="bag">
        <h2>BAG</h2>
        <div>
          <p className="about-item">{this.state.items} items | <span className="price">${this.state.price}</span></p>
        </div>
      </div>
    )
  }
}