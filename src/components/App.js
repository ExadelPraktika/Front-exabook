import React, { Component } from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import TopBar from "./topbar/TopBar";
import SideBar from "./sidebar/SideBar";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Route exact path="/" component={LogIn} />
            <Route exact path="/register" component={SignUp} />
            <Route exact path="/main" component={TopBar} />
            <Route exact path="/main" component={SideBar} />
          </div>
          </Router>
    );
  }
}
export default App;
