import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MiniProduct from '../../MiniProduct/MiniProduct';
import FavouritesAPI from '../../../services/FavouritesAPI';
import ClearIcon from '@material-ui/icons/Clear';

import './Favourites.scss';
import CircularProgress from '@material-ui/core/CircularProgress';

class Favourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      load: false
    };
  }

  componentDidMount() {
    const { getFavourites } = this;
    getFavourites();
  }

  onClickRemove = event => {
    const { getFavourites } = this;
    this.setState({ load: true });
    FavouritesAPI.removeFromFavourites(event.currentTarget.dataset.id).then(() => {
      getFavourites();
    });
  };

  getFavourites = () => {
    FavouritesAPI.getFavourites().then(res => {
      this.setState({ products: res.idProduct, load: false });
    });
  };

  render() {
    const { onClickRemove } = this;
    const { products, load } = this.state;
    return (
      <div className="favourite-block-container">
        <Grid container spacing={3} direction="row" alignItems="center">
          {products.map(product => {
            const { productUrlImg, filterImg, nameProduct, _id, model } = product;
            return (
              <Grid key={_id} item lg={3} md={6} sm={6} xs={12}>
                <div className="container-product">
                  <MiniProduct
                    _id={_id}
                    nameProduct={nameProduct}
                    filterImg={filterImg}
                    productUrlImg={productUrlImg}
                    model={model}
                  />
                  <ClearIcon onClick={onClickRemove} data-id={_id} className="close-icon" />
                </div>
              </Grid>
            );
          })}
        </Grid>
        {load && (
          <div className="favourite-block">
            <CircularProgress disableShrink className="favourite-block-preloader" />
          </div>
        )}
      </div>
    );
  }
}

export default Favourites;
