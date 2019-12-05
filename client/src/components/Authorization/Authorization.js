import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Login from './Login/Login';
import * as AuthorizationActions from '../../actions/authorizationAction';
import ThroughSocialNetwork from './ThroughSocialNetwork/ThroughSocialNetwork';
import SignUp from './SignUp/SignUp';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import authorization from '../../reducers/authorization';

import './Authorization.scss';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import axios from 'axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#33333A'
    },
    secondary: {
      main: '#fafafa'
    }
  }
});

class Authorization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogIn: true,
      value: 0,
      tabs: ['Log in', 'Sing Up', 'Social Network']
    };

    this.handleChange = this.handleChange.bind(this);
    this.a11yProps = this.a11yProps.bind(this);
    this.switchToRegistration = this.switchToRegistration.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.responseGitHub = this.responseGitHub.bind(this);
    this.failSocial = this.failSocial.bind(this);
    this.login = this.login.bind(this);
    this.registration = this.registration.bind(this);
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  a11yProps = index => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  };

  responseGoogle = response => {
    console.log(response);
    axios
      .post('/customers/google', {
        access_token: response.accessToken
      })
      .then((req, res) => {
        console.log(req);
      });
  };

  responseFacebook = response => {
    console.log(response);

    axios
      .post('/customers/facebook', {
        access_token: response.accessToken,
        client_id: response.id
      })
      .then((req, res) => {
        console.log(req);
      });
  };

  responseGitHub = response => {
    console.log(response);
    axios
      .post('/customers/github', {
        code: response.code
      })
      .then((req, res) => {
        console.log(req);
      });
  };

  login = userData => {
    console.log(userData);
    axios.post('/customers/login', userData).then(res => {
      console.log(res);
    });
  };

  registration = userData => {
    console.log(userData);
    axios.post('/customers', userData).then(res => {
      console.log(res);
    });
  };

  switchToRegistration = () => {
    this.setState({ value: 1 });
  };

  failSocial = response => {
    console.log(response);
  };

  render() {
    const { value, tabs } = this.state;
    const {
      responseGitHub,
      responseFacebook,
      responseGoogle,
      failSocial,
      login,
      registration
    } = this;
    return (
      <MuiThemeProvider theme={theme}>
        <Grid container direction={'column'} justify={'flex-start'} alignItems="stretch">
          <Grid>
            <h2 className="title-login-singup">{tabs[value]}</h2>
          </Grid>
          <Grid className="appbar">
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
                className="tabs"
              >
                <Tab className="tab" label={tabs[0]} {...this.a11yProps(0)} />
                <Tab className="tab" label={tabs[1]} {...this.a11yProps(1)} />
                <Tab className="tab" label={tabs[2]} {...this.a11yProps(2)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <Login switchToRegistration={this.switchToRegistration} login={login} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SignUp registration={registration} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ThroughSocialNetwork
                responseGitHub={responseGitHub}
                responseFacebook={responseFacebook}
                responseGoogle={responseGoogle}
                failSocial={failSocial}
              />
            </TabPanel>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return { authorization: state.authorization };
}

function mapDispatchToProps(dispatch) {
  return {
    registration: bindActionCreators(AuthorizationActions.registration, dispatch),
    logInSystem: bindActionCreators(AuthorizationActions.loginInSystem, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);
