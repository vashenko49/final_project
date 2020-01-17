import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import cloudinary from 'cloudinary-core';
import CircularProgress from '@material-ui/core/CircularProgress';
import './SelectedImg.scss';

class SelectedImg extends Component {
  render() {
    const { className } = this.props;
    const { cloudinary_cloud_name } = this.props.configuration;
    const notFound =
      'final-project/products/product_without_photo_sample/product_without_phot_ldw3px';
    const { selectedIndexImg, massImg } = this.props.product.product;
    return (
      <div
        className={`selected-img-container ${
          _.isString(className) && className.length > 0 ? className : ''
        }`}
      >
        {!cloudinary_cloud_name ? (
          <CircularProgress />
        ) : (
          <img
            className="img-selected"
            src={new cloudinary.Cloudinary({
              cloud_name: cloudinary_cloud_name
            }).url(
              massImg.length > 0 && selectedIndexImg <= massImg.length
                ? massImg[selectedIndexImg]
                : notFound
            )}
            alt={'not found'}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: state.product,
    configuration: state.configuration
  };
}

export default connect(mapStateToProps, null)(SelectedImg);
