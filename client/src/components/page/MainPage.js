import React, { Component } from 'react';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import CatalogOnMainPage from '../CatagoryOnMainPage/CatalogOnMainPage';

export default class MainPage extends Component {
  render() {
    return (
      <div>
        <ImageCarousel />
        <CatalogOnMainPage />
      </div>
    );
  }
}
