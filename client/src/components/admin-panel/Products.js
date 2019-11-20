import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as adminProductsAction from '../../actions/adminProductsAction';

import ProductsItem from './ProductsItem';

const Products = ({ products, ...data }) => {
  React.useEffect(() => {
    console.log(products);
    console.log(data);
  }, []);

  return (
    <>
      {products.map(item => (
        <ProductsItem product={item} key={item.id} />
      ))}
    </>
  );
};

Products.propTypes = {
  products: PropTypes.array
};

Products.defaultProps = {
  products: [{ id: 0 }]
};

function mapStateToProps(state) {
  return {
    products: state.products
  };
}

function mapDispatchToProps(dispatch) {
  return {
    adminProductsAction: bindActionCreators(adminProductsAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
