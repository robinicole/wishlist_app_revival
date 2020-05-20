import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

function PrivateRoute ({component: Component, ...rest}) {
    console.log(rest)
    return (
      <Route
        {...rest}
        render={(props) => rest.logged
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }
  const mapStateToProps = state => ({
    logged: state.logged, 
    username: state.username
  });


export default connect(
    mapStateToProps)(PrivateRoute)