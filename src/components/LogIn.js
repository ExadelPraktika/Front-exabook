import React, { Component } from 'react';
import axios from 'axios';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText'
import FormGroup from '@material-ui/core/FormGroup';

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
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false,
      errorText: ''

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': 'Password is too short';
        break;
      default:
        break;
    }

    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  handleChange (evt) {
    const name = evt.target.name;
    const value = evt.target.value;

    this.setState({ [name]:value }, () => { this.validateField(name, value) });
  }

  handleSubmit(event) {
    axios
        .post('http://localhost:3001/users/signin', {
            email: this.state.email,
            password: this.state.password
        })
        .then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error.response);
        })
}

  render () {
    return (
      <div>
        <Card className="login-card" style={styles.card}>
          <CardContent>
            <FormGroup>
              <FormLabel>Login</FormLabel>
              <FormControl>
                <InputLabel>Email</InputLabel>
                <Input 
                  name="email"
                  onChange={this.handleChange}
                />
                <FormHelperText error id="name-helper-text">{this.state.formErrors.email}</FormHelperText>
              </FormControl>

              <FormControl> 
              <InputLabel>Password</InputLabel>

              <Input 
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
                type="password"  
              />
              <FormHelperText error id="name-helper-text">{this.state.formErrors.password}</FormHelperText>
              </FormControl>
              
              <Button 
                style={styles.button}
                variant="contained"
                onClick={this.handleSubmit}
                type="submit"
                disabled={!this.state.formValid}
              >
                Login
              </Button>

            </FormGroup>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default LoginForm;