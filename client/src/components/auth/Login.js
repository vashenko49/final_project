import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

import SocialID from '../../config/idSocialNetworks';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import GitHubLogin from 'react-github-login';

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    border: '1px solid #ccc'
  },
  form: {
    width: '100%'
  },
  submit: {
    size: 'small',
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#000',
    color: '#fff'
  },
  link: {
    color: '#000',
    textDecoration: 'none'
  }
}));

const failSocial = response => {
  console.log(response);
};

const responseGoogle = response => {
  console.log(response);
  axios
    .post('/oauth/google', {
      access_token: response.accessToken
    })
    .then((req, res) => {
      console.log(req);
    });
};
const responseFacebook = response => {
  console.log(response);

  axios
    .post('/oauth/facebook', {
      access_token: response.accessToken,
      client_id: response.id
    })
    .then((req, res) => {
      console.log(req);
    });
};

const responseGitHub = response => {
  console.log(response);
  axios
    .post('/oauth/github', {
      code: response.code
    })
    .then((req, res) => {
      console.log(req);
    });
};
const registrationUser = () => {
  const newCustomer = {
    firstName: 'Customer',
    lastName: 'Newone',
    login: 'Customer',
    email: 'vashenko49@gmail.com',
    password: '1111111',
    telephone: '+380630000000',
    gender: 'male',
    isAdmin: true
  };

  axios
    .post('/oauth/customer', newCustomer)
    .then(savedCustomer => {
      console.log(savedCustomer);
    })
    .catch(err => {
      console.log(err);
    });
};

const loginCustomer = () => {
  const customer = {
    loginOrEmail: 'vashenko49@gmail.com',
    password: '1111111'
  };

  axios
    .post('/oauth/login', customer)
    .then(Customer => {
      console.log(Customer);
    })
    .catch(err => {
      console.log(err);
    });
};

export default function SignIn() {
  const classes = useStyles();

  return (
    <Container>
      <CssBaseline />
      <GoogleLogin
        clientId={SocialID.oauth.google.clientID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={failSocial}
        render={renderProps => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="btn btn-outline-primary"
          >
            Google
          </button>
        )}
        cookiePolicy={'single_host_origin'}
      />
      <FacebookLogin
        appId={SocialID.oauth.facebook.clientID}
        autoLoad={false}
        render={renderProps => (
          <button className="btn btn-primary" onClick={renderProps.onClick}>
            Facebook
          </button>
        )}
        fields="picture, email, name"
        callback={responseFacebook}
        cssClass="btn btn-outline-primary"
      />
      <GitHubLogin
        clientId={SocialID.oauth.github.clientID}
        redirectUri=""
        buttonText="GitHub"
        onSuccess={responseGitHub}
        onFailure={failSocial}
        className="btn btn-outline-primary"
      />
      <button onClick={registrationUser} className="btn btn-outline-primary">
        Regist template
      </button>
      <button onClick={loginCustomer} className="btn btn-outline-primary">
        Log in
      </button>
      <div className={classes.card}>
        <Typography component="h1" variant="h5">
          Returning Customer
        </Typography>
        <h4>I am a returning customer</h4>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Grid container>
            <Grid item xs>
              <Link href="#" className={classes.link}>
                Forgotten Password
              </Link>
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" className={classes.submit}>
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
}
