import React, { Component, Fragment } from 'react';

import './ProductPage.scss'

export default class ProductSizes extends Component {

  render() {
    const { currentModel, filters } = this.props;

    return (
      <Fragment>
        <div className="product-select">
        <div className="sizes-info">
          <p>Select Size</p>
          <a href="/" className="size-guide">
            Size Guide
          </a>
        </div>
        </div>
        <div className="product-sizes container">
        {/* {currentModel.filters.map(v => {
          if (v.filter.type === 'Sizes') {
            return <button className="light-btn">US {v.subFilter.name}</button>;
          }
          return [];
        })} */}
        {filters.map(v => {
          if (v.filter.type === 'Sizes') {
            return <button key={v.subFilter._id} className="light-btn">US {v.subFilter.name}</button>;
          }
          return [];
        })}
      </div>
      </Fragment>
    );
  }
}
