import React, { Component } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Pagination from 'material-ui-flat-pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box } from '@material-ui/core';

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
      totalDocs: 1100,
      limit: 9,
      page: 1,
      offset: 0
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
        console.log(res);
        this.setState({ products: docs, totalDocs: totalDocs, page: page });
      });
    });
  }

  handleClickPagination = offset => {
    const { limit, sortBy, id } = this.state;
    let page = Math.floor(offset / limit) + 1;
    this.setState({ offset: offset, page: page, products: [] });
    ProductAPI.getProductProductByFilter(id, limit, page, sortBy).then(res => {
      const { docs, totalDocs, page } = res;
      console.log(res);
      this.setState({ products: docs, totalDocs: totalDocs, page: page });
    });
  };
  changePropsSortBy = sortBy => {
    const { limit, id } = this.state;
    this.setState({ sortBy: sortBy, products: [], page: 1 });
    ProductAPI.getProductProductByFilter(id, limit, 1, sortBy).then(res => {
      const { docs, totalDocs, page } = res;
      this.setState({ products: docs, totalDocs: totalDocs, page: page });
    });
  };
  changePropsLimit = limit => {
    const { sortBy, id } = this.state;
    this.setState({ limit: limit, products: [], page: 1 });
    ProductAPI.getProductProductByFilter(id, limit, 1, sortBy).then(res => {
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
      sortBy
    } = this.state;
    console.log('limit---> ' + limit);
    console.log('sortBy---> ' + sortBy);
    const { handleClickPagination, changePropsLimit, changePropsSortBy } = this;
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
          <Filter className="filter" filters={filters} price={[99, 1000]} />
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
        </div>
        <Box display="flex" my={3} justifyContent="center">
          <Pagination
            limit={limit}
            offset={offset}
            total={totalDocs}
            onClick={(e, offset) => handleClickPagination(offset)}
          />
        </Box>
      </Container>
    );
  }
}

export default CatalogPage;
