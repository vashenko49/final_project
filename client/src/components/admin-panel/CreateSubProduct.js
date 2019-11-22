import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const styles = theme => ({
  paper: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2)
  },
  input: {
    display: 'none'
  },
  delete: {
    position: 'absolute',
    right: 0,
    top: 0
  },
  popover: {
    padding: theme.spacing(2)
  },
  colorBox: {
    boxShadow: theme.shadows[5],
    cursor: 'pointer'
  }
});

class CreateSubProduct extends Component {
  state = {
    colorProduct: 'black',
    anchorEl: null
  };

  handleClickColor = e => {
    this.setState({ colorProduct: e.currentTarget.dataset.color, anchorEl: null });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { colors, sizes, classes, onClickDeleteCard, dataKey } = this.props;
    const { anchorEl, colorProduct } = this.state;

    const opopenPopover = Boolean(anchorEl);
    const id = opopenPopover ? 'simple-popover' : undefined;

    return (
      <Paper className={classes.paper}>
        <Box
          className={classes.delete}
          onClick={() => {
            onClickDeleteCard(dataKey);
          }}
        >
          <IconButton aria-label="delete">
            <DeleteIcon fontSize="small" color="error" />
          </IconButton>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box align="center">
              <Avatar
                className={classes.colorBox}
                id="color"
                size="small"
                style={{ backgroundColor: colorProduct }}
                onClick={this.handleClick}
              ></Avatar>
              <Popover
                id={id}
                open={opopenPopover}
                anchorEl={anchorEl}
                onClose={this.handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}
              >
                <Grid container spacing={4} className={classes.popover}>
                  {colors.map(color => (
                    <Grid key={color.title} item xs={2}>
                      <Avatar
                        className={classes.colorBox}
                        size="small"
                        data-color={color.title}
                        style={{ backgroundColor: color.title }}
                        onClick={this.handleClickColor}
                      ></Avatar>
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
                <>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {sizes.title}
                </>
              )}
              renderInput={params => (
                <TextField {...params} variant="outlined" label="Sizes" fullWidth />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <input
              accept="image/*"
              className={classes.input}
              id="button-file"
              multiple
              type="file"
            />
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
}

CreateSubProduct.propTypes = {
  colors: PropTypes.array,
  sizes: PropTypes.array,
  classes: PropTypes.object.isRequired,
  onClickDeleteCard: PropTypes.func.isRequired,
  dataKey: PropTypes.number.isRequired
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

export default withStyles(styles)(CreateSubProduct);
