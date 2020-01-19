import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCurrentItems } from '../../actions/authorizationAction';
import preloader from '../../assets/loading2.gif';

import Item from './Item';
import Bag from './Bag';
import Checkout from './Checkout';

class Cart extends Component {
  componentDidMount() {
    this.props.getCurrentItems();
  }

  render() {
    const {
      cart: { loading }
    } = this.props.authorization;
    return (
      <div className="cart">
        {loading ? (
          <img src={preloader} className="preloader" alt="Загрузка..." />
        ) : (
          <Fragment>
            <Bag />
            <Item />
            <Checkout />
          </Fragment>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authorization: state.authorization
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentItems: bindActionCreators(getCurrentItems, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
