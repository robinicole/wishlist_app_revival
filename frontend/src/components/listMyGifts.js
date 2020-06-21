import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { List, Card , Grid }  from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import { api_url, styles , isAccessTokenExpired} from "./Constants";
import CardHeader from "@material-ui/core/CardHeader";
import { withRouter } from "react-router-dom";

import ACTIONS from "../modules/action";
import { connect } from "react-redux";

class MyGiftsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isButtonDisabled: true,
      new_gift_name: "",
      gift_list: [],
    };
    this.getWishlist();
    
  }

  getWishlist() {
    const token = localStorage.accessToken;
    if (token) {
      return fetch(`${api_url}/api/my_gifts/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((resp) => this.setState({ gift_list: resp }))
        .catch();
    }
  }

  handleNewGift() {
    const token = localStorage.accessToken;
    if (token) {
      return fetch(`${api_url}/api/my_gifts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: this.state.new_gift_name }),
      })
        .then((resp) => resp.json())
        .then((resp) => this.getWishlist())
        .catch();
    }
  }

  handlDeleteGift(id) {
    const token = localStorage.accessToken;
    if (token) {
      return fetch(`${api_url}/api/my_gifts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => this.getWishlist())
        .catch();
    }
  }

  handleKeyPress(e) {
    if (e.keyCode === 13 || e.which === 13) {
      this.state.isButtonDisabled || this.handleNewGift();
    }
  }
  

  updateButton() {
    if (this.state.new_gift_name.trim()) {
      !this.state.isButtonDisabled ||
        this.setState({ isButtonDisabled: false });
    } else {
      this.state.isButtonDisabled || this.setState({ isButtonDisabled: true });
    }
  }

  componentDidMount() {
    this.updateButton();
    if (isAccessTokenExpired())
    {
      this.props.logout()
    }
  }

  componentDidUpdate() {
    this.updateButton();
    if (isAccessTokenExpired())
    {
      this.props.logout()
    }
  }
  renderAddGiftForm(){
    const { classes } = this.props;
    return (<FormControl fullWidth className={classes.container}>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            onChange={(e) => this.setState({ new_gift_name: e.target.value })}
            onKeyPress={(e) => this.handleKeyPress(e)}
          />
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={() => this.handleNewGift()}
            disabled={this.state.isButtonDisabled}
          >
            Add to my gift list
          </Button>
        </FormControl>)
  }
  renderGift(item)
  {
    return (<React.Fragment>
    <Container>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
       </ListItemAvatar>
        <ListItemText primary={item.name} />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => this.handlDeleteGift(item.id)}
        >
          Delete
        </Button>
      </ListItem>
      <Divider variant="inset" component="li" />
    </Container>
  </React.Fragment>)
  }
  renderGiftList()
  {
    const { classes } = this.props;
    return (<Container className={classes.container}>
      <Grid container spacing={4}  display="row">
        <Grid item xs={12} md={6}>
          
      <Card >
        <CardHeader className={classes.header} title="Add a gift to my list" />
        {this.renderAddGiftForm()}
        </Card>
        </Grid>
        <Grid item xs={12} md={6}>
        <Card >
        <CardHeader className={classes.header} title="My Gift List" />

        <List className={classes.root}>
          {this.state.gift_list.map((item, ix) => this.renderGift(item))}
        </List>
        </Card>
        </Grid>
        </Grid>
      </Container> )
  }
  render() {
    try {
      return this.renderGiftList()
    }
    catch (error) {
      this.props.logout() ; 
      return null
    }
  }
}

const mapStateToProps = (state) => ({
  logged: state.logged,
});

const mapDispatchToProps = (dispatch) => ({
  login: (username, jwt_token) => dispatch(ACTIONS.Login(username, jwt_token)),
  logout: () => dispatch(ACTIONS.Logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles, { withTheme: true })(MyGiftsList)));

