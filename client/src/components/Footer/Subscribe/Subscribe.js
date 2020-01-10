import React, { Component } from 'react';

import SnackBars from '../../common/admin-panel/SnackBars';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addSubscriber, saveEmailToStore } from '../../../actions/footerSubscribeAction';

import './Subscribe.scss';

class Subscribe extends Component {
  state = {
    sendDataStatus: 'success',
    sendDataMessage: ''
  };

  handleCloseSnackBars = (event, reason) => {
    if (reason === 'clickaway') return;

    this.setState({ sendDataMessage: '' });
  };

  onInputChange(event) {
    this.props.saveEmailToStore(event.target.value);
  }

  async onSubscribe() {
    await this.props.addSubscriber(this.props.email);

    if (this.props.error.status === true) {
      this.setState({
        sendDataStatus: 'error',
        sendDataMessage: this.props.error.msg
      });
    } else {
      this.setState({
        sendDataStatus: 'success',
        sendDataMessage: this.props.email
      });
    }
  }

  render() {
    const { sendDataStatus, sendDataMessage } = this.state;

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

        <SnackBars
          handleClose={this.handleCloseSnackBars}
          variant={sendDataStatus}
          open={!!sendDataMessage}
          message={sendDataMessage}
        />
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
