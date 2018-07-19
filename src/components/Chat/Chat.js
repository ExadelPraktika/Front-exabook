import React from "react";
import io from "socket.io-client";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

var uniqid = require("uniqid");

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  root: {
    overflow: "hidden"
    //padding: `0 ${theme.spacing.unit * 3}px`
  },
  gridList: {
    width: 300,
    height: 250
  },
  title: {
    textAlign: "center",
    margin: theme.spacing.unit
  },
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    maxWidth: 300
  }
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

  validateForm() {
    return (
      this.state.message.length > 0 // &&
      // this.state.username.length > 0
    );
  }

  render() {
    const { classes, auth } = this.props;

    let nick;
    if (auth.user.method === "google") {
      nick = auth.user.google.name;
    }
    if (auth.user.method === "local") {
      nick = auth.user.local.name;
    }
    if (auth.user.method === "facebook") {
      nick = auth.user.facebook.name;
    }

    return (
      <div className={classes.root}>
        <div>
          <div>
            <div>
              <div className={classes.title}>Global Chat</div>
              <hr />
              <div>
                <GridList
                  cellHeight="auto"
                  className={classes.gridList}
                  cols={1}
                >
                  {this.state.messages.map(message => {
                    return (
                      <GridListTile key={uniqid()}>
                        <Paper className={classes.paper}>
                          <Grid container wrap="nowrap" spacing={8}>
                            <Grid item xs>
                              <Typography>
                                {message.author}: {message.message}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </GridListTile>
                    );
                  })}
                </GridList>
              </div>
            </div>
            <div className="card-footer">
              {
                // Username input field for testing
                /*<FormHelperText id="username-helper-text">
                  Username
                </FormHelperText>
                <Input
                  id="Username"
                  //className={classes.textField}
                  value={this.state.username}
                  onChange={ev => this.setState({ username: ev.target.value })}
                  margin="dense"
                />
                <br />*/
              }
              <FormHelperText id="message-helper-text">Message</FormHelperText>
              <Input
                id="message"
                multiline
                //className={classes.textField}
                margin="none"
                value={this.state.message}
                onChange={ev =>
                  this.setState({ message: ev.target.value, username: nick })
                }
              />

              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.sendMessage}
                disabled={!this.validateForm()}
              >
                Send
                <Icon className={classes.rightIcon}>send</Icon>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(styles)(Chat));
