import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './PersonalData.scss';

import PersonalInformation from './PersonalInformation/PersonalInformation';
import ChangePassword from './ChangePassword/ChangePassword';
import PurchaseHistory from './PurchaseHistory/PurchaseHistory';
import Favourites from './Favourites/Favourites';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AuthorizationActions from '../../actions/authorizationAction';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

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

class PersonalData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      tabs: ['Personal Information', 'Change password', 'Purchase history', 'Favourites'],
      component: []
    };
  }

  handleChange = newValue => {
    const { value } = this.state;
    if (value === newValue) {
      newValue = -1;
    }
    this.setState({ value: newValue });
  };
  componentDidMount() {
    this.setState({
      tabs: ['Personal Information', 'Change password', 'Purchase history', 'Favourites'],
      component: [PersonalInformation, ChangePassword, PurchaseHistory, Favourites]
    });
  }

  render() {
    const { handleChange } = this;
    const { value, tabs, component } = this.state;
    const { openWindowAuth } = this.props;
    const { isAuthorization } = this.props.authorization;
    return (
      <MuiThemeProvider theme={theme}>
        <Container>
          <Typography variant={'h3'}>Mу profile</Typography>
          {!isAuthorization ? (
            <div className="unAuth">
              <Typography variant={'h5'}>
                You are not authorized.{' '}
                <span onClick={openWindowAuth} className="login-or-register">
                  Login or register
                </span>{' '}
                for the operation
              </Typography>
            </div>
          ) : (
            <div className="personal-data-container">
              {tabs.map((tab, index) => {
                return (
                  <ExpansionPanel
                    key={index}
                    expanded={index === value}
                    onChange={() => {
                      handleChange(index);
                    }}
                  >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon className="ExpandMoreIcon" />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography variant={'h6'}>{tab}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      {React.createElement(component[index])}
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                );
              })}
            </div>
          )}
        </Container>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return { authorization: state.authorization, configuration: state.configuration };
}

function mapDispatchToProps(dispatch) {
  return {
    openWindowAuth: bindActionCreators(AuthorizationActions.openWindowAuth, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalData);
