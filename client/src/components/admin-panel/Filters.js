import React, { Component, forwardRef } from 'react';
import { Redirect } from 'react-router';

import BtnCreateAdmin from './../common/admin-panel/BtnCreateAdmin';
import SnackBars from '../common/admin-panel/SnackBars';

import AdminFiltersAPI from '../../services/AdminFiltersAPI';

import MaterialTable from 'material-table';

import Switch from '@material-ui/core/Switch';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import RefreshIcon from '@material-ui/icons/Refresh';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  Refresh: forwardRef((props, ref) => <RefreshIcon {...props} ref={ref} />)
};

export default class Filters extends Component {
  state = {
    columns: [
      { title: 'Filter', field: 'title' },
      { title: 'Service name', field: 'serviceName' },
      {
        title: 'Enabled',
        field: 'enabled',
        disableClick: true,
        render: rowData => (
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
    sendDataMessage: ''
  };

  async componentDidMount() {
    try {
      const res = await AdminFiltersAPI.getFilters();

      const preViewRes = [];

      res.data.forEach(item => {
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

      this.setState({
        data: preViewRes
      });
    } catch (err) {
      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: err.response.data.message
      });
    }
  }

  onSelectDelete = (event, delData) => {
    try {
      delData.forEach(async item => {
        if (item.parentId) {
          await AdminFiltersAPI.deleteSubFilters(item.id);

          this.setState({
            sendDataStatus: 'success',
            sendDataMessage: `${item.title} sub filter has been remove!`
          });
        } else {
          await AdminFiltersAPI.deleteFilters(item.id);

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
      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: err.response.data.message
      });
    }
  };

  onRowClick = (evt, selectedRow) => {
    this.setState({ clickId: selectedRow.id });
  };

  onRefreshData = async () => {
    try {
      const res = await AdminFiltersAPI.getFilters();

      const preViewRes = [];

      res.data.forEach(item => {
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

      this.setState({
        data: preViewRes,
        sendDataStatus: 'success',
        sendDataMessage: 'Filter has been update!'
      });
    } catch (err) {
      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: err.response.data.message
      });
    }
  };

  handleEnabled = async (val, id) => {
    this.setState({
      data: this.state.data.map(i => {
        if (id.id === i.id) {
          i.enabled = val;
        }
        return i;
      })
    });
  };

  render() {
    const { columns, data, sendDataStatus, sendDataMessage, clickId } = this.state;

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

        <SnackBars variant={sendDataStatus} open={!!sendDataMessage} message={sendDataMessage} />

        {this.state.clickId ? (
          <Redirect to={`/admin-panel/filters/${clickId}`} push={true} />
        ) : null}
      </>
    );
  }
}
