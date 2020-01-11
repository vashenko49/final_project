import React, { Component } from 'react';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import Partners from '../Partners/Partners';
import CatalogOnMainPage from '../CatagoryOnMainPage/CatalogOnMainPage';
import { Link } from 'react-router-dom';

export default class MainPage extends Component {
  render() {
    return (
      <div>
        <ImageCarousel />
        <Partners />
        <CatalogOnMainPage />
        <Link to={'/personaldata'}>personaldata</Link>
      </div>
    );
  }
}
