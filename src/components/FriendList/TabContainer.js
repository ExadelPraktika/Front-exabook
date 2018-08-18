import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import StarBorder from "@material-ui/icons/StarBorder";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import FolderIcon from "@material-ui/icons/Folder";
import Search from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import People from "@material-ui/icons/People";
import RequestedPeople from "@material-ui/icons/ReplyAll";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { getPeopleList, getUserFriends } from '../../actions/friendActions'
import FriendList from '../FriendList/FriendList/FriendList'
import SearchFriends from './SearchList/SearchFriends'
import Spinner from '../../utils/Spinner';
const styles = theme => ({
  root: {
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  margin: {
    zIndex: "0"
  }
});

class NestedList extends React.Component {
  state = {
    open: false,
    open1: false,
    open2: false,
    open3: false
  };
  componentDidMount() {
    this.props.getPeopleList(this.props.auth.user._id);
    this.props.getUserFriends(this.props.auth.user._id);
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };
  handleClick2 = () => {
    this.setState(state => ({ open2: !state.open2 }));
  };
  handleClick3 = () => {
    this.setState(state => ({ open3: !state.open3 }));
  };
  handleTooltipClose = () => {
    this.setState({ open1: false });
  };

  handleTooltipOpen = () => {
    this.setState({ open1: true });
  };

  render() {
    const { classes } = this.props;
    const { loading } = this.props.friends;
   

    return (
      !loading ? 
      <div className={classes.root}>
        <List
          component="nav"
          subheader={
            <ListSubheader component="div">
              {
                <SearchFriends peopleList={this.props.friends.userList} userID={this.props.auth.user._id} style={{zIndex: '222' }}/>
      
              }
            </ListSubheader>
          }
        >
        <br/>

          <ListItem button onClick={this.handleClick}>
          <People color='primary'/>
            <ListItemText inset primary="Friends" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          {this.props.friends.friends.length > 0
            ?
            <FriendList friends={this.props.friends.friends} userID={this.props.auth.user._id} />
            :
            <p style={{ marginLeft: "30px" }}>friend list is empty</p>}
          </Collapse>
          <ListItem button onClick={this.handleClick2}>
            <ListItemIcon>
              <Badge
                className={classes.margin}
                badgeContent={this.props.friends.friendRequests.length}
                color="primary"
              >
                <DraftsIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText inset primary="Friend requests" />
            {this.state.open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open2} timeout="auto" unmountOnExit>
          <FriendList friends={this.props.friends.friendRequests} userID={this.props.auth.user._id} />
      
          </Collapse>
          <ListItem button onClick={this.handleClick3}>
            <RequestedPeople color="primary">
              <Badge
                className={classes.margin}
                badgeContent={this.props.friends.requestedFriends.length}
                color="primary"
              >
                <DraftsIcon />
              </Badge>
            </RequestedPeople>
            <ListItemText inset primary="Requested friends" />
            {this.state.open3 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open3} timeout="auto" unmountOnExit>
          <FriendList friends={this.props.friends.requestedFriends} userID={this.props.auth.user._id} />
      
          </Collapse>
        </List>
      </div> : <Spinner/>
    );
    
  }
}
NestedList.propTypes = {
  getUserFriends: PropTypes.func.isRequired,
  getPeopleList: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  friends: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  friends: state.friends
});

export default connect(
  mapStateToProps,
  { getUserFriends, getPeopleList }
)(withStyles(styles)(NestedList));