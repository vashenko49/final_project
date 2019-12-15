import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProduct } from '../../actions/product';
import { getCurrentItems, addNewProduct } from '../../actions/cart';

import { Image } from 'cloudinary-react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import Carousel from './Carousel';
import ProdcutHeader from './ProductHeader';
import ProductSizes from './ProductSizes';
import ProductReview from './ProductReview';
import ProductCheckout from './ProductCheckout';

import './ProductPage.scss';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
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

  const modelsFilters = model ? model.map(v => v.filters).flat() : [];

  const [customerId] = useState('5df3e7aeace3e149fcc94957');
  const [currentModel, setCurrentModel] = useState({});
  const [currentColor, setCurrentColor] = useState('');

  const handleModel = () => {
    const foundIndex = model.find(v => {
      const tmp = v.filters
        .map(e => {
          if (e.subFilter.name === 'Nike Air') {
            // Current color
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
    // addNewProduct('', _id, 1); ////////////// ADD //////// CURRENT //////// MODEL_ID
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
          <div className="product-colors container">
            {modelsFilters.map(v => {
              if (v.filter.type === 'Color') {
                return (
                  <button
                    className="product-select-color"
                    name="currentColor"
                    onClick={e => {
                      setCurrentColor(e.target.value);
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
                <h3 className="checkout-title">Added to Bag</h3>

                <ProductCheckout
                  productUrlImg={productUrlImg}
                  nameProduct={nameProduct}
                  _idChildCategory={_idChildCategory}
                  currentColor={currentColor}
                />
                <div className="product-buttons container">
                  {/* <Link to={`/cart/${customerId}`}> */}
                  {/* TODO */}
                  <button className="grey-btn" onClick={getCurrentItems(match.params.id)}>
                    View bag
                  </button>
                  {/* </Link> */}
                  <button className="black-btn" onClick={getCurrentItems(match.params.id)}>
                    Checkout
                  </button>{' '}
                  {/* UPDATE THEN REDIRECT */}
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
  addNewProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPageF);
