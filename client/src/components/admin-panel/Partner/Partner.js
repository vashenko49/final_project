import React, { Component } from 'react';
import Preloader from '../../common/admin-panel/Preloader';
import SnackBars from '../../common/admin-panel/SnackBars';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Switch from '@material-ui/core/Switch';
import MaterialTable from 'material-table';
import { tableIcons } from '../../common/admin-panel/TableIcons';
import PartnerDetail from './PartnerDetail/PartnerDetail';
import PartnerAPI from '../../../services/PartnerAPI';

class Partner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'Name', field: 'name' },
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

  componentDidMount() {
    this.onRefreshData();
  }

  handleEnabled = (name, id, val) => {
    this.setState({ load: true });
    PartnerAPI.activateOrDeactivatePartner({ idPartner: id, status: val })
      .then(() => {
        PartnerAPI.getPartner().then(res => {
          this.setState({
            load: false,
            data: res,
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
  addPartner = () => {
    this.setState({ openDialog: true });
  };
  onRefreshData = () => {
    this.setState({ load: true });
    PartnerAPI.getPartner()
      .then(res => {
        this.setState({
          data: res,
          load: false
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
  deletePartner = oldData => {
    return new Promise((resolve, reject) => {
      const { _id } = oldData;
      PartnerAPI.removePartner(_id)
        .then(() => {
          PartnerAPI.getPartner().then(res => {
            this.setState({
              data: res,
              sendDataStatus: 'success',
              sendDataMessage: `Success remove partner`
            });
            resolve();
          });
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
  updatePartner = data => {
    this.setState({ load: true });
    PartnerAPI.updatePartner(data)
      .then(() => {
        PartnerAPI.getPartner().then(res => {
          this.setState({
            load: false,
            data: res,
            sendDataStatus: 'success',
            sendDataMessage: `Success created a new partner`
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
  onCloseDialog = () => {
    this.setState({ openDialog: false });
  };
  handleCloseSnackBars = (event, reason) => {
    if (reason === 'clickaway') return;
    this.setState({ sendDataMessage: '' });
  };
  createNewPartner = data => {
    this.setState({ load: true });
    PartnerAPI.createPartner(data)
      .then(() => {
        PartnerAPI.getPartner().then(res => {
          this.setState({
            load: false,
            openDialog: false,
            data: res,
            sendDataStatus: 'success',
            sendDataMessage: `Success created a new partner`
          });
        });
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

  render() {
    const {
      addPartner,
      onRefreshData,
      deletePartner,
      updatePartner,
      onCloseDialog,
      createNewPartner,
      handleCloseSnackBars
    } = this;
    const { columns, data, load, sendDataStatus, sendDataMessage, openDialog } = this.state;
    return (
      <>
        <MaterialTable
          title="Partner"
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
              onClick: addPartner
            },
            {
              icon: tableIcons.Refresh,
              tooltip: 'Refresh Data',
              isFreeAction: true,
              onClick: onRefreshData
            }
          ]}
          editable={{
            onRowDelete: deletePartner
          }}
          detailPanel={[
            {
              tooltip: 'Detail',
              render: rowData => {
                return <PartnerDetail load={load} partnerData={rowData} submit={updatePartner} />;
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
        <Dialog open={openDialog} onClose={onCloseDialog} aria-labelledby="form-dialog-title">
          <DialogContent>
            <PartnerDetail load={load} submit={createNewPartner} />
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default Partner;
