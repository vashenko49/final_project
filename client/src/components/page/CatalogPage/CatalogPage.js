import React, { Component } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Pagination from 'material-ui-flat-pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';

import MiniProduct from '../../MiniProduct/MiniProduct';
import ProductAPI from '../../../services/ProductAPI';
import CatalogAPI from '../../../services/CatalogAPI';
import Filter from '../../Filter/Filter';
import './CatalogPage.scss';
import ListGrow from '../../common/listGrow/listGrow';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class CatalogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      load: true,
      loadProduct: true,
      breadcrumbs: ['Home'],
      currentNameCatalog: '',
      sortBy: 0,
      filters: [],
      products: [],
      totalDocs: 0,
      limit: 9,
      page: 1,
      offset: 0,
      priceCurrentCatalog: [0, 0],
      price: [0, 0],
      subfilters: [],
      panel: false,
      error: false
    };
  }

  componentDidMount() {
    const { id, limit, page } = this.state;
    this.setState({ load: false, loadProduct: false });
    CatalogAPI.getCatalogById(id).then(res => {
      this.setState(prevState => {
        return {
          load: true,
          breadcrumbs: [...prevState.breadcrumbs, res.parentId.name],
          currentNameCatalog: res.name,
          filters: res.filters.map(element => {
            return {
              ...element,
              subfilters: element.subfilters.map(sub => {
                return {
                  ...sub,
                  choose: false
                };
              })
            };
          })
        };
      });
      ProductAPI.getProductProductByFilter(id, limit, page, 0)
        .then(res => {
          const { docs, totalDocs, page } = res;
          const price = docs.length > 0 ? this.getMaxMinPrice(docs) : [0, 0];
          this.setState({
            products: docs,
            totalDocs: totalDocs,
            page: page,
            price: price,
            priceCurrentCatalog: price,
            loadProduct: true
          });
        })
        .catch(e => {
          this.setState({
            loadProduct: true,
            products: [],
            totalDocs: 0,
            page: 0,
            price: [0, 0],
            priceCurrentCatalog: [0, 0],
            error: true
          });
        });
    });
  }

  changePrice = newValue => {
    this.setState({ price: newValue });
  };
  getMaxMinPrice = product => {
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;

    product.forEach(prod => {
      prod.model.forEach(model => {
        let tmp = model.currentPrice;
        if (tmp < min) min = tmp;
        if (tmp > max) max = tmp;
      });
    });
    if (product.length <= 0) {
      min = 0;
      max = 0;
    }
    return [min, max];
  };
  convertSubFilterForServer = subfilters => {
    return subfilters.map(element => {
      return element._id;
    });
  };
  handleClickPagination = offset => {
    const { limit, sortBy, id, price, subfilters } = this.state;
    let page = Math.floor(offset / limit) + 1;
    this.setState({ offset: offset, page: page, products: [], loadProduct: false });
    this.getProduct(limit, id, price, page, sortBy, subfilters);
  };
  priceSubmit = () => {
    const { limit, id, price, sortBy, subfilters } = this.state;
    this.setState({ sortBy: sortBy, products: [], page: 1, offset: 0, loadProduct: false });
    this.getProduct(limit, id, price, 1, sortBy, subfilters);
  };
  changePropsSortBy = sortBy => {
    const { limit, id, price, subfilters } = this.state;
    this.getProduct(limit, id, price, 1, sortBy, subfilters);
  };
  changePropsLimit = limit => {
    const { sortBy, id, price, subfilters } = this.state;
    this.setState({ limit: limit, products: [], page: 1, offset: 0, loadProduct: false });
    this.getProduct(limit, id, price, 1, sortBy, subfilters);
  };
  handleChooseSubFilter = (newSubFilter, filters) => {
    this.setState({ subfilters: newSubFilter, filters: filters });
    const { limit, id, price, sortBy } = this.state;
    this.setState({
      sortBy: sortBy,
      products: [],
      page: 1,
      offset: 0,
      panel: false,
      loadProduct: false
    });
    this.getProduct(limit, id, price, 1, sortBy, newSubFilter);
  };
  toggleDrawer = isopen => {
    this.setState({
      panel: isopen
    });
  };

  getProduct = (limit, id, price, page, sortBy, subfilters) => {
    ProductAPI.getProductProductByFilter(
      id,
      limit,
      page,
      sortBy,
      this.convertSubFilterForServer(subfilters),
      price
    )
      .then(res => {
        const { docs, totalDocs, page } = res;
        this.setState({ products: docs, totalDocs: totalDocs, loadProduct: true, page: page });
      })
      .catch(() => {
        this.setState({
          loadProduct: true,
          products: [],
          totalDocs: 0,
          page: 0,
          price: [0, 0],
          priceCurrentCatalog: [0, 0],
          error: true
        });
      });
  };

  render() {
    const {
      breadcrumbs,
      currentNameCatalog,
      filters,
      products,
      offset,
      totalDocs,
      limit,
      priceCurrentCatalog,
      price,
      subfilters,
      panel,
      error,
      loadProduct
    } = this.state;
    const {
      handleClickPagination,
      changePropsLimit,
      changePropsSortBy,
      changePrice,
      priceSubmit,
      handleChooseSubFilter,
      toggleDrawer
    } = this;

    return (
      <Container>
        <Breadcrumbs className="breadcrumbs" aria-label="breadcrumb">
          {breadcrumbs.map((element, index) => {
            if (index === 0) {
              return (
                <Link key={index} color="inherit" to="/">
                  {element}
                </Link>
              );
            } else {
              return (
                <Link key={index} color="inherit" to="/authorization">
                  {element}
                </Link>
              );
            }
          })}
        </Breadcrumbs>
        <div className="grid-container">
          <div className="currentNameCatalog">
            <Typography variant={'h5'}>{currentNameCatalog}</Typography>
          </div>
          <div className="params-filter">
            <div className="mobile-btn">
              <Button
                onClick={() => {
                  toggleDrawer(true);
                }}
                className="panel-btn-left price-filter-submit"
              >
                Filters
              </Button>
            </div>
            <div className="params">
              <ListGrow
                changePropsParent={changePropsLimit}
                title={'On page'}
                menuItem={[9, 12, 15]}
                isCurrentData={true}
              />
              <ListGrow
                changePropsParent={changePropsSortBy}
                title={'Sort by'}
                menuItem={['Newest', 'Price: High - Low', 'Price: Low - High ']}
                isCurrentData={false}
                titleButton={'Sort By'}
              />
            </div>
          </div>
          <div className={`filter ${panel ? 'panel-open' : ''}`}>
            <div className="panel-close">
              <CloseIcon
                onClick={() => {
                  toggleDrawer(false);
                }}
                className="btn-close-panel"
              />
            </div>
            <Filter
              filters={filters}
              price={price}
              priceCurrentCatalog={priceCurrentCatalog}
              changePrice={changePrice}
              priceSubmit={priceSubmit}
              handleChooseSubFilter={handleChooseSubFilter}
              subfilters={subfilters}
            />
          </div>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="space-between"
            alignItems="center"
            className="product-mini"
          >
            {!loadProduct ? (
              <Grid item lg={12} md={12} sm={12} xs={12} className="preloader">
                <CircularProgress />
              </Grid>
            ) : products.length <= 0 || error ? (
              error ? (
                <Grid item lg={12} md={12} sm={12} xs={12} className="preloader">
                  <Typography>Error</Typography>
                </Grid>
              ) : (
                <Grid item lg={12} md={12} sm={12} xs={12} className="preloader">
                  <Typography>No found</Typography>
                </Grid>
              )
            ) : (
              products.map(element => {
                const { productUrlImg, filterImg, nameProduct, _id, model } = element;
                return (
                  <Grid key={_id} item lg={4} md={4} sm={6} xs={12}>
                    <MiniProduct
                      key={_id}
                      _id={_id}
                      className="product-item"
                      nameProduct={nameProduct}
                      filterImg={filterImg}
                      productUrlImg={productUrlImg}
                      model={model}
                    />
                  </Grid>
                );
              })
            )}
          </Grid>
          <Pagination
            className="paginate"
            limit={limit}
            offset={offset}
            total={totalDocs}
            onClick={(e, offset) => handleClickPagination(offset)}
          />
        </div>
      </Container>
    );
  }
}

export default CatalogPage;
