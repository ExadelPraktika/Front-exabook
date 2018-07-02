import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios';

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
      formValid: false
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
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
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
    //event.preventDefault()
    axios
        .post('http://localhost:5000/api/users/login', {
            email: this.state.email,
            password: this.state.password
        })
        .then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error.response.data);
        })
}

  render () {
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
            </FormControl>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default LoginForm;