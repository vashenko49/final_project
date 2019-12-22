import React, { Component } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Pagination from 'material-ui-flat-pagination';
import CircularProgress from '@material-ui/core/CircularProgress';

import MiniProduct from '../../MiniProduct/MiniProduct';
import ProductAPI from '../../../services/ProductAPI';
import CatalogAPI from '../../../services/CatalogAPI';
import Filter from '../../Filter/Filter';
import './CatalogPage.scss';
import ListGrow from '../../common/listGrow/listGrow';

class CatalogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      load: true,
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
      subfilters: []
    };
  }

  componentDidMount() {
    const { id } = this.state;
    this.setState({ load: false });
    CatalogAPI.getCatalogById(id).then(res => {
      this.setState(prevState => {
        return {
          load: true,
          breadcrumbs: [...prevState.breadcrumbs, res.parentId.name],
          currentNameCatalog: res.name,
          filters: res.filters
        };
      });
      ProductAPI.getProductProductByFilter(id).then(res => {
        const { docs, totalDocs, page } = res;
        const price = docs.length > 0 ? this.getMaxMinPrice(docs) : [0, 0];
        this.setState({
          products: docs,
          totalDocs: totalDocs,
          page: page,
          price: price,
          priceCurrentCatalog: price
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
    return [min, max];
  };

  handleClickPagination = offset => {
    const { limit, sortBy, id, price, subfilters } = this.state;
    console.log(price);
    console.log(subfilters);
    let page = Math.floor(offset / limit) + 1;
    this.setState({ offset: offset, page: page, products: [] });
    ProductAPI.getProductProductByFilter(id, limit, page, sortBy, subfilters, price).then(res => {
      const { docs, totalDocs, page } = res;
      this.setState({ products: docs, totalDocs: totalDocs, page: page });
    });
  };
  changePropsSortBy = sortBy => {
    const { limit, id, price, subfilters } = this.state;
    this.setState({ sortBy: sortBy, products: [], page: 1 });
    ProductAPI.getProductProductByFilter(id, limit, 1, sortBy, subfilters, price).then(res => {
      const { docs, totalDocs, page } = res;
      this.setState({ products: docs, totalDocs: totalDocs, page: page });
    });
  };
  changePropsLimit = limit => {
    const { sortBy, id, price, subfilters } = this.state;
    this.setState({ limit: limit, products: [], page: 1 });
    ProductAPI.getProductProductByFilter(id, limit, 1, sortBy, subfilters, price).then(res => {
      const { docs, totalDocs, page } = res;
      this.setState({ products: docs, totalDocs: totalDocs, page: page });
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
      price
    } = this.state;
    const { handleClickPagination, changePropsLimit, changePropsSortBy, changePrice } = this;
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
          <Filter
            className="filter"
            filters={filters}
            price={price}
            priceCurrentCatalog={priceCurrentCatalog}
            changePrice={changePrice}
          />
          <div className="product-mini">
            {products.length <= 0 ? (
              <div className="preloader">
                <CircularProgress />
              </div>
            ) : (
              products.map(element => {
                const { productUrlImg, filterImg, nameProduct, _id, model } = element;
                return (
                  <MiniProduct
                    key={_id}
                    _id={_id}
                    className="product-item"
                    nameProduct={nameProduct}
                    filterImg={filterImg}
                    productUrlImg={productUrlImg}
                    model={model}
                  />
                );
              })
            )}
          </div>
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
