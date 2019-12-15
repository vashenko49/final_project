import React, { Component, forwardRef } from 'react';
import { Redirect } from 'react-router';
import { Image } from 'cloudinary-react';

import BtnCreateAdmin from './../common/admin-panel/BtnCreateAdmin';
import SnackBars from '../common/admin-panel/SnackBars';

import AdminProductsAPI from './../../services/AdminProductsAPI';

import MaterialTable from 'material-table';

import Switch from '@material-ui/core/Switch';

import { connect } from 'react-redux';

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
    sendDataMessage: ''
  };

  getData = async () => {
    try {
      const { data } = await AdminProductsAPI.getProducts();
      console.log(data);

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

  async componentDidMount() {
    await this.getData();
  }

  onSelectDelete = (event, delData) => {
    try {
      delData.forEach(async i => {
        await AdminProductsAPI.deleteProducts(i.id);
      });

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

  render() {
    const { columns, data, sendDataStatus, sendDataMessage, clickId } = this.state;

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

        <SnackBars variant={sendDataStatus} open={!!sendDataMessage} message={sendDataMessage} />

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
