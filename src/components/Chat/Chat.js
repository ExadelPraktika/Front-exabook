import React from "react";
import io from "socket.io-client";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

var uniqid = require("uniqid");

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

class Chat extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: "",
      message: "",
      messages: []
    };



    this.socket = io("localhost:3001");

    this.socket.on("RECEIVE_MESSAGE", function(data) {
      addMessage(data);
    });

    const addMessage = data => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state.messages);
    };

    this.sendMessage = ev => {
      ev.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
        author: this.state.username,
        message: this.state.message
      });
      this.setState({ message: "" });
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <div className="card-title">Global Chat</div>
                <hr />
                <div className="messages">
                  {this.state.messages.map(message => {
                    return (
                      <div
                        key={uniqid()}
                        className={`message ${this.props.username ===
                          this.state.username && "mine"}`}
                      >
                        {message.author}: {message.message}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="card-footer">
                <FormHelperText id="username-helper-text">
                  Username
                </FormHelperText>
                <Input
                  id="Username"
                  //className={classes.textField}
                  value={this.state.username}
                  onChange={ev => this.setState({ username: ev.target.value })}
                  margin="dense"
                />
                <br />
                <FormHelperText id="message-helper-text">
                  Message
                </FormHelperText>
                <Input
                  id="message"
                  multiline
                  //className={classes.textField}
                  margin="none"
                  value={this.state.message}
                  onChange={ev => this.setState({ message: ev.target.value })}
                />
                
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.sendMessage}
                >
                  Send
                  <Icon className={classes.rightIcon}>send</Icon>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chat);
