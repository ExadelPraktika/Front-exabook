import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import axios from "axios";
import PropTypes from 'prop-types';
import {setCurrent, logoutUser} from '../actions/authActions'


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
  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
      // if isauth true which means user is loged in redirect
      // this.props.history.push('/dashboard')
    }
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
    axios
      .post('http://localhost:3001/users/signup', {
        email: this.state.email,
        password: this.state.password
      })
      .then((response) => {
        console.log(response)
        //this.props.setCurrent(response.data.token);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  responseFacebook = (response) => {
    console.log(response);
    const access_token = response.accessToken
    axios
      .post('http://localhost:3001/users/oauth/facebook', {
        access_token
      })
      .then((response) => {
        this.props.setCurrent(response.data.token)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  responseGoogle = (response) => {
    const access_token = response.Zi.access_token;
    axios
      .post('http://localhost:3001/users/oauth/google', {
        access_token
      })
      .then((response) =>{
        this.props.setCurrent(response.data.token);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    return (
      <Card className="container" style={styles.card}>
        <form onSubmit={this.handleSubmit}>
          <GoogleLogin
            clientId="890644813294-bvuq6cf7lsilohneqvov28oi60sfdmig.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={response => this.responseGoogle(response)}
            onFailure={response => this.responseGoogle(response)}
          />
          <FacebookLogin
            appId="485850475180066"
            autoLoad={false}
            fields="name,email,picture"
            //onClick={componentClicked}
            callback={response => this.responseFacebook(response)}
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
          <Button onClick={this.onLogoutClick.bind(this)} >
            Logout
          </Button>
        </form>
      </Card>
    );
  }
}
SignUp.propTypes = {
  setCurrent: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { setCurrent, logoutUser })(SignUp);
