import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import clsx from 'clsx';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

import Link from '../common/styled/StyledLink';

const styles = {
  btnColor: {
    marginRight: 15,
    width: 23,
    height: 23,
    boxSizing: 'border-box',
    border: '1px solid transparent',
    backgroundColor: 'transparent'
  },
  checkedBtnColor: {
    borderColor: 'black'
  }
};

class ProductsItem extends Component {
  state = {
    checked: null,
    img: null
  };

  handleColor = (color, e) => {
    this.setState({ checked: color });
    this.setState({ img: this.props.product.subProduct.find(i => i.color === color).img });
    e.stopPropagation();
  };

  componentDidMount() {
    const { img, color } = this.props.product.subProduct[0];
    this.setState({ img });
    this.setState({ checked: color });
  }

  render() {
    const { id, title, categories, price, subProduct } = this.props.product;
    const { img, checked } = this.state;
    const { classes } = this.props;
    return (
      <Card data-id={id}>
        <Box display="flex" style={{ backgroundColor: '#F5F5F5', padding: '22px 0 25px 20px' }}>
          {subProduct.map(({ color }) => (
            <Avatar
              className={clsx(
                classes.btnColor,
                color === checked ? classes.checkedBtnColor : classes.btnColor
              )}
              key={color}
            >
              <Avatar
                style={{
                  backgroundColor: color,
                  width: 15,
                  height: 15,
                  cursor: 'pointer'
                }}
                onClick={e => this.handleColor(color, e)}
              ></Avatar>
            </Avatar>
          ))}
        </Box>
        <CardActionArea onClick={this.clickProduct}>
          <Link to={`/admin-panel/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <CardMedia component="img" src={img} style={{ mixBlendMode: 'darken' }}></CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {categories}
              </Typography>
              <Typography fontWeight="fontWeightBold" component="p">
                $ {price}
              </Typography>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    );
  }
}

ProductsItem.propTypes = {
  classes: PropTypes.object.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    categories: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    subProduct: PropTypes.array.isRequired
  })
};

ProductsItem.defaultProps = {};

export default withStyles(styles)(ProductsItem);
