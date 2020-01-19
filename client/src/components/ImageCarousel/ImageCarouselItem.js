import React, { Component } from 'react';
import { Button, Paper } from '@material-ui/core';
import cloudinary from 'cloudinary-core';
import { connect } from 'react-redux';
import parse from 'html-react-parser';
import _ from 'lodash';
import StyledLink from '../common/styled/StyledLink';

class ImageCarouselItem extends Component {
  render() {
    const { cloudinary_cloud_name } = this.props.configuration;
    const { title, htmlContent, childCatalogs, product } = this.props.item;
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
        {_.isString(htmlContent) && htmlContent.length > 0 ? (
          parse(htmlContent)
        ) : (
          <div className="caption">
            <h2 className="caption__text">{title}</h2>
            <StyledLink
              to={
                _.isObject(childCatalogs)
                  ? `/catalog/${childCatalogs._id}`
                  : `/product/${product._id}`
              }
            >
              <Button className="caption__btn">Show more</Button>
            </StyledLink>
          </div>
        )}
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
