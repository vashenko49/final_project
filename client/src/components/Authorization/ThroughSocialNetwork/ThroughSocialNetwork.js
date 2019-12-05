import React, {Component} from 'react';
import SocialID from '../../../config/idSocialNetworks';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import GitHubLogin from 'react-github-login';
import Grid from "@material-ui/core/Grid";

class ThroughSocialNetwork extends Component {
  constructor(props) {
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
  }
  responseGoogle= (res)=>{
    console.log(res);
  };
  render() {
    return (
      <Grid  container
             direction="column"
             justify="center"
             alignItems="center">
        <GoogleLogin
          clientId={SocialID.oauth.google}
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
      </Grid>
    );
  }
}

export default ThroughSocialNetwork;
