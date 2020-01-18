import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Paper, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import './ReviewProduct.scss';
import Button from '@material-ui/core/Button';
import RateReviewIcon from '@material-ui/icons/RateReview';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { bindActionCreators } from 'redux';
import * as ProductAction from '../../../actions/product';

class ReviewProduct extends Component {
  createNewComment = () => {
    const { selectFilter } = this.props;
    const { productId } = this.props.product.product;
  };

  getSimpleDate = date => {
    return new Date(date).toISOString().split('T')[0];
  };

  render() {
    const { getSimpleDate } = this;
    const { className } = this.props;
    const { rating, comments } = this.props.product.product;
    return (
      <div
        className={`review-container ${
          _.isString(className) && className.length > 0 ? className : ''
        }`}
      >
        <ExpansionPanel defaultExpanded={true}>
          <ExpansionPanelSummary>
            <div className="title-add-review">
              <div className="rating-title-container">
                <Typography variant={'h2'}>
                  <span className="rating-title">{`Reviews   ${rating}/`}</span>5
                </Typography>
                <Rating className="rating-product" size={'large'} value={rating} readOnly />
              </div>
              <Button className={'subfilter-button-selected button-add-review'} variant="contained">
                <RateReviewIcon /> ADD A REVIEW
              </Button>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="comments-container">
              {comments.map(item => {
                const {
                  _id,
                  date,
                  text,
                  score,
                  authorId: { firstName, lastName }
                } = item;
                return (
                  <Paper className="comment-container" key={_id}>
                    <div className="title-comment">
                      <Typography variant="h6">{`${firstName} ${lastName}`}</Typography>
                      <Rating className="rating-product" value={score} readOnly />
                    </div>
                    <Typography variant={'subtitle1'}>{text}</Typography>
                    <Typography align={'right'} variant={'caption'}>
                      {getSimpleDate(date)}
                    </Typography>
                  </Paper>
                );
              })}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: state.product
  };
}
function mapDispatchToProps(dispatch) {
  return {
    selectFilter: bindActionCreators(ProductAction.createComment, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewProduct);
