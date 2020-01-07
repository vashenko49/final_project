import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

export const Stars = stars => {
  const [value] = React.useState(stars.stars);

  return (
    <Box component="fieldset" mb={3} borderColor="transparent">
      <Rating name="read-only" value={value} readOnly />
    </Box>
  );
};

export const StarsChange = ({ setRate }) => {
  const [value, setValue] = React.useState(0);

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            setRate(newValue);
          }}
        />
      </Box>
    </div>
  );
};
