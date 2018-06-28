import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import axios from 'axios';

class LogIn extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      message: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log('login-form email')
    console.log(this.state.email);

    axios.post('/login', {
      email: this.state.email,
      password: this.state.password
    })
    .then(response => {
      console.log('login response: ')
      console.log(response)
    
    })

  }

  render() {
    return(
      <div>
        <Card className="container">
          <form action="/" onSubmit={this.handleSubmit}>
            <h2 className="card-heading">Login</h2>

            <div className="field-line">
              <TextField
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </div>

            <div className="field-line">
              <TextField
                type="password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </div>

            <div className="button-line">
            <Button variant="contained" color="primary" onClick={this.handleSubmit}>
              Login
            </Button>
            </div>
          </form>
        </Card>

      </div>
    )
  }
}

export default LogIn;