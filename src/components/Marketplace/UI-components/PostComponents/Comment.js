import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "moment-timezone";
import { deleteComment, likeComment } from "../../../../actions/marketActions";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 350,
    minWidth: 250,
    wordBreak: "break-all",
    wordWrap: "break-word",
  },
  paper: {
    width: 250,
    backgroundColor: theme.palette.background.paper,
    wordBreak: "break-all",
    wordWrap: "break-word"
  },
  padding: {
    padding: "5px"
  },
  margin: {
    float: "right",
    marginRight: "2%"
  },
  margin1: {
    marginRight: "4%"
  },
  margin2: {
    float: "left",
    marginLeft: "0%"
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
  Red: {
    color: "red"
  }
});

class Comment extends Component {

  deleteComment = () => {
   const newComments = this.props.comments.filter(Comment => Comment._id !== this.props.comment._id);
   const object = { _id: this.props._id, comments: newComments};
   this.props.deleteComment(object);
  };

  likedComment = () => {
    const comments = this.props.comments;
    comments.forEach((Comment) => {
      if( Comment._id === this.props.comment._id){
        Comment.likes.push(this.props.auth.user._id);
      }
    });
    const object = { _id: this.props._id, comments: comments};
    this.props.likeComment(object);
  };

  unlikedComment = () => {
    const comments = this.props.comments;
    comments.forEach((Comment) => {
      if( Comment._id === this.props.comment._id){
        Comment.likes.splice(Comment.likes.indexOf(this.props.auth.user._id), 1);
      }
    });
    const object = { _id: this.props._id, comments: comments};
    this.props.likeComment(object);
  };

  render() {
    const { classes } = this.props;
    return (
      <ListItem className={classes.root}>
        <div className={classes.margin1}>
          {this.props.comment.avatar ? <Avatar src={this.props.comment.avatar}/> : (<Avatar >
            {this.props.comment.name.charAt(0)}
          </Avatar>)}
        </div>
        <div>
          <div>
            <Typography component="p">
              <b>

                {this.props.comment.user !== this.props.auth.user._id
                  ? this.props.comment.name
                  : "Me"}
              </b>
            </Typography>
          </div>
          {this.props.comment.likes.length !== 0
            ?
            <Badge
              className={classes.text}
              badgeContent={this.props.comment.likes.length}
              color={"primary"}>
              <Paper className={classes.paper} elevation={3}>
                <Typography
                  className={classes.padding}
                  component="p"
                >
                  {this.props.comment.text}
                </Typography>
              </Paper>
            </Badge>
            :
            <Paper className={classes.paper} elevation={3}>
              <Typography
                className={classes.padding}
                component="p"
              >
                {this.props.comment.text}
              </Typography>
            </Paper> }
          {this.props.comment.likes.indexOf(this.props.auth.user._id) === -1
            ?
            <Button size={'small'} color="primary" onClick={this.likedComment} >Like</Button>
            :
            <Button size={'small'} color="primary" onClick={this.unlikedComment} >Unlike</Button>
          }
          {(this.props.comment.user === this.props.auth.user._id || this.props.postCreator === this.props.auth.user._id)
            ? <Button
              size={'small'}
              color="secondary"
              style={{marginLeft: 120}}
              onClick={this.deleteComment}
            >Delete</Button>
            : null}
        </div>
      </ListItem>
    );
  }
}
Comment.propTypes = {
  classes: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  postCreator: PropTypes.string,
  comments: PropTypes.array.isRequired,
  deleteComment: PropTypes.func.isRequired,
  likeComment: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  market: state.market
});
export default connect(mapStateToProps, { deleteComment, likeComment })(withStyles(styles)(Comment));