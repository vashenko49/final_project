import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AdminFiltersAPI from '../../services/AdminFiltersAPI';
import AdminCategoriesAPI from '../../services/AdminCategoriesAPI';

import CategoriesDetailForm from './CategoriesDetailForm.js';
import SnackBars from '../common/admin-panel/SnackBars';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    padding: theme.spacing(2)
  }
});

class CategoriesDetail extends Component {
  state = {
    rootCategory: { val: '', error: false },
    childCategory: { val: '', error: false },
    checkFilters: { val: [], error: false },
    dataFilters: [],
    typeForm: 'create',
    idUpdate: null,
    enabledCategories: true,
    sendDataStatus: 'success',
    sendDataMessage: ''
  };

  onChangeValue = (name, val) => {
    this.setState({ [name]: { val, error: !val.length } });
  };

  onSubmitForm = async () => {
    // const {
    //   typeForm,
    //   rootCategory,
    //   childCategory,
    //   checkFilters,
    //   idUpdate,
    //   enabledCategories
    // } = this.state;
    // const sendData = {
    //   title: title.val,
    //   serviceName: serviceName.val,
    //   subFilters: subFilters.val
    // };
    // try {
    //   if (typeForm === 'create') {
    //     await AdminFiltersAPI.addFilters(sendData);
    //     this.setState({
    //       sendDataStatus: 'success',
    //       sendDataMessage: `${title.val} filter has been created!`
    //     });
    //   }
    //   if (typeForm === 'update') {
    //     sendData.idUpdate = idUpdate;
    //     sendData.enabledFilter = enabledFilter;
    //     await AdminFiltersAPI.updateFilters(sendData);
    //     this.setState({
    //       sendDataStatus: 'success',
    //       sendDataMessage: `${title.val} filter has been update!`
    //     });
    //   }
    // } catch (err) {
    //   this.setState({
    //     sendDataStatus: 'error',
    //     sendDataMessage: err.response.data.message
    //   });
    // }
  };

  async componentDidMount() {
    // try {
    //   const resFilters = await AdminFiltersAPI.getFilters();

    //   const preViewResFilters = resFilters.data.map(item => {
    //     return {
    //       id: item._id,
    //       title: item.type,
    //       serviceName: item.serviceName,
    //       enabled: true
    //     };
    //   });

    //   this.setState({
    //     dataFilters: preViewResFilters
    //   });
    // } catch (err) {
    //   this.setState({
    //     sendDataStatus: 'error',
    //     sendDataMessage: err.response.data.message
    //   });
    // }

    const { id } = this.props.match.params;
    if (id) {
      this.setState({ typeForm: 'update' });
      try {
        const { data } = await AdminCategoriesAPI.getCategoriesById(id);

        // this.setState({
        //   title: { val: data[0].type, error: false },
        //   serviceName: { val: data[0].serviceName, error: false },
        //   subFilters: { val: data[0]._idSubFilters.map(i => i.name), error: false },
        //   idUpdate: data[0]._id,
        //   enabledFilter: data[0].enabled
        // });
      } catch (err) {
        this.setState({
          sendDataStatus: 'error',
          sendDataMessage: err.response.data.message
        });
      }
    }
  }

  render() {
    const { classes } = this.props;
    const {
      rootCategory,
      childCategory,
      dataFilters,
      checkFilters,
      sendDataStatus,
      sendDataMessage
    } = this.state;

    console.log(this.state);

    return (
      <Container maxWidth="md">
        <Paper className={classes.root}>
          <Button
            onClick={() => this.props.history.goBack()}
            startIcon={<ArrowBackIcon color="action" />}
          >
            <Typography component="span">
              <Box fontWeight={500} component="span" fontFamily="Monospace" fontSize="h7.fontSize">
                Categories
              </Box>
            </Typography>
          </Button>
          <CategoriesDetailForm
            rootCategory={rootCategory.val}
            rootCategoryError={rootCategory.error}
            childCategory={childCategory.val}
            childCategoryError={childCategory.error}
            dataFilters={dataFilters}
            checkFilters={checkFilters.val}
            checkFiltersError={checkFilters.error}
            onChangeValue={this.onChangeValue}
            onSubmitForm={this.onSubmitForm}
            onSubmitFormDisabled={
              !(rootCategory.val.length && childCategory.val.length && checkFilters.val.length)
            }
          />
          <SnackBars variant={sendDataStatus} open={!!sendDataMessage} message={sendDataMessage} />
        </Paper>
      </Container>
    );
  }
}

CategoriesDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

CategoriesDetail.defaultProps = {};

export default withStyles(styles)(CategoriesDetail);
