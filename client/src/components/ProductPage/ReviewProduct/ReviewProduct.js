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
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import AddCommentIcon from '@material-ui/icons/AddComment';
import Box from '@material-ui/core/Box';

class ReviewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenWindowAddComment: false,
      score: 5,
      text: '',
      isCreated: false
    };
  }

  setRating = (event, newValue) => {
    this.setState({ score: newValue });
  };

  triggerCreateCommentWindow = () => {
    this.setState({ isOpenWindowAddComment: !this.state.isOpenWindowAddComment, isCreated: false });
  };

  createNewComment = event => {
    event.preventDefault();
    const { score, text } = this.state;
    const { createComment } = this.props;
    const { productId, comments } = this.props.product.product;
    this.setState({ isCreated: true, text: '' });
    createComment(productId, score, text, comments);
  };

  onChangeComment = event => {
    this.setState({ [`${event.target.name}`]: event.target.value });
  };

  getSimpleDate = date => {
    return new Date(date).toISOString().split('T')[0];
  };

  render() {
    const {
      getSimpleDate,
      createNewComment,
      triggerCreateCommentWindow,
      setRating,
      onChangeComment
    } = this;
    const { isOpenWindowAddComment, score, text, isCreated } = this.state;
    const { className } = this.props;
    const { rating, comments } = this.props.product.product;
    const { isAuthorization } = this.props.authorization;
    return (
      <div
        className={`review-container ${
          _.isString(className) && className.length > 0 ? className : ''
        }`}
      >
        {isAuthorization && (
          <Button
            onClick={triggerCreateCommentWindow}
            className={'subfilter-button-selected button-add-review'}
            variant="contained"
          >
            <RateReviewIcon /> ADD A REVIEW
          </Button>
        )}

        <ExpansionPanel defaultExpanded={true}>
          <ExpansionPanelSummary>
            <div className="rating-title-container">
              <Typography variant={'h4'}>
                <span className="rating-title">{`Reviews   ${
                  !_.isNaN(parseInt(rating)) ? parseInt(rating) : 5
                }/`}</span>
                5
              </Typography>
              <Rating
                className="rating-product"
                size={'large'}
                value={!_.isNaN(parseInt(rating)) ? parseInt(rating) : 5}
                readOnly
              />
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
        <Dialog
          open={isOpenWindowAddComment}
          onClose={triggerCreateCommentWindow}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            {isCreated ? (
              <Typography variant={'h6'}>Your comment has been created</Typography>
            ) : (
              <>
                <Typography variant={'h6'}>Enter your comment</Typography>
                <ValidatorForm
                  className="form-window-checkout"
                  ref="form"
                  onSubmit={createNewComment}
                >
                  <Rating name="simple-controlled" value={score} onChange={setRating} />
                  <TextValidator
                    margin="normal"
                    label="Your comments"
                    onChange={onChangeComment}
                    name="text"
                    fullWidth
                    multiline={true}
                    value={text}
                    variant="outlined"
                    validators={['required']}
                    errorMessages={['This field is required']}
                  />
                  <Box mt={1} display={'flex'} justifyContent="flex-end">
                    <Button type="submit" className="subfilter-button-selected" variant="contained">
                      <AddCommentIcon /> Add comment
                    </Button>
                  </Box>
                </ValidatorForm>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: state.product,
    authorization: state.authorization
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createComment: bindActionCreators(ProductAction.createComment, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewProduct);
