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
    rootCategory: '',
    childCategory: [{ id: new Date().getTime(), name: '', filters: [] }],
    filtersData: [],
    typeForm: 'create',
    idUpdate: null,
    onSubmitFormDisabled: false,
    onAddChildCategoryDisabled: false,
    sendDataStatus: 'success',
    sendDataMessage: ''
  };

  onChangeValue = (name, val, idChildCategory) => {
    if (name === 'rootCategory') {
      this.setState({ [name]: val });
    } else if (name === 'childCategory') {
      this.setState({
        filters: this.state.childCategory.map(item => {
          if (item.id === +idChildCategory) item.name = val;
          return item;
        })
      });
    } else if (name === 'filters') {
      this.setState({
        filters: this.state.childCategory.map(item => {
          if (item.id === +idChildCategory.split('-')[0]) {
            item.filters = val;
          }
          return item;
        })
      });
    }
  };

  onAddChildCategory = () => {
    this.setState({
      childCategory: [
        ...this.state.childCategory,
        { id: new Date().getTime(), name: '', filters: [] }
      ]
    });
  };

  onClickDelete = e => {
    e.stopPropagation();

    this.setState({
      childCategory: this.state.childCategory.filter(
        i => i.id !== +e.currentTarget.getAttribute('datakey')
      )
    });
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
    const { data } = await AdminFiltersAPI.getFilters();
    this.setState({
      filtersData: data.map(i => ({ id: i._id, serviceName: i.serviceName }))
    });

    const { id } = this.props.match.params;

    if (id) {
      this.setState({ typeForm: 'update', idUpdate: id });
    }

    try {
      const data = await AdminCategoriesAPI.getCategoriesById(id);

      this.setState({
        rootCategory: data.name,
        childCategory: data.childCatalog.map(i => ({
          id: i._id,
          name: i.name,
          filters: i.filters.map(k => ({
            id: k.filter._id,
            serviceName: k.filter.serviceName
          }))
        }))
      });
    } catch (err) {
      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: err.response.data.message
      });
    }
  }

  render() {
    const { classes } = this.props;
    const {
      rootCategory,
      childCategory,
      filtersData,
      sendDataStatus,
      sendDataMessage,
      onSubmitFormDisabled,
      onAddChildCategoryDisabled
    } = this.state;

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
            rootCategory={rootCategory}
            childCategory={childCategory}
            filtersData={filtersData}
            onChangeValue={this.onChangeValue}
            onAddChildCategory={this.onAddChildCategory}
            onAddChildCategoryDisabled={onAddChildCategoryDisabled}
            onSubmitForm={this.onSubmitForm}
            onClickDelete={this.onClickDelete}
            onSubmitFormDisabled={onSubmitFormDisabled}
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
