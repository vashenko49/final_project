import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

class FilterModel extends Component {
  render() {
    const { className } = this.props;
    return (
      <div className={`${_.isString(className) && className.length > 0 ? className : ''}`}></div>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: state.product
  };
}

export default connect(mapStateToProps, null)(FilterModel);
