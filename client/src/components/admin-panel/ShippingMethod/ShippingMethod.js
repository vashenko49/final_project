import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import shippingMethodAPI from '../../../services/shippingMethodAPI';
import Preloader from '../../common/admin-panel/Preloader';
import SnackBars from '../../common/admin-panel/SnackBars';
import MaterialTable from 'material-table';
import { tableIcons } from '../TableIcons';
import ShippingMethodDetail from './ShippingMethodDetail';
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
        },
        {
          title: 'Enabled',
          field: 'isDeliveryAddress',
          disableClick: true,
          render: rowData => {
            return (
              <Switch
                checked={rowData.isDeliveryAddress}
                onChange={(event, checked) => {
                  this.handleEnabled(event.target.value, rowData._id, checked);
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
      openDialog: false
    };
  }

  componentDidMount() {
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
          sendDataMessage: err.response.data.message
        });
      });
  }

  addMethod = () => {};
  onRefreshData = () => {};
  deleteMethod = () => {};
  updateMethod = () => {};
  onCloseDialog = () => {};
  createNewMethod = () => {};

  render() {
    const {
      addMethod,
      onRefreshData,
      deleteMethod,
      updateMethod,
      onCloseDialog,
      createNewMethod
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
          detailPanel={[
            {
              tooltip: 'Detail',
              render: rowData => {
                return <ShippingMethodDetail submit={updateMethod} />;
              }
            }
          ]}
        />
        <Dialog open={openDialog} onClose={onCloseDialog} aria-labelledby="form-dialog-title">
          <DialogContent>
            <ShippingMethodDetail load={load} submit={createNewMethod} />
          </DialogContent>
        </Dialog>
        <Preloader open={load} />
        <SnackBars
          handleClose={this.handleCloseSnackBars}
          variant={sendDataStatus}
          open={!!sendDataMessage}
          message={sendDataMessage}
        />
      </>
    );
  }
}

export default ShippingMethod;
