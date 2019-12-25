import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import Rating from '../common/rating/Rating';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import { getCurrentComments } from '../../actions/comments';

import './ProductPage.scss';

const ProductReview = ({ getCurrentComments, comments: { comments }, productId }) => {
  const [active, setActive] = useState(false);

  const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      left: 30 + '%',
      top: 20 + '%',
      width: 37 + '%',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
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
              <Rating stars={v.score} className="review-rating" />
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

            <div className="product-buttons container">
              <button className="black-btn">Submit</button>
            </div>
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
  getCurrentComments
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductReview);
