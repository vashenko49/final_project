import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import './PersonalData.scss';
import * as AuthorizationActions from '../../actions/authorizationAction';
import PersonalInformation from './PersonalInformation/PersonalInformation';
import ChangePassword from './ChangePassword/ChangePassword';
import PurchaseHistory from './PurchaseHistory/PurchaseHistory';
import Favourites from './Favourites/Favourites';

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
      tabs: ['Personal Information', 'Change password', 'Purchase history', 'Favourites']
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
      tabs: ['Personal Information', 'Change password', 'Purchase history', 'Favourites']
    });
  }
  render() {
    const { handleChange } = this;
    const { value, tabs } = this.state;
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
              <ExpansionPanel
                expanded={value === 0}
                onChange={() => {
                  handleChange(0);
                }}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon className="ExpandMoreIcon" />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography variant={'h6'}>{tabs[0]}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <PersonalInformation />
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel
                expanded={value === 1}
                onChange={() => {
                  handleChange(1);
                }}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon className="ExpandMoreIcon" />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography variant={'h6'}>{tabs[1]}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <ChangePassword />
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel
                expanded={value === 2}
                onChange={() => {
                  handleChange(2);
                }}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon className="ExpandMoreIcon" />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography variant={'h6'}>{tabs[2]}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <PurchaseHistory />
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel
                expanded={value === 3}
                onChange={() => {
                  handleChange(3);
                }}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon className="ExpandMoreIcon" />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography variant={'h6'}>{tabs[3]}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Favourites />
                </ExpansionPanelDetails>
              </ExpansionPanel>
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
