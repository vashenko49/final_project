import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCurrentItems } from '../../actions/cart';
import preloader from '../../assets/loading2.gif';

import Item from './Item';
import Bag from './Bag';
import Checkout from './Checkout';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '5df3e7aeace3e149fcc94957'
    };
  }

  componentDidMount() {
    this.props.getCurrentItems();
  }

  render() {
    const { isAuthorization } = this.props.authorization;
    const { loading } = this.props.cart;
    return (
      <div className="cart">
        {loading ? (
          !isAuthorization ? (
            <div>Cart only for authorzation user, sorry bro</div>
          ) : (
            <img src={preloader} className="preloader" atl="Загрузка..." />
          )
        ) : (
          <Fragment>
            <Bag user={this.state._id} />
            <Item customerId={this.state._id} />
            <Checkout />
          </Fragment>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authorization: state.authorization,
    cart: state.cart
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentItems: bindActionCreators(getCurrentItems, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
