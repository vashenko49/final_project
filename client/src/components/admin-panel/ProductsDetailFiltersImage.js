import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  input: {
    display: 'none'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    '&:hover': {
      boxShadow: theme.shadows[5]
    },
    position: 'relative',
    boxSizing: 'border-box',
    width: '35%',
    padding: theme.spacing(1, 5, 1, 5),
    backgroundColor: theme.palette.background.default
  },
  upload: { textAlign: 'center' },
  media: {
    height: '150px',
    objectFit: 'contain'
  },
  btnDelete: {
    position: 'absolute',
    right: 0,
    top: 0
  }
});

const ProductsDetailFiltersImage = ({
  classes,
  onChangeValue,
  images,
  onDeleteFiltersImage,
  onDeleteImage,
  dataFilters,
  filtersImage
}) => {
  console.log(dataFilters);
  return (
    <form autoComplete="off" className={classes.form}>
      {filtersImage.map(card => (
        <Card className={classes.card} key={card.id}>
          <IconButton
            aria-label="delete"
            className={classes.btnDelete}
            onClick={() => onDeleteFiltersImage(card.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
          {card.image ? (
            <CardMedia
              component="img"
              className={classes.media}
              image={URL.createObjectURL(card.image)}
            />
          ) : (
            <>
              <input
                accept="image/*"
                id={`filtersImage${card.id}`}
                type="file"
                className={classes.input}
                onChange={e => onChangeValue('filtersImage', e.target, card.id)}
              />
              <label htmlFor={`filtersImage${card.id}`} className={classes.upload}>
                <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
                  Upload
                </Button>
              </label>
            </>
          )}

          <FormControl margin="normal" fullWidth>
            <Autocomplete
              id={`filtersImageSubFilter${card.id}`}
              options={[].concat(...dataFilters.map(i => i.filter._idSubFilters))}
              getOptionLabel={option => option}
              defaultValue={card.subFilter}
              // getOptionDisabled={option =>
              //   !!(mainFilters && mainFilters.find(i => i._id === option._id))
              // }
              filterSelectedOptions
              onChange={(e, val) => onChangeValue('filtersImageSubFilter', val, card.id)}
              renderInput={params => (
                <TextField
                  required
                  // error={!mainFilters.length}
                  {...params}
                  variant="outlined"
                  label="Sub Filter"
                  placeholder="Choose sub filter"
                  fullWidth
                />
              )}
            />
          </FormControl>
        </Card>
      ))}
    </form>
  );
};

ProductsDetailFiltersImage.propTypes = {
  // classes: PropTypes.object.isRequired,
  // images: PropTypes.array.isRequired,
  // onChangeValue: PropTypes.func.isRequired
};

ProductsDetailFiltersImage.defaultProps = {
  // classes: {},
  // images: [],
  // onChangeValue: () => {}
};

export default withStyles(styles)(ProductsDetailFiltersImage);
