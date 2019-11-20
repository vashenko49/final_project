import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Popover from '@material-ui/core/Popover';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  input: {
    display: 'none'
  }
}));

export default function CreateSubProduct({ colors, sizes }) {
  const classes = useStyles();

  const [colorProduct, setColorProduct] = React.useState('black');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const opopenPopover = Boolean(anchorEl);
  const id = opopenPopover ? 'simple-popover' : undefined;

  const handleClickColor = e => {
    setAnchorEl(null);
    setColorProduct(e.currentTarget.dataset.color);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper className={classes.paper}>
      <Box display="flex" justifyContent="flex-end">
        <IconButton aria-label="delete">
          <DeleteIcon fontSize="small" color="error" />
        </IconButton>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box align="center">
            <Fab
              id="color"
              size="small"
              style={{ backgroundColor: colorProduct }}
              onClick={handleClick}
            >
              {null}
            </Fab>
            <Popover
              id={id}
              open={opopenPopover}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
            >
              <Grid container spacing={1}>
                {colors.map(color => (
                  <Grid key={color.title} item xs={3}>
                    <Fab
                      size="small"
                      data-color={color.title}
                      style={{ backgroundColor: color.title }}
                      onClick={handleClickColor}
                    ></Fab>
                  </Grid>
                ))}
              </Grid>
            </Popover>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            multiple
            id="sizes"
            options={sizes}
            disableCloseOnSelect
            getOptionLabel={sizes => sizes.title}
            renderOption={(sizes, { selected }) => (
              <React.Fragment>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {sizes.title}
              </React.Fragment>
            )}
            renderInput={params => (
              <TextField {...params} variant="outlined" label="Sizes" fullWidth />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <input accept="image/*" className={classes.input} id="button-file" multiple type="file" />
          <label htmlFor="button-file">
            <Button
              variant="contained"
              color="default"
              startIcon={<CloudUploadIcon />}
              component="span"
            >
              Upload
            </Button>
          </label>
        </Grid>
      </Grid>
    </Paper>
  );
}

CreateSubProduct.propTypes = {
  colors: PropTypes.array,
  sizes: PropTypes.array
};

CreateSubProduct.defaultProps = {
  colors: [
    { title: 'red' },
    { title: 'yellow' },
    { title: 'green' },
    { title: 'white' },
    { title: 'black' }
  ],
  sizes: [
    { title: '40' },
    { title: '41' },
    { title: '42' },
    { title: '43' },
    { title: '44' },
    { title: '45' }
  ]
};
