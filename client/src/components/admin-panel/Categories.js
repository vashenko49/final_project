import React, { Component, forwardRef } from 'react';
import { Redirect } from 'react-router';

import BtnCreateAdmin from './../common/admin-panel/BtnCreateAdmin';
import SnackBars from '../common/admin-panel/SnackBars';

import AdminCategoriesAPI from '../../services/AdminCategoriesAPI';

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

export default class Categories extends Component {
  state = {
    columns: [
      { title: 'Category', field: 'titleCategory' },
      { title: 'Child category', field: 'titleSubCategory' },
      { title: 'Filter', field: 'titleFilter' },
      { title: 'Filter service name', field: 'serviceName' },
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

  getData = async () => {
    try {
      const { data } = await AdminCategoriesAPI.getCategories();

      const preViewRes = [];

      data.forEach(item => {
        preViewRes.push({
          id: item._id,
          titleCategory: item.name,
          enabled: item.enabled
        });

        item.childCatalog.forEach(childCatalog => {
          preViewRes.push({
            id: childCatalog._id,
            titleSubCategory: childCatalog.name,
            parentId: childCatalog.parentId,
            enabled: childCatalog.enabled
          });

          childCatalog.filters.forEach(filter => {
            preViewRes.push({
              id: filter.filter._id,
              titleFilter: filter.filter.type,
              serviceName: filter.filter.serviceName,
              parentId: childCatalog._id,
              enabled: filter.filter.enabled
            });
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
  };

  componentDidMount() {
    this.getData();
  }

  onSelectDelete = (event, delData) => {
    try {
      delData.forEach(async item => {
        let nameItem = Object.keys(item);

        if (nameItem.includes('titleCategory')) {
          await AdminCategoriesAPI.deleteRootCategory(item.id);
          this.setState({
            sendDataStatus: 'success',
            sendDataMessage: `${item.titleCategory} has been remove!`
          });
        } else if (nameItem.includes('titleSubCategory')) {
          await AdminCategoriesAPI.deleteSubCategory(item.id);
          this.setState({
            sendDataStatus: 'success',
            sendDataMessage: `${item.titleSubCategory} filter has been remove!`
          });
        } else if (nameItem.includes('titleFilter')) {
          await AdminCategoriesAPI.deleteFilter(item.id);
          this.setState({
            sendDataStatus: 'success',
            sendDataMessage: `${item.titleFilter} filter has been remove!`
          });
        }
      });

      this.setState(prevState => {
        const data = prevState.data.filter(i => !delData.includes(i));
        return { ...prevState, data };
      });
    } catch (err) {
      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: err.response.data.message
      });
    }
  };

  onRowClick = (evt, selectedRow) => {
    let id = '';

    if (selectedRow.parentId) {
      this.state.data.forEach(i => {
        if (i.parentId) {
          this.state.data.forEach(k => {
            if (k.parentId) {
            } else {
              id = k.id;
            }
          });
        } else {
          id = i.id;
        }
      });
    } else {
      id = selectedRow.id;
    }

    this.setState({ clickId: id });
  };

  onRefreshData = () => {
    this.getData();
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
          title="Categories"
          columns={columns}
          data={data}
          parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
          options={{
            selection: true,
            exportButton: true,
            actionsColumnIdex: -1,
            rowStyle: rowData => ({
              backgroundColor: rowData.enabled ? '#FFF' : '#EEEF'
            }),
            headerStyle: {
              backgroundColor: '#455a64',
              color: '#FFF',
              position: 'sticky',
              top: 0
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
        <BtnCreateAdmin to="/admin-panel/categories/new" />

        <SnackBars variant={sendDataStatus} open={!!sendDataMessage} message={sendDataMessage} />

        {this.state.clickId ? (
          <Redirect to={`/admin-panel/categories/${clickId}`} push={true} />
        ) : null}
      </>
    );
  }
}
