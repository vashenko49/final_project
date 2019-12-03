import React, { Component } from 'react';
import Carousel from 'react-material-ui-carousel';
import ImageCarouselItem from './ImageCarouselItem';
import autoBind from 'auto-bind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as product from '../../actions/product';
import './ImageCarousel.scss';

class ImageCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      autoPlay: true,
      timer: 1000,
      animation: 'slide',
      indicators: false
    };

    autoBind(this);
  }

  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { products } = this.props;

    return (
      <Carousel
        className="image-carousel"
        autoPlay={this.state.autoPlay}
        timer={this.state.timer}
        animation={this.state.animation}
        indicators={this.state.indicators}
      >
        {products.map((item, index) => {
          return <ImageCarouselItem item={item} key={index} />;
        })}
      </Carousel>
    );
  }
}

ImageCarousel.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object.isRequired)
};

ImageCarousel.defaultProps = {};

function mapStateToProps(state) {
  return {
    products: state.product.products
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: bindActionCreators(product.getProducts, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageCarousel);
