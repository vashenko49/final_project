import React, { Component, Fragment } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';
import _ from 'lodash';

class TableAboutOrder extends Component {
  render() {
    const {
      name,
      email,
      telephone,
      methodPayment,
      deliveryMethod,
      nameDeliveryMethod,
      className
    } = this.props;
    return (
      <TableContainer className={_.isString(className) ? className : ''} component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Phone</TableCell>
              <TableCell>{telephone}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Deliveryman</TableCell>
              <TableCell>{nameDeliveryMethod}</TableCell>
            </TableRow>
            {deliveryMethod.status === 'address'
              ? (() => {
                  const { country, city, postal, street, houseNumber } = deliveryMethod.data;
                  return (
                    <Fragment>
                      <TableRow>
                        <TableCell>Type delivery</TableCell>
                        <TableCell>Courier delivery</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Country</TableCell>
                        <TableCell>{country}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>City</TableCell>
                        <TableCell>{city}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Postal</TableCell>
                        <TableCell>{postal}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Street</TableCell>
                        <TableCell>{street}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>House number</TableCell>
                        <TableCell>{houseNumber}</TableCell>
                      </TableRow>
                    </Fragment>
                  );
                })()
              : (() => {
                  const { nameSelectedAddress } = deliveryMethod.data;
                  return (
                    <Fragment>
                      <TableRow>
                        <TableCell>Type delivery</TableCell>
                        <TableCell>Pickup</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Selected address</TableCell>
                        <TableCell>{nameSelectedAddress}</TableCell>
                      </TableRow>
                    </Fragment>
                  );
                })()}
            {methodPayment.status &&
              (() => {
                const { data: nameMethodPayment } = methodPayment;
                return (
                  <TableRow>
                    <TableCell>Payment</TableCell>
                    <TableCell>{nameMethodPayment}</TableCell>
                  </TableRow>
                );
              })()}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

TableAboutOrder.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  telephone: PropTypes.string,
  nameDeliveryMethod: PropTypes.string,
  methodPayment: PropTypes.object,
  deliveryMethod: PropTypes.object,
  className: PropTypes.string
};

export default TableAboutOrder;
