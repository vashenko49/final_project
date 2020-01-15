import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Orders from './Orders/Orders';
import Filters from './Filters/Filters';
import FiltersDetail from './Filters/FiltersDetail';
import Products from './Products/Products';
import ProductsDetail from './Products/ProductsDetail';
import Categories from './Categories/Categories';
import CategoriesDetail from './Categories/CategoriesDetail';
import Footer from './Footer/Footer';
import FooterDetail from './Footer/FooterDetail';
import Slider from './Slider/Slider';
import SliderDetail from './Slider/SliderDetail';
import PayMethod from './PayMethod/PayMethod';
import NotFound from '../page/NotFound';
import ShippingMethod from './ShippingMethod/ShippingMethod';

import StyledLink from '../common/styled/StyledLink';

import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import DeliveryAddresses from './DeliveryAddresses/DeliveryAddresses';
import AdminPanelWelcome from './AdminPanelWelcome/AdminPanelWelcome';
import Customers from './Customers/Customer';
import CatalogOnMainPage from './CatalogOnMainPage/CatalogOnMainPage';
import Partner from './Partner/Partner';
import ConfigSystem from './ConfigSystem/ConfigSystem';

const styles = {};

class AdminPanel extends Component {
  state = {
    isOpenMenu: false
  };

  handleOpenMenu = () => {
    this.setState({ isOpenMenu: !this.state.isOpenMenu });
  };

  render() {
    const { isOpenMenu } = this.state;

    return (
      <Router>
        <div>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleOpenMenu}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Administrative Panel
              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer variant="temporary" anchor="left" open={isOpenMenu} onClose={this.handleOpenMenu}>
            <div>
              <IconButton onClick={this.handleOpenMenu}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              <StyledLink to="/admin-panel/products" onClick={this.handleOpenMenu}>
                <ListItem button>
                  <ListItemText>Products</ListItemText>
                </ListItem>
              </StyledLink>
              <StyledLink to="/admin-panel/orders" onClick={this.handleOpenMenu}>
                <ListItem button>
                  <ListItemText>Orders</ListItemText>
                </ListItem>
              </StyledLink>

              <StyledLink to="/admin-panel/categories" onClick={this.handleOpenMenu}>
                <ListItem button>
                  <ListItemText>Categories</ListItemText>
                </ListItem>
              </StyledLink>

              <StyledLink to="/admin-panel/filters" onClick={this.handleOpenMenu}>
                <ListItem button>
                  <ListItemText>Filters</ListItemText>
                </ListItem>
              </StyledLink>

              <StyledLink to="/admin-panel/footer" onClick={this.handleOpenMenu}>
                <ListItem button>
                  <ListItemText>Footer</ListItemText>
                </ListItem>
              </StyledLink>

              <StyledLink to="/admin-panel/slider" onClick={this.handleOpenMenu}>
                <ListItem button>
                  <ListItemText>Slider</ListItemText>
                </ListItem>
              </StyledLink>

              <StyledLink to="/admin-panel/paymethod" onClick={this.handleOpenMenu}>
                <ListItem button>
                  <ListItemText>Pay method</ListItemText>
                </ListItem>
              </StyledLink>

              <StyledLink to="/admin-panel/shippingmethod" onClick={this.handleOpenMenu}>
                <ListItem button>
                  <ListItemText>Shipping method</ListItemText>
                </ListItem>
              </StyledLink>

              <StyledLink to="/admin-panel/deliveryaddresses" onClick={this.handleOpenMenu}>
                <ListItem button>
                  <ListItemText>Delivery addresses</ListItemText>
                </ListItem>
              </StyledLink>

              <StyledLink to="/admin-panel/customers" onClick={this.handleOpenMenu}>
                <ListItem button>
                  <ListItemText>Customers</ListItemText>
                </ListItem>
              </StyledLink>

              <StyledLink to="/admin-panel/catalogonmainpage" onClick={this.handleOpenMenu}>
                <ListItem button>
                  <ListItemText>Catalog On Main Page</ListItemText>
                </ListItem>
              </StyledLink>

              <StyledLink to="/admin-panel/partner" onClick={this.handleOpenMenu}>
                <ListItem button>
                  <ListItemText>Partner</ListItemText>
                </ListItem>
              </StyledLink>

              <StyledLink to="/admin-panel/config" onClick={this.handleOpenMenu}>
                <ListItem button>
                  <ListItemText>Configuration system</ListItemText>
                </ListItem>
              </StyledLink>
            </List>
            <Divider />
          </Drawer>

          <Box m={1}>
            <Switch>
              <Route exact path="/admin-panel" component={AdminPanelWelcome} />
              <Route exact path="/admin-panel/orders" component={Orders} />
              <Route exact path="/admin-panel/products" component={Products} />
              <Route exact path="/admin-panel/products/new" component={ProductsDetail} />
              <Route exact path="/admin-panel/products/:id" component={ProductsDetail} />
              <Route exact path="/admin-panel/filters" component={Filters} />
              <Route exact path="/admin-panel/filters/new" component={FiltersDetail} />
              <Route exact path="/admin-panel/filters/:id" component={FiltersDetail} />
              <Route exact path="/admin-panel/categories" component={Categories} />
              <Route exact path="/admin-panel/categories/new" component={CategoriesDetail} />
              <Route exact path="/admin-panel/categories/:id" component={CategoriesDetail} />
              <Route exact path="/admin-panel/footer" component={Footer} />
              <Route exact path="/admin-panel/footer/new" component={FooterDetail} />
              <Route exact path="/admin-panel/footer/:id" component={FooterDetail} />
              <Route exact path="/admin-panel/slider" component={Slider} />
              <Route exact path="/admin-panel/slider/new" component={SliderDetail} />
              <Route exact path="/admin-panel/slider/:id" component={SliderDetail} />
              <Route exact path="/admin-panel/paymethod" component={PayMethod} />
              <Route exact path="/admin-panel/shippingmethod" component={ShippingMethod} />
              <Route exact path="/admin-panel/deliveryaddresses" component={DeliveryAddresses} />
              <Route exact path="/admin-panel/customers" component={Customers} />
              <Route exact path="/admin-panel/catalogonmainpage" component={CatalogOnMainPage} />
              <Route exact path="/admin-panel/partner" component={Partner} />
              <Route exact path="/admin-panel/config" component={ConfigSystem} />
              <Route component={NotFound} />
            </Switch>
          </Box>
        </div>
      </Router>
    );
  }
}

AdminPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminPanel);
