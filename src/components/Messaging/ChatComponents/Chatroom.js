import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import io from "socket.io-client";

const styles = theme => ({
  card: {
    width: "300px",
    height: "20%",
    marginBot: "5%"
  }
});

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      username: "",
      message: "",
      messages: []
    };

    this.socket = io("localhost:3001");

    this.socket.on("add-message", function(data) {
      addMessage(data);
    });
    const addMessage = data => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state.messages);
    };

    this.sendMessage = ev => {
      ev.preventDefault();
      this.socket.emit("private-message", {
        author: this.state.username,
        message: this.state.message,
        email: this.props.friend.email
      });
      this.setState({ message: "" });
    };
    // this.sendMessage = ev => {
    //     ev.preventDefault();
    //     this.socket.emit('SEND_MESSAGE', {
    //         author: this.state.username,
    //         message: this.state.message,
    //         friend: this.props.friend.email
    //     })
    //     this.setState({message: ''});

    // }
  }
  componentDidMount() {
    this.setState({
      username: this.props.auth.user.name
    });
    this.socket.emit("add-user", { email: this.props.auth.user.email });
  }

  handleTooltipOpen = () => {
    this.setState({ open: true });
  };
  handleTooltipClose = () => {
    this.setState({ open: false });
  };

  handleClick = () => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: state.anchorEl ? null : currentTarget
    }));
  };

  render() {
    const { classes } = this.props;
    return (
      <Tooltip
        placement="top"
        onClose={this.handleTooltipClose}
        open={this.state.open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        className="card"
        title={
          <div className="card">
            <div className="card-body">
              <div className="card-title">Global Chat</div>
              <hr />
              <div
                className="messages"
                style={{ height: "250px", overflowY: "scroll" }}
              >
                {this.state.messages.map(message => {
                  return (
                    <div>
                      {message.author}: {message.message}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="card-footer">
              <input
                type="text"
                placeholder="Message"
                className="form-control"
                value={this.state.message}
                onChange={ev => this.setState({ message: ev.target.value })}
              />
              <br />
              <button
                onClick={this.sendMessage}
                className="btn btn-primary form-control"
              >
                Send
              </button>
            </div>
          </div>
        }
      >
        <Chip
          style={{ marginRight: "20px" }}
          avatar={
            <Avatar>
              <FaceIcon />
            </Avatar>
          }
          variant="contained"
          label={this.props.friend.name}
          onClick={this.handleTooltipOpen}
          onDelete={this.handleTooltipClose}
          className={classes.chip}
        />
      </Tooltip>
    );
  }
}

ChatRoom.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  friends: state.friends
});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(ChatRoom));
