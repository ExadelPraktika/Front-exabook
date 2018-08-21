// import React from "react";
// import Input from "@material-ui/core/Input";
// import Button from "@material-ui/core/Button";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import Icon from "@material-ui/core/Icon";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
// import { connect } from "react-redux";
// import { Typography } from "@material-ui/core";
// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
// import UserAvatar from "react-user-avatar";
// import {
//   getConversations,
//   sendReply,
//   newConversation
// } from "../../actions/chatActions";
// import IconButton from "@material-ui/core/IconButton";
// import io from "socket.io-client";

// var uniqid = require("uniqid");

// const styles = theme => ({
//   button: {
//     margin: theme.spacing.unit
//   },
//   rightIcon: {
//     marginLeft: theme.spacing.unit
//   },
//   root: {
//     overflow: "hidden"
//   },
//   messagesContainer: {
//     width: 300,
//     height: 450,
//     overflowY: "auto"
//   },
//   inputContainer: {
//     display: "inline"
//   },
//   title: {
//     textAlign: "center",
//     margin: theme.spacing.unit
//   },
//   paperMe: {
//     margin: theme.spacing.unit,
//     padding: theme.spacing.unit * 0.5,
//     maxWidth: 160,
//     minWidth: 10,
//     whiteSpace: "normal",
//     wordWrap: "break-word",
//     background: "#2196f3",
//     elevation: "0",
//     borderRadius: 12
//   },
//   paperThem: {
//     margin: theme.spacing.unit,
//     padding: theme.spacing.unit * 0.5,
//     maxWidth: 160,
//     minWidth: 10,
//     whiteSpace: "normal",
//     wordWrap: "break-word",
//     background: "#f9ad3b",
//     elevation: "0",
//     borderRadius: 12
//   },
//   avatar: {
//     width: 36,
//     color: "White",
//     fontFamily: "Sans-serif",
//     fontStyle: "bold",
//     fontSize: "18px"
//   },
//   messagesMe: {
//     display: "flex",
//     justifyContent: "flex-end"
//   },
//   messagesThem: {
//     display: "flex"
//   }
// });

// class Chat extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       username: "",
//       message: "",
//       messages: []
//     };

//     this.socket = io("localhost:3001");

//        this.socket.on("RECEIVE_MESSAGE", function(data) {
//        addMessage(data);
//      });

//     const addMessage = data => {
//       console.log(data);

//       this.setState({ messages: [...this.state.messages, data] });
//       console.log(this.state.messages);
//     };

//     this.sendMessage = ev => {
//       ev.preventDefault();
//       this.socket.emit("SEND_MESSAGE", {
//        author: this.state.username,
//        message: this.state.message
//       });
//       this.setState({ message: "" });
//     };

//      this.onKeyDown = ev => {
//       if (ev.keyCode === 13 && this.validateForm()) {
//         ev.preventDefault();
//         this.socket.emit("SEND_MESSAGE", {
//           author: this.state.username,
//           message: this.state.message
//         });
//         this.setState({ message: "" });
//       }
//     };
//   }

//   validateForm() {
//     return this.state.message != "";
//   }
//   componentDidMount() {
//     var objDiv = document.getElementById("autoScroll");
//     objDiv.scrollTop = objDiv.scrollHeight;
//   }
//   componentDidUpdate() {
//     var objDiv = document.getElementById("autoScroll");
//     objDiv.scrollTop = objDiv.scrollHeight;
//   }

//   render() {
//     const { classes, auth } = this.props;

//     let nick;
//     if (auth.user.method === "google") {
//       nick = auth.user.google.name;
//     }
//     if (auth.user.method === "local") {
//       nick = auth.user.local.name;
//     }
//     if (auth.user.method === "facebook") {
//       nick = auth.user.facebook.name;
//     }

//     return (
//       <div className={classes.root}>
//         <div>
//           <div>
//             <div>
//               <div className={classes.title}>Global Chat</div>
//               <hr />
//               <div className={classes.messagesContainer} id="autoScroll">
//                 {this.state.messages.map(message => {
//                   console.log();
//                   return (
//                     <div
//                       key={uniqid()}
//                       className={
//                         message.author === nick
//                           ? classes.messagesMe
//                           : classes.messagesThem
//                       }
//                     >
//                       {message.author === nick ? null : (
//                         <UserAvatar
//                           size="36"
//                           className={classes.avatar}
//                           name={message.author}
//                           src=""
//                         />
//                       )}

//                       <Paper
//                         className={
//                           message.author === nick
//                             ? classes.paperMe
//                             : classes.paperThem
//                         }
//                       >
//                         <Grid container>
//                           <Grid item xs zeroMinWidth>
//                             <Typography style={{ color: "White" }}>
//                               {message.message}
//                             </Typography>
//                           </Grid>
//                         </Grid>
//                       </Paper>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//             <hr />
//             <div className={classes.inputContainer}>
//               <FormHelperText id="message-helper-text">Message</FormHelperText>
//               <Input
//                 id="message"
//                 multiline
//                 rowsMax="3"
//                 style={{ width: 230 }}
//                 value={this.state.message}
//                 onChange={ev =>
//                   this.setState({ message: ev.target.value, username: nick })
//                 }
//                 onKeyDown={this.onKeyDown}
//               />

//               <IconButton
//                 variant="fab"
//                 color="primary"
//                 aria-label="Send"
//                 // /mini
//                 type="submit"
//                 className={classes.button}
//                 onClick={this.sendMessage}
//                 disabled={!this.validateForm()}
//               >
//                 <Icon className={classes.rightIcon}>send</Icon>
//               </IconButton>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// Chat.propTypes = {
//   classes: PropTypes.object.isRequired,
//   auth: PropTypes.object.isRequired,
//   getConversations: PropTypes.func.isRequired,
//   sendReply: PropTypes.func.isRequired,
//   newConversation: PropTypes.func.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(
//   mapStateToProps,
//   { getConversations, sendReply, newConversation }
// )(withStyles(styles)(Chat));
import React from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import UserAvatar from "react-user-avatar";
import {
  getConversations,
  sendReply,
  newConversation
} from "../../actions/chatActions";
import IconButton from "@material-ui/core/IconButton";
import io from "socket.io-client";

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
  },
  messagesContainer: {
    width: 300,
    height: 190,
    overflowY: "auto"
  },
  inputContainer: {
    display: "inline"
  },
  title: {
    textAlign: "center",
    margin: theme.spacing.unit
  },
  paperMe: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 0.5,
    maxWidth: 160,
    minWidth: 10,
    whiteSpace: "normal",
    wordWrap: "break-word",
    background: "#2196f3",
    elevation: "0",
    borderRadius: 12
  },
  paperThem: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 0.5,
    maxWidth: 160,
    minWidth: 10,
    whiteSpace: "normal",
    wordWrap: "break-word",
    background: "#f9ad3b",
    elevation: "0",
    borderRadius: 12
  },
  avatar: {
    width: 36,
    color: "White",
    fontFamily: "Sans-serif",
    fontStyle: "bold",
    fontSize: "18px"
  },
  messagesMe: {
    display: "flex",
    justifyContent: "flex-end"
  },
  messagesThem: {
    display: "flex"
  }
});

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "sss",
      message: "",
      messages: [],
    };

    this.socket = io("localhost:3001");

    this.socket.on("add-message", function(data) {
       addMessage(data);
    });

    const addMessage = data => {
      this.setState({ messages: [...this.state.messages, data] });
    };

    this.sendMessage = ev => {
      ev.preventDefault();
      this.socket.emit("private-message", {
        author: this.state.username,
        message: this.state.message,
        email: this.props.msg.chatList[0].email,
        email1:  this.props.auth.user.email
      });
      this.setState({ message: "" });
    };

     this.onKeyDown = ev => {
      if (ev.keyCode === 13 && this.validateForm()) {
        ev.preventDefault();
        this.socket.emit("private-message", {
          author: this.state.username,
          message: this.state.message, 
          email: this.props.msg.chatList[0].email,
          email1: this.props.auth.user.email,
        });
        this.setState({ message: "" });
      }
    };
  }

  validateForm() {
    return this.state.message != "";
  }
  componentDidMount() {
    var objDiv = document.getElementById("autoScroll");
    objDiv.scrollTop = objDiv.scrollHeight;
    this.socket.emit("add-user", { email: this.props.auth.user.email });
  }
  componentDidUpdate() {
    var objDiv = document.getElementById("autoScroll");
    objDiv.scrollTop = objDiv.scrollHeight;
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
    }console.log(this.props.msg.chatList[0])

    return (
      
      <div className={classes.root}>
        <div>
          <div>
            <div>
              <div className={classes.title}>Global Chat</div>
              <hr />
              <div className={classes.messagesContainer} id="autoScroll">
                {this.state.messages.map(message => {
                  return (
                    <div
                      key={uniqid()}
                      className={
                        message.author === nick
                          ? classes.messagesMe
                          : classes.messagesThem
                      }
                    >
                      {message.author === nick ? null : (
                        <UserAvatar
                          size="36"
                          className={classes.avatar}
                          name={message.author}
                          src=""
                        />
                      )}

                      <Paper
                        className={
                          message.author === nick
                            ? classes.paperMe
                            : classes.paperThem
                        }
                      >
                        <Grid container>
                          <Grid item xs zeroMinWidth>
                            <Typography style={{ color: "White" }}>
                              {message.message}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    </div>
                  );
                })}
              </div>
            </div>
            <hr />
            <div className={classes.inputContainer}>
              <FormHelperText id="message-helper-text">Message</FormHelperText>
              <Input
                id="message"
                multiline
                rowsMax="3"
                style={{ width: 230 }}
                value={this.state.message}
                onChange={ev =>
                  this.setState({ message: ev.target.value, username: nick })
                }
                onKeyDown={this.onKeyDown}
              />

              <IconButton
                variant="fab"
                color="primary"
                aria-label="Send"
                // /mini
                type="submit"
                className={classes.button}
                onClick={this.sendMessage}
                disabled={!this.validateForm()}
              >
                <Icon className={classes.rightIcon}>send</Icon>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getConversations: PropTypes.func.isRequired,
  sendReply: PropTypes.func.isRequired,
  newConversation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  msg: state.msg
});

export default connect(
  mapStateToProps,
  { getConversations, sendReply, newConversation }
)(withStyles(styles)(Chat));