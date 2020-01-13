import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Tabs, Tab, Button } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import TabPanel from '../../../TabPanel/TabPanel';
import _ from 'lodash';
import flat from 'flat';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class ConfigSystemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      development: {
        'domen.domenServer': '',
        'domen.domenClient': '',
        'database.uri': '',
        'nodemailer.email': '',
        'nodemailer.password': '',
        'nodemailer.service': '',
        'cloudinary.cloudName': '',
        'cloudinary.apiKey': '',
        'cloudinary.apiSecret': '',
        'auth.oauth.google.clientID': '',
        'auth.oauth.google.clientSecret': '',
        'auth.oauth.facebook.clientID': '',
        'auth.oauth.facebook.clientSecret': '',
        'auth.oauth.github.clientID': '',
        'auth.oauth.github.clientSecret': '',
        'auth.JWT_SECRET': '',
        'auth.JWT_EMAIL_SECRET': '',
        'auth.JWT_FORGOT_PASSWORD': '',
        'auth.usersIdSecret': '',
        'auth.orderIdSecret': ''
      },
      production: {
        'domen.domenServer': '',
        'domen.domenClient': '',
        'database.uri': '',
        'nodemailer.email': '',
        'nodemailer.password': '',
        'nodemailer.service': '',
        'cloudinary.cloudName': '',
        'cloudinary.apiKey': '',
        'cloudinary.apiSecret': '',
        'auth.oauth.google.clientID': '',
        'auth.oauth.google.clientSecret': '',
        'auth.oauth.facebook.clientID': '',
        'auth.oauth.facebook.clientSecret': '',
        'auth.oauth.github.clientID': '',
        'auth.oauth.github.clientSecret': '',
        'auth.JWT_SECRET': '',
        'auth.JWT_EMAIL_SECRET': '',
        'auth.JWT_FORGOT_PASSWORD': '',
        'auth.usersIdSecret': '',
        'auth.orderIdSecret': ''
      },
      active: false,
      customId: '',
      tab: 0
    };
  }

  componentDidMount() {
    if (this.props.rowData) {
      const { active, customId } = this.props.rowData;
      this.setState({
        development: flat(this.props.rowData.development),
        production: flat(this.props.rowData.production),
        active,
        customId
      });
    }
  }

  handleCheckBox = event => {
    this.setState({ [`${event.target.value}`]: event.target.checked });
  };
  onChange = event => {
    this.setState({ [`${event.target.name}`]: event.target.value });
  };
  onChangeBigForm = (event, status) => {
    this.setState({
      [`${status}`]: { ...this.state[`${status}`], [`${event.target.name}`]: event.target.value }
    });
  };

  checkEnteredAllField = status => {
    return (
      Object.entries(this.state[`${status}`])
        .map(([key, value]) => ({ value }))
        .filter(item => {
          return item.value.length <= 0;
        }).length <= 0
    );
  };

  submit = event => {
    event.preventDefault();
    const { checkEnteredAllField } = this;
    const { submit, setSnackBars } = this.props;
    if (checkEnteredAllField('development') && checkEnteredAllField('production')) {
      const newData = _.cloneDeep(this.state);
      newData.development = flat.unflatten(newData.development);
      newData.production = flat.unflatten(newData.production);
      if (_.isObject(this.props.rowData)) {
        newData._id = this.props.rowData._id;
      }
      delete newData.tab;
      submit(newData);
    } else {
      setSnackBars('error', 'Enter all filed');
    }
  };
  handleChangeTabs = (event, newValue) => {
    this.setState({ tab: newValue });
  };

  render() {
    const { submit, handleChangeTabs, onChange, onChangeBigForm, handleCheckBox } = this;
    const { tab, development, production, active, customId } = this.state;
    const { load } = this.props;
    return (
      <Container>
        <ValidatorForm ref="form" onSubmit={submit}>
          <Tabs
            value={tab}
            onChange={handleChangeTabs}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Develop" />
            <Tab label="Production" />
          </Tabs>
          <TabPanel value={tab} index={0}>
            {Object.entries(development).map(([key, value]) => {
              return (
                <TextValidator
                  key={key}
                  margin="normal"
                  label={key}
                  onChange={event => {
                    onChangeBigForm(event, 'development');
                  }}
                  name={key}
                  fullWidth
                  value={value}
                  disabled={load}
                  variant="outlined"
                  validators={['required']}
                  errorMessages={['This field is required']}
                />
              );
            })}
          </TabPanel>
          <TabPanel value={tab} index={1}>
            {Object.entries(production).map(([key, value]) => {
              return (
                <TextValidator
                  key={key}
                  margin="normal"
                  label={key}
                  onChange={event => {
                    onChangeBigForm(event, 'production');
                  }}
                  name={key}
                  fullWidth
                  disabled={load}
                  value={value}
                  variant="outlined"
                  validators={['required']}
                  errorMessages={['This field is required']}
                />
              );
            })}
          </TabPanel>
          <TextValidator
            margin="normal"
            label="customId"
            onChange={onChange}
            name="customId"
            fullWidth
            value={customId}
            variant="outlined"
            disabled={load}
            validators={['required']}
            errorMessages={['This field is required']}
          />
          <FormControlLabel
            control={
              <Checkbox checked={active} onChange={handleCheckBox} value="active" disabled={load} />
            }
            label="Active"
          />
          <div className="position-btn-submit">
            <Button type="submit" disabled={load} variant="contained" color="primary">
              {_.isObject(this.props.rowData) ? 'Save Changes' : 'Create'}
            </Button>
          </div>
        </ValidatorForm>
      </Container>
    );
  }
}

ConfigSystemDetail.propTypes = {
  load: PropTypes.bool,
  submit: PropTypes.func
};

export default ConfigSystemDetail;
