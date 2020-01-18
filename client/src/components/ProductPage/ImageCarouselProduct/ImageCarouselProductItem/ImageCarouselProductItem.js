import React, { Component } from 'react';
import { connect } from 'react-redux';
import cloudinary from 'cloudinary-core';
import _ from 'lodash';
import './ImageCarouselProductItem.scss';
import { bindActionCreators } from 'redux';
import * as ProductAction from '../../../../actions/productAction';

class ImageCarouselProductItem extends Component {
  changeImg = e => {
    const { changeImg, indexItem } = this.props;
    changeImg(indexItem);
  };

  render() {
    const { changeImg } = this;
    const { itemImf, className, indexItem } = this.props;
    const { cloudinary_cloud_name } = this.props.configuration;
    return (
      <div
        data-index={indexItem}
        onClick={changeImg}
        className={`${_.isString(className) && className.length > 0 ? className : ''}`}
      >
        <img
          className="item-img"
          src={new cloudinary.Cloudinary({
            cloud_name: cloudinary_cloud_name
          }).url(itemImf)}
          alt="not found"
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    configuration: state.configuration
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeImg: bindActionCreators(ProductAction.changeImg, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageCarouselProductItem);
