import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1)
    },
    padding: theme.spacing(3, 0, 0)
  },
  input: {
    display: 'none'
  },
  upload: {
    width: 150,
    height: 150,
    backgroundColor: theme.palette.background.paper
  },
  card: {
    '&:hover': {
      boxShadow: theme.shadows[5]
    },
    position: 'relative',
    boxSizing: 'border-box',
    cursor: 'pointer',
    width: 150,
    height: 150,
    padding: theme.spacing(1, 5, 1, 5),
    backgroundColor: theme.palette.background.default
  },
  media: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  btnDelete: {
    position: 'absolute',
    right: 0,
    top: 0
  }
});

const ProductsDetailMainImages = ({ classes, onChangeValue, images }) => {
  console.log(images);
  return (
    <form autoComplete="off" className={classes.form}>
      <input
        accept="image/*"
        id="images"
        multiple
        type="file"
        className={classes.input}
        onChange={e => onChangeValue('images', e.currentTarget.files)}
      />
      <label htmlFor="images">
        <Button
          className={classes.upload}
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>
      </label>

      {images.map((i, index) => (
        <Card className={classes.card} key={index}>
          <IconButton aria-label="delete" className={classes.btnDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
          <CardMedia component="img" className={classes.media} image={URL.createObjectURL(i)} />
        </Card>
      ))}
    </form>
  );
};

ProductsDetailMainImages.propTypes = {
  classes: PropTypes.object.isRequired,
  images: PropTypes.array.isRequired,
  onChangeValue: PropTypes.func.isRequired
};

ProductsDetailMainImages.defaultProps = {
  classes: {},
  images: [],
  onChangeValue: () => {}
};

export default withStyles(styles)(ProductsDetailMainImages);
