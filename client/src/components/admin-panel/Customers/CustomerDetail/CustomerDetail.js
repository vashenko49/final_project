import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import _ from 'lodash';
import { connect } from 'react-redux';
import cloudinary from 'cloudinary-core';

import './CustomerDenail.scss';

class CustomerDetail extends Component {
  generateCustomerInfo = () => {
    const { cloudinary_cloud_name } = this.props.configuration;
    const { getSimpleDate } = this;
    const data = _.cloneDeep(this.props.rowData);
    const info = [];
    delete data._id;
    delete data.__v;
    delete data.tableData;
    delete data.password;
    const socialmedia = ['Google', 'Facebook', 'GitHub', 'Local'];
    for (let key in data) {
      if (data[`${key}`]) {
        let datatemp = data[`${key}`];
        if (key === 'date') {
          datatemp = getSimpleDate(datatemp);
        }
        if (key === 'socialmedia') {
          datatemp = datatemp
            .map(element => {
              return socialmedia[element];
            })
            .join(', ');
        }
        if (key === 'avatarUrl') {
          datatemp = new cloudinary.Cloudinary({
            cloud_name: cloudinary_cloud_name
          }).url(datatemp);
        }

        info.push({
          specification: key,
          value: datatemp.toString()
        });
      }
    }
    return info;
  };
  getSimpleDate = date => {
    return new Date(date).toISOString().split('T')[0];
  };

  render() {
    const { generateCustomerInfo } = this;
    generateCustomerInfo();

    return (
      <TableContainer component={Paper}>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Specification</TableCell>
              <TableCell align="center">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {generateCustomerInfo().map(element => {
              const { specification, value } = element;
              return (
                <TableRow key={specification}>
                  <TableCell>{specification}</TableCell>
                  <TableCell>
                    {specification === 'avatarUrl' ? (
                      <img className="customer-photo" src={value} alt="Not found" />
                    ) : (
                      value
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

CustomerDetail.propTypes = {
  rowData: PropTypes.object
};

function mapStateToProps(state) {
  return { configuration: state.configuration };
}

export default connect(mapStateToProps, null)(CustomerDetail);
