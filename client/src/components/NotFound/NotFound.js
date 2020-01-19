import React, { Component } from 'react';
import './NotFound.scss';
import { Typography } from '@material-ui/core';
class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <Typography variant={'h2'}>404</Typography>
        <Typography variant={'h6'}>We can't find the page you are looking for.</Typography>
        <Typography variant={'h6'}>Sorry for the inconvenience</Typography>
      </div>
    );
  }
}

export default NotFound;
