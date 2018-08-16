import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { connect } from "react-redux";
import FaceIcon from "@material-ui/icons/Face";
import Tooltip from "@material-ui/core/Tooltip";
import ChatRoom from './Chatroom';
const styles = theme => ({
  root: {
    marginLeft: "20%",
    position: "fixed",
    bottom: "0",
    display: "flex",
    flexWrap: "wrap"
  }
});

class Chips extends React.Component {
  

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
       {this.props.msg.chatList.map(friend =>  <ChatRoom  key={friend.email} friend={friend}/> )}   
      </div>
    );
  }
}

Chips.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  msg: state.msg,
});

export default connect(
  mapStateToProps,
  {  }
)(withStyles(styles)(Chips));
