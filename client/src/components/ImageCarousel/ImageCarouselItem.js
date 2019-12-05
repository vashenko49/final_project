import React, { Component } from 'react';
import { Button, Paper } from '@material-ui/core';

export default class ImageCarouselItem extends Component {
  render() {
    return (
      <Paper
        className="image-carousel-item"
        elevation={10}
        style={{
          background: `url(${this.props.item.productUrlImg[0]}) center`,
          backgroundSize: 'cover',
          height: '500px'
        }}
      >
        <div className="caption">
          <h2 className="caption__text">{this.props.item.nameProduct}</h2>
          <Button className="caption__btn">Show more</Button>
        </div>
      </Paper>
    );
  }
}
