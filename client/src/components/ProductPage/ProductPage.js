import React, { Component } from 'react';
import './ProductPage.scss';
import { Container } from '@material-ui/core';
import BreadCrumbsProducts from './BreadCrumbsProducts/BreadCrumbsProducts';
import NameProduct from './NameProduct/NameProduct';
import SelectedImg from './SelectedImg/SelectedImg';
import DetailInfoProduct from './DetailInfoProduct/DetailInfoProduct';
import FilterModel from './FilterModel/FilterModel';
import ImageCarouselProduct from './ImageCarouselProduct/ImageCarouselProduct';
import ShortDescription from './ShortDescription/ShortDescription';
import LastViewProduct from './LastViewProduct/LastViewProduct';
import ReviewProduct from './ReviewProduct/ReviewProduct';
import { bindActionCreators } from 'redux';
import * as ProductAction from '../../actions/product';
import { connect } from 'react-redux';

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id
    };
  }

  componentDidMount() {
    const { id } = this.state;
    this.props.getCurrentProduct(id);
    this.props.getMeanRatingProductByProductId(id);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { id: newId } = this.props.match.params;
    this.setState({ id: newId });
    this.props.getCurrentProduct(newId);
    this.props.getMeanRatingProductByProductId(newId);
  }

  render() {
    return (
      <Container>
        <div className="product-page-container">
          <BreadCrumbsProducts />
          <NameProduct />
          <SelectedImg />
          <ShortDescription />
          <FilterModel />
          <ImageCarouselProduct />
          <DetailInfoProduct />
          <LastViewProduct />
          <ReviewProduct />
        </div>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentProduct: bindActionCreators(ProductAction.getCurrentProduct, dispatch),
    getMeanRatingProductByProductId: bindActionCreators(
      ProductAction.getMeanRatingProductByProductId,
      dispatch
    )
  };
}

export default connect(null, mapDispatchToProps)(ProductPage);
