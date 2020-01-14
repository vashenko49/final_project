import React, { Component } from 'react';
import Preloader from '../../common/admin-panel/Preloader';
import SnackBars from '../../common/admin-panel/SnackBars';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ConfigSystemDetail from './ConfigSystemDetail/ConfigSystemDetail';
import Switch from '@material-ui/core/Switch';
import { tableIcons } from '../../common/admin-panel/TableIcons';
import MaterialTable from 'material-table';
import ConfigurationAPI from '../../../services/ConfigurationAPI';
import { Button, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

class ConfigSystem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'Name configuration', field: 'customId' },
        {
          title: 'Active',
          field: 'active',
          disableClick: true,
          render: rowData => {
            return (
              <Switch
                checked={rowData.active}
                onChange={(event, checked) => {
                  this.handleActive(event.target.value, rowData._id, checked);
                }}
                value="active"
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

  handleActive = (name, id, val) => {
    this.setState({ load: true });
    ConfigurationAPI.updateConfig({ _id: id, active: val })
      .then(() => {
        ConfigurationAPI.getConfigs().then(res => {
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
  addConfig = () => {
    this.setState({ openDialog: true });
  };
  onRefreshData = () => {
    this.setState({ load: true });
    ConfigurationAPI.getConfigs()
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
  deleteConfig = oldData => {
    return new Promise((resolve, reject) => {
      const { _id } = oldData;
      ConfigurationAPI.removeConfig(_id)
        .then(() => {
          ConfigurationAPI.getConfigs().then(res => {
            this.setState({
              data: res,
              sendDataStatus: 'success',
              sendDataMessage: `Success remove config`
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
  updateConfig = data => {
    this.setState({ load: true });
    ConfigurationAPI.updateConfig(data)
      .then(() => {
        ConfigurationAPI.getConfigs().then(res => {
          this.setState({
            load: false,
            data: res,
            sendDataStatus: 'success',
            sendDataMessage: `Success updated config`
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

  setSnackBars = (sendDataStatus, sendDataMessage) => {
    this.setState({
      sendDataStatus: sendDataStatus,
      sendDataMessage: sendDataMessage
    });
  };
  onCloseDialog = () => {
    this.setState({ openDialog: false });
  };
  handleCloseSnackBars = (event, reason) => {
    if (reason === 'clickaway') return;
    this.setState({ sendDataMessage: '' });
  };
  createNewConfig = data => {
    this.setState({ load: true });
    ConfigurationAPI.createNewConfig(data)
      .then(() => {
        ConfigurationAPI.getConfigs().then(res => {
          this.setState({
            load: false,
            openDialog: false,
            data: res,
            sendDataStatus: 'success',
            sendDataMessage: `Success created a new config`
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

  switchSystem = () => {
    this.setState({ load: true });
    ConfigurationAPI.switchActiveConfig()
      .then(res => {
        console.log(res);
        this.setState({
          load: false,
          openDialog: false,
          sendDataStatus: 'success',
          sendDataMessage: `Success switched system to current data`
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
      addConfig,
      onRefreshData,
      deleteConfig,
      updateConfig,
      onCloseDialog,
      createNewConfig,
      handleCloseSnackBars,
      setSnackBars,
      switchSystem
    } = this;
    const { columns, data, load, sendDataStatus, sendDataMessage, openDialog } = this.state;
    return (
      <>
        <Typography align={'center'} variant={'h3'} color={'error'}>
          Attention! Changes in the system can lead to critical errors!
        </Typography>
        <MaterialTable
          title="Partner"
          icons={tableIcons}
          columns={columns}
          data={data}
          options={{
            rowStyle: rowData => ({
              backgroundColor: rowData.active ? '#FFF' : '#EEEF'
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
              onClick: addConfig
            },
            {
              icon: tableIcons.Refresh,
              tooltip: 'Refresh Data',
              isFreeAction: true,
              onClick: onRefreshData
            }
          ]}
          editable={{
            onRowDelete: deleteConfig
          }}
          detailPanel={[
            {
              tooltip: 'Detail',
              render: rowData => {
                return (
                  <ConfigSystemDetail
                    setSnackBars={setSnackBars}
                    load={load}
                    rowData={rowData}
                    submit={updateConfig}
                  />
                );
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
            <ConfigSystemDetail setSnackBars={setSnackBars} load={load} submit={createNewConfig} />
          </DialogContent>
        </Dialog>
        <Box m={2}>
          <Button onClick={switchSystem} disabled={load} variant="contained" color="primary">
            Switch system to current data
          </Button>
        </Box>
      </>
    );
  }
}

export default ConfigSystem;
