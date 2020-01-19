import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as AuthorizationActions from '../../actions/authorizationAction';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import OrderPage from './OrderPage';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id
    };
  }

  render() {
    const { isAuthorization } = this.props.authorization;
    const { openWindowAuth } = this.props;
    const { id } = this.state;
    return (
      <Container>
        {!isAuthorization ? (
          <div className="unAuth">
            <Typography variant={'h5'}>
              You are not authorized.{' '}
              <span onClick={openWindowAuth} className="login-or-register">
                Login or register
              </span>{' '}
              for the operation
            </Typography>
          </div>
        ) : (
          <div>
            <OrderPage idOrder={id} />
          </div>
        )}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return { authorization: state.authorization };
}

function mapDispatchToProps(dispatch) {
  return {
    openWindowAuth: bindActionCreators(AuthorizationActions.openWindowAuth, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
