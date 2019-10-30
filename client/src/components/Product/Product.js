import React, {Component} from 'react';
// import Buttons from './../Buttons' //waiting for component Buttons

import LoadImage from './LoadImage'
import './Product.css'


// create component Product
export default class Product extends Component{
  render() {
    return( 
      <div className="row">
        <div className="col m2">
          <div className="card small hoverable">
            <div className="card-image valign-wrapper card_image ">
              <LoadImage/>
              <div className="button_container">Future Buttons{/* <Buttons></Buttons> */}</div>
            </div>
            <div className="center">
              <h5 className="product__header">Product</h5>
              <div className="">Stars</div>
              <div className="cost">Cost</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
