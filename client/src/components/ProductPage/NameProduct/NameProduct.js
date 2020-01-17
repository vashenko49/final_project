import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';

class NameProduct extends Component {
  render() {
    const { className } = this.props;
    const { itemNo, nameProduct, price } = this.props.product.product;
    return (
      <div className={`${_.isString(className) && className.length > 0 ? className : ''}`}>
        <Typography variant={'h4'}>{nameProduct}</Typography>
        <Box display="flex" mt={1} flexDirection="row">
          <Typography variant={'subtitle1'}>{itemNo}</Typography>
          <Box ml={5}>
            <Typography variant={'subtitle2'}>$ {price}</Typography>
          </Box>
        </Box>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: state.product
  };
}

export default connect(mapStateToProps, null)(NameProduct);
