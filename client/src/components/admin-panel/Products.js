import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as adminProductsAction from '../../actions/adminProductsAction';

import Grid from '@material-ui/core/Grid';

import ProductsItem from './ProductsItem';

class Products extends Component {
  componentDidMount() {
    this.props.adminProductsAction.getProducts();
  }

  render() {
    const { products } = this.props;

    return (
      <Grid container spacing={2}>
        {products.map(item => (
          <Grid item xs={3} key={item.id}>
            <ProductsItem product={item} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

Products.propTypes = {
  products: PropTypes.array
};

Products.defaultProps = {
  products: [{}]
};

function mapStateToProps(state) {
  return {
    products: state.adminProducts.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    adminProductsAction: bindActionCreators(adminProductsAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
