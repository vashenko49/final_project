import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';

import SaveIcon from '@material-ui/icons/Save';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3, 0, 0)
  }
});

const SliderDetailForm = ({
  classes,
  title,
  description,
  product,
  onChangeValue,
  onSubmitForm,
  onSubmitFormDisabled
}) => (
  <form autoComplete="off" className={classes.form}>
    <FormControl margin="normal">
      <TextField
        error={!title.length}
        required
        id="title"
        label="Title"
        variant="outlined"
        value={title}
        onChange={e => onChangeValue(e.currentTarget.id, e.currentTarget.value)}
      />
    </FormControl>

    <FormControl margin="normal">
      <TextField
        error={!description.length}
        required
        id="description"
        label="Description"
        variant="outlined"
        value={description}
        onChange={e => onChangeValue(e.target.id, e.currentTarget.value)}
      />
    </FormControl>

    <FormControl margin="normal">
      <Autocomplete
        id="product"
        value={product}
        onChange={(e, newValue) => onChangeValue('product', newValue)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={params => (
          <TextField
            {...params}
            required
            error={product.length}
            variant="outlined"
            label="Product"
            placeholder="Enter product"
            fullWidth
          />
        )}
      />
    </FormControl>

    <FormControl margin="normal" align="right">
      <Box>
        <Button
          disabled={onSubmitFormDisabled}
          onClick={onSubmitForm}
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </Box>
    </FormControl>
  </form>
);

SliderDetailForm.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  onSubmitFormDisabled: PropTypes.bool.isRequired
};

SliderDetailForm.defaultProps = {
  classes: {},
  title: '',
  description: '',
  product: '',
  onChangeValue: () => {},
  onSubmitForm: () => {},
  onSubmitFormDisabled: true
};

export default withStyles(styles)(SliderDetailForm);
