import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios';
import PropTypes from 'prop-types';
import { setCurrent, logoutUser } from '../actions/authActions'

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 350,
    textAlign: "center"
  },
  button: {
    minWidth: 200,
    maxWidth: 300,
    margin: 20
  }
};


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: { email: '', password: '' },
      emailValid: false,
      passwordValid: false,
      formValid: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }

    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
  }

  handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;

    this.setState({ [name]: value }, () => { this.validateField(name, value) });
  }

  handleSubmit(event) {
    //event.preventDefault()
    axios
      .post('http://localhost:3001/users/signin', {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log(response)
        this.props.setCurrent(response.data.token)
      }).catch(error => {
        console.log(error.response.data);
      })
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
      .then((response) => {
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
      <div>
        <Card className="login-card" style={styles.card}>
          <CardContent>
            <FormControl component="fieldset">
              <FormLabel>Login</FormLabel>
              <Input
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
              />

              <Input
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
                type="password"
              />

              <Button
                style={styles.button}
                variant="contained"
                onClick={this.handleSubmit}
                type="submit"
                disabled={!this.state.formValid}
              >
                Login
              </Button>
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
            <Button onClick={this.onLogoutClick.bind(this)} >
            Logout
          </Button>
            </FormControl>
          </CardContent>
        </Card>
      </div>
    );
  }
}

LoginForm.propTypes = {
  setCurrent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { setCurrent, logoutUser })(LoginForm);
