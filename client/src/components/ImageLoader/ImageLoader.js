import React, { Component } from 'react';

import Preloader from '../common/preloader';

// ProductImage receive {src} and while render, apper preloader
// May use for any images

export default class LoadImage extends Component {
  state = {
    src: `https://lorempixel.com/300/290/nature/2`, // latter do : take src from promise
    loaded: false
  };

  onImageLoaded = () => {
    this.setState({ loaded: true });
  };
  onImageEror = () => {
    this.setState({
      loaded: true,
      src:
        'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'
    });
  };

  render() {
    const { src, loaded } = this.state;
    return (
      <div className="image-container">
        <img src={src} onLoad={this.onImageLoaded} onError={this.onImageEror} alt="loading..." />
        {!loaded && (
          <div className="image-container-overlay">
            <Preloader />
          </div>
        )}
      </div>
    );
  }
}
