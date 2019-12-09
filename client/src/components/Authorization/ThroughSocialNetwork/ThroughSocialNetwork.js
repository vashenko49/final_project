import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import GitHubLogin from 'react-github-login';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import './ThroughSocialNetwork.scss';
import * as AuthorizationActions from '../../../actions/authorizationAction';
import SocialID from '../../../config/idSocialNetworks';
import TypeLogIn from '../../../services/AuthorizationAPI';

class ThroughSocialNetwork extends Component {
  constructor(props) {
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.responseGitHub = this.responseGitHub.bind(this);
  }

  responseGoogle = res => {
    const { loginInSystem } = this.props;
    loginInSystem(res, TypeLogIn.responseGoogle);
  };

  responseFacebook = res => {
    const { loginInSystem } = this.props;
    loginInSystem(res, TypeLogIn.responseFacebook);
  };
  responseGitHub = res => {
    const { loginInSystem } = this.props;
    loginInSystem(res, TypeLogIn.responseGitHub);
  };

  render() {
    const { failSocial } = this.props;
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Box m={3}>
          <GoogleLogin
            clientId={SocialID.oauth.google.clientID}
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={failSocial}
            render={renderProps => (
              <button
                className="ripple btn"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Google
              </button>
            )}
            cookiePolicy={'single_host_origin'}
          />
        </Box>
        <Box m={3}>
          <FacebookLogin
            textButton="Facebook"
            appId={SocialID.oauth.facebook.clientID}
            autoLoad={false}
            onFailure={failSocial}
            fields="picture, email, name"
            callback={this.responseFacebook}
            cssClass="ripple btn"
          />
        </Box>
        <Box m={3}>
          <GitHubLogin
            clientId={SocialID.oauth.github.clientID}
            redirectUri=""
            buttonText="GitHub"
            onSuccess={this.responseGitHub}
            onFailure={failSocial}
            className="ripple btn"
          />
        </Box>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return { authorization: state.authorization };
}

function mapDispatchToProps(dispatch) {
  return {
    loginInSystem: bindActionCreators(AuthorizationActions.loginInSystem, dispatch),
    failSocial: bindActionCreators(AuthorizationActions.failSocial, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ThroughSocialNetwork);
