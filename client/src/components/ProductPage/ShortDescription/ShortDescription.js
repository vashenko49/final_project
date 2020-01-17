import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

class ShortDescription extends Component {
  render() {
    const { description } = this.props.product.product;
    const { className } = this.props;
    return (
      <div className={`${_.isString(className) && className.length > 0 ? className : ''}`}>
        <Typography variant={'body2'}>{description}</Typography>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: state.product
  };
}

export default connect(mapStateToProps, null)(ShortDescription);
