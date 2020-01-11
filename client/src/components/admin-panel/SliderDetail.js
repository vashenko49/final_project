import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AdminSliderAPI from '../../services/AdminSliderAPI';

import SliderDetailForm from './SliderDetailForm.js';

import SnackBars from '../common/admin-panel/SnackBars';
import Preloader from '../common/admin-panel/Preloader';

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

class SliderDetail extends Component {
  state = {
    title: '',
    product: '',
    productsList: [],
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

      const { title, description, product, typeForm, idUpdate } = this.state;

      const sendData = {
        title,
        description,
        product,
        enabled: true
      };

      if (typeForm === 'create') {
        await AdminSliderAPI.createSlider(sendData);
      }
      if (typeForm === 'updateSlider') {
        await AdminSliderAPI.updateFooter(idUpdate, sendData);
      }

      this.setIsLoading(false);

      this.setState({
        sendDataStatus: 'success',
        sendDataMessage: `${title} link has been ${typeForm}!`
      });
    } catch (err) {
      this.setIsLoading(false);

      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: err.response.data.message
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

      const { id } = this.props.match.params;
      if (id) {
        this.setState({ typeForm: 'update', idUpdate: id });

        const { data } = await AdminSliderAPI.getSliderById(id);

        this.setState({});
      }

      this.setIsLoading(false);
    } catch (err) {
      this.setIsLoading(false);

      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: err.response.data.message
      });
    }
  }

  render() {
    const { classes } = this.props;
    const {
      title,
      product,
      productsList,
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
                Links
              </Box>
            </Typography>
          </Button>
          <SliderDetailForm
            title={title}
            description={description}
            product={product}
            productsList={productsList}
            onChangeValue={this.onChangeValue}
            onSubmitForm={this.onSubmitForm}
            onSubmitFormDisabled={!!(!title.length || !description.length || !product.length)}
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

export default withStyles(styles)(SliderDetail);
