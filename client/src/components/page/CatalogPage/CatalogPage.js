import React, { Component } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import MiniProduct from '../../MiniProduct/MiniProduct';
import ProductAPI from '../../../services/ProductAPI';
import CatalogAPI from '../../../services/CatalogAPI';
import Filter from '../../Filter/Filter';
import './CatalogPage.scss';
import CircularProgress from '@material-ui/core/CircularProgress';

class CatalogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load: true,
      breadcrumbs: ['Home'],
      currentNameCatalog: '',
      filters: [],
      products: [],
      sortBy: 0,
      sortByOpen: false,
      anchorRef: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
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
      ProductAPI.getProductProductByFilter(id, []).then(res => {
        this.setState({ products: res });
      });
    });
  }

  handleToggle = event => {
    const { sortByOpen, anchorRef } = this.state;
    this.setState({
      sortByOpen: !sortByOpen,
      anchorRef: anchorRef ? null : event.currentTarget
    });
  };
  handleClose = () => {
    this.setState({ sortByOpen: false, anchorRef: null });
  };
  handleListKeyDown = event => {
    if (event.key === 'Tab') {
      event.preventDefault();
      this.setState({ sortByOpen: false, anchorRef: null });
    }
  };

  render() {
    const {
      breadcrumbs,
      currentNameCatalog,
      sortByOpen,
      anchorRef,
      filters,
      products
    } = this.state;
    const { handleToggle, handleClose, handleListKeyDown } = this;
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
          <div className="filterBy">
            <Typography variant={'h6'}>Filter</Typography>
            <div>
              <Button
                ref={anchorRef}
                aria-controls={sortByOpen ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                Sort by
              </Button>
              <Popper
                open={sortByOpen}
                anchorEl={anchorRef}
                role={undefined}
                placement="bottom-end"
                transition
                disablePortal
                className="popover-filter-by"
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={sortByOpen}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleClose}>Newest</MenuItem>
                      <MenuItem onClick={handleClose}>Price: High - Low</MenuItem>
                      <MenuItem onClick={handleClose}>Price: Low - High </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Popper>
            </div>
          </div>
          <Filter className="filter" filters={filters} price={[99, 1000]} />
          <div className="product-mini">
            {products.length <= 0 ? (
              <CircularProgress />
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
      </Container>
    );
  }
}

export default CatalogPage;
