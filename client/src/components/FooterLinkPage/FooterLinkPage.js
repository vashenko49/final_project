import React, { Component } from "react";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as footerLinkPageAction from '../../actions/footerLinkPageAction';

import './FooterLinkPage.scss'

class FooterLinkPage extends Component {

  async componentDidMount() {
    let url = window.location.href.split('/');
    let customId = url[url.length - 1];

    await this.props.footerLinkPageAction.getFooterLinkPageByCustomId(customId);
  }

  render() {
    const { article, error } = this.props;

    let content = null;

    if(error.status === true) {
      content = error.msg
    } else {
      content = article.htmlContent
    }

    return (
      <div className="footer-link-page">
        {content}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    article: state.footerLinkPage.article,
    error: state.footerLinkPage.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    footerLinkPageAction: bindActionCreators(footerLinkPageAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterLinkPage);
