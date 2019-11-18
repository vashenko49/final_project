import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    border: '1px solid #ccc'
  },
  submit: {
    width: '30%',
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#000',
    color: '#fff'
  }
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <Container>
      <CssBaseline />
      <div className={classes.card}>
        <Typography component="h1" variant="h5">
          New Customer
        </Typography>
        <h4>Register</h4>
        <p>
          By creating an account you will be able to shop faster, be up to date on an order's
          status, and keep track of the orders you have previously made.
        </p>
        <Button type="submit" variant="contained" className={classes.submit}>
          Continue
        </Button>
      </div>
    </Container>
  );
}
