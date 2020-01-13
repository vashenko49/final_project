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

      const preViewRes = data.map(product => ({
        id: product._id,
        imgProduct: product.productUrlImg.length
          ? product.productUrlImg[0]
          : product.filterImg.length
          ? product.filterImg[0].urlImg[0]
          : '',
        nameProduct: product.nameProduct,
        numberProduct: product.itemNo,
        categoryProduct: product._idChildCategory.name,
        priceProduct: Math.min(...product.model.map(i => i.currentPrice)),
        quantityProduct:
          product.model.length > 1
            ? product.model.map(i => i.quantity).reduce((prev, curr) => prev + curr)
            : product.model[0].quantity,
        enabled: product.enabled
      }));

      this.setIsLoading(false);

      this.setState({
        data: preViewRes
      });
    } catch (err) {
      this.setIsLoading(false);

      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: err.response.data.message
      });
    }
  };

  async componentDidMount() {
    await this.getData();
  }

  onSelectDelete = (event, delData) => {
    try {
      this.setIsLoading(true);

      delData.forEach(async i => {
        await AdminProductsAPI.deleteProducts(i.id);
      });

      this.setIsLoading(false);

      this.setState(prevState => {
        const data = prevState.data.filter(i => !delData.includes(i));
        return {
          ...prevState,
          data,
          sendDataStatus: 'success',
          sendDataMessage: `${delData.map(i => i.nameProduct).toString()} has been remove!`
        };
      });
    } catch (err) {
      this.setIsLoading(false);

      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: err.response.data.message
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
    this.setState({
      data: this.state.data.map(i => {
        if (id.id === i.id) {
          i.enabled = val;
        }
        return i;
      })
    });
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
