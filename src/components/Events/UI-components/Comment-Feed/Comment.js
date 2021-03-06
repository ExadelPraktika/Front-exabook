import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import MailIcon from "@material-ui/icons/Mail";
import ListItem from "@material-ui/core/ListItem";
import Badge from "@material-ui/core/Badge";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
import Moment from "react-moment";
import DeleteIcon from "@material-ui/icons/Delete";
import "moment-timezone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {
  deleteComment,
  addLike,
  deleteLike
} from "../../../../actions/eventActions";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    minWidth: 240,
    backgroundColor: theme.palette.background.paper,
    wordBreak: "break-all",
    wordWrap: "break-word",
    marginLeft: "20%"
  },
  paper: {
    width: "100%",
    maxWidth: 360,
    minWidth: 240,
    backgroundColor: theme.palette.background.paper,
    wordBreak: "break-all",
    wordWrap: "break-word"
  },
  padding: {
    padding: "5px"
  },
  textRight: {
    textAlign: "right",
    padding: "5px"
  },
  margin: {
    float: "right",
    marginRight: "2%",
    marginTop: "2%"
  },
  margin1: {
    marginRight: "4%"
  },
  margin2: {
    float: "left",
    marginLeft: "0%",
    marginTop: "2%"
  },
  strong: {
    fontWeight: "400"
  },
  button: {
    float: "left",
    marginRight: "20",
    textTransform: ["capitalize", "!important"]
  },
  text: {
    float: "left",
    marginTop: "4%",
    marginRight: "5%"
  },
  text1: {
    float: "right",
    marginTop: "4%"
  },
  img: {
    maxWidth: 200,
    maxHeight: 180,
    borderRadius: 5
  },
  Red: {
    color: "red"
  }
});

class Comment extends Component {
  state = {
    rend: {},
    showLike: {}
  };
  componentDidMount() {
    const result = this.props.comment.likes.find( e => e.user === this.props.auth.user._id );
    this.setState({
      showLike: result
    });
  }
  callFuncs = () => {
    this.props.addLike(
      this.props.auth.user._id,
      this.props.eventID,
      this.props.comment._id
    )
    this.setState({showLike: 'undefined'})
  }
  callFuncs2 = () => {
    this.props.deleteLike(
      this.props.auth.user._id,
      this.props.eventID,
      this.props.comment._id
    )
    this.setState({showLike: undefined})
  }
  render() {
    const { classes } = this.props;
    return (
      <ListItem className={classes.root}>
        <div className={classes.margin1}>
        {this.props.comment.user.avatar ? <Avatar src={this.props.comment.user.avatar}/> : (<Avatar >
            {this.props.comment.name.charAt(0)}
        </Avatar>)}
          
        </div>
        <div>
          <div>
            <Typography component="p">
              <b>
              
                {this.props.comment.user._id !== this.props.userID
                  ? this.props.comment.name
                  : "Me"}
              </b>
            </Typography>
          </div>
          <Badge
            className={classes.text}
            badgeContent={this.props.comment.likes.length}
            color={this.props.comment.likes.length ? "primary" : "inherit"}
          >
            <Paper className={classes.paper} elevation={1}>
              <Typography
                className={
                  this.props.comment.user._id !== this.props.userID
                    ? classes.padding
                    : classes.textRight
                }
                component="p"
              >
                {this.props.comment.text}<br/>
                <img className={classes.img} src={this.props.comment.photo} />
              </Typography>
            </Paper>
          </Badge>
          <div>
            {/* {this.props.comment.likes.some(
              e => e.user.toString() !== this.props.auth.user._id)} */}
              
            {this.state.showLike === undefined ? <Typography
                component="p"
                color="primary"
                className={classes.text}
                onClick={ this.callFuncs
                  
                }
              >
                Like
              </Typography> : <Typography
                component="p"
                color="primary"
                className={classes.text}
                onClick={ this.callFuncs2
                }
              >
                Dislike
              </Typography> }
              
              {/* {Object.keys(this.state.rend).length > 0 ?
              <Typography
                component="p"
                color="primary"
                className={classes.text}
                onClick={() =>
                  this.props.deleteLike(
                    this.props.auth.user._id,
                    this.props.eventID,
                    this.props.comment._id
                  )
                }
              >
                Dislike
              </Typography>: null} */}
            

            {this.props.comment.user._id !== this.props.userID ? null : (
              <Typography
                component="p"
                color="secondary"
                className={classes.text}
                onClick={() =>
                  this.props.deleteComment(
                    this.props.eventID,
                    this.props.comment._id
                  )
                }
              >
                Delete
              </Typography>
            )}
            <Tooltip title={this.props.comment.date} placement="bottom">
              <Typography component="p" className={classes.text1}>
                <Moment fromNow ago>
                  {this.props.comment.date}
                </Moment>
              </Typography>
            </Tooltip>
          </div>
        </div>
      </ListItem>
    );
  }
}
Comment.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  event: state.event
});
export default connect(
  mapStateToProps,
  { deleteComment, addLike, deleteLike }
)(withStyles(styles)(Comment));
