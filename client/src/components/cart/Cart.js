import React, { Component, Fragment } from 'react';

import Item from './Item';
import Bag from './Bag';

export default class Cart extends Component {
  render() {
    return (
      <Fragment>
        <Bag />
        <Item />
      </Fragment>
    );
  }
}
