import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AdminCategoriesAPI from '../../../services/AdminCategoriesAPI';
import AdminProductsAPI from '../../../services/AdminProductsAPI';

import SnackBars from '../../common/admin-panel/SnackBars';
import Preloader from '../../common/admin-panel/Preloader';

import ProductsDetailBasicInfo from './ProductsDetailBasicInfo';
import ProductsDetailMainImages from './ProductsDetailMainImages';
import ProductsDetailModels from './ProductsDetailModels';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';

import objectToFormData from 'object-to-formdata';

import { connect } from 'react-redux';

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
    htmlPage: null,
    tabValue: 0,
    typeForm: 'create',
    idUpdate: null,
    sendDataStatus: 'success',
    sendDataMessage: '',
    isLoading: false
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
    try {
      this.setIsLoading(true);

      let sendType = 'warning';
      let sendMessage = '';

      const {
        nameProduct,
        description,
        htmlPage,
        category,
        mainFilters,
        filtersImage,
        models,
        typeForm,
        idUpdate
      } = this.state;

      console.log(filtersImage);

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
        sendMessage = 'Enter required fields!';
      } else if (errorModels) {
        sendMessage = 'Fields of models is required!';
      } else if (!filtersImage.length) {
        sendMessage = 'Image product is required!';
      } else if (uniqueCategoryForm.length !== category.filters.length) {
        sendMessage = 'All category filters not selected!';
      } else {
        // grouping filterImage
        const newFilterImage = filtersImage
          .filter(i => i.subFilter._id)
          .map(i => ({
            _idFilter: i.subFilter.parentId,
            _idSubFilters: i.subFilter._id,
            urlImg: i.image
          }));

        const groupingFilterImage = [...new Set(newFilterImage.map(i => i._idSubFilters))].map(
          i => {
            const groupArr = newFilterImage.filter(k => k._idSubFilters === i);
            return {
              ...groupArr[0],
              urlImg: groupArr.map(s => s.urlImg[0])
            };
          }
        );

        const sendData = {
          nameProduct,
          description,
          htmlPage,
          _idChildCategory: category._id,
          filters: mainFilters.map(i => ({ filter: i.parentId, subFilter: i._id })),
          productUrlImg: filtersImage.filter(i => !i.subFilter._id).map(i => i.image[0]),
          filterImg: groupingFilterImage,
          model: models.map(i => {
            const objModel = {
              quantity: i.quantity,
              currentPrice: i.price,
              filters: i.subFilters.map(subFilter => ({
                filter: subFilter.parentId,
                subFilter: subFilter._id
              }))
            };
            if (i.modelNo) objModel.modelNo = i.modelNo;

            return objModel;
          })
        };

        if (typeForm === 'update') sendData._idProduct = idUpdate;

        const options = {
          indices: true,
          nullsAsUndefineds: true
        };

        const formData = objectToFormData(sendData, options);

        if (typeForm === 'create') {
          await AdminProductsAPI.createProducts(formData);
          sendMessage = `${sendData.nameProduct} product has been ${typeForm}!`;
        }

        if (typeForm === 'update') {
          await AdminProductsAPI.updateProducts(formData);
          sendMessage = `${sendData.nameProduct} product has been ${typeForm}!`;
        }
      }

      this.setIsLoading(false);
      this.setState({
        sendDataStatus: sendType,
        sendDataMessage: sendMessage
      });
    } catch (err) {
      console.log(err);
      this.setIsLoading(false);

      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: err.response.data.message || err.message
      });
    }
  };

  getCategories = async () => {
    try {
      this.setIsLoading(true);

      const { data } = await AdminCategoriesAPI.getCategories();

      const newData = [];

      data.forEach(main => {
        main.childCatalog.forEach(sub => {
          sub.parent = main;
          newData.push(sub);
        });
      });
      this.setState({ dataCategories: newData });

      this.setIsLoading(false);
    } catch (err) {
      this.setIsLoading(false);

      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: err.response.data.message || err.message
      });
    }
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

  handleCloseSnackBars = (event, reason) => {
    if (reason === 'clickaway') return;

    this.setState({ sendDataMessage: '' });
  };

  setIsLoading = state => {
    this.setState({ isLoading: state });
  };

  async componentDidMount() {
    try {
      this.setIsLoading(true);

      const { id } = this.props.match.params;

      await this.getCategories();

      if (id) {
        const { data } = await AdminProductsAPI.getProductsById(id);

        // get category
        const category = this.state.dataCategories.filter(
          i => i._id === data._idChildCategory._id
        )[0];

        const dataFilters = [];

        // get dataFilters
        category.filters.forEach(filter => {
          filter.filter._idSubFilters.forEach(subFilter => {
            dataFilters.push({
              parentId: filter.filter._id,
              parentType: filter.filter.type,
              parentServiceName: filter.filter.serviceName,
              ...subFilter
            });
          });
        });

        // get mainFilters
        const mainFilters = dataFilters.filter(i =>
          data.filters.map(i => i.subFilter._id).includes(i._id)
        );

        // get models
        const models = data.model.map(model => ({
          id: model._id,
          subFilters: dataFilters.filter(i =>
            model.filters.map(i => i.subFilter._id).includes(i._id)
          ),
          quantity: model.quantity.toString(),
          price: model.currentPrice.toString(),
          modelNo: model.modelNo
        }));

        // get filtersImage
        const filtersImage = [];

        data.filterImg.forEach(item => {
          const {
            _idFilter: { _id: parentId, type: parentType, serviceName: parentServiceName },
            _idSubFilters
          } = item;
          item.urlImg.forEach(img => {
            filtersImage.push({
              id: (~~(Math.random() * 1e8)).toString(16),
              image: [img],
              subFilter: {
                ..._idSubFilters,
                parentId: parentId,
                parentType: parentType,
                parentServiceName: parentServiceName
              }
            });
          });
        });

        data.productUrlImg.forEach(item => {
          filtersImage.push({
            id: (~~(Math.random() * 1e8)).toString(16),
            image: [item],
            subFilter: ''
          });
        });

        this.setState({
          nameProduct: data.nameProduct,
          description: data.description,
          htmlPage: data.htmlPage,
          category,
          dataFilters,
          mainFilters,
          filtersImage,
          models,
          typeForm: 'update',
          idUpdate: id
        });
      }

      this.setIsLoading(false);
    } catch (err) {
      console.log(err);
      this.setIsLoading(false);

      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: err.response.data.message || err.message
      });
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
      models,
      htmlPage,
      isLoading
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
                htmlPage={htmlPage}
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
                cloudinaryCloudName={this.props.configuration.cloudinary_cloud_name}
                onChangeValue={this.onChangeValue}
                filtersImage={filtersImage}
                onDeleteCardImg={this.onDeleteCardImg}
                models={models}
              />
            ) : null}
          </Box>

          <Box align="right" pr={3}>
            <Button
              onClick={this.onSubmitForm}
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Box>

          <SnackBars
            handleClose={this.handleCloseSnackBars}
            variant={sendDataStatus}
            open={!!sendDataMessage}
            message={sendDataMessage}
          />

          <Preloader open={isLoading} />
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

function mapStateToProps(state) {
  return {
    configuration: state.configuration
  };
}

export default connect(mapStateToProps)(withStyles(styles)(ProductsDetail));
