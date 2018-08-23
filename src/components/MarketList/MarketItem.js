import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import Textsms from '@material-ui/icons/Textsms';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { addtoChatArrray } from '../../actions/messageActions';
import { clearChatList } from '../../actions/chatActions';
import { deletePost } from '../../actions/marketActions';
import { removeBoughtItems, removeSoldItem } from "../../actions/authActions";

class MarketItem extends Component {

  handleBuying = (userId, postId) => {
    let sellingTo = this.props.auth.user.sellingTo.filter( user => user.buyingItem !== postId);
    this.props.removeSoldItem(postId);
    this.props.removeBoughtItems(userId, sellingTo);
    this.props.deletePost(userId, postId);
    this.props.clearChatList();
  };

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

        <Button
          style={{ paddingLeft: "10px" }}
          component="span"
          color="inherit"
          size={'small'}
          onClick={() => { this.props.addtoChatArrray(this.props.user)}}
        >
          {this.props.user.name}
          <Textsms color="primary"/>
        </Button>

        {this.props.state === 'selling'
          ?
          <Button mini >
            <CheckCircle  color="primary" onClick={this.handleBuying.bind(this, this.props.auth.user._id, this.props.user.buyingItem)}/>
          </Button>
          :
          null}
      </ListItem>
    );
  }
}
MarketItem.propTypes = {
  user: PropTypes.object.isRequired,
  userID: PropTypes.string.isRequired,
  removeBoughtItems: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  removeSoldItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  msg: state.msg,
  auth: state.auth
});

export default connect(mapStateToProps, { addtoChatArrray, removeBoughtItems, deletePost, removeSoldItem, clearChatList })(MarketItem);
