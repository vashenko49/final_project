import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Filters from './Filters';
import FiltersDetail from './FiltersDetail';
import Products from './Products';
import ProductsDetail from './ProductsDetail';
import Categories from './Categories';
import CategoriesDetail from './CategoriesDetail';
import Footer from './Footer';
import FooterDetail from './FooterDetail';
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
              <ListItem button onClick={this.handleOpenMenu}>
                <ListItemText>
                  <StyledLink to="/admin-panel/products">Products</StyledLink>
                </ListItemText>
              </ListItem>
              <ListItem button onClick={this.handleOpenMenu}>
                <ListItemText>
                  <StyledLink to="/admin-panel/categories">Categories</StyledLink>
                </ListItemText>
              </ListItem>
              <ListItem button onClick={this.handleOpenMenu}>
                <ListItemText>
                  <StyledLink to="/admin-panel/filters">Filters</StyledLink>
                </ListItemText>
              </ListItem>
              <ListItem button onClick={this.handleOpenMenu}>
                <ListItemText>
                  <StyledLink to="/admin-panel/footer">Footer</StyledLink>
                </ListItemText>
              </ListItem>
              <ListItem button onClick={this.handleOpenMenu}>
                <ListItemText>
                  <StyledLink to="/admin-panel/paymethod">Pay method</StyledLink>
                </ListItemText>
              </ListItem>
              <ListItem button onClick={this.handleOpenMenu}>
                <ListItemText>
                  <StyledLink to="/admin-panel/shippingmethod">Shipping method</StyledLink>
                </ListItemText>
              </ListItem>
              <ListItem button onClick={this.handleOpenMenu}>
                <ListItemText>
                  <StyledLink to="/admin-panel/deliveryaddresses">Delivery addresses</StyledLink>
                </ListItemText>
              </ListItem>
            </List>
            <Divider />
          </Drawer>

          <Box m={1}>
            <Switch>
              <Route exact path="/admin-panel" component={Products} />
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
              <Route exact path="/admin-panel/paymethod" component={PayMethod} />
              <Route exact path="/admin-panel/shippingmethod" component={ShippingMethod} />
              <Route exact path="/admin-panel/deliveryaddresses" component={DeliveryAddresses} />
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
