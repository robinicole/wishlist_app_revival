import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ACTIONS from "../modules/action";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';


class Logout extends Component {
    handleLogout()
    {
        this.props.logout()
        this.props.history.push("/login");
    }
    render(){
        return <Button variant="contained" color="secondary" onClick={() => this.handleLogout()}>
        Logout
      </Button>
    }
}
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(ACTIONS.Logout()),
  });   

export default connect(
    null, 
    mapDispatchToProps)(withRouter(Logout))

