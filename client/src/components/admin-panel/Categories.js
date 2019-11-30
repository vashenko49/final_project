import React, { Component, forwardRef } from 'react';
import { Redirect } from 'react-router';
// import PropTypes from 'prop-types';

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
        title: 'Enabled category',
        field: 'enabledCategory',
        disableClick: true,
        render: rowData => {
          if (Object.keys(rowData).includes('enabledCategory')) {
            return (
              <Switch
                checked={rowData.enabledCategory}
                onChange={(e, val) => this.handleEnabled(val, rowData)}
                value="enabledCategory"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            );
          }
        }
      },
      {
        title: 'Enabled sub category',
        field: 'enabledSubCategory',
        disableClick: true,
        render: rowData => {
          if (Object.keys(rowData).includes('enabledSubCategory')) {
            return (
              <Switch
                checked={rowData.enabledSubCategory}
                onChange={(e, rowData) => this.handleEnabled(e, rowData._id)}
                value="enabledSubCategory"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            );
          }
        }
      },
      {
        title: 'Enabled filter',
        field: 'enabledFilter',
        disableClick: true,
        render: rowData => {
          if (Object.keys(rowData).includes('enabledFilter')) {
            return (
              <Switch
                checked={rowData.enabledFilter}
                onChange={(e, rowData) => this.handleEnabled(e, rowData._id)}
                value="enabledFilter"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            );
          }
        }
      }
    ],
    data: [],
    clickId: null,
    sendDataStatus: 'success',
    sendDataMessage: ''
  };

  async componentDidMount() {
    try {
      const { data } = await AdminCategoriesAPI.getCategories();

      const preViewRes = [];

      data.forEach(item => {
        preViewRes.push({
          id: item._id,
          titleCategory: item.name,
          enabledCategory: item.enabled
        });

        item.subCategories.forEach(subCategory => {
          preViewRes.push({
            id: subCategory._id,
            titleSubCategory: subCategory.name,
            parentId: subCategory.parentId,
            enabledSubCategory: subCategory.enabled
          });

          subCategory.filters.forEach(filter => {
            preViewRes.push({
              id: filter._id,
              titleFilter: filter.type,
              serviceName: filter.serviceName,
              parentId: subCategory._id,
              enabledFilter: filter.enabled
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
  }

  onSelectDelete = (event, delData) => {
    // try {
    //   delData.forEach(async item => {
    //     if (item.parentId) {
    //       await AdminFiltersAPI.deleteSubFilters(item.id);
    //       this.setState({
    //         sendDataStatus: 'success',
    //         sendDataMessage: `${item.title} sub filter has been remove!`
    //       });
    //     } else {
    //       await AdminFiltersAPI.deleteFilters(item.id);
    //       this.setState({
    //         sendDataStatus: 'success',
    //         sendDataMessage: `${item.title} filter has been remove!`
    //       });
    //       this.setState(prevState => {
    //         const data = prevState.data.filter(i => !delData.includes(i));
    //         return { ...prevState, data };
    //       });
    //     }
    //   });
    // } catch (err) {
    //   this.setState({
    //     sendDataStatus: 'error',
    //     sendDataMessage: err.response.data.message
    //   });
    // }
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

  onRefreshData = async () => {
    try {
      const { data } = await AdminCategoriesAPI.getCategories();

      const preViewRes = [];

      data.forEach(item => {
        preViewRes.push({
          id: item._id,
          titleCategory: item.name,
          enabledCategory: item.enabled
        });

        item.subCategories.forEach(subCategory => {
          preViewRes.push({
            id: subCategory._id,
            titleSubCategory: subCategory.name,
            parentId: subCategory.parentId,
            enabledSubCategory: subCategory.enabled
          });

          subCategory.filters.forEach(filter => {
            preViewRes.push({
              id: filter._id,
              titleFilter: filter.type,
              serviceName: filter.serviceName,
              parentId: subCategory._id,
              enabledFilter: filter.enabled
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

  handleEnabled = async (val, id) => {
    console.log('handleEnabled', val, id);
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
            actionsColumnIndex: -1
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

Categories.propTypes = {};

Categories.defaultProps = {};
