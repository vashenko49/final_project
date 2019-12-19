import React, { Component } from 'react';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import Partners from '../Partners/Partners';
import CatalogOnMainPage from '../CatagoryOnMainPage/CatalogOnMainPage';

export default class MainPage extends Component {
  render() {
    return (
      <div>
        <ImageCarousel />
        <Partners />
        <CatalogOnMainPage />
      </div>
    );
  }
}
