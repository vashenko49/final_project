import React from 'react'
import { Route, Redirect } from "react-router-dom";
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'

// For the testing i leave static varibale isAuth and loading
// For the prod need change to auth: { isAuthenticated, loading }

// Change variables isAuth and loading to true - component will be show
// with false - hide
const PrivateRoute = ({ component: Component, isAuthenticated = false, loading = false,...rest }) => {
  return <Route
    {...rest}
    render={props => 
      !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : <Component {...props} />
    }
  />
}

//Validation data from redux
// PrivateRoute.propTypes = {
//   auth: PropTypes.object.isRequired
// }

//From redux we receive data like: isAuthenticated and loading
// const mapStateToProps = state => ({
//   auth: state.auth
// })

// Yet again for testing
// For prod connect(mapStateToProps)(PrivateRoute)
export default PrivateRoute
