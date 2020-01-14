import React, { useEffect, useState } from 'react';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 82 + '%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      width: 49 + '%',
      left: 23 + '%',
      top: 21 + '%'
    },
    [theme.breakpoints.up('md')]: {
      width: 33 + '%',
      left: 33 + '%',
      top: 22 + '%',
      alignItems: 'center'
    }
  }
}));

const ProductPageF = ({
  getCurrentProduct,
  addOrRemoveProduct,
  product: { product, loading },
  authorization: { isAuthorization },
  match
}) => {
  const {
    _id,
    nameProduct,
    description,
    itemNo,
    model,
    filterImg,
    productUrlImg,
    _idChildCategory
  } = product;

  const modelsFilters = model ? model.map(v => v.filters).flat() : [];

  const [customerId] = useState('5df3e7aeace3e149fcc94957');
  const [currentModel, setCurrentModel] = useState({});
  const [currentColor, setCurrentColor] = useState('');
  const [currentSize, setCurrentSize] = useState('');
  const [currentPhoto, setCurrentPhoto] = useState('');

  const needed = 2;
  const handleModel = size => {
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

  const [item] = useState([])
  const handleOpen = () => {
    setOpen(true);
    if(isAuthorization) {
      addOrRemoveProduct(_id, currentModel.modelNo, 1);
    } else {
      item.push({idProduct: product, modelNo: currentModel, quantity: 1})
      localStorage.setItem('items', JSON.stringify(item))
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      {loading === true ? (
        <CircularProgress className="preloader-page" />
      ) : (
        <div className="product">
          <ProdcutHeader
            itemNo={itemNo}
            nameProduct={nameProduct}
            currentModel={currentModel}
            model={model}
          />
          <div className="product-photo">
            <Image cloudName="dxge5r7h2" publicId={currentPhoto || productUrlImg[0]} crop="scale" />
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
                  parentId={_id}
                  productUrlImg={productUrlImg}
                  nameProduct={nameProduct}
                  _idChildCategory={_idChildCategory}
                  currentModel={currentModel}
                  currentColor={currentColor}
                  currentSize={currentSize}
                />
                <div className="product-buttons container">
                  <Link to={`/cart`}>
                    <button className="grey-btn">View bag</button>
                  </Link>
                  <Link to={`/cart`}>
                    <button className="black-btn">Checkout</button>
                  </Link>
                </div>
              </div>
            </Modal>
          </div>
          <Carousel
            productUrlImg={productUrlImg}
            setCurrentPhoto={setCurrentPhoto}
            filterImg={filterImg}
            currentColor={currentColor}
          />
          <ProductReview customerId={customerId} productId={match.params.id} />
          <div className="product-discription container">
            <p className="short-description">{description}</p>
            <ul className="property-description">
              <li>Shown: {currentColor}</li>
              <li>Style: {itemNo}</li>
            </ul>
          </div>
        </div>
      )}
    </Container>
  );
};

const mapStateToProps = state => ({
  product: state.product,
  authorization: state.authorization,
});

const mapDispatchToProps = {
  getCurrentProduct,
  getCurrentItems,
  addOrRemoveProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPageF);
