import React from 'react';
import Grid from '@material-ui/core/Grid';

const Row = ({ left, right }) => (
  <Grid container>
    <Grid item xs={12} sm={6}>
      {left}
    </Grid>
    <Grid item xs={12} sm={6}>
      {right}
    </Grid>
  </Grid>
);

export default Row;
