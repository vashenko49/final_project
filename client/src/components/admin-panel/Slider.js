import React, { Component, forwardRef } from 'react';
import { Redirect } from 'react-router';

import { Image } from 'cloudinary-react';

import BtnCreateAdmin from './../common/admin-panel/BtnCreateAdmin';

import SnackBars from '../common/admin-panel/SnackBars';
import Preloader from '../common/admin-panel/Preloader';

import AdminSliderAPI from '../../services/AdminSliderAPI';

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

class Slider extends Component {
  state = {
    columns: [
      {
        title: 'Image',
        field: 'imageUrl',
        render: rowData =>
          rowData.imageUrl ? (
            <Image
              cloudName={this.props.configuration.cloudinary_cloud_name}
              publicId={rowData.imageUrl}
              width="150px"
              // dpr="auto"
              // responsive={true}
              // crop="scale"
            />
          ) : null
      },
      { title: 'Product', field: 'nameProduct' },
      { title: 'Categories ', field: 'childCatalogs' },
      { title: 'Title', field: 'title' },
      { title: 'Description', field: 'description' },
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
        await AdminSliderAPI.deleteSlider(item._id);

        this.setIsLoading(false);

        this.setState({
          sendDataStatus: 'success',
          sendDataMessage: `${item.title} slide has been remove!`
        });

        this.setState(prevState => {
          const data = prevState.data.filter(i => !delData.includes(i));
          return { ...prevState, data };
        });
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
    this.setState({ clickId: selectedRow._id });
  };

  onRefreshData = async () => {
    try {
      this.setIsLoading(true);

      const { data } = await AdminSliderAPI.getSlider();
      console.log(data);

      const preViewRes = data.map(i => ({
        _id: i._id,
        imageUrl: i.imageUrl,
        nameProduct: i.product.nameProduct,
        childCatalogs: i.childCatalogs.name,
        title: i.title,
        description: i.description,
        enabled: i.enabled
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
          title="Slider"
          columns={columns}
          data={data}
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
        <BtnCreateAdmin to="/admin-panel/footer/new" />

        <SnackBars
          handleClose={this.handleCloseSnackBars}
          variant={sendDataStatus}
          open={!!sendDataMessage}
          message={sendDataMessage}
        />

        <Preloader open={isLoading} />

        {this.state.clickId ? <Redirect to={`/admin-panel/Footer/${clickId}`} push={true} /> : null}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    configuration: state.configuration
  };
}

export default connect(mapStateToProps)(Slider);
