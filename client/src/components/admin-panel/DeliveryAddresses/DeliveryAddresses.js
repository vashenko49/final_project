import React, { Component } from 'react';
import Preloader from '../../common/admin-panel/Preloader';
import SnackBars from '../../common/admin-panel/SnackBars';
import Switch from '@material-ui/core/Switch';
import MaterialTable from 'material-table';
import { tableIcons } from '../TableIcons';
import DeliveryAddressesAPI from '../../../services/DeliveryAddressesAPI';

class DeliveryAddresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'Delivery address', field: 'address' },
        {
          title: 'Default',
          field: 'default',
          disableClick: true,
          editComponent: props => {
            return (
              <Switch
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
                value={props.value}
                onChange={e => props.onChange(e.target.checked)}
              />
            );
          },
          render: rowData => (
            <Switch
              checked={rowData.default}
              onChange={(event, checked) => {
                this.handleDefault(event.target.value, rowData._id, checked);
              }}
              data-id={rowData._id}
              value="default"
              color="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          )
        },
        {
          title: 'Enabled',
          field: 'enabled',
          disableClick: true,
          editComponent: props => {
            return (
              <Switch
                value={props.value}
                onChange={e => props.onChange(e.target.checked)}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            );
          },
          render: rowData => {
            return (
              <Switch
                checked={rowData.enabled}
                onChange={(event, checked) => {
                  this.handleEnabled(event.target.value, rowData._id, checked);
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
      sendDataMessage: '',
      isLoading: false
    };
  }

  createNewDeliveryMethod = newData => {
    return new Promise((resolve, reject) => {
      DeliveryAddressesAPI.createDeliveryAddress(newData)
        .then(() => {
          DeliveryAddressesAPI.getDeliveryAddresses().then(res => {
            this.setState({
              data: res,
              sendDataStatus: 'success',
              sendDataMessage: 'Success created a new Address'
            });
            resolve();
          });
        })
        .catch(err => {
          this.setState({
            sendDataStatus: 'error',
            sendDataMessage: err.response.data.message
          });
          reject();
        });
    });
  };
  updateDeliveryMethod = newData => {
    return new Promise((resolve, reject) => {
      const { _id } = newData;
      delete newData._id;
      newData.idDeliveryAddress = _id;
      DeliveryAddressesAPI.updateDeliveryAddresses(newData)
        .then(() => {
          DeliveryAddressesAPI.getDeliveryAddresses().then(res => {
            this.setState({
              data: res,
              sendDataStatus: 'success',
              sendDataMessage: 'Success updated Address'
            });
            resolve();
          });
        })
        .catch(err => {
          this.setState({
            sendDataStatus: 'error',
            sendDataMessage: err.response.data.message
          });
          reject();
        });
    });
  };

  deleteDeliveryMethod = oldData => {
    const { _id } = oldData;
    return new Promise((resolve, reject) => {
      DeliveryAddressesAPI.deleteDeliveryAddress(_id)
        .then(resRemove => {
          DeliveryAddressesAPI.getDeliveryAddresses().then(res => {
            this.setState({
              data: res,
              sendDataStatus: 'success',
              sendDataMessage: resRemove.message
            });
            resolve();
          });
        })
        .catch(err => {
          this.setState({
            sendDataStatus: 'error',
            sendDataMessage: err.response.data.message
          });
          reject();
        });
    });
  };

  onRefreshData = () => {
    this.setState({ load: true });
    DeliveryAddressesAPI.getDeliveryAddresses()
      .then(res => {
        this.setState({ load: false, data: res });
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

  handleEnabled = (name, id, val) => {
    this.setState({ load: true });
    DeliveryAddressesAPI.updateDeliveryAddresses({ idDeliveryAddress: id, enabled: val })
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

  handleDefault = (name, id, val) => {
    this.setState({ load: true });
    DeliveryAddressesAPI.updateDeliveryAddresses({ idDeliveryAddress: id, default: val })
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

  componentDidMount() {
    this.onRefreshData();
  }

  render() {
    const {
      createNewDeliveryMethod,
      onRefreshData,
      deleteDeliveryMethod,
      updateDeliveryMethod,
      handleCloseSnackBars
    } = this;
    const { columns, data, load, sendDataStatus, sendDataMessage } = this.state;
    return (
      <>
        <MaterialTable
          title="Pay Method"
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
            }
          }}
          actions={[
            {
              icon: tableIcons.Refresh,
              tooltip: 'Refresh Data',
              isFreeAction: true,
              onClick: onRefreshData
            }
          ]}
          editable={{
            onRowAdd: createNewDeliveryMethod,
            onRowUpdate: updateDeliveryMethod,
            onRowDelete: deleteDeliveryMethod
          }}
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

export default DeliveryAddresses;
