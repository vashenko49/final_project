import React, { Component } from 'react';
import { tableIcons } from '../TableIcons';
import MaterialTable from 'material-table';
import Switch from '@material-ui/core/Switch';
import _ from 'lodash';
import paymentMethodsAPI from '../../../services/paymentMethodsAPI';
import Preloader from '../../common/admin-panel/Preloader';
import SnackBars from '../../common/admin-panel/SnackBars';
import PayMethodDetail from './PayMethodDetail/PayMethodDetail';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

class PayMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'Pay method', field: 'name' },
        {
          title: 'Default',
          field: 'default',
          disableClick: true,
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
      openDialog: false
    };
  }

  handleEnabled = (name, id, val) => {
    this.setState({ load: true });
    paymentMethodsAPI
      .activateOrDeactivatePaymentMethod({ idPaymentMethod: id, status: val })
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

  handleCloseSnackBars = (event, reason) => {
    if (reason === 'clickaway') return;
    this.setState({ sendDataMessage: '' });
  };

  handleDefault = (name, id, val) => {
    this.setState({ load: true });
    paymentMethodsAPI
      .updatePaymentMethod({ idPaymentMethod: id, default: val })
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

  onCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  onRefreshData = () => {
    this.setState({ load: true });
    paymentMethodsAPI.getPaymentMethods().then(res => {
      this.setState({ data: res, load: false });
    });
  };
  addMethod = () => {
    this.setState({ openDialog: true });
  };

  createNewMethod = data => {
    this.setState({ load: true, openDialog: false });
    paymentMethodsAPI
      .createPaymentMethod(data)
      .then(() => {
        paymentMethodsAPI.getPaymentMethods().then(res => {
          this.setState({
            load: false,
            data: res,
            sendDataStatus: 'success',
            sendDataMessage: `Success created a new payment method`
          });
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

  deleteMethod = oldData => {
    return new Promise((resolve, reject) => {
      const { _id } = oldData;
      paymentMethodsAPI
        .removePaymentMethod(_id)
        .then(() => {
          paymentMethodsAPI.getPaymentMethods().then(res => {
            this.setState({
              data: res,
              sendDataStatus: 'success',
              sendDataMessage: `Success remove payment method`
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

  updateMethod = data => {
    this.setState({ load: true });
    paymentMethodsAPI
      .updatePaymentMethod(data)
      .then(() => {
        paymentMethodsAPI.getPaymentMethods().then(res => {
          this.setState({
            load: false,
            data: res,
            sendDataStatus: 'success',
            sendDataMessage: `Success update payment method`
          });
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
    this.setState({ load: true });
    paymentMethodsAPI.getPaymentMethods().then(res => {
      this.setState({
        load: false,
        data: _.isArray(res) ? res : []
      });
    });
  }

  render() {
    const {
      addMethod,
      onRefreshData,
      deleteMethod,
      updateMethod,
      onCloseDialog,
      createNewMethod,
      handleCloseSnackBars
    } = this;
    const { columns, data, load, sendDataStatus, sendDataMessage, openDialog } = this.state;
    return (
      <>
        <MaterialTable
          title="Pay Method"
          icons={tableIcons}
          columns={columns}
          data={data}
          detailPanel={[
            {
              tooltip: 'Detail',
              render: rowData => {
                return <PayMethodDetail load={load} payMethod={rowData} submit={updateMethod} />;
              }
            }
          ]}
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
              icon: tableIcons.Add,
              tooltip: 'Add User',
              isFreeAction: true,
              onClick: addMethod
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
        />
        <Preloader open={load} />
        <SnackBars
          handleClose={handleCloseSnackBars}
          variant={sendDataStatus}
          open={!!sendDataMessage}
          message={sendDataMessage}
        />
        <Dialog open={openDialog} onClose={onCloseDialog} aria-labelledby="form-dialog-title">
          <DialogContent>
            <PayMethodDetail load={load} submit={createNewMethod} />
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default PayMethod;
