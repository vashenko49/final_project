import React, { Component } from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class BreadCrumbsProducts extends Component {
  render() {
    const { className } = this.props;
    const {
      product: { _idChildCategory, nameChildCatalog, nameRootCatalog }
    } = this.props.product;
    return (
      <Breadcrumbs
        className={`breadcrumbs ${_.isString(className) && className.length > 0 ? className : ''}`}
        aria-label="breadcrumb"
      >
        <Link color="inherit" to="/">
          Home
        </Link>
        <Link color="inherit" to="/">
          {nameRootCatalog}
        </Link>
        <Link
          color="inherit"
          to={_idChildCategory.length < 0 ? '/' : `/catalog/${_idChildCategory}`}
        >
          {nameChildCatalog}
        </Link>
      </Breadcrumbs>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: state.product
  };
}

export default connect(mapStateToProps, null)(BreadCrumbsProducts);
