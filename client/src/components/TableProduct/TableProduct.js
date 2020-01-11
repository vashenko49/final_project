import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import CircularProgress from '@material-ui/core/CircularProgress';
import cloudinary from 'cloudinary-core';
import TableContainer from '@material-ui/core/TableContainer';
import { connect } from 'react-redux';
import _ from 'lodash';

class TableProduct extends Component {
  render() {
    const { cloudinary_cloud_name } = this.props.configuration;
    const { product: items, freeDelivery, costValue, totalSum, className } = this.props;
    return (
      <TableContainer className={_.isString(className) ? className : ''} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name product</TableCell>
              <TableCell align="right">Image Product</TableCell>
              <TableCell align="right">Product number</TableCell>
              <TableCell align="right">Model number</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price USD</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(item => {
              const {
                _id,
                quantity,
                idProduct: { nameProduct, itemNo, productUrlImg, filterImg },
                modelNo: { modelNo, currentPrice }
              } = item;
              const currentImg =
                productUrlImg.length > 0
                  ? productUrlImg[0]
                  : filterImg.length > 0
                  ? filterImg[0]
                  : 'final-project/products/product_without_photo_sample/product_without_phot_ldw3px';
              return (
                <TableRow key={_id + modelNo}>
                  <TableCell component="th" scope="row">
                    {nameProduct}
                  </TableCell>
                  <TableCell align="right">
                    {cloudinary_cloud_name.length <= 0 ? (
                      <CircularProgress />
                    ) : (
                      <img
                        className="img-check-table"
                        alt="Not found"
                        src={new cloudinary.Cloudinary({
                          cloud_name: cloudinary_cloud_name
                        }).url(currentImg)}
                      />
                    )}
                  </TableCell>
                  <TableCell align="right">{itemNo}</TableCell>
                  <TableCell align="right">{modelNo}</TableCell>
                  <TableCell align="right">{quantity}</TableCell>
                  <TableCell align="right">{currentPrice * quantity}</TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell colSpan={5}>Cost of delivery</TableCell>
              <TableCell align="right">{freeDelivery ? '0' : costValue}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell align="right">{totalSum}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

TableProduct.propTypes = {
  product: PropTypes.array,
  freeDelivery: PropTypes.bool,
  costValue: PropTypes.number,
  totalSum: PropTypes.number,
  className: PropTypes.string
};

function mapStateToProps(state) {
  return {
    configuration: state.configuration
  };
}

export default connect(mapStateToProps, null)(TableProduct);
