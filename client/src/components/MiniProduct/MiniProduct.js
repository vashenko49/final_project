import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import cloudinary from 'cloudinary-core';
import PropTypes from 'prop-types';
import isColor from 'is-color';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Brightness1Icon from '@material-ui/icons/Brightness1';

import './MiniProduct.scss';
import Box from '@material-ui/core/Box';
import Link from '../common/styled/StyledLink';

class MiniProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImg: 'final-project/products/product_without_photo_sample/product_without_phot_ldw3px',
      selectedColor: 0,
      filterImg: props.filterImg.length > 0 ? this.filterColor(props.filterImg) : [] // это сделано из за того что на componentWillMount ругется авторизация и скоро его вырежут
    };
  }

  componentDidMount() {
    if (this.state.filterImg.length > 0) {
      this.setState({ currentImg: this.state.filterImg[0].urlImg });
    } else if (this.props.productUrlImg.length > 0) {
      this.setState({ currentImg: this.props.productUrlImg[0] });
    }
  }

  filterColor = filterImg => {
    return filterImg
      .filter(element => {
        return (
          element._idFilter.type.toLowerCase() === 'color' && isColor(element._idSubFilters.name)
        );
      })
      .map(element => {
        return {
          urlImg: element.urlImg[0],
          name: element._idSubFilters.name
        };
      });
  };

  chooseColor = e => {
    const { index } = e.currentTarget.dataset;
    this.setState({ selectedColor: +index, currentImg: this.state.filterImg[index].urlImg });
  };

  render() {
    const { cloudinary_cloud_name } = this.props.configuration;
    const { model, nameProduct, _id } = this.props;
    const { currentImg, filterImg, selectedColor } = this.state;
    const { chooseColor } = this;
    const minPrice = Math.min.apply(
      null,
      model.map(element => element.currentPrice)
    );
    const maxPrice = Math.max.apply(
      null,
      model.map(element => element.currentPrice)
    );
    return (
      <Card className="card">
        {filterImg.length > 0 && (
          <Box className="chooseColor">
            {filterImg.map((element, index) => {
              return (
                <Brightness1Icon
                  data-index={index}
                  className="icon-choose-color"
                  key={element.name}
                  style={{
                    color: element.name,
                    border: `1px solid ${selectedColor === index ? element.name : 'transparent'}`
                  }}
                  onClick={chooseColor}
                />
              );
            })}
          </Box>
        )}
        <Link to={`/product/${_id}`}>
          <CardMedia
            component="img"
            src={new cloudinary.Cloudinary({
              cloud_name: cloudinary_cloud_name
            }).url(currentImg)}
            height="200"
            className="CardMedia"
          />
          <CardActionArea>
            <CardContent>
              <Box display="flex" flexDirection="column" justifyContent="space-between">
                <Typography
                  className="product-name"
                  fontWeight="fontWeightBold"
                  gutterBottom
                  variant="h5"
                  component="h2"
                >
                  {nameProduct}
                </Typography>
                <Typography className="product-price" fontWeight="fontWeightBold" component="p">
                  $ {minPrice === maxPrice ? maxPrice : `${minPrice}-${maxPrice}`}
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    configuration: state.configuration
  };
}

MiniProduct.propTypes = {
  _id: PropTypes.string,
  nameProduct: PropTypes.string,
  filterImg: PropTypes.array,
  productUrlImg: PropTypes.array,
  model: PropTypes.array
};

export default connect(mapStateToProps)(MiniProduct);
