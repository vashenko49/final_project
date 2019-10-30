import React, {Component} from 'react';

import Preloader from '../common/preloader'


// ProductImage receive {src} and while render, apper preloader
// May use for any images

export default class LoadImage extends Component{
  state = {
    src: `https://lorempixel.com/300/290/nature/6`, // latter do : take src from promise 
        loaded: false
      };

      onImageLoaded = () => {
        this.setState({ loaded: true });
      };

      render() {
        const { src, loaded } = this.state;
        return (
            <div className="image-container">
              <img
                src={src}
                onLoad={this.onImageLoaded}
                alt = "Not Found"
              />
              {!loaded && (
                <div className="image-container-overlay">
                  <Preloader />
                </div>
              )}
            </div>
        );
      }
}