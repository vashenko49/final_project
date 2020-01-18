import React, { Component } from 'react';
import _ from 'lodash';
import ProductAPI from '../../../services/ProductAPI';
import Grid from '@material-ui/core/Grid';
import MiniProduct from '../../MiniProduct/MiniProduct';
import { Typography } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import './LastViewProduct.scss';

class LastViewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastProduct: []
    };
  }

  componentDidMount() {
    this.loadLastProduct();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { id: newId } = this.props;
    const { id: oldId } = prevProps;
    if (newId.toString() !== oldId.toString()) {
      this.loadLastProduct();
    }
  }

  loadLastProduct = () => {
    const { getProductsById } = this;
    const { id } = this.props;
    let lastView = JSON.parse(localStorage.getItem('lastView'));
    if (!_.isArray(lastView)) {
      localStorage.setItem('lastView', JSON.stringify([id]));
      lastView = [];
    }
    if (lastView.length > 0) {
      const selectProduct = _.findIndex(lastView, function(o) {
        return o.toString() === id.toString();
      });
      if (selectProduct < 0) {
        getProductsById(lastView).then(res => {
          this.setState({ lastProduct: res });
        });
        lastView.push(id);
        if (lastView.length > 5) {
          lastView.shift();
        }
        localStorage.setItem('lastView', JSON.stringify(lastView));
      } else {
        lastView.splice(selectProduct, 1);
        getProductsById(lastView).then(res => {
          this.setState({ lastProduct: res });
        });
      }
    }
  };

  getProductsById = array => {
    return Promise.all(
      array.map(async item => {
        return await ProductAPI.getCurrentProduct(item);
      })
    );
  };

  render() {
    const { lastProduct } = this.state;
    const { className } = this.props;
    return (
      <div
        className={`last-view-product-container ${
          _.isString(className) && className.length > 0 ? className : ''
        }`}
      >
        {lastProduct.length > 0 && (
          <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant={'h4'}>Last view</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container spacing={3} direction="row" justify="flex-start" alignItems="center">
                {lastProduct.map(product => {
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
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}
      </div>
    );
  }
}

export default LastViewProduct;
