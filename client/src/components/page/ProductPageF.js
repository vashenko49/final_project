import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { getCurrentProduct } from '../../actions/product';

import './ProductPage.scss';

// const ProductPageF = (props, match) => {
const ProductPageF = ({ getCurrentProduct, product: { product, loading }, match }) => {

  const { nameProduct, description, itemNo, model, filters, _idChildCategory } = product;

  useEffect(() => {
    getCurrentProduct(match.params.id);
  }, [getCurrentProduct]);

  const [active, setActive] = useState(false)

  return (
    <Fragment>
      {loading === true ? <h1>preloader</h1> : (

        <div className="product">
          <div className="product-header">
            <div className="header-info">
              <h3>{_idChildCategory.name}</h3>
              <h2>{nameProduct}</h2>
            </div>
            <p className="item-price">${model[0].currentPrice.toFixed(2)}</p>
          </div>
          <div className="product-photo">
            <img src="https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/jasoksaru5oyf7g4nszw/shox-r4-older-shoe-0zblqw.jpg"></img>
          </div>
          <div className="product-select">
            <div className="sizes-info">
              <p>Select Size</p>
              <a href="/" className="size-guide">
                Size Guide
        </a>
            </div>
          </div>
          {/* need to iterate */}
          <div className="product-sizes container">
            <button className="light-btn">US 40</button>
            <button className="light-btn">US 40.5</button>
            <button className="light-btn">US 41</button>
            <button className="light-btn">US 41.5</button>
            <button className="light-btn">US 42</button>
            <button className="light-btn">US 42.5</button>
          </div>
          <div className="product-buttons container">
            <button className="add-to-bag-btn">Add to bag</button>
            <button className="favorite-btn">Favourite</button>
          </div>
          {/* <div className="product-photos">
            <img></img>
          </div> */}
          <div className="product-discription container">
            <p className="short-description">{description}</p>
            <ul className="property-description">
              <li>Shown: {filters.map(v => {
                if (v.filter.type === 'Color') {
                  return v.subFilter.name
                }
              }).join()}</li>
              <li>Style: {itemNo}</li>
            </ul>
          </div>
          <div className="product-reviews container">
            <div className="reviews-body">
              <div className="review-header"
                onClick={() => setActive(!active)}>
                <div className="title" type="button">Reviews</div>
                <div className="arrow"></div>
              </div>
              <div className={active ? "review-content container active" : "review-content container"}>LSD</div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps, { getCurrentProduct })(ProductPageF);
