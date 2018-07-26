import React, { Component } from 'react';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { setCurrent } from '../actions/authActions';
import store from '../store';
import LogIn from './LogIn';
import SignUp from './SignUp';
import SideBar from "./sidebar/SideBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Marketplace from './Marketplace/Marketplace'
import Events from './Events/Events';
import Layout from "../hoc/Layout";


if(localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info 
  store.dispatch(setCurrent(localStorage.jwtToken))
}
class App extends Component {
  render() {

    return(
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={LogIn} />
            <Route exact path="/register" component={SignUp} />
            <Layout>
              <Switch>
                {/*kai "/dashboard" path, turi but {feed} bet dar nepabaigta*/}
                <Route exact path="/dashboard" component={Marketplace} />
                <Route exact path="/marketplace" component={Marketplace} />
                <Route exact path="/events" component={Events} />
              </Switch>
            </Layout>
        </Switch>
      </Router>
    </Provider>
    )

  }
}


export default App;
