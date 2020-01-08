import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    const { isAdmin } = this.props.authorization;
    return (
      <Route
        {...rest}
        render={props => {
          return isAdmin === true ? <Component {...props} /> : <Redirect to="/accessdenied" />;
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  return { authorization: state.authorization };
}

export default connect(mapStateToProps, null)(PrivateRoute);
