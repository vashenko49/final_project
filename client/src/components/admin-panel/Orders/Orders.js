import React, { Component } from 'react';
import { Image } from 'cloudinary-react';

import SnackBars from '../../common/admin-panel/SnackBars';
import Preloader from '../../common/admin-panel/Preloader';

import AdminOrdersAPI from '../../../services/AdminOrdersAPI';

import MaterialTable from 'material-table';

import Switch from '@material-ui/core/Switch';
import _ from 'lodash';
import { connect } from 'react-redux';

import { tableIcons } from '../../common/admin-panel/TableIcons';

class Orders extends Component {
  state = {
    columns: [
      { title: 'Date', field: 'date' },
      { title: 'Order', field: 'orderNo' },
      { title: 'Sum', field: 'totalSum' },
      { title: 'Shipping', field: 'shippingName' },
      { title: 'Delivery', field: 'deliveryAddress' },
      { title: 'Name', field: 'name' },
      { title: 'Phone', field: 'mobile' },
      { title: 'Email', field: 'email' },
      {
        title: 'Product image',
        field: 'productUrlImg',
        render: rowData =>
          rowData.productUrlImg && (
            <Image
              cloudName={this.props.configuration.cloudinary_cloud_name}
              publicId={rowData.productUrlImg}
              style={{ maxWidth: 150, objectFit: 'cover' }}
            />
          )
      },
      { title: 'Product model', field: 'modelNo' },
      { title: 'Product name', field: 'nameProduct' },
      { title: 'Product filter', field: 'filters' },
      { title: 'Product price', field: 'currentPrice' },
      { title: 'Product quantity', field: 'quantity' },
      {
        title: 'Enabled',
        field: 'enabled',
        disableClick: true,
        render: rowData =>
          rowData.hasOwnProperty('enabled') && (
            <Switch
              checked={rowData.enabled}
              onChange={(e, val) => (val ? null : this.handleEnabled(val, rowData))}
              value="enabled"
              color="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          )
      }
    ],
    data: [],
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

      const { data } = await AdminOrdersAPI.getOrders();

      const preViewRes = [];

      data.forEach(order => {
        preViewRes.push({
          id: order._id,
          date: `${('0' + new Date(order.date).getDate()).slice(-2)}-${(
            '0' +
            (new Date(order.date).getMonth() + 1)
          ).slice(-2)}-${new Date(order.date).getFullYear()}`,
          orderNo: order.orderNo,
          totalSum: order.totalSum,
          shippingName: order.delivery.idShippingMethod.name,
          deliveryAddress: order.delivery.hasOwnProperty('storeAddress')
            ? order.delivery.storeAddress.address
            : order.delivery.hasOwnProperty('address')
            ? `${order.delivery.address.postal}, ${order.delivery.address.country}, ${order.delivery.address.city}, ${order.delivery.address.street}, ${order.delivery.address.houseNumber}`
            : '',
          name: order.name,
          mobile: order.mobile,
          email: order.email,
          enabled: !order.canceled
        });

        order.products.forEach(product => {
          preViewRes.push({
            id: product._id,
            parentId: order._id,
            productUrlImg: product.productId.productUrlImg[0],
            modelNo: _.isObject(product.modelNo) ? product.modelNo.modelNo : '',
            nameProduct: product.productId.nameProduct,
            filters: _.isObject(product.modelNo)
              ? product.modelNo.filters
                  .map(i => `${i.filter.type}: ${i.subFilter.name}`)
                  .toString()
                  .replace(',', ', ')
              : '',
            currentPrice: product.currentPrice,
            quantity: product.quantity
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

  onRefreshData = () => {
    this.getData();
  };

  handleEnabled = async (val, id) => {
    try {
      this.setIsLoading(true);

      await AdminOrdersAPI.cancelOrder(id.id);

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
    const { columns, data, sendDataStatus, sendDataMessage, isLoading } = this.state;

    return (
      <>
        <MaterialTable
          icons={tableIcons}
          title="Orders"
          columns={columns}
          data={data}
          parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
          options={{
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
              icon: tableIcons.Refresh,
              tooltip: 'Refresh Data',
              isFreeAction: true,
              onClick: this.onRefreshData
            }
          ]}
          onRowClick={this.onRowClick}
        />

        <SnackBars
          handleClose={this.handleCloseSnackBars}
          variant={sendDataStatus}
          open={!!sendDataMessage}
          message={sendDataMessage}
        />

        <Preloader open={isLoading} />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    configuration: state.configuration
  };
}

export default connect(mapStateToProps)(Orders);
