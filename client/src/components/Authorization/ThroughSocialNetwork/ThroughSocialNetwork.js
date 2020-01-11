import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import GitHubLogin from 'react-github-login';

import './ThroughSocialNetwork.scss';
import * as AuthorizationActions from '../../../actions/authorizationAction';
import TypeLogIn from '../../../services/AuthorizationAPI';
import CircularProgress from '@material-ui/core/CircularProgress';

class ThroughSocialNetwork extends Component {
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
    const {
      google_clientID,
      facebook_clientID,
      github_clientID,
      errorConfig,
      loading
    } = this.props.configuration;
    return (
      <div>
        {errorConfig ? (
          <p>Oops, something went wrong</p>
        ) : loading ? (
          <div className="container-social-media">
            <GoogleLogin
              clientId={google_clientID}
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
            <FacebookLogin
              textButton="Facebook"
              appId={facebook_clientID}
              autoLoad={false}
              onFailure={failSocial}
              fields="picture, email, name"
              callback={this.responseFacebook}
              cssClass="ripple btn"
            />
            <GitHubLogin
              clientId={github_clientID}
              redirectUri=""
              buttonText="GitHub"
              onSuccess={this.responseGitHub}
              onFailure={failSocial}
              className="ripple btn"
            />
          </div>
        ) : (
          <CircularProgress />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authorization: state.authorization,
    configuration: state.configuration
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginInSystem: bindActionCreators(AuthorizationActions.loginInSystem, dispatch),
    failSocial: bindActionCreators(AuthorizationActions.failSocial, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ThroughSocialNetwork);
