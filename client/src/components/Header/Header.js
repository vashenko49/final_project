import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as headerAction from '../../actions/headerAction'

import './Header.scss';

class Header extends Component {
  componentDidMount() {
    this.props.getRootCategories();
    this.props.getChildCategories();
  }

  render() {
    const { rootCategories, childCategories } = this.props;

    return (
      <div className="header">

      </div>
    );
  }
}

Header.defaultProps = [];

function mapStateToProps(state) {
  return {
    rootCategories: state.header.rootCategories,
    childCategories: state.header.childCategories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRootCategories: bindActionCreators(headerAction.getRootCategories, dispatch),
    getChildCategories: bindActionCreators(headerAction.getChildCategory, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
