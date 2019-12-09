import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import parse from 'html-react-parser';

import * as footerLinksAction from '../../actions/footerLinksAction';

import './FooterLinkPage.scss';

class FooterLinkPage extends Component {
  async componentDidMount() {
    await this.props.footerLinksAction.getFooterLinkPageByCustomId(this.props.match.params.customId, this.props.id);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.customId !== this.props.match.params.customId) {
      await this.props.footerLinksAction.getFooterLinkPageByCustomId(this.props.match.params.customId, this.props.id);
    }
  }

  render() {
    const { article, error } = this.props;

    let content = null;

    if(error.status === true) {
      content = error.msg;
    } else {
      content = article;
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
    error: state.footerLinks.articles.error,
    id: state.footerLinksId.id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    footerLinksAction: bindActionCreators(footerLinksAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterLinkPage);
