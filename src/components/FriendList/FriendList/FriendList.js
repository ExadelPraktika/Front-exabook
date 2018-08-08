import React, { Component } from "react";
import PropTypes from "prop-types";
import FriendItem from "../FriendList/FriendItem";
import List from "@material-ui/core/List";

class FriendList extends Component {
  render() {
    const { friends } = this.props;
    const { userID } = this.props;
    if (friends < 0) {
      return <div> No friends </div>;
    } else {
      return (
        <List
        component="div"
        disablePadding
        style={{ maxHeight: "200px", overflowY: "scroll" }}
      >
          {friends.map(friend => (
            <FriendItem
              key={friend.added}
              friend={friend}
              userID={userID}
            />
          ))}
        </List>
      );
    }
  }
}
FriendList.propTypes = {
  events: PropTypes.array.isRequired
};

export default FriendList;
