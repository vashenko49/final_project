import React, { Component } from 'react';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import Partners from '../Partners/Partners';
import CatalogOnMainPage from '../CatagoryOnMainPage/CatalogOnMainPage';

class MainPage extends Component {
  render() {
    return (
      <>
        <ImageCarousel />
        <Partners />
        <CatalogOnMainPage />
      </>
    );
  }
}

export default MainPage;
