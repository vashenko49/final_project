import React, { Component } from 'react';
import Slider from 'react-slick';

import { Image } from 'cloudinary-react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default class Responsive extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 9,
      slidesToScroll: 2,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    const { productUrlImg, setCurrentPhoto } = this.props;

    const photos = [];

    for (let i = 0; i < productUrlImg.length; i++) {
      photos.push(
        <div key={i}>
          <Image
            value={i}
            cloudName="dxge5r7h2"
            publicId={productUrlImg[i]}
            width="400"
            crop="scale"
            alt="sneaker not found"
            onClick={e => {
              setCurrentPhoto(productUrlImg[e.target.attributes.value.value]);
            }}
          />
        </div>
      );
    }

    return (
      <div className="product-photos">
        <Slider {...settings}>{photos}</Slider>
      </div>
    );
  }
}
