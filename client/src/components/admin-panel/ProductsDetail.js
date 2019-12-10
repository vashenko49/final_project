import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AdminFiltersAPI from '../../services/AdminFiltersAPI';
import AdminCategoriesAPI from '../../services/AdminCategoriesAPI';
// import AdminProductsAPI from '../../services/AdminProductsAPI';

import SnackBars from '../common/admin-panel/SnackBars';
import ProductsDetailBasicInfo from './ProductsDetailBasicInfo';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { withStyles } from '@material-ui/core/styles';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const styles = theme => ({
  root: {
    padding: theme.spacing(2, 0)
  }
});

class ProductsDetail extends Component {
  state = {
    dataCategories: [],
    category: null,
    tabValue: 0,
    typeForm: 'create',
    idUpdate: null,
    sendDataStatus: 'success',
    sendDataMessage: ''
  };

  onChangeTabValue = (e, newValue) => {
    this.setState({ tabValue: newValue });
  };

  onChangeValue = (name, val) => {
    this.setState({ [name]: val });
  };

  onSubmitForm = async () => {
    const { typeForm, title, serviceName, subFilters, idUpdate, enabledFilter } = this.state;

    const sendData = {
      title: title.val,
      serviceName: serviceName.val,
      subFilters: subFilters.val
    };

    try {
      if (typeForm === 'create') {
        await AdminFiltersAPI.createFilters(sendData);

        this.setState({
          sendDataStatus: 'success',
          sendDataMessage: `${title.val} filter has been created!`
        });
      }
      if (typeForm === 'update') {
        sendData.idUpdate = idUpdate;
        sendData.enabledFilter = enabledFilter;
        await AdminFiltersAPI.updateFilters(sendData);

        this.setState({
          sendDataStatus: 'success',
          sendDataMessage: `${title.val} filter has been update!`
        });
      }
    } catch (err) {
      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: err.response.data.message
      });
    }
  };

  async getCategories() {
    const { data } = await AdminCategoriesAPI.getCategories();

    const newData = [];

    data.forEach(main => {
      main.childCatalog.forEach(sub => {
        sub.parent = main;
        newData.push(sub);
      });
    });
    // this.setState({ categories: [].concat(...data.map(i => i.childCatalog), ...data) });
    this.setState({ dataCategories: newData });
  }

  async componentDidMount() {
    const { id } = this.props.match.params;

    this.getCategories();

    if (id) {
      this.setState({ typeForm: 'update' });

      try {
        // const { data } = await AdminProductsAPI.getProductsById(id);

        this.setState({
          // title: { val: res.data.type, error: false },
          // serviceName: { val: res.data.serviceName, error: false },
          // subFilters: { val: res.data._idSubFilters.map(i => i.name), error: false },
          // idUpdate: res.data._id,
          // enabledFilter: res.data.enabled
        });
      } catch (err) {
        this.setState({
          sendDataStatus: 'error'
          // sendDataMessage: err.response.data.message
        });
      }
    }
  }

  render() {
    const { classes } = this.props;
    const { sendDataStatus, sendDataMessage, dataCategories, category } = this.state;

    return (
      <Container maxWidth="md">
        <Paper className={classes.root}>
          <Button
            onClick={() => this.props.history.goBack()}
            startIcon={<ArrowBackIcon color="action" />}
          >
            <Typography component="span">
              <Box fontWeight={500} component="span" fontFamily="Monospace" fontSize="h7.fontSize">
                Products
              </Box>
            </Typography>
          </Button>

          <Tabs
            value={this.state.tabValue}
            onChange={this.onChangeTabValue}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            centered
          >
            <Tab label="Basic Info" {...a11yProps(0)} />
            <Tab label="Main Images" {...a11yProps(0)} />
            <Tab label="Image for filters" {...a11yProps(1)} />
            <Tab label="Models" {...a11yProps(2)} />
          </Tabs>

          <Box p={3}>
            {this.state.tabValue === 0 ? (
              <ProductsDetailBasicInfo
                onChangeValue={this.onChangeValue}
                dataCategories={dataCategories}
                category={category}
              />
            ) : this.state.tabValue === 1 ? (
              'ONE'
            ) : this.state.tabValue === 2 ? (
              'TWO'
            ) : this.state.tabValue === 3 ? (
              'THREE'
            ) : null}
          </Box>

          <SnackBars variant={sendDataStatus} open={!!sendDataMessage} message={sendDataMessage} />
        </Paper>
      </Container>
    );
  }
}

ProductsDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

ProductsDetail.defaultProps = {};

export default withStyles(styles)(ProductsDetail);
