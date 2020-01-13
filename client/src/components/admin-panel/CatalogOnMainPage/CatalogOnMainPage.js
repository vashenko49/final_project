import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import CatalogAPI from '../../../services/CatalogAPI';
import Preloader from '../../common/admin-panel/Preloader';
import SnackBars from '../../common/admin-panel/SnackBars';
import { tableIcons } from '../../common/admin-panel/TableIcons';
import MaterialTable from 'material-table';

class CatalogOnMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'Name', field: 'name', editable: 'never' },
        {
          title: 'Default',
          field: 'default',
          editComponent: props => {
            const {
              rowData: { default: defaultStatus }
            } = props;
            return (
              <Switch
                checked={defaultStatus}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
                value={props.value}
                onChange={e => props.onChange(e.target.checked)}
              />
            );
          },
          render: rowData => (
            <Switch
              checked={rowData.default}
              onChange={(event, checked) => {
                this.handleSwitch(event.target.value, rowData._id, checked);
              }}
              data-id={rowData._id}
              value="default"
              color="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          )
        },
        {
          title: 'Count product on main page',
          field: 'countProductMainPage',
          disableClick: true,
          type: 'numeric'
        }
      ],
      data: [],
      load: false,
      sendDataStatus: 'success',
      sendDataMessage: ''
    };
  }

  componentDidMount() {
    this.onRefreshData();
  }

  handleSwitch = (name, id, val) => {
    this.setState({ load: true });
    CatalogAPI.updateChildCatalog({ _id: id, [`${name}`]: val })
      .then(() => {
        this.setState({
          load: false,
          data: this.state.data.map(element => {
            const { _id } = element;
            if (id === _id) {
              element[`${name}`] = val;
            }
            return element;
          }),
          sendDataStatus: 'success',
          sendDataMessage: `Success ${val ? 'activated' : 'deactivated'}`
        });
      })
      .catch(err => {
        this.setState({
          load: false,
          sendDataStatus: 'error',
          sendDataMessage: err.response.data.message || err.message
        });
      });
  };
  onRefreshData = () => {
    this.setState({ load: true });
    CatalogAPI.getChildCatalogs()
      .then(res => {
        this.setState({ data: res, load: false });
      })
      .catch(err => {
        this.setState({
          data: [],
          load: false,
          sendDataStatus: 'error',
          sendDataMessage: err.response.data.message || err.message
        });
      });
  };

  handleCloseSnackBars = (event, reason) => {
    if (reason === 'clickaway') return;
    this.setState({ sendDataMessage: '' });
  };
  updateCatalog = newData => {
    this.setState({ load: true });
    return new Promise((resolve, reject) => {
      const { _id, countProductMainPage, default: defaultStatus } = newData;
      CatalogAPI.updateChildCatalog({
        _id,
        countProductMainPage,
        default: defaultStatus
      })
        .then(() => {
          CatalogAPI.getChildCatalogs().then(res => {
            this.setState({
              load: false,
              sendDataStatus: 'success',
              sendDataMessage: `Success edited`,
              data: res
            });
          });
        })
        .catch(err => {
          this.setState({
            load: false,
            sendDataStatus: 'error',
            sendDataMessage: err.response.data.message || err.message
          });
          reject();
        });
      resolve();
    });
  };
  render() {
    const { handleCloseSnackBars, onRefreshData, updateCatalog } = this;
    const { columns, data, load, sendDataStatus, sendDataMessage } = this.state;
    return (
      <>
        <MaterialTable
          title="Catalog on main page"
          icons={tableIcons}
          columns={columns}
          data={data}
          options={{
            rowStyle: rowData => ({
              backgroundColor: rowData.enabled ? '#FFF' : '#EEEF'
            }),
            headerStyle: {
              backgroundColor: '#455a64',
              color: '#FFF',
              position: 'sticky',
              textAlign: 'center',
              top: 0
            },
            detailPanelType: 'single'
          }}
          editable={{
            onRowUpdate: updateCatalog
          }}
          actions={[
            {
              icon: tableIcons.Refresh,
              tooltip: 'Refresh Data',
              isFreeAction: true,
              onClick: onRefreshData
            }
          ]}
        />
        <Preloader open={load} />
        <SnackBars
          handleClose={handleCloseSnackBars}
          variant={sendDataStatus}
          open={!!sendDataMessage}
          message={sendDataMessage}
        />
      </>
    );
  }
}

export default CatalogOnMainPage;
