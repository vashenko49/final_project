import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProduct } from '../../actions/product';
import { getCurrentItems, addNewProduct } from '../../actions/cart';

import {Image} from 'cloudinary-react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import Carousel from './Carousel';
import ProdcutHeader from './ProductHeader'
import ProductSizes from './ProductSizes'

import './ProductPage.scss';
import ProductReview from './ProductReview';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    // border: '.6px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}));

const ProductPageF = ({
  getCurrentProduct,
  getCurrentItems,
  addNewProduct,
  product: { product, loading },
  match
}) => {
  const {
    _id,
    nameProduct,
    description,
    itemNo,
    model,
    filters,
    productUrlImg,
    _idChildCategory
  } = product;
  
  const modelsFilters = model ? model.map(v => v.filters).flat() : []

  const [customerId, setId] = useState('5de5592bf82b736ff4eb3c08');

  const [currentModel, setCurrentModel] = useState({});

  const [currentColor, setCurrentColor] = useState('');

  const handleModel = () => {
    const foundIndex = model.find(v => {
      const tmp = v.filters
        .map(e => {
          if (e.subFilter.name === 'Nike Air') { //Current color
            return true;
          }
          return false;
        })
        .join();
      return tmp;
    });
    setCurrentModel(foundIndex);
  };

  // Load product
  useEffect(() => {
    getCurrentProduct(match.params.id);
    // eslint-disable-next-line
  }, [getCurrentProduct]);

  // Modal settings
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    addNewProduct('5de5592bf82b736ff4eb3c08', _id, 1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const amount = [];

  for (let i = 1; i < 10; i++) {
    amount.push(<option key={i} value={i}>{i}</option>);
  }
  return (
    <Fragment>
      {loading === true ? (
        <h1>preloader</h1>
      ) : (
        <div className="product">
          <ProdcutHeader itemNo={itemNo} nameProduct={nameProduct} currentModel={currentModel} model={model}/>
          <div className="product-photo">
            <Image cloudName="dxge5r7h2" publicId={productUrlImg[0]} crop="scale" />
          </div>
          <div className="product-colors container">
            {modelsFilters.map(v => {
              if (v.filter.type === 'Color') {
                return (
                  <button
                    className="product-select-color"
                    name="currentColor"
                    onClick={e => {
                      setCurrentColor(e.target.value)
                      handleModel();
                    }}
                    style={{ backgroundColor: v.subFilter.name.toLowerCase() }}
                    value={v.subFilter.name.toLowerCase()}
                  />
                );
              }
              return [];
            })}
          </div>
          <ProductSizes currentModel={currentModel} filters={filters} />
          <div className="product-buttons container">
            <button className="black-btn" onClick={handleOpen}>
              {' '}
              {/* parallel make request to add new product */}
              Add to bag
            </button>
            <button className="grey-btn">Favourite</button>
          </div>
          <div>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={open}
              onClose={handleClose}
            >
              <div className={classes.paper}>
                <h3 className="checkout-title">Added to Bag</h3> {/* TODO */}
                <div className="checkout-content">
                  <img src={productUrlImg[0]} alt="sneaker not found"></img>
                  <div className="checkout-info">
                    <h5>{nameProduct}</h5>
                    <p>{_idChildCategory.name}</p>
                    <p className="checkout-field">
                      Price: <span>${89}</span>
                    </p>
                    <p className="checkout-field">
                      Color: <span>{currentColor}</span>
                    </p>
                    <p className="checkout-field">
                      Size: <span>{37.5}</span>
                    </p>
                    <label htmlFor="quantity">Quantity</label>
                    <select name="quantity">{amount}</select>
                  </div>
                </div>
                <div className="product-buttons container">
                  <Link to={`/cart/${customerId}`}>
                    {/* TODO */}
                    <button
                      className="grey-btn"
                      onClick={getCurrentItems('5de5592bf82b736ff4eb3c08')}
                    >
                      View bag
                    </button>
                  </Link>
                  <button
                    className="black-btn"
                    onClick={getCurrentItems('5de5592bf82b736ff4eb3c08')}
                  >
                    Checkout
                  </button>{' '}
                  {/* UPDATE THEN REDIRECT */}
                </div>
              </div>
            </Modal>
          </div>
          <Carousel productUrlImg={productUrlImg}/>
          <ProductReview />
          <div className="product-discription container">
            <p className="short-description">{description}</p>
            <ul className="property-description">
              <li>Shown: {currentColor}</li>
              <li>Style: {itemNo}</li>
            </ul>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  product: state.product
});

const mapDispatchToProps = {
  getCurrentProduct,
  getCurrentItems,
  addNewProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPageF);
