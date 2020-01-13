import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AdminSliderAPI from '../../../services/AdminSliderAPI';
import AdminProductsAPI from '../../../services/AdminProductsAPI';
import AdminCategoriesAPI from '../../../services/AdminCategoriesAPI';

import SliderDetailForm from './SliderDetailForm.js';

import SnackBars from '../../common/admin-panel/SnackBars';
import Preloader from '../../common/admin-panel/Preloader';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { withStyles } from '@material-ui/core/styles';

import objectToFormData from 'object-to-formdata';

import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    padding: theme.spacing(2)
  }
});

class SliderDetail extends Component {
  state = {
    custom: false,
    htmlPage: '',
    image: '',
    title: '',
    product: null,
    productsList: [],
    category: null,
    categoryList: [],
    description: '',
    typeForm: 'create',
    idUpdate: null,
    sendDataStatus: 'success',
    sendDataMessage: '',
    isLoading: false
  };

  setIsLoading = state => {
    this.setState({ isLoading: state });
  };

  onChangeValue = (name, val) => {
    this.setState({ [name]: val });
  };

  onSubmitForm = async () => {
    try {
      this.setIsLoading(true);

      const {
        custom,
        htmlPage,
        image,
        title,
        product,
        category,
        description,
        typeForm,
        idUpdate
      } = this.state;

      const sendData = custom
        ? {
            htmlContent: htmlPage,
            imageUrl: image,
            enabled: true
          }
        : {
            title,
            description,
            product: product ? product._id : null,
            childCatalogs: category ? category._id : null,
            imageUrl: image,
            enabled: true
          };

      const options = {
        indices: true,
        nullsAsUndefineds: true
      };

      const formData = objectToFormData(sendData, options);

      if (typeForm === 'create') {
        await AdminSliderAPI.createSlider(formData);
      }
      if (typeForm === 'update') {
        await AdminSliderAPI.updateSlider(idUpdate, formData);
      }

      this.setIsLoading(false);

      this.setState({
        sendDataStatus: 'success',
        sendDataMessage: `Slide has been ${typeForm}!`
      });
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

  async componentDidMount() {
    try {
      this.setIsLoading(true);

      const dataProduct = await AdminProductsAPI.getProducts();
      const dataCategory = await AdminCategoriesAPI.getCategories();

      const newDataCategory = [];

      dataCategory.data.forEach(main => {
        main.childCatalog.forEach(sub => {
          sub.parent = main;
          newDataCategory.push(sub);
        });
      });

      this.setState({
        productsList: dataProduct.data,
        categoryList: newDataCategory
      });

      const { id } = this.props.match.params;
      if (id) {
        const { data } = await AdminSliderAPI.getSliderById(id);

        this.setState({
          custom: !!data.htmlContent,
          htmlPage: data.htmlContent || '',
          image: data.imageUrl,
          title: data.title || '',
          description: data.description || '',
          product: data.product ? dataProduct.data.find(i => i._id === data.product._id) : null,
          category: data.categories
            ? newDataCategory.filter(i => i._id === data.categories._id)
            : null,
          typeForm: 'update',
          idUpdate: id
        });
      }

      this.setIsLoading(false);
    } catch (err) {
      this.setIsLoading(false);

      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: err.response.data.message || err.message
      });
    }
  }

  render() {
    const { classes, configuration } = this.props;
    const {
      custom,
      image,
      htmlPage,
      title,
      product,
      productsList,
      category,
      categoryList,
      description,
      sendDataStatus,
      sendDataMessage,
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
                Slider
              </Box>
            </Typography>
          </Button>
          <SliderDetailForm
            custom={custom}
            image={image}
            htmlPage={htmlPage}
            title={title}
            description={description}
            product={product}
            productsList={productsList}
            category={category}
            categoryList={categoryList}
            cloudinaryCloudName={configuration.cloudinary_cloud_name}
            onChangeValue={this.onChangeValue}
            onSubmitForm={this.onSubmitForm}
            onSubmitFormDisabled={
              custom
                ? !!(!htmlPage.length || !image)
                : !!(!image || !title.length || !description.length || (!product && !category))
            }
          />

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

SliderDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    configuration: state.configuration
  };
}

export default connect(mapStateToProps)(withStyles(styles)(SliderDetail));
