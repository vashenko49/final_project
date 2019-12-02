import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';

import SaveIcon from '@material-ui/icons/Save';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3, 0, 0)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  childCtaegory: {
    display: 'flex',
    flexDirection: 'column'
  }
});

const CategoriesDetailForm = ({
  classes,
  rootCategory,
  childCategory,
  filtersData,
  onChangeValue,
  onAddChildCategory,
  onSubmitForm,
  onSubmitFormDisabled
}) => (
  <form autoComplete="off" className={classes.form}>
    <FormControl margin="normal">
      <TextField
        error={!rootCategory}
        required
        id="rootCategory"
        label="Main category"
        variant="outlined"
        value={rootCategory}
        onChange={e => onChangeValue(e.currentTarget.id, e.currentTarget.value)}
      />
    </FormControl>

    <FormControl margin="normal" className={classes.root}>
      <Box mb={1}>
        <Typography align="center" className={classes.heading}>
          Child category
        </Typography>
      </Box>

      {childCategory.map(item => (
        <ExpansionPanel key={item.id} defaultExpanded={!(item.name && item.filters.length)}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id={item.id}
          >
            <Typography className={classes.heading}>
              {item.name || 'enter child caterory'}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.childCtaegory}>
            <FormControl margin="normal" fullWidth>
              <TextField
                error={!item.name}
                required
                id="childCategory"
                inputProps={{ dataKey: item.id }}
                label="child category"
                variant="outlined"
                value={item.name ? item.name : ''}
                onChange={e =>
                  onChangeValue(e.target.id, e.target.value, e.target.getAttribute('dataKey'))
                }
              />
            </FormControl>

            <FormControl fullWidth>
              <Autocomplete
                multiple
                id="filters"
                inputProps={{ asd: 'asd' }}
                freeSolo
                options={filtersData}
                getOptionLabel={option => option.serviceName}
                value={item.filters.map(i => (i.serviceName ? i.serviceName : i))}
                onChange={(e, newValue) => onChangeValue('filters', newValue)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option.serviceName}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={params => (
                  <TextField
                    required
                    error={!item.filters.length}
                    {...params}
                    variant="outlined"
                    label="Filters"
                    placeholder="Choose filter"
                    fullWidth
                  />
                )}
              />
            </FormControl>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
      <Button
        variant="text"
        color="primary"
        fullWidth={false}
        size="small"
        onClick={onAddChildCategory}
        startIcon={<AddIcon />}
      >
        Add child category
      </Button>
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
  childCategory: PropTypes.array.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  onSubmitFormDisabled: PropTypes.bool.isRequired
};

CategoriesDetailForm.defaultProps = {
  classes: {},
  rootCategory: '',
  filtersData: [],
  childCategory: [
    {
      id: 0,
      name: '',
      filters: [{ id: 0, serviceName: '' }]
    }
  ],
  onAddChildCategory: () => {},
  onChangeValue: () => {},
  onSubmitForm: () => {},
  onSubmitFormDisabled: true
};

export default withStyles(styles)(CategoriesDetailForm);
