import React, { Component } from 'react';
import { Button, Paper } from '@material-ui/core';
import cloudinary from 'cloudinary-core';
import { connect } from 'react-redux';

class ImageCarouselItem extends Component {
  render() {
    const { cloudinary_cloud_name } = this.props.configuration;
    return (
      <Paper
        className="image-carousel-item"
        elevation={10}
        style={{
          background: `url(${new cloudinary.Cloudinary({ cloud_name: cloudinary_cloud_name }).url(
            this.props.item.imageUrl
          )}) center`,
          backgroundSize: 'cover',
          height: '500px'
        }}
      >
        <div className="caption">
          <h2 className="caption__text">{this.props.item.title}</h2>
          <Button className="caption__btn">Show more</Button>
        </div>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    configuration: state.configuration
  };
}

export default connect(mapStateToProps)(ImageCarouselItem);
