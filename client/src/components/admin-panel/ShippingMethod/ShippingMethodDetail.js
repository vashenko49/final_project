import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';

class ShippingMethodDetail extends Component {
  render() {
    const { submit } = this.props;
    return (
      <Container>
        <ValidatorForm ref="form" onSubmit={submit}></ValidatorForm>
      </Container>
    );
  }
}

ShippingMethodDetail.propTypes = {
  load: PropTypes.bool,
  submit: PropTypes.func
};

export default ShippingMethodDetail;
