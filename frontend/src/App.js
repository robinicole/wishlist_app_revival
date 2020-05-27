import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import "./App.css";
import NavBar from "./components/navBar";
import Login from "./components/Login";
import MyGiftsList from "./components/listMyGifts";
import listGiftsToOffer from "./components/listGiftsToOffer";
import Users from "./components/listUsers";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";

import { store } from "./modules/store";
import { api_url } from "./components/Constants";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      last_token_refresh: null,
    };
    fetch(`${api_url}`).catch(Error);
  }
  render() {
    return (
      <ReduxProvider store={store}>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/users" component={(props) => <Users {...props} />} />
          <Route path="/login" component={(props) => <Login {...props} />} />
          <Route
            path="/register"
            component={(props) => <Register {...props} />}
          />
          <PrivateRoute path="/gifts_list" component={MyGiftsList} />
          <PrivateRoute path="/gifts_to_offer" component={listGiftsToOffer} />
        </Switch>
      </ReduxProvider>
    );
  }
}

export default App;
