import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { connect } from "react-redux";
import Moment from "react-moment";
import EditPostDialog from "./EditPostDialog";
import Badge from "@material-ui/core/Badge";
import Input from "@material-ui/core/Input";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Comment from "../UI-components/Comment";

import {
  getPost,
  editPost,
  likePost,
  unlikePost,
  deletePost,
  addComment
} from "../../../actions/postActions";

const styles = theme => ({
  card: {
    width: 500,
    margin: theme.spacing.unit * 5,
    backgroundColor: "#e8e8e8"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  media2: {
    height: 0
    //paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  typography: {
    padding: theme.spacing.unit * 2
  },
  comments: {
    margin: 10
  },
  commentsBadge: {
    margin: -5
  }
});

class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      anchorEl: null,
      open: false,
      editOpen: false,
      showEditDialog: false,
      post: {},
      rend: {},
      showLike: {},
      name: "",
      liked: [],
      comments: false,
      text: "",
      img: this.props.post.photo
    };

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    //this.handleEditClick = this.handleEditClick.bind(this);
  }

  componentWillMount() {
    this.setState(state => ({
      post: this.props.post,
      liked: this.props.post.liked
    }));
  }

  componentDidMount() {
    this.props.getPost(this.props.post._id);
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleEditClick = () => {
    this.setState({
      showEditDialog: !this.state.showEditDialog
    });
  };

  handlePopperClick = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open
    }));
  };

  handleDeleteClick = id => {
    this.props.deletePost(id);
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleLikeClick = () => {
    let userLikes = this.props.post.liked;
    if (userLikes.indexOf(this.props.auth.user._id) === -1) {
      userLikes.push(this.props.auth.user._id);
    } else {
      userLikes.splice(userLikes.indexOf(this.props.auth.user._id), 1);
    }
    let object = {
      liked: userLikes,
      _id: this.props.post._id
    };
    this.props.likePost(object);
    this.setState({ liked: this.props.post.liked });
  };

  handleCommentButton = () => {
    this.setState({ comments: !this.state.comments });
  };

  createComment = () => {
    if (!/^\s*$/.test(this.state.text)) {
      let lastComments = this.props.post.comments;
      let name;
      if (this.props.auth.user.method === "google")
        name = this.props.auth.user.google.name;
      else if (this.props.auth.user.method === "facebook")
        name = this.props.auth.user.facebook.name;
      else if (this.props.auth.user.method === "local")
        name = this.props.auth.user.local.name;
      const comment = {
        text: this.state.text,
        name: name,
        avatar: this.props.auth.user.avatar,
        user: this.creatorName,
        likes: []
      };
      lastComments.push(comment);
      const comments = { _id: this.props.post._id, comments: lastComments };
      this.props.addComment(comments);
      this.setState({ text: "" });
    }
  };

  render() {
    const { post, auth, classes } = this.props;
    const { anchorEl, open } = this.state;
    const id = open ? "simple-popper" : null;

    let creatorName;
    if (this.props.post.creator.method === "google")
      creatorName = this.props.post.creator.google.name;
    else if (this.props.post.creator.method === "facebook")
      creatorName = this.props.post.creator.facebook.name;
    else if (this.props.post.creator.method === "local")
      creatorName = this.props.post.creator.local.name;

    return (
      <div>
        <Card className={classes.card} raised>
          <CardHeader
            avatar={
              post.creator.avatar ? (
                <Avatar src={post.creator.avatar} />
              ) : (
                <Avatar>{creatorName ? creatorName.charAt(0) : null}</Avatar>
              )
            }
            title={creatorName}
            subheader={<Moment fromNow>{post.datePosted}</Moment>}
            action={
              this.props.auth.user._id === this.props.post.creator._id ? (
                <IconButton
                  aria-describedby={id}
                  onClick={this.handlePopperClick}
                >
                  <MoreVertIcon />
                  <Popper id={id} open={open} anchorEl={anchorEl} transition>
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={1}>
                        <Paper>
                          <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                          >
                            <MenuList>
                              <MenuItem onClick={() => this.handleEditClick()}>
                                Edit Post
                              </MenuItem>

                              <MenuItem
                                onClick={() => this.handleDeleteClick(post._id)}
                              >
                                Delete Post
                              </MenuItem>

                              <MenuItem>Disable Sharing</MenuItem>
                              <MenuItem>Disable Comments</MenuItem>
                            </MenuList>
                          </Menu>
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                </IconButton>
              ) : null
            }
          />
          <CardMedia
            className={post.photo.length > 0 ? classes.media : classes.media2}
            image={this.state.img.length > 0 ? this.state.img : " "}
          />
          <CardContent>
            <Typography component="p">{this.props.post.postBody}</Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              //className={classes.iconButton}
              aria-label="Like"
              onClick={this.handleLikeClick}
            >
              {this.state.liked.indexOf(this.props.auth.user._id) === -1 ? (
                <Badge
                  badgeContent={this.props.post.liked.length}
                  color={"default"}
                >
                  <FavoriteIcon />
                </Badge>
              ) : (
                <Badge
                  badgeContent={this.props.post.liked.length}
                  color={"secondary"}
                >
                  <FavoriteIcon color={"secondary"} />
                </Badge>
              )}
            </IconButton>

            {/* <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton> */}

            <Badge
              badgeContent={this.props.post.comments.length}
              color={"primary"}
            >
              <Button
                onClick={this.handleCommentButton}
                //disabled={this.props.disableComments}
                className={classes.commentsBadge}
              >
                Comment
              </Button>
            </Badge>

            <EditPostDialog
              show={this.state.showEditDialog}
              handleClose={this.handleEditClick}
              value={this.state.post}
            />
          </CardActions>
          <Collapse in={this.state.comments} timeout="auto" unmountOnExit>
            <div className={classes.comments}>
              <Input
                id="text"
                value={this.state.text}
                autoFocus={true}
                multiline={true}
                style={{ width: 280 }}
                onChange={e => this.handleChange(e)}
              />
              <IconButton onClick={this.createComment}>
                <Icon>send</Icon>
              </IconButton>
              <div className={classes.comments}>
                {this.props.post.comments.map((comment, index) => (
                  <Comment
                    key={index}
                    comment={comment}
                    postCreator={creatorName}
                    comments={this.props.post.comments}
                    _id={this.props.post._id}
                  />
                ))}
              </div>
            </div>
          </Collapse>
        </Card>
      </div>
    );
  }
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired
  //post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
  //post: state.post
});

//export default withStyles(styles)(PostCard);
export default connect(
  mapStateToProps,
  { deletePost, getPost, editPost, likePost, addComment }
)(withStyles(styles)(PostCard));
