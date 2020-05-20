import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';


const styles = theme =>
  ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`,
      marginTop: theme.spacing(10)
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }

  });

class MyGiftsList extends Component {
    constructor(props) {
      super(props);
      this.state = 
          {
            isButtonDisabled: true, 
            new_gift_name: '',
            gift_list: []
          }
          this.getWishlist()
      
    }
    getWishlist(){
          const token = localStorage.accessToken;
          const api_url = process.env.REACT_APP_API_ADDRESS ;
          if (token) {
            return fetch(`${api_url}/api/my_gifts/`, {
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token}`
              }
            })
              .then(resp => resp.json())
              .then(resp => this.setState({gift_list: resp}))
              .catch();
          }
      }
      handleNewGift(){
        const token = localStorage.accessToken;
        if (token) {
          return fetch("https://gifts-wishlist-backend.herokuapp.com/api/my_gifts/",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`},
            body: JSON.stringify({ name: this.state.new_gift_name})}
            )
            .then(resp => resp.json())
            .then(resp => this.getWishlist())
            .catch();
        }
    }
    handlDeleteGift(id){
        const token = localStorage.accessToken;
        if (token) {
          return fetch(`https://gifts-wishlist-backend.herokuapp.com/api/my_gifts/${id}`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`}
            }
            )
            .then(resp => this.getWishlist()).catch();
        }
    }
    handleKeyPress(e) {
        if (e.keyCode === 13 || e.which === 13) {
          this.state.isButtonDisabled || this.handleNewGift();
        }
      };

      updateButton() {
        if (this.state.new_gift_name.trim()) {
          !this.state.isButtonDisabled || this.setState({isButtonDisabled: false});
        } else {
          this.state.isButtonDisabled || this.setState({isButtonDisabled: true});
          };
      };
  
      componentDidMount() {
        this.updateButton()
      };
      componentDidUpdate() {
        this.updateButton()
      };

    render(){
        const { classes } = this.props ;
        return (
            <div>
            <FormControl fullWidth className={classes.container}>
                <TextField 
                id="outlined-basic" 
                label="Outlined"
                 variant="outlined"
                 onChange={(e)=>this.setState({new_gift_name: e.target.value})}
                 onKeyPress={(e) => this.handleKeyPress(e)} /> 
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  className={classes.loginBtn}
                  onClick={() => this.handleNewGift()}
                  disabled={this.state.isButtonDisabled}
                >
                  Login
                </Button>
            </FormControl>
                <List className={classes.root}>
                    {this.state.gift_list.map((item, ix) => 
                <div>
                  <Container>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.name} secondary="Jan 9, 2014" />
                  <Button variant="contained" color="secondary" onClick={() => this.handlDeleteGift(item.id)}>
                    Delete
                </Button>
                </ListItem>
                <Divider variant="inset" component="li" />
                </Container>
                </div>
        )}
              </List>
              </div>
        )
    }
}

export default withStyles(styles)(MyGiftsList)
