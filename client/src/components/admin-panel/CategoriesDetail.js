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
    childCategory: [],
    filtersData: [],
    typeForm: 'create',
    idUpdate: null,
    sendDataStatus: 'success',
    sendDataMessage: ''
  };

  newObjChildCategory = () => ({
    id: new Date().getTime().toString(),
    idOwner: '',
    name: '',
    filters: []
  });

  onChangeValue = (name, val, idChildCategory) => {
    const { childCategory } = this.state;

    if (name === 'rootCategory') {
      this.setState({ [name]: val });
    } else if (name === 'childCategory') {
      this.setState({
        filters: childCategory.map(item => {
          if (item.id === idChildCategory) item.name = val;
          return item;
        })
      });
    } else if (name === 'filters') {
      this.setState({
        filters: childCategory.map(item => {
          if (item.id === idChildCategory) item.filters = val;
          return item;
        })
      });
    }
  };

  onAddChildCategory = () => {
    this.setState({
      childCategory: [...this.state.childCategory, this.newObjChildCategory()]
    });
  };

  onClickDelete = e => {
    e.stopPropagation();

    this.setState({
      childCategory: this.state.childCategory.filter(
        i => i.id !== e.currentTarget.getAttribute('datakey')
      )
    });
  };

  onSubmitForm = async () => {
    const { rootCategory, childCategory, idUpdate, typeForm } = this.state;

    const sendData = {
      nameRootCatalog: rootCategory,
      childCatalogs: childCategory.map(child => {
        const childData = {
          nameChildCatalog: child.name,
          filters: child.filters.map(filter => filter.id)
        };
        if (child.idOwner) childData._id = child.idOwner;

        return childData;
      })
    };

    try {
      if (typeForm === 'create') {
        await AdminCategoriesAPI.addCategories(sendData);
      }
      if (typeForm === 'update') {
        sendData._id = idUpdate;
        await AdminCategoriesAPI.updateCategories(sendData);
      }

      this.setState({
        sendDataStatus: 'success',
        sendDataMessage: `${rootCategory} category has been ${typeForm}!`
      });
    } catch (err) {
      this.setState({
        sendDataStatus: 'error'
        // sendDataMessage: err.response.data.message
      });
    }
  };

  async componentDidMount() {
    const { data } = await AdminFiltersAPI.getFilters();
    this.setState({
      filtersData: data.map(i => ({ id: i._id, serviceName: i.serviceName }))
    });

    const { id } = this.props.match.params;
    if (id) {
      this.setState({ typeForm: 'update', idUpdate: id });

      try {
        const { data } = await AdminCategoriesAPI.getCategoriesById(id);
        console.log(data);

        this.setState({
          rootCategory: data.name,
          childCategory: data.childCatalog.map(i => ({
            idOwner: i._id,
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
    } else {
      this.setState({ childCategory: [this.newObjChildCategory()] });
    }
  }

  render() {
    const { classes } = this.props;
    const {
      rootCategory,
      childCategory,
      filtersData,
      sendDataStatus,
      sendDataMessage
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
            onClickDelete={this.onClickDelete}
            hasOnClickDelete={!!(childCategory.length > 1)}
            onSubmitForm={this.onSubmitForm}
            onSubmitFormDisabled={
              !!(childCategory.find(i => !i.name || !i.filters.length) || !rootCategory)
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
