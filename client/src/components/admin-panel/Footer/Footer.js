import React, { Component } from 'react';
import { Redirect } from 'react-router';

import BtnCreateAdmin from '../../common/admin-panel/BtnCreateAdmin';

import SnackBars from '../../common/admin-panel/SnackBars';
import Preloader from '../../common/admin-panel/Preloader';

import AdminFooterAPI from '../../../services/AdminFooterAPI';

import MaterialTable from 'material-table';

import Switch from '@material-ui/core/Switch';

import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { tableIcons } from '../../common/admin-panel/TableIcons';

export default class Footer extends Component {
  state = {
    columns: [
      { title: 'Group link', field: 'title' },
      { title: 'Link', field: 'description' },
      { title: 'Url', field: 'url' },
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
        if (item.parentId) {
          await AdminFooterAPI.deleteFooterLink(item.parentId, { _id: item.id });

          this.setIsLoading(false);

          this.setState({
            sendDataStatus: 'success',
            sendDataMessage: `${item.title} group link has been remove!`
          });
        } else {
          await AdminFooterAPI.deleteFooterGroupLinks(item.id);

          this.setIsLoading(false);

          this.setState({
            sendDataStatus: 'success',
            sendDataMessage: `${item.title} link has been remove!`
          });

          this.setState(prevState => {
            const data = prevState.data.filter(i => !delData.includes(i));
            return { ...prevState, data };
          });
        }
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
    this.setState({ clickId: selectedRow.parentId ? selectedRow.parentId : selectedRow.id });
  };

  onRefreshData = async () => {
    try {
      this.setIsLoading(true);

      const { data } = await AdminFooterAPI.getFooter();

      const preViewRes = [];

      data.forEach(group => {
        preViewRes.push({
          id: group._id,
          title: group.title,
          enabled: group.enabled
        });

        group.links.forEach(link => {
          preViewRes.push({
            id: link._id,
            description: link.description,
            url: link.url,
            parentId: group._id,
            enabled: link.enabled
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
          title="Footer"
          columns={columns}
          data={data}
          parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
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
