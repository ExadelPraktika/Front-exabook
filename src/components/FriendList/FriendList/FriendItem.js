import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FriendItem from "../FriendList/FriendItem";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import Clear from '@material-ui/icons/Clear';
import Done from '@material-ui/icons/Done';
import Textsms from '@material-ui/icons/Textsms';
import Tooltip from '@material-ui/core/Tooltip';
import Moment from 'react-moment';

import { deleteFriend, sendFriendReq } from '../../../actions/friendActions'
class FriendList extends Component {
  render() {
    return (
      <ListItem >
        {this.props.friend.friend.avatar !== "undefined" ? (
          <Avatar
            style={{
              width: "30px",
              height: "30px"
            }}
            src={this.props.friend.friend.avatar}
          />
        ) : (
          <Avatar
            style={{
              width: "30px",
              height: "30px"
            }}
          >dasdsa
            {this.props.friend.friend.name.charAt(0)}
          </Avatar>
        )}

        <Typography
          style={{ paddingLeft: "10px" }}
          component="span"
          color="inherit"
          noWrap={true}
        >
          {this.props.friend.status === 'requested' ? this.props.friend.friend.name : this.props.friend.friend.name}
          {this.props.friend.status === 'requested' ?           <Button mini  onClick={() => this.props.deleteFriend(this.props.userID, this.props.friend._id)}>
          <Clear color="secondary"/>
          </Button> : this.props.friend.status === 'pending' ? (<div><Button mini onClick={() => this.props.sendFriendReq(this.props.userID, this.props.friend._id)}>
          <Done color="primary"/>
          </Button>           <Button mini onClick={() => this.props.deleteFriend(this.props.userID, this.props.friend._id)} >
          <Clear color="secondary"/>
          </Button></div> ) : this.props.friend.status === 'accepted' ? <Button mini >
          <Textsms color="primary"/>
          </Button> : null}
          {/* <Button mini >
          <Clear color="secondary"/>
          </Button>
          <Button mini >
          <Done color="primary"/>
          </Button>
          <Button mini >
          <Textsms color="primary"/>
          </Button> */}
        </Typography>
        
      </ListItem>
    );
  }
}
FriendList.propTypes = {
  events: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
});
export default connect(
  mapStateToProps,
  { deleteFriend, sendFriendReq }
)(FriendList);
