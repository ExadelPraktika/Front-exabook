import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import axios from "axios";
import PropTypes from "prop-types";
import { setCurrent } from "../actions/authActions";
import FormHelperText from "@material-ui/core/FormHelperText";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { Grid } from "../../node_modules/@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import { Link } from "react-router-dom";

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 300,
    textAlign: "center",
    margin: "auto",
    //display: "flex",
    //justifyContent: "center"
  },
  root: {
    textAlign: "center",
    margin: "auto"
  },
  google: {
    display: "inline-block",
    background: 'rgb(209, 72, 54)',
    color: 'rgb(255, 255, 255)',
    width: 'auto',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 1,
    border: "1px solid transparent",
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  }
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      newUser: null,
      formErrors: { email: "", password: "", confirmPassword: "" },
      emailValid: false,
      passwordValid: false,
      passwordConfirm: false,
      formValid: false,
      errorText: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      // if isauth true which means user is loged in redirect
      // this.props.history.push('/dashboard')
    }
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let passwordConfirm = this.state.passwordConfirm;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : "Email is invalid";
        break;
      case "password":
        passwordValid = value.length >= 6;

        passwordConfirm = this.state.confirmPassword === this.state.password;
        fieldValidationErrors.password = passwordConfirm
          ? "Password does not match"
          : "";

        fieldValidationErrors.password = passwordValid
          ? ""
          : "Password is too short";
        break;
      case "confirmPassword":
        passwordConfirm = value === this.state.password;
        fieldValidationErrors.password = passwordConfirm
          ? ""
          : "Password does not match";
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid,
        passwordConfirm: passwordConfirm
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.passwordConfirm
    });
  }

  handleChange(e) {
    const name = e.target.id;
    const value = e.target.value;

    this.setState(
      {
        [name]: value
      },
      () => {
        this.validateField(name, value);
      }
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/users/signup", {
        email: this.state.email,
        name: this.state.name,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
        //this.props.setCurrent(response.data.token);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  responseFacebook = response => {
    console.log(response);
    const access_token = response.accessToken;
    axios
      .post("http://localhost:3001/users/oauth/facebook", {
        access_token
      })
      .then(response => {
        this.props.setCurrent(response.data.token);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  responseGoogle = response => {
    const access_token = response.Zi.access_token;
    axios
      .post("http://localhost:3001/users/oauth/google", {
        access_token
      })
      .then(response => {
        this.props.setCurrent(response.data.token);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div style={styles.root}>
        <h1>Exabook!</h1>
        <Grid container spacing={8} style={styles.card}>
          <Grid item xs>
            <h2>Signup</h2>
          </Grid>
          <Grid item xs>
            <Card className="container" item>
              <CardContent>
                <FormGroup>
                  <FormControl>
                  <InputLabel>Name</InputLabel>
                    <Input
                      id="name"
                      label="Your Name"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </FormControl>
               
                  <FormControl>
                  <InputLabel>Email</InputLabel>
                    <Input
                      id="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                    <FormHelperText error id="name-helper-text">
                      {this.state.formErrors.email}
                    </FormHelperText>
                  </FormControl>
            
                  <FormControl>
                  <InputLabel>Password</InputLabel>
                    <Input
                      id="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      type="password"
                    />
                    <FormHelperText error id="name-helper-text">
                      {this.state.formErrors.password}
                    </FormHelperText>
                  </FormControl>
    
                  <FormControl>
                  <InputLabel>Confirm Password</InputLabel>
                    <Input
                      id="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={this.handleChange}
                      type="password"
                    />
                  </FormControl>
                  <br />
                  <br />
                  <Button
                    disabled={!this.state.formValid}
                    type="submit"
                    onClick={this.handleSubmit}
                    variant="contained"
                    color="secondary"
                  >
                    Signup
                  </Button>
                  <br />
                  <FormControl>
                    <GoogleLogin
                      clientId="890644813294-bvuq6cf7lsilohneqvov28oi60sfdmig.apps.googleusercontent.com"
                      buttonText="LOGIN WITH GOOGLE"
                      onSuccess={response => this.responseGoogle(response)}
                      onFailure={response => this.responseGoogle(response)}
                      style={styles.google}
                    />
                  </FormControl>
                  <br />
                  <FormControl>
                    <FacebookLogin
                      appId="485850475180066"
                      autoLoad={false}
                      fields="name,email,picture"
                      //onClick={componentClicked}
                      callback={response => this.responseFacebook(response)}
                    />
                  </FormControl>
                  <br />
                  <FormControl>
              <Button 
                component={Link}
                to="/"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
              </FormControl>
                </FormGroup>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
SignUp.propTypes = {
  setCurrent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setCurrent }
)(SignUp);
