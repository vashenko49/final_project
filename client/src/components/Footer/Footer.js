import React, { Component } from "react";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as footerLinksAction from '../../actions/footerLinksAction';

import Grid from '@material-ui/core/Grid';

import Links from './Links/Links';
import Subscribe from './Subscribe/Subscribe';

import './Footer.scss';

class Footer extends Component {
  componentDidMount() {
    this.props.footerLinksAction.getFooterLinks();
  }

  render() {
    const { links } = this.props;

    return (
        <div className="footer">
          <Grid container>
            <Grid
              container
              item
              xs={12}
              sm={6}
              justify="space-around"
            >
              {links.data.map(item => (
                <Grid item xs={12} sm={3} key={item._id}>
                  <Links link={item} />
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12} sm={6}><Subscribe/></Grid>
            <Grid item xs={12}><p className="footer-copyright">© Copyright 2019</p></Grid>
          </Grid>
        </div>
    );
  }
}

Footer.defaultProps = [];

function mapStateToProps(state) {
  return {
    links: state.footerLinks.links
  };
}

function mapDispatchToProps(dispatch) {
  return {
    footerLinksAction: bindActionCreators(footerLinksAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
