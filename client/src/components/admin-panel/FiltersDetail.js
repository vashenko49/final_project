import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AdminFiltersAPI from '../../services/AdminFiltersAPI';

import FiltersDetailForm from './FiltersDetailForm';
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

class FiltersDetail extends Component {
  state = {
    title: { val: '', error: false },
    serviceName: { val: '', error: false },
    subFilters: { val: [], error: false },
    typeForm: 'create',
    idUpdate: null,
    enabledFilter: true,
    sendDataStatus: 'success',
    sendDataMessage: ''
  };

  onChangeValue = (name, val) => {
    this.setState({ [name]: { val, error: !val.length } });
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

  handleCloseSnackBars = (event, reason) => {
    if (reason === 'clickaway') return;

    this.setState({ sendDataMessage: '' });
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      this.setState({ typeForm: 'update' });

      try {
        const { data } = await AdminFiltersAPI.getFiltersById(id);

        this.setState({
          title: { val: data.type, error: false },
          serviceName: { val: data.serviceName, error: false },
          subFilters: { val: data._idSubFilters.map(i => i.name), error: false },
          idUpdate: data._id,
          enabledFilter: data.enabled
        });
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
    const { title, serviceName, subFilters, sendDataStatus, sendDataMessage } = this.state;

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
