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
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import InputAdornment from '@material-ui/core/InputAdornment';
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

class Old_CreateSubProduct extends Component {
  state = {
    colorProduct: {},
    anchorEl: null,
    filesName: ''
  };

  handleClickColor = (dataKey, color, onChangeSubCards) => {
    this.setState({ colorProduct: color, anchorEl: null });

    onChangeSubCards(dataKey, 'color', color);
  };

  onChangeValue = (dataKey, val, name, onChangeSubCards) => {
    onChangeSubCards(dataKey, name, val);
  };

  onChangeImages = (dataKey, e, onChangeSubCards) => {
    const { files } = e.currentTarget;
    const nameFiles = [];

    for (let i = 0; i < files.length; i++) {
      nameFiles.push(files[i].name);
    }

    this.setState({ filesName: nameFiles.toString().replace(/,/gi, ', ') });

    onChangeSubCards(dataKey, 'images', files);
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {
      colors,
      sizes,
      classes,
      onClickDeleteCard,
      dataKey,
      lastCard,
      onChangeSubCards
    } = this.props;
    const { anchorEl, colorProduct, filesName } = this.state;

    const opopenPopover = Boolean(anchorEl);
    const id = opopenPopover ? 'simple-popover' : undefined;

    return (
      <Paper className={classes.paper}>
        {lastCard === 'true' ? null : (
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
        )}

        <Box margin="normal" align="center">
          <Avatar
            className={classes.colorBox}
            id="color"
            size="small"
            style={{ backgroundColor: colorProduct.title }}
            onClick={this.handleClick}
          />
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
                    style={{ backgroundColor: color.title }}
                    onClick={() => this.handleClickColor(dataKey, color, onChangeSubCards)}
                  ></Avatar>
                </Grid>
              ))}
            </Grid>
          </Popover>
        </Box>

        <FormControl fullWidth margin="normal">
          <Autocomplete
            multiple
            id="sizes"
            options={sizes}
            disableCloseOnSelect
            onChange={(e, val) => this.onChangeValue(dataKey, val, 'sizes', onChangeSubCards)}
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
        </FormControl>

        <FormControl margin="normal" fullWidth>
          <TextField
            type="number"
            id="quantity"
            label="Quantity"
            variant="outlined"
            onChange={e => {
              this.onChangeValue(dataKey, e.currentTarget.value, 'quantity', onChangeSubCards);
            }}
          />
        </FormControl>

        <FormControl margin="normal" fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={60}
            onChange={e => {
              this.onChangeValue(dataKey, e.currentTarget.value, 'amount', onChangeSubCards);
            }}
          />
        </FormControl>

        <FormControl margin="normal">
          <input
            accept="image/*"
            className={classes.input}
            id={dataKey}
            multiple
            type="file"
            onChange={e => {
              this.onChangeImages(dataKey, e, onChangeSubCards);
            }}
          />
          <label htmlFor={dataKey}>
            <Button
              variant="contained"
              color="default"
              startIcon={<CloudUploadIcon />}
              component="span"
            >
              Upload
            </Button>
          </label>
          <Typography color="textSecondary" variant="caption">
            {filesName}
          </Typography>
        </FormControl>
      </Paper>
    );
  }
}

Old_CreateSubProduct.propTypes = {
  colors: PropTypes.array,
  sizes: PropTypes.array,
  classes: PropTypes.object.isRequired,
  onClickDeleteCard: PropTypes.func.isRequired,
  dataKey: PropTypes.number.isRequired,
  lastCard: PropTypes.string.isRequired,
  onChangeSubCards: PropTypes.func.isRequired
};

Old_CreateSubProduct.defaultProps = {};

export default withStyles(styles)(Old_CreateSubProduct);
