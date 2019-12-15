import React, { Component, useState } from 'react';

import Rating from '../common/rating/Rating';

import './ProductPage.scss'

const ProductReview = () => {

    const [active, setActive] = useState(false);

    return (
      <div className="product-reviews container">
        <div className="review-header" onClick={() => setActive(!active)}>
          <div className="title" type="button">
            Reviews
          </div>
          <div className="arrow"></div>
        </div>
        <div
          className={active ? 'review-content container active' : 'review-content container'}>
          <p className="review-headline">Great buy</p>
          <Rating stars={4} className="review-rating" />
          <p className="review-date">Marklive - 22 Nov 2019</p>
          <div>
            <p className="review-text">Get a lot of compliments and very comfortable</p>
          </div>
        </div>
      </div>
    )
}

export default ProductReview;
