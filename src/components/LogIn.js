import React, { Component } from 'react';
import axios from 'axios';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText'
import FormGroup from '@material-ui/core/FormGroup';
import PropTypes from 'prop-types';
import { setCurrent, logoutUser } from '../actions/authActions'
import { Grid } from "../../node_modules/@material-ui/core";
import { Link } from "react-router-dom";

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 300,
    textAlign: "center",
    margin: "auto",
    display: "flex",
    justifyContent: "center"
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

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      errorText: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleErr = this.handleErr.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      // if isauth true which means user is loged in - redirect
       this.props.history.push('/dashboard')
    }
  }

  validateForm() {
    var re = (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    return (
      re.test(String(this.state.email).toLowerCase()) &&
      this.state.password != ''
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  handleErr(){
    this.setState({
      errorText: 'Wrong Email or Password'
    })
  }

  handleSubmit(err) {
    axios
      .post('http://localhost:3001/users/signin', {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        this.props.setCurrent(response.data.token)
      }).catch(err => {
        this.handleErr();
      })
      
  }
  responseFacebook = (response) => {
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
      <div style={styles.root}>
              <h1>Exabook!</h1>
        <Grid container spacing={8} style={styles.card}>
          <Grid item xs>
            <h2>Login</h2>
          </Grid>
          <Grid item xs>
        <Card className="login-card" style={styles.card}>
          <CardContent>
            <FormGroup>
              <FormControl>
                <InputLabel>Email</InputLabel>
                <Input 
                  id="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormControl>

              <FormControl> 
              <InputLabel>Password</InputLabel>
              <Input 
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
                type="password"  
              />
              </FormControl>
              <FormHelperText error id="login-helper-text">
                      {this.state.errorText}
                    </FormHelperText>
                <br />
                <br />
              <Button 
                disabled={!this.validateForm()}
                type="submit"
                onClick={this.handleSubmit}
                variant="contained"
                color="secondary"
              >
                Login
              </Button>
              <br />
              <GoogleLogin
                clientId="890644813294-bvuq6cf7lsilohneqvov28oi60sfdmig.apps.googleusercontent.com"
                buttonText="LOGIN WITH GOOGLE"
                onSuccess={response => this.responseGoogle(response)}
                onFailure={response => this.responseGoogle(response)}
                style={styles.google}
              />
              <br />
              <FacebookLogin
                appId="485850475180066"
                autoLoad={false}
                fields="name,email,picture"
                //onClick={componentClicked}
                callback={response => this.responseFacebook(response)}
              />
              <br />
              <Button 
                component={Link}
                to="/register"
                variant="contained"
                color="primary"
              >
                Signup
              </Button>
          </FormGroup>
          </CardContent>
        </Card>
        </Grid>
        </Grid>
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
