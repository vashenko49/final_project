import React, { Component } from 'react';
import CatalogAPI from '../../services/CatalogAPI';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import './CatalogOnMainPage.scss';
import Box from '@material-ui/core/Box';
import MiniProduct from '../MiniProduct/MiniProduct';

class CatalogOnMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    CatalogAPI.getCategoriesForPreview().then(res => {
      this.setState({ categories: res });
    });
  }

  render() {
    const { categories } = this.state;

    return categories.length === 0 ? (
      <Grid container justify="center" alignItems="center">
        <CircularProgress />
      </Grid>
    ) : (
      <Container>
        {categories.map(element => {
          const { name, products, _id } = element;
          return (
            <Box my={6} key={_id}>
              <Grid container>
                <Grid container justify={'space-between'} alignItems={'baseline'}>
                  <Grid item lg={11} md={11} sm={11} xs={12}>
                    <Typography className="title-main-catalog" variant={'h3'}>
                      {name}
                    </Typography>
                  </Grid>
                  <Grid item lg={1} md={1} sm={1} xs={12}>
                    <Box mb={6} display={'flex'} justifyContent="flex-end">
                      <Link className="see-all" to={`/catalog/${_id}`}>
                        See all
                      </Link>
                    </Box>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={3}
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  {products.map(product => {
                    const { productUrlImg, filterImg, nameProduct, _id, model } = product;
                    return (
                      <Grid key={_id} item lg={3} md={6} sm={6} xs={12}>
                        <MiniProduct
                          _id={_id}
                          nameProduct={nameProduct}
                          filterImg={filterImg}
                          productUrlImg={productUrlImg}
                          model={model}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Box>
          );
        })}
      </Container>
    );
  }
}

export default CatalogOnMainPage;
