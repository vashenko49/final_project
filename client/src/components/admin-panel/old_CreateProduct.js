import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import CreateSubProduct from './old_CreateSubProduct';

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

class Old_CreateProduct extends Component {
  state = {
    title: '',
    description: '',
    brands: '',
    categories: '',
    subCards: [
      {
        id: new Date().getTime(),
        color: '',
        sizes: [],
        quantity: '',
        amount: '',
        images: []
      }
    ]
  };

  onClickNewCard = () => {
    const { subCards } = this.state;

    this.setState({
      subCards: [
        ...subCards,
        { id: new Date().getTime(), color: '', sizes: [], quantity: '', amount: '', images: [] }
      ]
    });
  };

  onClickDeleteCard = dataKey => {
    const { subCards } = this.state;

    this.setState({
      subCards: subCards.filter(item => item.id !== dataKey)
    });
  };

  onChangeValue = (name, val) => {
    this.setState({ [name]: val });
  };

  onChangeSubCards = (id, name, val) => {
    const newSubCards = this.state.subCards.map(item => {
      if (item.id === id) {
        item[name] = val;
      }
      return item;
    });

    this.setState({
      subCards: newSubCards
    });
  };

  onSubmitForm = () => {};

  render() {
    const { classes, categories, brands, colors, sizes } = this.props;
    const { subCards, title, description } = this.state;

    console.log(this.state);

    return (
      <form autoComplete="off" className={classes.form} id="create-form">
        <Typography align="center" variant="h5" component="h2" color="primary"></Typography>

        <FormControl margin="normal">
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={title}
            onChange={e => this.onChangeValue('title', e.currentTarget.value)}
          />
        </FormControl>

        <FormControl margin="normal">
          <TextField
            id="outlined-textarea"
            label="Description"
            placeholder="Input max desctiption for products"
            multiline
            variant="outlined"
            value={description}
            onChange={e => this.onChangeValue('description', e.currentTarget.value)}
          />
        </FormControl>

        <FormControl margin="normal">
          <Autocomplete
            id="brands"
            options={brands}
            onChange={(e, val) => this.onChangeValue('brands', val)}
            getOptionLabel={brands => brands.title}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} label="brand" variant="outlined" fullWidth />
            )}
          />
        </FormControl>

        <FormControl margin="normal">
          <Autocomplete
            id="categories"
            options={categories}
            onChange={(e, val) => this.onChangeValue('categories', val)}
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
            {subCards.map(it => (
              <Grid item xs={4} key={it.id}>
                <CreateSubProduct
                  lastCard={subCards.length === 1 ? 'true' : 'false'}
                  onClickDeleteCard={this.onClickDeleteCard}
                  dataKey={it.id}
                  onChangeSubCards={this.onChangeSubCards}
                  colors={colors}
                  sizes={sizes}
                />
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
          <Button onClick={this.onSubmitForm} variant="contained" color="primary">
            Create
          </Button>
        </Box>
      </form>
    );
  }
}

Old_CreateProduct.propTypes = {
  brands: PropTypes.array
};

Old_CreateProduct.defaultProps = {
  brands: [
    { id: 1, title: 'Бренд 1' },
    { id: 2, title: 'Бренд 2' }
  ],
  categories: [
    { id: 1, title: 'Категория 1', subtitle: 'Подкатегория 1' },
    { id: 2, title: 'Категория 2', subtitle: 'Подкатегория 2' }
  ],
  colors: [
    { id: 1, title: 'red' },
    { id: 2, title: 'yellow' },
    { id: 3, title: 'green' },
    { id: 4, title: 'white' },
    { id: 5, title: 'black' }
  ],
  sizes: [
    { id: 1, title: '40' },
    { id: 2, title: '41' },
    { id: 3, title: '42' },
    { id: 4, title: '43' },
    { id: 5, title: '44' },
    { id: 6, title: '45' }
  ]
};

export default withStyles(styles)(Old_CreateProduct);
