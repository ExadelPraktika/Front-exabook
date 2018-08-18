import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Clear from '@material-ui/icons/Clear';
import Done from '@material-ui/icons/Done';
import Textsms from '@material-ui/icons/Textsms';
import { addtoChatArrray } from '../../actions/messageActions'

class MarketItem extends Component {
  render() {
    return (
      <ListItem >
        {this.props.user.avatar !== "undefined" ? (
          <Avatar
            style={{
              width: "30px",
              height: "30px"
            }}
            src={this.props.user.avatar}
          />
        ) : (
          <Avatar
            style={{
              width: "30px",
              height: "30px"
            }}
          >
            {this.props.user.name.charAt(0)}
          </Avatar>
        )}

        <Typography
          style={{ paddingLeft: "10px" }}
          component="span"
          color="inherit"
          noWrap={true}
        >
          {this.props.user.name}
        </Typography>

      </ListItem>
    );
  }
}
MarketItem.propTypes = {
  user: PropTypes.object.isRequired,
  userID: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  msg: state.msg
});

export default connect(mapStateToProps, {addtoChatArrray})(MarketItem);
