import React, { Component, Fragment } from 'react';

import _ from 'lodash';

import './ProductPage.scss';

export default class ProductSizes extends Component {
  render() {
    const { handleModel, model, currentColor, setCurrentSize } = this.props;

    const allSizes = [];
    for (let i = 0; i < model.length; i++) {
      for (let j = 0; j < model[i].filters.length; j++) {
        if (_.get(model[i], `filters[${j}].filter.type`) === 'Sizes') {
          allSizes.push(
            <button key={model[i].filters[j].subFilter._id} className="light-btn">
              US {_.get(model[i], `filters[${j}].subFilter.name`)}
            </button>
          );
        }
      }
    }

    const currentSizes = [];
    for (let i = 0; i < model.length; i++) {
      for (let j = 0; j < model[i].filters.length; j++) {
        if (_.get(model[i], `filters[${j}].subFilter.name`) === currentColor.toUpperCase()) {
          for (let k = 0; k < model[i].filters.length; k++) {
            if (_.get(model[i], `filters[${k}].filter.type`) === 'Sizes') {
              currentSizes.push(
                <button
                  key={model[i].filters[k].subFilter._id}
                  className="light-btn"
                  onClick={e => {
                    setCurrentSize(e.target.value);
                    handleModel(e.target.value);
                  }}
                  value={_.get(model[i], `filters[${k}].subFilter.name`)}
                >
                  US {_.get(model[i], `filters[${k}].subFilter.name`)}
                </button>
              );
            }
          }
        }
      }
    }

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
          {currentColor === '' ? allSizes : currentSizes}
        </div>
      </Fragment>
    );
  }
}
