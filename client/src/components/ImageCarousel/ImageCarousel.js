import React, { Component } from 'react';
import Carousel from 'react-material-ui-carousel';
import ImageCarouselItem from './ImageCarouselItem';
import autoBind from 'auto-bind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as slides from '../../actions/slidesAction';
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
    this.props.getActiveSlides();
  }

  render() {
    const { slides } = this.props;

    return (
      <Carousel
        className="image-carousel"
        autoPlay={this.state.autoPlay}
        timer={this.state.timer}
        animation={this.state.animation}
        indicators={this.state.indicators}
      >
        {slides.map((item, index) => {
          return <ImageCarouselItem item={item} key={index} />;
        })}
      </Carousel>
    );
  }
}

ImageCarousel.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object.isRequired)
};

ImageCarousel.defaultProps = {};

function mapStateToProps(state) {
  return {
    slides: state.slides.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getActiveSlides: bindActionCreators(slides.getActiveSlides, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageCarousel);
