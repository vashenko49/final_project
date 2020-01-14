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
      isAuthorization: this.props.authorization
    };
  }

  componentDidMount() {
    if(this.isAuthorization){
      this.props.getCurrentItems();
    }
  }

  render() {
    const { loading } = this.props.cart;

    return (
      <div className="cart">
        {loading ?
        ( <img src={preloader} className="preloader" alt="Загрузка..." /> )
        : (
          <Fragment>
            <Bag />
            <Item isAuthorization={this.isAuthorization}/>
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
