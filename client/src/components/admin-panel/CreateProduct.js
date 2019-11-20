import React from 'react';
import PropTypes from 'prop-types';

import CreateSubProduct from './CreateSubProduct';

import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

export default function CreateProduct({ open, handleOpen, brands, categories }) {
  const classes = useStyles();

  const [subCards, setSubCards] = React.useState([
    <Grid item xs={4} key="1">
      <CreateSubProduct />
    </Grid>
  ]);

  const onClickNewCard = () => {
    setSubCards([
      ...subCards,
      <Grid item xs={4} key={subCards.length}>
        <CreateSubProduct />
      </Grid>
    ]);
  };

  const onClickCreateProduct = () => {};

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={open}
      onClose={handleOpen}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle align="center" id="form-dialog-title">
        Create New Product
      </DialogTitle>
      <DialogContent>
        <form autoComplete="off" className={classes.form}>
          <Typography align="center" variant="h5" component="h2" color="primary"></Typography>

          <FormControl margin="normal">
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          </FormControl>

          <FormControl margin="normal">
            <TextField
              id="outlined-textarea"
              label="Description"
              placeholder="Input max desctiption for products"
              multiline
              variant="outlined"
            />
          </FormControl>

          <FormControl margin="normal">
            <Autocomplete
              id="brands"
              options={brands}
              getOptionLabel={brands => brands.title}
              style={{ width: 300 }}
              renderInput={params => (
                <TextField {...params} label="Brand" variant="outlined" fullWidth />
              )}
            />
          </FormControl>

          <FormControl margin="normal">
            <Autocomplete
              id="categories"
              options={categories}
              groupBy={categories => categories.title}
              getOptionLabel={categories => categories.subtitle}
              style={{ width: 300 }}
              renderInput={params => (
                <TextField {...params} label="Categories" variant="outlined" fullWidth />
              )}
            />
          </FormControl>

          <FormControl margin="normal">
            <Grid container spacing={4}>
              {subCards}
            </Grid>

            <Box margin="15px auto">
              <Button onClick={onClickNewCard} color="primary" startIcon={<AddIcon />}>
                Add new card
              </Button>
            </Box>
          </FormControl>

          <DialogActions>
            <Button onClick={onClickCreateProduct} variant="contained" color="primary">
              Craete
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

CreateProduct.propTypes = {
  brands: PropTypes.array,
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

CreateProduct.defaultProps = {
  brands: [{ title: 'Бренд 1' }, { title: 'Бренд 2' }],
  categories: [
    { title: 'Категория 1', subtitle: 'Подкатегория 1' },
    { title: 'Категория 2', subtitle: 'Подкатегория 2' }
  ],
  open: false,
  handleClose: () => {}
};
