import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as partnerAction from '../../actions/partnerAction';
import { connect } from 'react-redux';
import PartnersItem from './PartnersItem';
import './Partners.scss';
import { Container } from '@material-ui/core';

class Partners extends Component {
  componentDidMount() {
    this.props.getActivePartners();
  }

  render() {
    const { partners } = this.props;

    return (
      <Container>
        <section className="partners">
          {partners.map((item, index) => (
            <PartnersItem item={item} key={index} />
          ))}
        </section>
      </Container>
    );
  }
}

Partners.defaultProps = [];

function mapStateToProps(state) {
  return {
    partners: state.partner.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getActivePartners: bindActionCreators(partnerAction.getActivePartners, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Partners);
