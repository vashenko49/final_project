import React, { Component } from 'react';
import { connect } from 'react-redux';
import cloudinary from 'cloudinary-core';

class PartnersItem extends Component {
  render() {
    const { item, configuration } = this.props;
    const img = new cloudinary.Cloudinary({ cloud_name: configuration.cloudinary_cloud_name }).url(
      item.imageUrl
    );

    return <img src={img} alt={item.name} className="partners-item" />;
  }
}
function mapStateToProps(state) {
  return {
    configuration: state.configuration
  };
}

export default connect(mapStateToProps)(PartnersItem);
