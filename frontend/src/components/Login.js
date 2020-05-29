import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import { withRouter } from "react-router-dom";

import ACTIONS from "../modules/action";
import { connect } from "react-redux";
import { api_url, styles , isAccessTokenExpired} from "./Constants";
import MyGiftsList from "./listMyGifts";
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      username: "",
      password: "",
      isButtonDisabled: true,
      helperText: "",
    };
  }

  updateButton() {
    if (this.state.username.trim() && this.state.password.trim()) {
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
  }

  handleLogin() {
    const username = this.state.username;
    const password = this.state.password;
    fetch(`${api_url}/api/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => {
        if (!response.ok) {
          this.setState({ error: true });
          this.setState({ helperText: "Wrong username/password" });
          throw new Error("Error, wrong username/password");
        } else {
          this.setState({ error: false });
          return response.json();
        }
      })
      .then((data) => {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        this.props.login(username);
      })
      .catch(Error);
  }

  handleKeyPress(e) {
    if (e.keyCode === 13 || e.which === 13) {
      this.state.isButtonDisabled || this.handleLogin();
    }
  }

  renderLoginForm()
  {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Container className={classes.container}>
        <Typography color="inherit" textAlign='center'>
                        Enter your password/login to give a try ot the wishlist management system 
                    </Typography>
        <form className={classes.container} noValidate autoComplete="off">
          <Card className={classes.card}>
            <CardHeader className={classes.header} title="Enter your login" />
            <CardContent>
              <div>
                <TextField
                  error={this.state.error}
                  fullWidth
                  id="username"
                  type="email"
                  label="Username"
                  placeholder="Username"
                  margin="normal"
                  onChange={(e) => this.setState({ username: e.target.value })}
                  onKeyPress={(e) => this.handleKeyPress(e)}
                />
                <TextField
                  error={this.state.error}
                  fullWidth
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  margin="normal"
                  helperText={this.state.helperText}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  onKeyPress={(e) => this.handleKeyPress(e)}
                />
              </div>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                className={classes.loginBtn}
                onClick={() => this.handleLogin()}
                disabled={this.state.isButtonDisabled}
              >
                Login
              </Button>
            </CardActions>
          </Card>
        </form>
        </Container>
      </React.Fragment>
    );
  }
  render() {
    if (this.props.logged)
    {
      return <MyGiftsList/>
    }
    return this.renderLoginForm()
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
)(withRouter(withStyles(styles, { withTheme: true })(Login)));
