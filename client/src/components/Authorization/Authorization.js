import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Login from './Login/Login';
import * as AuthorizationActions from '../../actions/authorizationAction';
import ThroughSocialNetwork from './ThroughSocialNetwork/ThroughSocialNetwork';
import SignUp from './SignUp/SignUp';

import './Authorization.scss';

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
    this.failSocial = this.failSocial.bind(this);
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

  render() {
    const { value, tabs } = this.state;
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
              <Login switchToRegistration={this.switchToRegistration} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SignUp />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ThroughSocialNetwork />
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
    loginInSystem: bindActionCreators(AuthorizationActions.loginInSystem, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);
