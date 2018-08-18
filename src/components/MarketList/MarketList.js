import React, { Component } from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import MarketItem from "./MarketItem";

class MarketList extends Component {
  render() {
    if (this.props.users < 0) {
      return <div> Nothing </div>;
    } else {
      return (
        <List
          component="div"
          disablePadding
          style={{ maxHeight: "200px", overflowY: "scroll" }}
        >
          {this.props.users.map(user => (
            <MarketItem
              key={user._id} // TO DO gali but problemu cia
              user={user}
              userID={this.props.userID}
            />
          ))}
        </List>
      );
    }
  }
}
MarketList.propTypes = {
  users: PropTypes.array,
  userID: PropTypes.string.isRequired
};

export default MarketList;