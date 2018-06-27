import React, { Component } from 'react'
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
          isLoading: false,
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
          confirmationCode: "",
          newUser: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }
      validateForm() {
        return (
          this.state.email.length > 0 &&
          this.state.password.length > 0 &&
          this.state.password === this.state.confirmPassword
        );
      }
    
      validateConfirmationForm() {
        return this.state.confirmationCode.length > 0;
      }
    
      handleChange(e) {
        this.setState({
          [e.target.id]: e.target.value,
        })
      }
    
      handleSubmit(e) {
        e.preventDefault();
    
        this.setState({ isLoading: true });
    
        this.setState({ newUser: "test" });
    
        this.setState({ isLoading: false });

        alert(this.state.email);
      }
      
    render(){
        return (
        <form onSubmit={this.handleSubmit}>
            <Input 
            id="userName"
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
            <Button
          disabled={!this.validateForm()}
          type="submit">Signup</Button>
        
        </form>
        )
    }
}

export default SignUp;