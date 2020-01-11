import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import AuthorizationAPI from '../../../services/AuthorizationAPI';
import Preloader from '../../common/admin-panel/Preloader';
import SnackBars from '../../common/admin-panel/SnackBars';
import CustomerDetail from './CustomerDetail/CustomerDetail';
import { tableIcons } from '../TableIcons';
import MaterialTable from 'material-table';

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'Number customer', field: 'customerNo' },
        {
          title: 'Is admin',
          field: 'isAdmin',
          disableClick: true,
          render: rowData => (
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
          )
        },
        {
          title: 'Enabled',
          field: 'enabled',
          disableClick: true,
          render: rowData => {
            return (
              <Switch
                checked={rowData.enabled}
                onChange={(event, checked) => {
                  this.handleSwitch(event.target.value, rowData._id, checked);
                }}
                value="enabled"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
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
        this.setState({
          load: false,
          data: this.state.data.map(element => {
            const { _id } = element;
            if (id === _id) {
              element[`${name}`] = val;
            }
            return element;
          }),
          sendDataStatus: 'success',
          sendDataMessage: `Success ${val ? 'activated' : 'deactivated'}`
        });
      })
      .catch(err => {
        this.setState({
          load: false,
          sendDataStatus: 'error',
          sendDataMessage: err.response.data.message
        });
      });
  };

  onRefreshData = () => {
    this.setState({ load: true });
    AuthorizationAPI.getCustomers()
      .then(res => {
        this.setState({ data: res, load: false });
      })
      .catch(err => {
        this.setState({
          data: [],
          load: false,
          sendDataStatus: 'error',
          sendDataMessage: err.response.data.message
        });
      });
  };

  handleCloseSnackBars = (event, reason) => {
    if (reason === 'clickaway') return;
    this.setState({ sendDataMessage: '' });
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
          detailPanel={[
            {
              tooltip: 'Detail',
              render: rowData => {
                return <CustomerDetail rowData={rowData} />;
              }
            }
          ]}
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

export default Customers;
