import React, { Component } from 'react';
import { Redirect } from 'react-router';

import BtnCreateAdmin from '../../common/admin-panel/BtnCreateAdmin';

import SnackBars from '../../common/admin-panel/SnackBars';
import Preloader from '../../common/admin-panel/Preloader';

import AdminCategoriesAPI from '../../../services/AdminCategoriesAPI';

import MaterialTable from 'material-table';

import Switch from '@material-ui/core/Switch';

import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { tableIcons } from '../../common/admin-panel/TableIcons';

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
    sendDataMessage: '',
    isLoading: false
  };

  setIsLoading = state => {
    this.setState({ isLoading: state });
  };

  getData = async () => {
    try {
      this.setIsLoading(true);

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

  handleCloseSnackBars = (event, reason) => {
    if (reason === 'clickaway') return;

    this.setState({ sendDataMessage: '' });
  };

  componentDidMount() {
    this.getData();
  }

  onSelectDelete = (event, delData) => {
    try {
      this.setIsLoading(true);

      delData.forEach(async item => {
        let nameItem = Object.keys(item);

        if (nameItem.includes('titleCategory')) {
          await AdminCategoriesAPI.deleteRootCategory(item.id);

          this.setIsLoading(false);

          this.setState({
            sendDataStatus: 'success',
            sendDataMessage: `${item.titleCategory} has been remove!`
          });
        } else if (nameItem.includes('titleSubCategory')) {
          await AdminCategoriesAPI.deleteSubCategory(item.id);

          this.setIsLoading(false);

          this.setState({
            sendDataStatus: 'success',
            sendDataMessage: `${item.titleSubCategory} filter has been remove!`
          });
        } else if (nameItem.includes('titleFilter')) {
          await AdminCategoriesAPI.deleteFilter(item.parentId, item.id);

          this.setIsLoading(false);

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
      this.setIsLoading(false);

      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: err.response.data.message || err.message
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
    const { columns, data, sendDataStatus, sendDataMessage, clickId, isLoading } = this.state;

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

        <SnackBars
          handleClose={this.handleCloseSnackBars}
          variant={sendDataStatus}
          open={!!sendDataMessage}
          message={sendDataMessage}
        />

        <Preloader open={isLoading} />

        {this.state.clickId ? (
          <Redirect to={`/admin-panel/categories/${clickId}`} push={true} />
        ) : null}
      </>
    );
  }
}
