import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import { Stars, StarsChange } from '../common/rating/Rating';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import { getCurrentComments, createNewComment } from '../../actions/comments';

import './ProductPage.scss';

const ProductReview = ({
  getCurrentComments,
  createNewComment,
  comments: { comments },
  customerId,
  productId
}) => {
  const [active, setActive] = useState(false);
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState('');

  const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 82 + '%',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
      [theme.breakpoints.up('sm')]: {
        width: 49 + '%',
        left: 23 + '%',
        top: 21 + '%'
      },
      [theme.breakpoints.up('md')]: {
        width: 33 + '%',
        left: 33 + '%',
        top: 22 + '%',
        alignItems: 'center'
      }
    }
  }));

  useEffect(() => {
    getCurrentComments(productId);
    // eslint-disable-next-line
  }, [getCurrentComments]);

  // Modal settings
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="product-reviews container">
      <div className="review-header" onClick={() => setActive(!active)}>
        <div className="title" type="button">
          Reviews
        </div>
        <div className="arrow"></div>
      </div>
      <div className={active ? 'review-content container active' : 'review-content container'}>
        {comments.map(v => {
          return (
            <Fragment key={v._id}>
              <Stars stars={v.score} className="review-rating" />
              <p className="review-date">
                {v.authorId.firstName + ' ' + v.authorId.lastName} -{' '}
                {new Date(v.date).toLocaleString().split(', ')[0]}
              </p>
              <div>
                <p className="review-text">{v.text}</p>
              </div>
            </Fragment>
          );
        })}
      </div>
      <div className="create-review">
        <button className="review-btn" onClick={handleOpen}>
          Add A Review
        </button>
      </div>
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div className={classes.paper}>
            <h3 className="checkout-title">Write A Review</h3>
            <form className="review-form">
              <label htmlFor="rating" className="review-form-label">
                My overall rating:
              </label>
              <StarsChange setRate={setRate} />
              <label htmlFor="story" className="review-form-label">
                Review:
              </label>
              <textarea
                id="story"
                name="story"
                rows="9"
                cols="46"
                placeholder="Write your review here. It must be 5 characters long. Consider whether you would recommend this product"
                onChange={e => setReview(e.target.value)}
              ></textarea>
              <div className="product-buttons container">
                <button
                  type="submit"
                  className="black-btn"
                  onClick={e => {
                    e.preventDefault();
                    createNewComment(customerId, productId, rate, review);
                    window.location.reload(true);
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  comments: state.comments
});

const mapDispatchToProps = {
  getCurrentComments,
  createNewComment
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductReview);
