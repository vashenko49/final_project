import React, { Component, Fragment } from 'react';

import './ProductPage.scss';

export default class ProductColors extends Component {
  render() {
    const { modelsFilters, setCurrentColor } = this.props;

    const handleClick = e => {
      setCurrentColor(e.target.value);
      Array.from(e.target.parentNode.children).forEach(child => {
        if (child !== e.target) {
          child.style.border = '';
          child.style.backgroundClip = '';
        } else {
          e.target.style.border = `1px solid ${e.target.value}`;
          e.target.style.backgroundClip = 'content-box';
        }
      });
    };

    const uniqueColors = [];
    return (
      <Fragment>
        <div className="product-colors container">
          {modelsFilters.map(v => {
            if (v.filter.type === 'Color') {
              if (!uniqueColors.includes(v.subFilter._id)) {
                uniqueColors.push(v.subFilter._id);
                return (
                  <button
                    key={v._id}
                    className="product-select-color"
                    name="currentColor"
                    onClick={e => handleClick(e)}
                    style={{ backgroundColor: v.subFilter.name.toLowerCase() }}
                    value={v.subFilter.name.toLowerCase()}
                  />
                );
              }
            }
            return [];
          })}
        </div>
      </Fragment>
    );
  }
}
