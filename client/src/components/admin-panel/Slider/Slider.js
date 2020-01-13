import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { Image } from 'cloudinary-react';

import BtnCreateAdmin from '../../common/admin-panel/BtnCreateAdmin';

import SnackBars from '../../common/admin-panel/SnackBars';
import Preloader from '../../common/admin-panel/Preloader';

import AdminSliderAPI from '../../../services/AdminSliderAPI';

import MaterialTable from 'material-table';

import Switch from '@material-ui/core/Switch';

import { tableIcons } from '../../common/admin-panel/TableIcons';

import { connect } from 'react-redux';

import DeleteOutline from '@material-ui/icons/DeleteOutline';

class Slider extends Component {
  state = {
    columns: [
      {
        title: 'Type slide',
        field: 'type'
      },
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
        sendDataMessage: err.response.data.message || err.message
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

      const preViewRes = data.map(i => ({
        _id: i._id,
        type: i.htmlContent ? 'custom' : 'constructor',
        imageUrl: i.htmlContent ? '' : i.imageUrl,
        nameProduct: i.htmlContent ? '' : i.product.nameProduct,
        childCatalogs: i.htmlContent ? '' : i.childCatalogs ? i.childCatalogs.name : '',
        title: i.htmlContent ? '' : i.title,
        description: i.htmlContent ? '' : i.description,
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
        sendDataMessage: err.response.data.message || err.message
      });
    }
  };

  handleEnabled = async (val, id) => {
    try {
      this.setIsLoading(true);

      await AdminSliderAPI.changeStatusSlider(id._id, val);

      this.setState({
        data: this.state.data.map(i => {
          if (id.id === i.id) {
            i.enabled = val;
          }
          return i;
        })
      });

      this.setIsLoading(false);
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
        <BtnCreateAdmin to="/admin-panel/slider/new" />

        <SnackBars
          handleClose={this.handleCloseSnackBars}
          variant={sendDataStatus}
          open={!!sendDataMessage}
          message={sendDataMessage}
        />

        <Preloader open={isLoading} />

        {this.state.clickId ? <Redirect to={`/admin-panel/slider/${clickId}`} push={true} /> : null}
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
