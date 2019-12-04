import React, { Component } from "react";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import parse from 'html-react-parser';

import * as footerLinksAction from '../../actions/footerLinksAction';

import './FooterLinkPage.scss'

class FooterLinkPage extends Component {

  constructor (props){
    super(props);
  }

  async componentDidMount() {
    await this.props.footerLinksAction.getFooterLinkPageByCustomId(this.props.match.params.customId);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.customId !== this.props.match.params.customId) {
      await this.props.footerLinksAction.getFooterLinkPageByCustomId(this.props.match.params.customId);
    }
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
        {parse(`${content}`)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    article: state.footerLinks.articles.article,
    error: state.footerLinks.articles.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    footerLinksAction: bindActionCreators(footerLinksAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterLinkPage);
