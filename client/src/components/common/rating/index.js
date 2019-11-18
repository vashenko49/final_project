import React, { Component } from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

/* total: Number, default 5
rating: Number, default 0
interactive: Boolean, default true. Create a read-only rater by setting this attribute to false.
onRate: function({ rating }). Callback to retrieve rating value. Called after rated.
onRating: function({ rating }). Callback to retrieve rating value. Called during rating (mouse moving between stars).
onCancelRate: function({ rating }). Called when mouse moves out from rater.
*/

export default class Rating extends Component {
  render() {
    return <Rater total={5} rating={3} interactive={false} />;
  }
}
