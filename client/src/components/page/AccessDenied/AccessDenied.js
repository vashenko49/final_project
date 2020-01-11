import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';

class AccessDenied extends Component {
  render() {
    return (
      <Container>
        <Typography variant={'h2'}>
          You do not have enough privileges to access this service.
        </Typography>
      </Container>
    );
  }
}

export default AccessDenied;
