import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import shippingMethodAPI from '../../../services/shippingMethodAPI';
import Preloader from '../../common/admin-panel/Preloader';
import SnackBars from '../../common/admin-panel/SnackBars';
import MaterialTable from 'material-table';
import { tableIcons } from '../../common/admin-panel/TableIcons';
import ShippingMethodDetail from './ShippingMethodDetail/ShippingMethodDetail';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

class ShippingMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'Shipping Method', field: 'name' },
        {
          title: 'Default',
          field: 'default',
          disableClick: true,
          render: rowData => (
            <Switch
              checked={rowData.default}
              onChange={(event, checked) => {
                this.handleSwitch(event.target.value, rowData._id, checked);
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
        },
        {
          title: 'Express delivery',
          field: 'isDeliveryAddress',
          disableClick: true,
          render: rowData => {
            return (
              <Switch
                checked={rowData.isDeliveryAddress}
                onChange={(event, checked) => {
                  this.handleSwitch(event.target.value, rowData._id, checked);
                }}
                value="isDeliveryAddress"
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
      isLoading: false,
      openDialog: false,
      activeDetailPanel: ''
    };
  }

  componentDidMount() {
    this.onRefreshData();
  }

  handleEnabled = (name, id, val) => {
    this.setState({ load: true });
    shippingMethodAPI
      .activateOrDeactivateShippingMethod({ idShippingMethod: id, status: val })
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
          sendDataMessage: err.response.data.message || err.message
        });
      });
  };

  handleSwitch = (name, id, val) => {
    this.setState({ load: true });
    shippingMethodAPI
      .updateShippingMethod({ idShippingMethod: id, [`${name}`]: val })
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
          sendDataMessage: err.response.data.message || err.message
        });
      });
  };

  triggerDialogWindow = status => {
    this.setState({ openDialog: status });
  };
  onRefreshData = () => {
    this.setState({ load: true });
    shippingMethodAPI
      .getShippingMethod()
      .then(res => {
        this.setState({ data: res, load: false });
      })
      .catch(err => {
        this.setState({
          data: [],
          load: false,
          sendDataStatus: 'error',
          sendDataMessage: err.response.data.message || err.message
        });
      });
  };
  deleteMethod = oldData => {
    const { _id } = oldData;
    return new Promise((resolve, reject) => {
      shippingMethodAPI
        .removeShippingMethod(_id)
        .then(() => {
          this.setState({
            sendDataStatus: 'success',
            sendDataMessage: 'Success remove shipping method'
          });
          this.onRefreshData();
          resolve();
        })
        .catch(err => {
          this.setState({
            sendDataStatus: 'error',
            sendDataMessage: err.response.data.message || err.message
          });
          reject();
        });
    });
  };
  updateMethod = data => {
    this.setState({ load: true });
    shippingMethodAPI
      .updateShippingMethod(data)
      .then(() => {
        this.setState({
          openDialog: false,
          sendDataStatus: 'success',
          sendDataMessage: 'Success created a new shipping method'
        });
        this.onRefreshData();
      })
      .catch(err => {
        this.setState({
          openDialog: false,
          load: false,
          sendDataStatus: 'error',
          sendDataMessage: err.response.data.message || err.message
        });
      });
  };
  createNewMethod = data => {
    this.setState({ load: true });
    shippingMethodAPI
      .createShippingMethod(data)
      .then(() => {
        this.setState({
          openDialog: false,
          sendDataStatus: 'success',
          sendDataMessage: 'Success created a new shipping method'
        });
        this.onRefreshData();
      })
      .catch(err => {
        this.setState({
          load: false,
          openDialog: false,
          sendDataStatus: 'error',
          sendDataMessage: err.response.data.message || err.message
        });
      });
  };
  setLoad = status => {
    this.setState({ load: status });
  };
  handleCloseSnackBars = (event, reason) => {
    if (reason === 'clickaway') return;
    this.setState({ sendDataMessage: '' });
  };
  render() {
    const {
      triggerDialogWindow,
      onRefreshData,
      deleteMethod,
      updateMethod,
      createNewMethod,
      setLoad,
      handleCloseSnackBars
    } = this;

    const { columns, data, load, sendDataStatus, sendDataMessage, openDialog } = this.state;
    return (
      <>
        <MaterialTable
          title="Shipping Method"
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
              icon: tableIcons.Add,
              tooltip: 'Add Shipping Method',
              isFreeAction: true,
              onClick: () => {
                triggerDialogWindow(true);
              }
            },
            {
              icon: tableIcons.Refresh,
              tooltip: 'Refresh Data',
              isFreeAction: true,
              onClick: onRefreshData
            }
          ]}
          editable={{
            onRowDelete: deleteMethod
          }}
          detailPanel={[
            {
              tooltip: 'Detail',
              render: rowData => {
                return (
                  <ShippingMethodDetail
                    setLoad={setLoad}
                    load={load}
                    rowData={rowData}
                    submit={updateMethod}
                  />
                );
              }
            }
          ]}
        />
        <Dialog
          open={openDialog}
          onClose={() => {
            triggerDialogWindow(false);
          }}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <ShippingMethodDetail setLoad={setLoad} load={load} submit={createNewMethod} />
          </DialogContent>
        </Dialog>
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

export default ShippingMethod;
