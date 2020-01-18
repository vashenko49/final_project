import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import ItemsCarousel from 'react-items-carousel';
import './ImageCarouselProduct.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import ImageCarouselProductItem from './ImageCarouselProductItem/ImageCarouselProductItem';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
class ImageCarouselProduct extends Component {
  state = {
    activeItemIndex: 0
  };

  onChange = value => this.setState({ activeItemIndex: value });

  render() {
    const { className } = this.props;
    const { cloudinary_cloud_name } = this.props.configuration;
    const { massImg } = this.props.product.product;
    return (
      <div
        className={`image-carousel-product ${
          _.isString(className) && className.length > 0 ? className : ''
        }`}
      >
        {!cloudinary_cloud_name ? (
          <CircularProgress />
        ) : (
          <ItemsCarousel
            gutter={12}
            numberOfCards={4}
            activeItemIndex={this.state.activeItemIndex}
            requestToChangeActive={this.onChange}
            rightChevron={<ArrowForwardIosIcon fontSize={'large'} />}
            leftChevron={<ArrowBackIosIcon fontSize={'large'} />}
            chevronWidth={1}
            outsideChevron
            children={massImg.map((item, index) => (
              <ImageCarouselProductItem
                className="image-carousel-image"
                key={index}
                itemImf={item}
                indexItem={index}
              />
            ))}
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

export default connect(mapStateToProps, null)(ImageCarouselProduct);
