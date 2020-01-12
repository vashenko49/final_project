import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cloudinary from 'cloudinary-core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';

class DialogWindowToPayShip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notFound: 'final-project/products/product_without_photo_sample/product_without_phot_ldw3px'
    };
  }
  render() {
    const { notFound } = this.state;
    const { name, description, imageUrl, open, handleClose } = this.props;
    const { cloudinary_cloud_name } = this.props.configuration;
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              image={new cloudinary.Cloudinary({
                cloud_name: cloudinary_cloud_name
              }).url(imageUrl.length > 0 ? imageUrl : notFound)}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Dialog>
    );
  }
}

DialogWindowToPayShip.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

function mapStateToProps(state) {
  return {
    configuration: state.configuration
  };
}

export default connect(mapStateToProps, null)(DialogWindowToPayShip);
