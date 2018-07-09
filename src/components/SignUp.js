import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import jwt_decode from 'jwt-decode';
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import axios from "axios";
import {setCurrent} from '../actions/authActions'



const styles = {
  card: {
    minWidth: 275,
    maxWidth: 300,
    textAlign: "center"
  }
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      newUser: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password
    };
    this.setState({ newUser: "test" });
    
    axios
      .post('http://localhost:3001/users/signup', {
        newUser
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  responseFacebook(response) {
    console.log(response);
    const access_token = response.accessToken
    
    axios
      .post('http://localhost:3001/users/oauth/facebook', {
        access_token
      })
      .then((response) => {
        console.log(response);
        const decoded = jwt_decode(response.data.token);
        //this.props.setCurrent(decoded)
        console.log(decoded);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  responseGoogle(response) {
    console.log('google', response);
    const access_token = response.Zi.access_token;
    axios
      .post('http://localhost:3001/users/oauth/google', {
        access_token
      })
      .then((response) =>{
        console.log('google', response);
        const decoded = jwt_decode(response.data.token);
        this.props.setCurrent(decoded);
        console.log(decoded);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render() {


    return (

      <Card className="container" style={styles.card}>
        <form onSubmit={this.handleSubmit}>
          <GoogleLogin
            clientId="890644813294-bvuq6cf7lsilohneqvov28oi60sfdmig.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
          <FacebookLogin
            appId="485850475180066"
            autoLoad={true}
            fields="name,email,picture"
            //onClick={componentClicked}
            callback={this.responseFacebook}
          />
          <Input
            id="userName"
            label="User Name"
            value={this.state.userName}
            onChange={this.handleChange}
            placeholder="Username"
          />
          <br />
          <br />
          <Input
            id="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="email"
          />
          <br />
          <br />
          <Input
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
            placeholder="Password"
          />
          <br />
          <br />
          <Input
            id="confirmPassword"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
            placeholder="Confirm Password"
          />
          <br />
          <br />
          <Button disabled={!this.validateForm()} type="submit">
            Signup
          </Button>
        </form>
      </Card>
    );
  }
}

export default connect(null, { setCurrent })(SignUp);