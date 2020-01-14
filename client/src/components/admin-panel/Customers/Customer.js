import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import AuthorizationAPI from '../../../services/AuthorizationAPI';
import Preloader from '../../common/admin-panel/Preloader';
import SnackBars from '../../common/admin-panel/SnackBars';
import { tableIcons } from '../../common/admin-panel/TableIcons';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import _ from 'lodash';
import cloudinary from 'cloudinary-core';
import { Typography } from '@material-ui/core';

import './Customer.scss';

class Customers extends Component {
  constructor(props) {
    super(props);
    const { cloudinary_cloud_name } = this.props.configuration;
    this.state = {
      columns: [
        { title: 'Number customer', field: 'customerNo' },
        { title: 'Specification', field: 'specification' },
        {
          title: 'Value',
          render: rowData => {
            const { value } = rowData;
            return _.isUndefined(value) ? (
              <></>
            ) : value.indexOf('final-project') >= 0 ? (
              <img
                className="customer-avatar-table"
                alt="not found"
                src={new cloudinary.Cloudinary({
                  cloud_name: cloudinary_cloud_name
                }).url(value)}
              />
            ) : (
              <Typography variant={'body2'}>{value}</Typography>
            );
          },
          field: 'value'
        },
        {
          title: 'Is admin',
          field: 'isAdmin',
          export: false,
          disableClick: true,
          render: rowData => {
            return _.isBoolean(rowData.enabled) ? (
              <Switch
                checked={rowData.isAdmin}
                onChange={(event, checked) => {
                  this.handleSwitch(event.target.value, rowData._id, checked);
                }}
                data-id={rowData._id}
                value="isAdmin"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            ) : (
              <></>
            );
          }
        },
        {
          title: 'Enabled',
          field: 'enabled',
          type: 'boolean',
          disableClick: true,
          render: rowData => {
            return _.isBoolean(rowData.enabled) ? (
              <Switch
                checked={rowData.enabled}
                onChange={(event, checked) => {
                  this.handleSwitch(event.target.value, rowData.__id, checked);
                }}
                value="enabled"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            ) : (
              <></>
            );
          }
        }
      ],
      data: [],
      load: false,
      sendDataStatus: 'success',
      sendDataMessage: ''
    };
  }

  componentDidMount() {
    this.onRefreshData();
  }

  handleSwitch = (name, id, val) => {
    this.setState({ load: true });
    AuthorizationAPI.editStatusCustomer({ customerId: id, [`${name}`]: val })
      .then(() => {
        AuthorizationAPI.getCustomers().then(res => {
          this.setState({
            load: false,
            data: this.transformData(res),
            sendDataStatus: 'success',
            sendDataMessage: `Success ${val ? 'activated' : 'deactivated'}`
          });
        });
      })
      .catch(err => {
        this.setState({
          load: false,
          sendDataStatus: 'error',
          sendDataMessage: err.response.data.message || err.message
        });
      });
  };

  onRefreshData = () => {
    this.setState({ load: true });
    AuthorizationAPI.getCustomers()
      .then(res => {
        this.setState({ data: this.transformData(res), load: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          data: [],
          load: false,
          sendDataStatus: 'error',
          sendDataMessage: err.response.data.message || err.message
        });
      });
  };

  handleCloseSnackBars = (event, reason) => {
    if (reason === 'clickaway') return;
    this.setState({ sendDataMessage: '' });
  };

  getSimpleDate = date => {
    return new Date(date).toISOString().split('T')[0];
  };

  transformData = data => {
    const newFormat = [];
    const { cloudinary_cloud_name } = this.props.configuration;
    const { getSimpleDate } = this;

    data.forEach(element => {
      const { _id, customerNo, isAdmin, enabled } = element;
      const main = { __id: _id, customerNo, isAdmin, enabled };
      newFormat.push(main);

      const item = _.cloneDeep(element);
      delete item.__v;
      delete item.tableData;
      delete item.customerNo;
      delete item.isAdmin;
      delete item.enabled;
      delete item.password;
      const socialmedia = ['Google', 'Facebook', 'GitHub', 'Local'];
      for (let key in item) {
        if (item[`${key}`]) {
          let datatemp = item[`${key}`];
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

          newFormat.push({
            _id: _id,
            __id: _id + key,
            specification: key,
            value: datatemp.toString()
          });
        }
      }
    });
    return newFormat;
  };

  render() {
    const { handleCloseSnackBars, onRefreshData } = this;
    const { columns, data, load, sendDataStatus, sendDataMessage } = this.state;
    return (
      <>
        <MaterialTable
          title="Customers"
          icons={tableIcons}
          columns={columns}
          data={data}
          options={{
            rowStyle: rowData => ({
              backgroundColor: rowData.enabled ? '#FFF' : '#EEEF'
            }),
            headerStyle: {
              backgroundColor: '#455a64',
              color: '#FFF',
              position: 'sticky',
              textAlign: 'center',
              top: 0
            },
            detailPanelType: 'single'
          }}
          actions={[
            {
              icon: tableIcons.Refresh,
              tooltip: 'Refresh Data',
              isFreeAction: true,
              onClick: onRefreshData
            }
          ]}
          parentChildData={(row, rows) => rows.find(a => a.__id === row._id)}
        />
        <Preloader open={load} />
        <SnackBars
          handleClose={handleCloseSnackBars}
          variant={sendDataStatus}
          open={!!sendDataMessage}
          message={sendDataMessage}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return { configuration: state.configuration };
}

export default connect(mapStateToProps, null)(Customers);
