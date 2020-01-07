import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Login from './Login/Login';
import * as AuthorizationActions from '../../actions/authorizationAction';
import ThroughSocialNetwork from './ThroughSocialNetwork/ThroughSocialNetwork';
import SignUp from './SignUp/SignUp';

import './Authorization.scss';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import { getCurrentItems } from '../../actions/cart';
import TabPanel from '../TabPanel/TabPanel';

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
      tabs: ['Log in', 'Sing Up', 'Social Network'],
      isForgotPassword: false
    };
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

  switchToRegistration = () => {
    this.setState({ value: 1 });
  };

  failSocial = response => {
    console.log(response);
  };

  toggleForgotPassword = () => {
    this.setState(prevState => ({
      isForgotPassword: !prevState.isForgotPassword
    }));
  };

  componentWillUnmount() {
    const { getCurrentItems } = this.props;
    getCurrentItems();
  }

  render() {
    const { value, tabs, isForgotPassword } = this.state;
    const { toggleForgotPassword, a11yProps, switchToRegistration } = this;
    return (
      <MuiThemeProvider theme={theme}>
        <Grid container direction={'column'} justify={'flex-start'} alignItems="stretch">
          <Grid>
            <h2 className="title-login-singup">
              {!isForgotPassword ? tabs[value] : 'Reset Password'}
            </h2>
          </Grid>
          {!isForgotPassword ? (
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
                  <Tab className="tab" label={tabs[0]} {...a11yProps(0)} />
                  <Tab className="tab" label={tabs[1]} {...a11yProps(1)} />
                  <Tab className="tab" label={tabs[2]} {...a11yProps(2)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <Login
                  switchToRegistration={switchToRegistration}
                  toggleForgotPassword={toggleForgotPassword}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <SignUp />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <ThroughSocialNetwork />
              </TabPanel>
            </Grid>
          ) : (
            <Box p={3}>
              <ForgotPassword toggleForgotPassword={toggleForgotPassword} />
            </Box>
          )}
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
    loginInSystem: bindActionCreators(AuthorizationActions.loginInSystem, dispatch),
    getCurrentItems: bindActionCreators(getCurrentItems, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);
