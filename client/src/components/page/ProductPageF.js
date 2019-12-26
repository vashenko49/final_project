import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getCurrentProduct } from '../../actions/product';
import { getCurrentItems, addOrRemoveProduct } from '../../actions/cart';

import { Image } from 'cloudinary-react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import Carousel from './Carousel';
import ProdcutHeader from './ProductHeader';
import ProductColors from './ProductColors';
import ProductSizes from './ProductSizes';
import ProductReview from './ProductReview';
import ProductCheckout from './ProductCheckout';

import './ProductPage.scss';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    left: 30 + '%',
    top: 20 + '%',
    width: 37 + '%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}));

const ProductPageF = ({
  getCurrentProduct,
  addOrRemoveProduct,
  product: { product, loading },
  match
}) => {
  const {
    _id,
    nameProduct,
    description,
    itemNo,
    model,
    // filters,
    productUrlImg,
    _idChildCategory
  } = product;

  const modelsFilters = model ? model.map(v => v.filters).flat() : [];

  const [customerId] = useState('5df3e7aeace3e149fcc94957');
  const [currentModel, setCurrentModel] = useState({});
  const [currentColor, setCurrentColor] = useState('');
  const [currentSize, setCurrentSize] = useState('');

  const needed = 2;
  const handleModel = size => {
    debugger;
    for (let i = 0; i < model.length; i++) {
      let counter = 0;
      for (let j = 0; j < model[i].filters.length; j++) {
        if (_.get(model[i], `filters[${j}].subFilter.name`) === currentColor.toUpperCase()) {
          ++counter;
        }
        if (_.get(model[i], `filters[${j}].subFilter.name`) === size) {
          ++counter;
        }
      }
      if (counter === needed) setCurrentModel(model[i]);
    }
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
    addOrRemoveProduct(customerId, _id, currentModel.modelNo, 1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      {loading === true ? (
        <h1>preloader</h1>
      ) : (
        <div className="product">
          <ProdcutHeader
            itemNo={itemNo}
            nameProduct={nameProduct}
            currentModel={currentModel}
            model={model}
          />
          <div className="product-photo">
            <Image cloudName="dxge5r7h2" publicId={productUrlImg[0]} crop="scale" />
          </div>
          <ProductColors
            modelsFilters={modelsFilters}
            setCurrentColor={setCurrentColor}
            handleModel={handleModel}
          />
          <ProductSizes
            handleModel={handleModel}
            currentColor={currentColor}
            model={model}
            setCurrentSize={setCurrentSize}
          />
          <div className="product-buttons container">
            <button className="black-btn" onClick={handleOpen} disabled={currentSize === ''}>
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
                <h3 className="checkout-title">Added to Bag</h3>

                <ProductCheckout
                  productUrlImg={productUrlImg}
                  nameProduct={nameProduct}
                  _idChildCategory={_idChildCategory}
                  currentModel={currentModel}
                  currentColor={currentColor}
                  currentSize={currentSize}
                />
                <div className="product-buttons container">
                  <Link to={`/cart/${customerId}`}>
                    <button className="grey-btn">View bag</button>
                  </Link>
                  <Link to={`/cart/${customerId}`}>
                    <button className="black-btn">Checkout</button>
                  </Link>
                </div>
              </div>
            </Modal>
          </div>
          <Carousel productUrlImg={productUrlImg} />
          <ProductReview productId={match.params.id} />
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
  addOrRemoveProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPageF);
