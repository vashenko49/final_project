import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

import Autocomplete from '@material-ui/lab/Autocomplete';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  form: {
    padding: theme.spacing(1),
    display: 'flex',
    // justifyContent: 'space-between',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: 'none'
  },
  upload: {
    width: 200,
    height: 200,
    backgroundColor: theme.palette.background.paper
  },
  reload: { textAlign: 'center' },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    '&:hover': {
      boxShadow: theme.shadows[5]
    },
    position: 'relative',
    boxSizing: 'border-box',
    width: 200,
    height: 200,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default
  },
  mediaWrapper: {
    height: '50%',
    padding: theme.spacing(0, 4),
    display: 'inline-block'
  },
  media: {
    height: '100%',
    objectFit: 'contain'
  },
  btnDelete: {
    position: 'absolute',
    right: 0,
    top: 0
  },
  btnReload: {
    position: 'absolute',
    left: 0,
    top: 0
  }
});

const ProductsDetailMainImages = ({
  classes,
  onChangeValue,
  filtersImage,
  onDeleteCardImg,
  dataFilters
}) => {
  return (
    <form autoComplete="off" className={classes.form}>
      <input
        accept="image/*"
        id="filtersImage"
        multiple
        type="file"
        className={classes.input}
        onChange={e => onChangeValue('filtersImage', e.currentTarget)}
      />
      <label htmlFor="filtersImage">
        <Button
          className={classes.upload}
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>
      </label>

      {filtersImage &&
        filtersImage.map(card => (
          <Card className={classes.card} key={card.id}>
            <input
              accept="image/*"
              id={`filtersImageReload${card.id}`}
              type="file"
              className={classes.input}
              onChange={e => onChangeValue('filtersImageReload', e.currentTarget, card.id)}
            />
            <label htmlFor={`filtersImageReload${card.id}`}>
              <IconButton aria-label="reload" className={classes.btnReload} component="span">
                <CloudUploadIcon fontSize="small" />
              </IconButton>
            </label>

            <IconButton
              aria-label="delete"
              className={classes.btnDelete}
              onClick={() => onDeleteCardImg(card.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>

            <Box className={classes.mediaWrapper}>
              <CardMedia
                component="img"
                className={classes.media}
                image={URL.createObjectURL(card.image)}
              />
            </Box>

            <Autocomplete
              id={`filtersImageSubFilter${card.id}`}
              options={dataFilters}
              groupBy={option => option.parentServiceName}
              getOptionLabel={option => (option.name ? option.name : '')}
              value={card.subFilter}
              // getOptionDisabled={option =>
              //   !!(mainFilters && mainFilters.find(i => i._id === option._id))
              // }
              filterSelectedOptions
              onChange={(e, val) => onChangeValue('filtersImageSubFilter', val, card.id)}
              renderInput={params => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Sub Filter"
                  placeholder="Choose..."
                  fullWidth
                />
              )}
            />
          </Card>
        ))}
    </form>
  );
};

ProductsDetailMainImages.propTypes = {
  classes: PropTypes.object.isRequired,
  filtersImage: PropTypes.array.isRequired,
  onChangeValue: PropTypes.func.isRequired
};

ProductsDetailMainImages.defaultProps = {
  classes: {},
  filtersImage: [],
  onChangeValue: () => {}
};

export default withStyles(styles)(ProductsDetailMainImages);
