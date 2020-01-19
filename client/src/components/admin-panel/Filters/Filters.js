import React, { Component } from 'react';
import { Redirect } from 'react-router';

import BtnCreateAdmin from '../../common/admin-panel/BtnCreateAdmin';

import SnackBars from '../../common/admin-panel/SnackBars';
import Preloader from '../../common/admin-panel/Preloader';

import AdminFiltersAPI from '../../../services/AdminFiltersAPI';

import MaterialTable from 'material-table';

import Switch from '@material-ui/core/Switch';

import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { tableIcons } from '../../common/admin-panel/TableIcons';

export default class Filters extends Component {
  state = {
    columns: [
      { title: 'Filter', field: 'title' },
      { title: 'Service name', field: 'serviceName' },
      {
        title: 'Enabled',
        field: 'enabled',
        disableClick: true,
        render: rowData =>
          !rowData.parentId && (
            <Switch
              checked={rowData.enabled}
              onChange={(e, val) => this.handleEnabled(val, rowData)}
              value="enabled"
              color="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          )
      }
    ],
    data: [],
    clickId: null,
    sendDataStatus: 'success',
    sendDataMessage: '',
    isLoading: false
  };

  async componentDidMount() {
    await this.onRefreshData();
  }

  setIsLoading = state => {
    this.setState({ isLoading: state });
  };

  onSelectDelete = (event, delData) => {
    try {
      this.setIsLoading(true);

      delData.forEach(async item => {
        if (item.parentId) {
          await AdminFiltersAPI.deleteSubFilters(item.id);

          this.setIsLoading(false);

          this.setState({
            sendDataStatus: 'success',
            sendDataMessage: `${item.title} sub filter has been remove!`
          });
        } else {
          await AdminFiltersAPI.deleteFilters(item.id);

          this.setIsLoading(false);

          this.setState({
            sendDataStatus: 'success',
            sendDataMessage: `${item.title} filter has been remove!`
          });

          this.setState(prevState => {
            const data = prevState.data.filter(i => !delData.includes(i));
            return { ...prevState, data };
          });
        }
      });
    } catch (err) {
      this.setIsLoading(false);

      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: err.response.data.message || err.message
      });
    }
  };

  onRowClick = (evt, selectedRow) => {
    this.setState({ clickId: selectedRow.id });
  };

  onRefreshData = async () => {
    try {
      this.setIsLoading(true);

      const { data } = await AdminFiltersAPI.getFilters();

      const preViewRes = [];

      data.forEach(item => {
        preViewRes.push({
          id: item._id,
          title: item.type,
          serviceName: item.serviceName,
          enabled: item.enabled
        });

        item._idSubFilters.forEach(sub => {
          preViewRes.push({
            id: sub._id,
            title: sub.name,
            parentId: item._id,
            enabled: sub.enabled
          });
        });
      });

      this.setIsLoading(false);

      this.setState({
        data: preViewRes
      });
    } catch (err) {
      this.setIsLoading(false);

      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: err.response.data.message || err.message
      });
    }
  };

  handleEnabled = async (val, id) => {
    try {
      this.setIsLoading(true);

      await AdminFiltersAPI.changeStatusFilter(id.id, val);

      this.setState({
        data: this.state.data.map(i => {
          if (id.id === i.id) {
            i.enabled = val;
          }
          return i;
        })
      });

      this.setIsLoading(false);

      this.setState({
        sendDataStatus: 'success',
        sendDataMessage: `Change status enable success!`
      });
    } catch (err) {
      this.setIsLoading(false);

      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: err.response.data.message || err.message
      });
    }
  };

  handleCloseSnackBars = (event, reason) => {
    if (reason === 'clickaway') return;

    this.setState({ sendDataMessage: '' });
  };

  render() {
    const { columns, data, sendDataStatus, sendDataMessage, clickId, isLoading } = this.state;

    return (
      <>
        <MaterialTable
          icons={tableIcons}
          title="Filters"
          columns={columns}
          data={data}
          parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
          options={{
            selection: true,
            exportButton: true,
            actionsColumnIndex: -1,
            rowStyle: rowData => ({
              backgroundColor: rowData.enabled ? '#FFF' : '#EEEF'
            }),
            headerStyle: {
              backgroundColor: '#455a64',
              color: '#FFF'
            }
          }}
          actions={[
            {
              tooltip: 'Remove selected',
              icon: () => <DeleteOutline />,
              onClick: this.onSelectDelete
            },
            {
              icon: tableIcons.Refresh,
              tooltip: 'Refresh Data',
              isFreeAction: true,
              onClick: this.onRefreshData
            }
          ]}
          onRowClick={this.onRowClick}
        />
        <BtnCreateAdmin to="/admin-panel/filters/new" />

        <SnackBars
          handleClose={this.handleCloseSnackBars}
          variant={sendDataStatus}
          open={!!sendDataMessage}
          message={sendDataMessage}
        />

        <Preloader open={isLoading} />

        {this.state.clickId ? (
          <Redirect to={`/admin-panel/filters/${clickId}`} push={true} />
        ) : null}
      </>
    );
  }
}
