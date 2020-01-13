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

const FiltersDetailForm = ({
  classes,
  title,
  titleError,
  serviceName,
  serviceNameError,
  subFilters,
  subFiltersError,
  onChangeValue,
  onSubmitForm,
  onSubmitFormDisabled
}) => (
  <form autoComplete="off" className={classes.form}>
    <FormControl margin="normal">
      <TextField
        error={titleError}
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
        error={serviceNameError}
        required
        id="serviceName"
        label="Service name"
        variant="outlined"
        value={serviceName}
        onChange={e => onChangeValue(e.target.id, e.currentTarget.value)}
      />
    </FormControl>

    <FormControl margin="normal">
      <Autocomplete
        multiple
        id="subFilters"
        freeSolo
        value={subFilters}
        onChange={(e, newValue) => onChangeValue('subFilters', newValue)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={params => (
          <TextField
            required
            error={subFiltersError}
            {...params}
            variant="outlined"
            label="Filters"
            placeholder="Enter new sub filter"
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

FiltersDetailForm.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  titleError: PropTypes.bool.isRequired,
  serviceNameError: PropTypes.bool.isRequired,
  serviceName: PropTypes.string.isRequired,
  subFiltersError: PropTypes.bool.isRequired,
  subFilters: PropTypes.array.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  onSubmitFormDisabled: PropTypes.bool.isRequired
};

FiltersDetailForm.defaultProps = {
  classes: {},
  title: '',
  titleError: false,
  serviceName: '',
  serviceNameError: false,
  subFilters: [],
  subFiltersError: false,
  onChangeValue: () => {},
  onSubmitForm: () => {},
  onSubmitFormDisabled: true
};

export default withStyles(styles)(FiltersDetailForm);
