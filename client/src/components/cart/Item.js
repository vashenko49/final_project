import React, { Component } from 'react';

import './Cart.scss'

export default class Item extends Component {
  
  constructor(){
    super();
    this.state = {
      name: "Nike Air Max Tailwind",
      price: 148.00,
      category: 'Men`s Shoe',
      color: 'Black/Metallic Pewter/Metallic',
      size: 9,
      quantity: 1
    }
  }
  
  render(){
    return (
      <div className="bag-item">
        <img src="https://images.nike.com/is/image/DotCom/CJ0784_001_A_PREM?align=0,1&cropN=0,0,0,0&resMode=sharp&bgc=f5f5f5&wid=150&fmt=jpg"></img>
        <div className="bag-item-info">
          <h2 className="info-title">{this.state.name}</h2>
          <p>{this.state.category}</p>
          <p>{this.state.color}</p>
          <p>Size {this.state.size}</p>
          <p>Quantity {this.state.quantity}</p>
        </div>
        <div>
          <p className="about-item">£{this.state.price}</p>
        </div>
        {/* <div>
          <button>More Options!</button>
        </div> */}
      </div>
    )
  }
}