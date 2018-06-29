import React, { Component } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import axios from "axios";

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
      confirmationCode: "",
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
      name: this.state.userName,
      email: this.state.email,
      password: this.state.password
    };
    this.setState({ newUser: "test" });

    axios
      .post("api/users/register", {
        newUser
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Card className="container" style={styles.card}>
        <form onSubmit={this.handleSubmit}>
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

export default SignUp;
