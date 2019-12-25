import React, { Component, Fragment } from 'react';

import './ProductPage.scss';

export default class ProductColors extends Component {
  render() {
    const { handleModel, modelsFilters, setCurrentColor } = this.props;

    return (
      <Fragment>
        <div className="product-colors container">
          {modelsFilters.map(v => {
            if (v.filter.type === 'Color') {
              return (
                <button
                  key={v._id}
                  className="product-select-color"
                  name="currentColor"
                  onClick={e => {
                    setCurrentColor(e.target.value);
                    handleModel(e.target.value);
                  }}
                  style={{ backgroundColor: v.subFilter.name.toLowerCase() }}
                  value={v.subFilter.name.toLowerCase()}
                />
              );
            }
            return [];
          })}
        </div>
      </Fragment>
    );
  }
}
