import React, { Component } from 'react';
import SocialID from '../../../config/idSocialNetworks';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import GitHubLogin from 'react-github-login';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Box from '@material-ui/core/Box';

import './ThroughSocialNetwork.scss';

class ThroughSocialNetwork extends Component {
  constructor(props) {
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  responseGoogle = res => {
    console.log(res);
  };

  render() {
    const { responseGitHub, responseFacebook, responseGoogle, failSocial } = this.props;
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Box m={3}>
          <GoogleLogin
            clientId={SocialID.oauth.google.clientID}
            buttonText="Login"
            onSuccess={responseGoogle}
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
            callback={responseFacebook}
            cssClass="ripple btn"
          />
        </Box>
        <Box m={3}>
          <GitHubLogin
            clientId={SocialID.oauth.github.clientID}
            redirectUri=""
            buttonText="GitHub"
            onSuccess={responseGitHub}
            onFailure={failSocial}
            className="ripple btn"
          />
        </Box>
      </Grid>
    );
  }
}

export default ThroughSocialNetwork;
