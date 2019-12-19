import React, { Component } from 'react';

import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import MiniProduct from '../MiniProduct/MiniProduct';

class HeaderSearchProductPage extends Component {
  render() {
    return (
      <div>
        <Container>
          <Box my={6}>
            <Grid container>
              <Grid container spacing={3} direction="row" alignItems="center">
                {this.props.foundProducts.map(product => {
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
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    foundProducts: state.headerSearch.data,
    foundProductsError: state.headerSearch.error
  };
}

export default connect(mapStateToProps)(HeaderSearchProductPage);
