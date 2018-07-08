import React, { Component } from 'react';
import LogIn from './LogIn';
import SignUp from './SignUp';
import TopBar from './Topbar/Topbar';

class App extends Component {
  render() {
    return(
      <div>
          <h1>Exabook!</h1>
        <LogIn />
      </div>
    )
  }
}
export default App;
