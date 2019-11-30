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

const CategoriesDetailForm = ({
  classes,
  rootCategory,
  rootCategoryError,
  childCategory,
  childCategoryError,
  dataFilters,
  checkFilters,
  checkFiltersError,
  onChangeValue,
  onSubmitForm,
  onSubmitFormDisabled
}) => (
  <form autoComplete="off" className={classes.form}>
    <FormControl margin="normal">
      <TextField
        error={rootCategoryError}
        required
        id="rootCategory"
        label="Main category"
        variant="outlined"
        value={rootCategory}
        onChange={e => onChangeValue(e.currentTarget.id, e.currentTarget.value)}
      />
    </FormControl>

    <FormControl margin="normal">
      <TextField
        error={childCategoryError}
        required
        id="childCategory"
        label="Service name"
        variant="outlined"
        value={childCategory}
        onChange={e => onChangeValue(e.target.id, e.currentTarget.value)}
      />
    </FormControl>

    <FormControl margin="normal">
      <Autocomplete
        multiple
        id="checkFilters"
        freeSolo
        options={dataFilters.map(option => option.serviceName)}
        value={checkFilters}
        onChange={(e, newValue) => onChangeValue('checkFilters', newValue)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={params => (
          <TextField
            required
            error={checkFiltersError}
            {...params}
            variant="outlined"
            label="Filters"
            placeholder="Choose filter"
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

CategoriesDetailForm.propTypes = {
  classes: PropTypes.object.isRequired,
  rootCategory: PropTypes.string.isRequired,
  rootCategoryError: PropTypes.bool.isRequired,
  childCategory: PropTypes.string.isRequired,
  childCategoryError: PropTypes.bool.isRequired,
  dataFilters: PropTypes.array.isRequired,
  checkFilters: PropTypes.array.isRequired,
  checkFiltersError: PropTypes.bool.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  onSubmitFormDisabled: PropTypes.bool.isRequired
};

CategoriesDetailForm.defaultProps = {
  classes: {},
  rootCategory: '',
  rootCategoryError: false,
  childCategory: '',
  childCategoryError: false,
  dataFilters: [],
  checkFilters: [],
  checkFiltersError: false,
  onChangeValue: () => {},
  onSubmitForm: () => {},
  onSubmitFormDisabled: true
};

export default withStyles(styles)(CategoriesDetailForm);
