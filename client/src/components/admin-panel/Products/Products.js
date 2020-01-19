import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Image } from 'cloudinary-react';

import BtnCreateAdmin from '../../common/admin-panel/BtnCreateAdmin';

import SnackBars from '../../common/admin-panel/SnackBars';
import Preloader from '../../common/admin-panel/Preloader';

import AdminProductsAPI from '../../../services/AdminProductsAPI';

import MaterialTable from 'material-table';

import Switch from '@material-ui/core/Switch';

import { connect } from 'react-redux';
import _ from 'lodash';

import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { tableIcons } from '../../common/admin-panel/TableIcons';

class Products extends Component {
  state = {
    columns: [
      {
        title: 'Image',
        field: 'imgProduct',
        render: rowData =>
          rowData.imgProduct ? (
            <Image
              cloudName={this.props.configuration.cloudinary_cloud_name}
              publicId={rowData.imgProduct}
              width="150px"
              // dpr="auto"
              // responsive={true}
              // crop="scale"
            />
          ) : null
      },
      { title: 'Name', field: 'nameProduct' },
      { title: 'Number', field: 'numberProduct' },
      { title: 'Category', field: 'categoryProduct' },
      { title: 'Min Price', field: 'priceProduct' },
      { title: 'Sum Quantity', field: 'quantityProduct' },
      { title: 'Model number', field: 'modelNumber' },
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
    sendDataMessage: '',
    isLoading: false
  };

  setIsLoading = state => {
    this.setState({ isLoading: state });
  };

  getData = async () => {
    try {
      this.setIsLoading(true);

      const { data } = await AdminProductsAPI.getProducts();

      const preViewRes = [];

      data.forEach(product => {
        preViewRes.push({
          id: product._id,
          imgProduct: product.productUrlImg.length
            ? product.productUrlImg[0]
            : product.filterImg.length
            ? product.filterImg[0].urlImg[0]
            : '',
          nameProduct: product.nameProduct,
          numberProduct: product.itemNo,
          categoryProduct: _.isObject(product._idChildCategory)
            ? product._idChildCategory.name
            : '',
          priceProduct: Math.min(...product.model.map(i => i.currentPrice)),
          quantityProduct: _.sumBy(product.model, 'currentPrice'),
          enabled: product.enabled
        });

        product.model.forEach(model => {
          preViewRes.push({
            id: model._id,
            parentId: product._id,
            modelNumber: model.modelNo,
            modelQuantity: model.quantity,
            modelPrice: model.currentPrice,
            enabled: model.enabled
          });
        });
      });

      this.setIsLoading(false);

      this.setState({
        data: preViewRes
      });
    } catch (err) {
      console.log(err);
      this.setIsLoading(false);

      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: err.response.data.message || err.message
      });
    }
  };

  async componentDidMount() {
    await this.getData();
  }

  onSelectDelete = (event, delData) => {
    try {
      this.setIsLoading(true);

      delData.forEach(async item => {
        if (item.parentId && !delData.find(i => i.id === item.parentId)) {
          await AdminProductsAPI.deleteProductsModel(item.parentId, item.modelNumber);
        } else if (!item.parentId) {
          await AdminProductsAPI.deleteProducts(item.id);
        }
      });

      this.setIsLoading(false);

      this.setState(prevState => {
        const data = prevState.data.filter(i => !delData.includes(i));
        return {
          ...prevState,
          data,
          sendDataStatus: 'success',
          sendDataMessage: `${delData
            .map(i => i.nameProduct || i.modelNumber)
            .toString()} has been remove!`
        };
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

  onRefreshData = () => {
    this.getData();
  };

  handleEnabled = async (val, id) => {
    try {
      this.setIsLoading(true);

      if (id.parentId) {
        await AdminProductsAPI.changeStatusProductModel(id.parentId, id.modelNumber, val);
      } else {
        await AdminProductsAPI.changeStatusProduct(id.id, val);
      }

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
          title="Products"
          columns={columns}
          data={data}
          parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
          options={{
            selection: true,
            exportButton: true,

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

        <SnackBars
          handleClose={this.handleCloseSnackBars}
          variant={sendDataStatus}
          open={!!sendDataMessage}
          message={sendDataMessage}
        />

        <Preloader open={isLoading} />

        {this.state.clickId ? (
          <Redirect to={`/admin-panel/products/${clickId}`} push={true} />
        ) : null}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    configuration: state.configuration
  };
}

export default connect(mapStateToProps)(Products);
