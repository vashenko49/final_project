import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AdminFiltersAPI from '../../../services/AdminFiltersAPI';

import FiltersDetailForm from './FiltersDetailForm';

import SnackBars from '../../common/admin-panel/SnackBars';
import Preloader from '../../common/admin-panel/Preloader';

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

class FiltersDetail extends Component {
  state = {
    title: { val: '', error: false },
    serviceName: { val: '', error: false },
    subFilters: { val: [], error: false },
    typeForm: 'create',
    idUpdate: null,
    enabledFilter: true,
    sendDataStatus: 'success',
    sendDataMessage: '',
    isLoading: false
  };

  onChangeValue = (name, val) => {
    this.setState({ [name]: { val, error: !val.length } });
  };

  onSubmitForm = async () => {
    try {
      this.setIsLoading(true);

      const { typeForm, title, serviceName, subFilters, idUpdate, enabledFilter } = this.state;

      const sendData = {
        title: title.val,
        serviceName: serviceName.val,
        subFilters: subFilters.val
      };

      if (typeForm === 'create') {
        await AdminFiltersAPI.createFilters(sendData);
      }

      if (typeForm === 'update') {
        sendData.idUpdate = idUpdate;
        sendData.enabledFilter = enabledFilter;
        await AdminFiltersAPI.updateFilters(sendData);
      }

      this.setIsLoading(false);

      this.setState({
        sendDataStatus: 'success',
        sendDataMessage: `${title.val} filter has been ${typeForm}!`
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

  setIsLoading = state => {
    this.setState({ isLoading: state });
  };

  async componentDidMount() {
    try {
      this.setIsLoading(true);

      const { id } = this.props.match.params;

      if (id) {
        this.setState({ typeForm: 'update' });

        const { data } = await AdminFiltersAPI.getFiltersById(id);

        this.setState({
          title: { val: data.type, error: false },
          serviceName: { val: data.serviceName, error: false },
          subFilters: { val: data._idSubFilters.map(i => i.name), error: false },
          idUpdate: data._id,
          enabledFilter: data.enabled
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
    const { classes } = this.props;
    const {
      title,
      serviceName,
      subFilters,
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
                Filters
              </Box>
            </Typography>
          </Button>
          <FiltersDetailForm
            title={title.val}
            titleError={title.error}
            serviceName={serviceName.val}
            serviceNameError={serviceName.error}
            subFilters={subFilters.val}
            subFiltersError={subFilters.error}
            onChangeValue={this.onChangeValue}
            onSubmitForm={this.onSubmitForm}
            onSubmitFormDisabled={
              !(title.val.length && serviceName.val.length && subFilters.val.length)
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

FiltersDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

FiltersDetail.defaultProps = {};

export default withStyles(styles)(FiltersDetail);
