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
import * as ProductAction from '../../actions/productAction';
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
    this.props.getIsFavourites(id);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { id: newId } = this.props.match.params;
    const { id: oldId } = prevProps.match.params;
    if (newId.toString() !== oldId.toString()) {
      this.setState({ id: newId });
      this.props.getCurrentProduct(newId);
      this.props.getMeanRatingProductByProductId(newId);
      this.props.getIsFavourites(newId);
    }
  }

  render() {
    const { id } = this.state;
    return (
      <Container>
        <div className="product-page-container">
          <BreadCrumbsProducts className="BreadCrumbsProducts" />
          <NameProduct className="NameProduct" />
          <SelectedImg className="SelectedImg" />
          <ShortDescription className="ShortDescription" />
          <FilterModel className="FilterModel" />
          <ImageCarouselProduct className="ImageCarouselProduct" />
          <DetailInfoProduct className="DetailInfoProduct" />
          <LastViewProduct id={id} className="LastViewProduct" />
          <ReviewProduct className="ReviewProduct" />
        </div>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentProduct: bindActionCreators(ProductAction.getCurrentProduct, dispatch),
    getIsFavourites: bindActionCreators(ProductAction.getIsFavourites, dispatch),
    getMeanRatingProductByProductId: bindActionCreators(
      ProductAction.getMeanRatingProductByProductId,
      dispatch
    )
  };
}

export default connect(null, mapDispatchToProps)(ProductPage);
