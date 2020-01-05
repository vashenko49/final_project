import React, { Component } from 'react';
import Rating from 'react-rating';

class Stars extends Component {
  render() {
    return (
      <Rating
        // initialRating={this.props.stars}
        // readonly
        emptySymbol="fa fa-star-o fa-2x"
        fullSymbol="fa fa-star fa-2x"
        fractions={2}
      />
    );
  }
}

class StarsChange extends Component {
  render() {
    return <Rating onChange={this.props.onChange} />;
  }
}

export { Stars, StarsChange };
