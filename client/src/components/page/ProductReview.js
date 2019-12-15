import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import Rating from '../common/rating/Rating';

import { getCurrentComments } from '../../actions/comments';

import './ProductPage.scss';

const ProductReview = ({ getCurrentComments, comments: { comments }, productId }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    getCurrentComments(productId);
    // eslint-disable-next-line
  }, [getCurrentComments]);

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
