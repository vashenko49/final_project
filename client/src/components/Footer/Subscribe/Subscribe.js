import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addSubscriber, saveEmailToStore } from '../../../actions/footerSubscribeAction';

import './Subscribe.scss';

class Subscribe extends Component {
  onInputChange(event) {
    this.props.saveEmailToStore(event.target.value);
  }

  async onSubscribe() {
    await this.props.addSubscriber(this.props.email);

    if (this.props.error.status === true) {
      // alert(this.props.error.msg);
    } else {
      // alert(this.props.email);
    }
  }

  render() {
    return (
      <div>
        <p className="footer-menu-list-header">Subscribe to newsletter</p>
        <input
          className="subscribe-input"
          type="text"
          name="email"
          placeholder="ENTER YOUR EMAIL"
          onChange={this.onInputChange.bind(this)}
        />
        <div className="subscribe-submit" onClick={this.onSubscribe.bind(this)}>
          SUBSCRIBE
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.footerSubscribe.email,
    error: state.footerSubscribe.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addSubscriber: bindActionCreators(addSubscriber, dispatch),
    saveEmailToStore: bindActionCreators(saveEmailToStore, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe);
