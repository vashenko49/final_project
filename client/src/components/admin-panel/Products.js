import React, { Component, forwardRef } from 'react';
import { Redirect } from 'react-router';
import { Image } from 'cloudinary-react';

import BtnCreateAdmin from './../common/admin-panel/BtnCreateAdmin';
import SnackBars from '../common/admin-panel/SnackBars';

import AdminProductsAPI from './../../services/AdminProductsAPI';

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

export default class Products extends Component {
  state = {
    columns: [
      {
        title: 'Image',
        field: 'imgProduct',
        render: rowData =>
          rowData.imgProduct ? (
            <Image
              cloudName="dxge5r7h2"
              publicId={rowData.imgProduct}
              dpr="auto"
              responsive={true}
              width="auto"
              crop="scale"
            />
          ) : null
      },
      { title: 'Name', field: 'nameProduct' },
      { title: 'Number', field: 'numberProduct' },
      { title: 'Category', field: 'categoryProduct' },
      { title: 'Min Price', field: 'priceProduct' },
      { title: 'Summ Quantity', field: 'quantityProduct' },
      { title: 'Filter for image', field: 'filterImg' },
      { title: 'Sub filter for image', field: 'subFilterImg' },
      {
        title: 'Image for filter',
        field: 'imgFilter',
        render: rowData =>
          rowData.imgFilter ? (
            <Image
              cloudName="dxge5r7h2"
              publicId={rowData.imgFilter}
              dpr="auto"
              responsive={true}
              width="auto"
              crop="scale"
            />
          ) : null
      },
      { title: 'Common filter', field: 'commonFilter' },
      { title: 'Common sub filter', field: 'commonSubFilter' },
      { title: 'Model number', field: 'modelNumber' },
      { title: 'Model filter', field: 'modelFilter' },
      { title: 'Model sub filter', field: 'modelSubFilter' },
      { title: 'Model quantity', field: 'modelQuantity' },
      { title: 'Model price', field: 'modelPrice' },
      {
        title: 'Enabled',
        field: 'enabled',
        disableClick: true,
        render: rowData =>
          rowData.enabled !== undefined ? (
            <Switch
              checked={rowData.enabled}
              onChange={(e, val) => this.handleEnabled(val, rowData)}
              value="enabled"
              color="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          ) : null
      }
    ],
    data: [],
    clickId: null,
    sendDataStatus: 'success',
    sendDataMessage: ''
  };

  getData = async () => {
    try {
      const data = await AdminProductsAPI.getProducts();

      const preViewRes = [];

      // info products
      data.forEach(product => {
        preViewRes.push({
          id: product._id,
          imgProduct: product.productUrlImg[0],
          nameProduct: product.nameProduct,
          numberProduct: product.itemNo,
          categoryProduct: product.childCategory.name,
          priceProduct: Math.min(...product.model.map(i => i.currentPrice)),
          quantityProduct:
            product.model.length > 1
              ? product.model.reduce((prev, curr) => prev.quantity + curr.quantity)
              : product.model[0].quantity,
          enabled: product.enabled
        });

        // info filter for img
        const idFilterImg = product._id + 1;
        preViewRes.push({
          id: idFilterImg,
          parentId: product._id,
          nameProduct: 'Filters Image'
        });

        product.filtersImg.forEach(filtersImg => {
          preViewRes.push({
            id: filtersImg.filter._id,
            parentId: idFilterImg,
            filterImg: filtersImg.filter.serviceName,
            subFilterImg: filtersImg.subFilter.name,
            imgFilter: filtersImg.img,
            enabled: filtersImg.enabled
          });
        });

        // info common filter product
        const idComminFllter = product._id + 2;
        preViewRes.push({
          id: idComminFllter,
          parentId: product._id,
          nameProduct: 'Common filter'
        });

        product.filters.forEach(filter => {
          preViewRes.push({
            id: filter.filter._id,
            parentId: idComminFllter,
            commonFilter: filter.filter.serviceName,
            commonSubFilter: filter.subFilter.name,
            enabled: filter.enabled
          });
        });

        // info modal products
        const idModel = product._id + 3;
        preViewRes.push({
          id: idModel,
          parentId: product._id,
          nameProduct: 'Modal products'
        });

        product.model.forEach(model => {
          preViewRes.push({
            id: model.modelNo,
            parentId: idModel,
            modelNumber: model.modelNo,
            modelQuantity: model.quantity,
            modelPrice: model.currentPrice,
            enabled: model.enabled
          });

          // info modal filter products
          model.filters.forEach(modelFilter => {
            preViewRes.push({
              id: modelFilter.filter._id,
              parentId: model.modelNo,
              modelFilter: modelFilter.filter.serviceName,
              modelSubFilter: modelFilter.subFilter.name,
              enabled: modelFilter.enabled
            });
          });
        });
      });

      this.setState({
        data: preViewRes
      });
    } catch (err) {
      this.setState({
        sendDataStatus: 'error'
        // sendDataMessage: err.response.data.message
      });
    }
  };

  componentDidMount() {
    this.getData();
  }

  onSelectDelete = (event, delData) => {
    // try {
    //   delData.forEach(async item => {
    //     let nameItem = Object.keys(item);
    //     if (nameItem.includes('titleCategory')) {
    //       await AdminProductsAPI.deleteRootCategory(item.id);
    //       this.setState({
    //         sendDataStatus: 'success',
    //         sendDataMessage: `${item.titleCategory} has been remove!`
    //       });
    //     } else if (nameItem.includes('titleSubCategory')) {
    //       await AdminProductsAPI.deleteSubCategory(item.id);
    //       this.setState({
    //         sendDataStatus: 'success',
    //         sendDataMessage: `${item.titleSubCategory} filter has been remove!`
    //       });
    //     } else if (nameItem.includes('titleFilter')) {
    //       await AdminProductsAPI.deleteFilter(item.id);
    //       this.setState({
    //         sendDataStatus: 'success',
    //         sendDataMessage: `${item.titleFilter} filter has been remove!`
    //       });
    //     }
    //   });
    //   this.setState(prevState => {
    //     const data = prevState.data.filter(i => !delData.includes(i));
    //     return { ...prevState, data };
    //   });
    // } catch (err) {
    //   this.setState({
    //     sendDataStatus: 'error',
    //     sendDataMessage: err.response.data.message
    //   });
    // }
  };

  onRowClick = (evt, selectedRow) => {
    // let id = '';
    // if (selectedRow.parentId) {
    //   this.state.data.forEach(i => {
    //     if (i.parentId) {
    //       this.state.data.forEach(k => {
    //         if (k.parentId) {
    //         } else {
    //           id = k.id;
    //         }
    //       });
    //     } else {
    //       id = i.id;
    //     }
    //   });
    // } else {
    //   id = selectedRow.id;
    // }
    // this.setState({ clickId: id });
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
          title="Products"
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
        <BtnCreateAdmin to="/admin-panel/products/new" />

        <SnackBars variant={sendDataStatus} open={!!sendDataMessage} message={sendDataMessage} />

        {this.state.clickId ? (
          <Redirect to={`/admin-panel/products/${clickId}`} push={true} />
        ) : null}
      </>
    );
  }
}
