import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';

import Autocomplete from '@material-ui/lab/Autocomplete';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3, 0, 0)
  },
  heading: {
    margin: 'auto 0',
    padding: theme.spacing(0, 0, 0, 2),
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  subFilters: {
    display: 'flex',
    flexDirection: 'column'
  }
});

const ProductsDetailModels = ({
  classes,
  models,
  dataFilters,
  mainFilters,
  onChangeValue,
  onClickDeleteModel,
  onAddNewModel
}) => (
  <form autoComplete="off" className={classes.form}>
    {models.map(item => (
      <ExpansionPanel
        key={item.id}
        defaultExpanded={!(item.quantity && item.price && item.subFilters.length)}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id={item.id}
        >
          {models.length > 1 ? (
            <IconButton
              aria-label="delete"
              datakey={item.id}
              onClick={() => onClickDeleteModel(item.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          ) : null}

          <Typography className={classes.heading}>{`Quantity: ${item.quantity}`}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.subFilters}>
          <FormControl margin="normal" fullWidth>
            <Autocomplete
              id={`modelsSubFilter${item.id}`}
              options={dataFilters
                .filter(i => !mainFilters.map(i => i.parentId).includes(i.parentId))
                .filter(
                  i =>
                    !models
                      .map(i => i.subFilters)
                      .reduce((flat, current) => flat.concat(current), [])
                      .includes(i)
                )}
              groupBy={option => option.parentServiceName}
              getOptionLabel={option => option.name}
              value={item.subFilters}
              filterSelectedOptions
              disableCloseOnSelect
              multiple
              onChange={(e, val) => onChangeValue('subFilters', val, item.id)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option.name} {...getTagProps({ index })} />
                ))
              }
              renderInput={params => (
                <TextField
                  required
                  error={!item.subFilters.length}
                  {...params}
                  variant="outlined"
                  label="Filters"
                  placeholder="Choose..."
                  fullWidth
                />
              )}
            />
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <TextField
              error={!item.quantity.length}
              required
              type="number"
              id={`quantity${item.id}`}
              label="Quantity"
              variant="outlined"
              value={item.quantity}
              onChange={e => onChangeValue('quantity', e.target.value, item.id)}
            />
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <TextField
              error={!item.price.length}
              required
              type="number"
              id={`price${item.id}`}
              label="Price"
              variant="outlined"
              value={item.price}
              onChange={e => onChangeValue('price', e.target.value, item.id)}
            />
          </FormControl>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ))}
    <Button
      variant="text"
      color="primary"
      size="small"
      onClick={onAddNewModel}
      startIcon={<AddIcon />}
    >
      Add new model
    </Button>
  </form>
);

ProductsDetailModels.propTypes = {
  classes: PropTypes.object.isRequired,
  models: PropTypes.array.isRequired,
  dataFilters: PropTypes.array.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  onClickDeleteModel: PropTypes.func.isRequired,
  onAddNewModel: PropTypes.func.isRequired
};

ProductsDetailModels.defaultProps = {
  classes: {},
  models: [],
  dataFilters: [],
  onChangeValue: () => {},
  onClickDeleteModel: () => {},
  onAddNewModel: () => {}
};

export default withStyles(styles)(ProductsDetailModels);
