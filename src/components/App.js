import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import LogIn from './LogIn';
import SignUp from './SignUp';


class App extends Component {
  render() {
    return(
      <Provider store={ store }>
      <div>
      <h1>SignUp!</h1>
      <SignUp />
    </div>
    </Provider>
    )
  }
}
export default App;