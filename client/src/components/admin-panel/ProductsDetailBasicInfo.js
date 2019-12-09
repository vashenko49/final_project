import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3, 0, 0)
  }
});

const ProductsDetailBasicInfo = classes => {
  return (
    <form autoComplete="off" className={classes.form}>
      <FormControl margin="normal" fullWidth>
        <TextField
          // error={titleError}
          required
          id="name"
          label="Name"
          variant="outlined"
          // value={title}
          // onChange={e => onChangeValue(e.currentTarget.id, e.currentTarget.value)}
        />
      </FormControl>

      <FormControl margin="normal" fullWidth>
        <TextField
          // error={titleError}
          required
          multiline
          rows="5"
          id="description"
          label="Description"
          variant="outlined"
          // value={title}
          // onChange={e => onChangeValue(e.currentTarget.id, e.currentTarget.value)}
        />
      </FormControl>

      <FormControl margin="normal" fullWidth>
        <Autocomplete
          id="categories"
          options={[1, 2, 3]}
          getOptionLabel={option => option}
          // defaultValue={filtersData.filter(i => item.filters.map(i => i.id).includes(i.id))}
          // onChange={(e, val) => onChangeValue('filters', val, item.id)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                // datakey={item.id}
                // label={option.serviceName}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={params => (
            <TextField
              required
              // error={item.filtersError}
              {...params}
              variant="outlined"
              label="Categories"
              placeholder="Choose category"
              fullWidth
            />
          )}
        />
      </FormControl>
    </form>
  );
};

export default withStyles(styles)(ProductsDetailBasicInfo);
