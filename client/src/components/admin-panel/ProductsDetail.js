import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AdminCategoriesAPI from '../../services/AdminCategoriesAPI';
import AdminProductsAPI from '../../services/AdminProductsAPI';

import SnackBars from '../common/admin-panel/SnackBars';
import ProductsDetailBasicInfo from './ProductsDetailBasicInfo';
import ProductsDetailMainImages from './ProductsDetailMainImages';
import ProductsDetailModels from './ProductsDetailModels';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import objectToFormData from 'object-to-formdata';

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
    nameProduct: '',
    description: '',
    dataCategories: [],
    dataFilters: [],
    category: null,
    mainFilters: [],
    filtersImage: [],
    models: [
      {
        id: new Date().getTime(),
        subFilters: [],
        quantity: '',
        price: ''
      }
    ],
    tabValue: 0,
    typeForm: 'create',
    idUpdate: null,
    sendDataStatus: 'success',
    sendDataMessage: ''
  };

  onChangeTabValue = (e, newValue) => {
    this.setState({ tabValue: newValue });
  };

  onChangeValueModels = (name, val, id) => {
    this.setState({
      models: this.state.models.map(i => (i.id === id ? { ...i, [name]: val } : i))
    });
  };

  onChangeValue = (name, val, id) => {
    if (name === 'category') {
      this.setFiltersByCategory(val ? val.filters : []);
    }

    if (name === 'filtersImage') {
      const newArrImages = [];

      for (let i = 0; i < val.files.length; i++) {
        newArrImages.push({
          id: (~~(Math.random() * 1e8 * val.files[i].lastModified)).toString(16),
          image: [val.files[i]],
          subFilter: ''
        });
      }

      return this.setState(
        {
          filtersImage: [...this.state.filtersImage, ...newArrImages]
        },
        () => (val.value = '') // remove file in input file for add duplicate file after remove)
      );
    }

    if (name === 'filtersImageReload') {
      return this.setState(
        {
          filtersImage: this.state.filtersImage.map(card =>
            card.id === id ? { ...card, image: val.files[0] } : card
          )
        },
        () => (val.value = '') // remove file in input file for add duplicate file after remove
      );
    }

    if (name === 'filtersImageSubFilter') {
      return this.setState({
        filtersImage: this.state.filtersImage.map(card =>
          card.id === id ? { ...card, subFilter: val } : card
        )
      });
    }

    this.setState({ [name]: val }); // default
  };

  onDeleteCardImg = cardId => {
    this.setState({
      filtersImage: this.state.filtersImage.filter(card => cardId !== card.id)
    });
  };

  onSubmitForm = async () => {
    const {
      nameProduct,
      description,
      category,
      mainFilters,
      filtersImage,
      models,
      typeForm
    } = this.state;

    // получаем все уникальные id фильтров которые выбраны в форме
    const uniqueCategoryForm = [
      ...new Set([
        ...mainFilters.map(i => i.parentId),
        ...models
          .map(i => i.subFilters)
          .reduce((flat, current) => flat.concat(current), [])
          .map(i => i.parentId)
      ])
    ];

    // Проверка зполенния всех моделек
    let errorModels = false;
    models.forEach(i => {
      if (!i.subFilters.length || !i.quantity.length || !i.price.length) {
        errorModels = true;
      }
    });

    // проверка, выбраны ли все фильтра категории
    if (!nameProduct.length || !description.length || !category || !mainFilters.length) {
      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: 'Enter required fields!'
      });
    } else if (errorModels) {
      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: 'Fields of models is required!'
      });
    } else if (!filtersImage.length) {
      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: 'Image product is required!'
      });
    } else if (uniqueCategoryForm.length !== category.filters.length) {
      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: 'All category filters not selected!'
      });
    } else {
      const sendData = {
        nameProduct,
        description,
        _idChildCategory: category._id,
        filters: mainFilters.map(i => ({ filter: i.parentId, subFilter: i._id })),
        productUrlImg: filtersImage.filter(i => !i.subFilter._id).map(i => i.image[0]),
        filterImg: filtersImage
          .filter(i => i.subFilter._id)
          .map(i => ({
            _idFilter: i.subFilter.parentId,
            _idSubFilters: i.subFilter._id,
            urlImg: i.image
          })),
        model: models.map(i => ({
          quantity: i.quantity,
          currentPrice: i.price,
          filters: i.subFilters.map(subFilter => ({
            filter: subFilter.parentId,
            subFilter: subFilter._id
          }))
        }))
      };

      console.log('!!!!!', sendData);

      const options = {
        indices: true,
        nullsAsUndefineds: true
      };

      const formData = objectToFormData(sendData, options);

      try {
        if (typeForm === 'create') {
          await AdminProductsAPI.createProducts(formData);

          this.setState({
            sendDataStatus: 'success',
            sendDataMessage: `${sendData.nameProduct} product has been created!`
          });
        }

        if (typeForm === 'update') {
          // sendData.idUpdate = idUpdate;
          // sendData.enabledFilter = enabledFilter;
          // await AdminFiltersAPI.updateFilters(sendData);

          this.setState({
            sendDataStatus: 'success'
            // sendDataMessage: `${title.val} filter has been update!`
          });
        }
      } catch (err) {
        this.setState({
          sendDataStatus: 'error',
          sendDataMessage: err.response.data.message
        });
      }
    }
  };

  getCategories = async () => {
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
  };

  setFiltersByCategory = filters => {
    const newDataFilters = [];

    filters.forEach(filter => {
      filter.filter._idSubFilters.forEach(subFilter => {
        newDataFilters.push({
          parentId: filter.filter._id,
          parentType: filter.filter.type,
          parentServiceName: filter.filter.serviceName,
          ...subFilter
        });
      });
    });

    this.setState({
      dataFilters: newDataFilters,
      mainFilters: [],
      filtersImage: this.state.filtersImage.map(i => ({
        ...i,
        ...{ subFilter: '' }
      })),
      models: this.state.models.map(i => ({
        ...i,
        ...{ subFilters: [] }
      }))
    });
  };

  createNewModel = () => ({
    id: new Date().getTime(),
    subFilters: [],
    quantity: '',
    price: ''
  });

  onAddNewModel = () => {
    this.setState({
      models: [...this.state.models, this.createNewModel()]
    });
  };

  onClickDeleteModel = id => {
    this.setState({
      models: this.state.models.filter(i => i.id !== id)
    });
  };

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
    const {
      nameProduct,
      description,
      sendDataStatus,
      sendDataMessage,
      dataCategories,
      category,
      dataFilters,
      mainFilters,
      filtersImage,
      models
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
            <Tab label="Models" {...a11yProps(1)} />
            <Tab label="Main Images" {...a11yProps(2)} />
          </Tabs>

          <Box p={3}>
            {this.state.tabValue === 0 ? (
              <ProductsDetailBasicInfo
                onChangeValue={this.onChangeValue}
                dataCategories={dataCategories}
                category={category}
                dataFilters={dataFilters}
                mainFilters={mainFilters}
                nameProduct={nameProduct}
                description={description}
              />
            ) : this.state.tabValue === 1 ? (
              <ProductsDetailModels
                models={models}
                dataFilters={dataFilters}
                mainFilters={mainFilters}
                onChangeValue={this.onChangeValueModels}
                onClickDeleteModel={this.onClickDeleteModel}
                onAddNewModel={this.onAddNewModel}
              />
            ) : this.state.tabValue === 2 ? (
              <ProductsDetailMainImages
                onChangeValue={this.onChangeValue}
                filtersImage={filtersImage}
                onDeleteCardImg={this.onDeleteCardImg}
                models={models}
              />
            ) : null}
          </Box>

          <Box align="right" pr={3}>
            <Button
              // disabled={onSubmitFormDisabled}
              onClick={this.onSubmitForm}
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
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

ProductsDetail.defaultProps = {
  classes: {}
};

export default withStyles(styles)(ProductsDetail);
