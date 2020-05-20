import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Container from '@material-ui/core/Container';
import CardHeader from '@material-ui/core/CardHeader';


const styles = theme =>
  ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`,
      marginTop: `${theme.spacing(2)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: 'grey',
      color: '#fff',
      margin: `${theme.spacing(3)} auto`,
      marginTop: theme.spacing(3)
    },
    card: {
      marginTop: theme.spacing(10)
    }

  });

class Users extends Component {
    constructor(props) {
      super(props);
      this.state = 
          {
            isButtonDisabled: true, 
            users_list: [],
          }
          this.getUsersList()
          console.log(this.state.users_list)
      
    }
    getUsersList(){
          const token = localStorage.accessToken;
          const api_url = process.env.REACT_APP_API_ADDRESS ;
          if (token) {
            return fetch(`${api_url}/api/users/`, {
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token}`
              }
            })
              .then(resp => resp.json())
              .then(resp => this.setState({users_list: resp}))
              .catch();
          }
      }

    handleKeyPress(e) {
        if (e.keyCode === 13 || e.which === 13) {
          this.state.isButtonDisabled || this.handleNewGift();
        }
      };

    renderButton(item)
    {
       return (<ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.username} secondary={item.email}/>
        </ListItem>)
    }
    render(){
        const { classes } = this.props ;
        return (
          <Container>
              <div className={classes.root}>
          <CardHeader className={classes.header} title="List of users" />
          
                <List className={classes.root}>
                    {this.state.users_list.map((item, ix) => 
                <div>
               {this.renderButton(item)}
                </div>
        )}
              </List>
              </div>
              </Container>
        )
    }
}

export default withStyles(styles)(Users)
