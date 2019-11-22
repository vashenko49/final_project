import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import CreateSubProduct from './CreateSubProduct';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column'
  }
};

class CreateProduct extends Component {
  state = {
    subCards: [0]
  };

  onClickNewCard = () => {
    const { subCards } = this.state;

    this.setState({
      subCards: [...subCards, subCards.length - 1 + 1]
    });
  };

  onClickDeleteCard = dataKey => {
    this.setState({
      subCards: [...this.state.subCards].splice(dataKey, 1)
    });
  };

  onClickCreateProduct = () => {};

  render() {
    const { classes, categories, brands } = this.props;
    const { subCards } = this.state;

    return (
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
            {subCards.map(idx => (
              <Grid item xs={4} key={idx}>
                <CreateSubProduct onClickDeleteCard={this.onClickDeleteCard} dataKey={idx} />
              </Grid>
            ))}
          </Grid>

          <Box margin="15px auto">
            <Button onClick={this.onClickNewCard} color="primary" startIcon={<AddIcon />}>
              Add new card
            </Button>
          </Box>
        </FormControl>

        <Box align="right">
          <Button onClick={this.onClickCreateProduct} variant="contained" color="primary">
            Craete
          </Button>
        </Box>
      </form>
    );
  }
}

CreateProduct.propTypes = {
  brands: PropTypes.array
};

CreateProduct.defaultProps = {
  brands: [{ title: 'Бренд 1' }, { title: 'Бренд 2' }],
  categories: [
    { title: 'Категория 1', subtitle: 'Подкатегория 1' },
    { title: 'Категория 2', subtitle: 'Подкатегория 2' }
  ]
};

export default withStyles(styles)(CreateProduct);
