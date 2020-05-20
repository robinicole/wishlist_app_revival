import React , { Component }from 'react' ;
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Home, Book } from '@material-ui/icons'
import { Link } from "react-router-dom";
import Logout from './Logout'
import { connect } from "react-redux";

class NavBar extends Component {
    
    render(){
        // Refactor this 
        return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" color="inherit">
                        Wishlist
                    </Typography>
                    <List component="nav">
                        <ListItem component="div">
                            <ListItemText inset>
                                <Typography color="inherit" variant="subtitle1">
                                    <Link to="/"  color="inherit">Home  <Home /></Link>
                                </Typography>
                            </ListItemText>
                            {this.props.logged?
                            <React.Fragment>
                            <ListItemText inset>
                                <Typography color="inherit" variant="subtitle1">
                                    <Link to="/gifts_list"  color="inherit">My Wishlist <Book /></Link>
                                </Typography>
                            </ListItemText>
                            <ListItemText inset>
                                <Typography color="inherit" variant="subtitle1">
                                    <Link to="/gifts_to_offer"  color="inherit">Gifts to offer <Book /></Link>
                                </Typography>
                            </ListItemText>
                            <ListItemText inset style={{display:'flex', alignContent:'flex-end'}}> 
                            <Typography color="inherit" variant="subtitle1">
                                <Link to="/users"  color="inherit">Users <Book /></Link>
                            </Typography>
                        </ListItemText>
                            </React.Fragment>:<div></div>}
                            
                            
                        {!this.props.logged?
                        <React.Fragment>
                            <ListItemText inset style={{display:'flex', alignContent:'flex-end'}}>
                                <Typography color="inherit" variant="subtitle1">
                                    <Link to="/login"  color="inherit">Login <Book /></Link>
                                </Typography>
                            </ListItemText>
                            {/* <ListItemText inset style={{display:'flex', alignContent:'flex-end'}}> 
                            <Typography color="inherit" variant="subtitle1">
                                <Link to="/register"  color="inherit">Register <Book /></Link>
                            </Typography>
                            </ListItemText> */}
                            </React.Fragment>:
                            <ListItemText inset style={{display:'flex', alignContent:'flex-end'}}>
                                <Logout logoutCallback={() => this.props.logout()}/>
                            </ListItemText>}
                        </ListItem >
                    </List>
                </Toolbar>
            </AppBar>
        </div>
        )
}}
;

const mapStateToProps = state => ({
    logged: state.logged, 
    username: state.username
  });


export default connect(
    mapStateToProps)(NavBar)