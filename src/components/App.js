
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { setCurrent } from '../actions/authActions';
import store from '../store';
import LogIn from './LogIn';
import SignUp from './SignUp';
import TopBar from './Topbar/Topbar';
import SideBar from "./sidebar/SideBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from '../hoc/Layout'

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info 
  store.dispatch(setCurrent(localStorage.jwtToken))
}
class App extends Component {
  render() {

    return (
      <Provider store={store}>

        <Router>
          <Switch>
          <Route exact path="/" component={LogIn} />
          <Layout>
            <Switch>
            <Route exact path="/ssss" component={LogIn} />
            <Route exact path="/register" component={SignUp} />
            <Route exact path="/main" component={SideBar} />
            </Switch>
          </Layout>
          </Switch>
        </Router>
      </Provider>
    )

  }
}


export default App;

