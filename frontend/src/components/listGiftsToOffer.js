import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Container from '@material-ui/core/Container';
import CardHeader from '@material-ui/core/CardHeader';
import { api_url, styles} from './Constants' ;

class listGiftsToOffer extends Component {
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
          if (token) {
            return fetch(`${api_url}/api/wishlists/`, {
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
    handleOfferGift(id){
        const token = localStorage.accessToken;
        if (token) {
          return fetch(`${api_url}/api/wishlists/${id}/`,{
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`}
            }
            )
            .then(resp => this.getWishlist()).catch();
        }
    }
    handleUnOfferGift(id){
      const token = localStorage.accessToken;
      if (token) {
        return fetch(`${api_url}/api/wishlists/${id}/`,{
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
    renderButton(item)
    {
      if (item.state === 'OFFERED BY ME' )
      {
       return (<ListItem selected={true}>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.name} secondary={item.owner.username}/>
          <Button variant="contained" color="secondary" onClick={() => this.handleUnOfferGift(item.pk)}>
            Unoffer it
        </Button>
        </ListItem>)
      }
      if (item.state === 'NOT OFFERED')
      {
        return (<ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.name} secondary={item.owner.username} />
          <Button variant="contained" color="primary" onClick={() => this.handleOfferGift(item.pk)}>
            Offer it
        </Button>
        </ListItem>)
      }
      if (item.state === 'OFFERED BY SOMEBODY_ELSE')
      {
        return (<ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.name} secondary={item.owner.username} />
          <Button variant="contained" color="primary" onClick={() => this.handleOfferGift(item.pk)} disabled>
            Already offered
        </Button>
        </ListItem>)
      }
    }
    render(){
        const { classes } = this.props ;
        return (
          <Container>
              <div className={classes.root}>
          <CardHeader className={classes.header} title="Gifts to offer" />
          
                <List className={classes.root}>
                    {this.state.gift_list.map((item, ix) => 
                <div>
               {this.renderButton(item)}
                {/* <Divider variant="inset" component="li" /> */}
                </div>
        )}
              </List>
              </div>
              </Container>
        )
    }
}

export default withStyles(styles)(listGiftsToOffer)
