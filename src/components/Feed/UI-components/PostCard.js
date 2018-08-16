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
import CommentFeed from "../UI-components/Comment-Feed/CommentFeed";
import CommentBox from "../UI-components/Comment-Feed/CommentBox";
import List from "@material-ui/core/List";

import {
  getPost,
  editPost,
  likePost,
  unlikePost,
  deletePost
} from "../../../actions/postActions";

const styles = theme => ({
  card: {
    width: 500,
    margin: theme.spacing.unit * 5
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
      post: {}
    };

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    //this.handleEditClick = this.handleEditClick.bind(this);
  }

  componentWillMount() {
    this.setState(state => ({
      post: this.props.post
    }));
    //console.log(this.props.post);
  }

  componentDidMount() {
    this.props.getPost(this.props.post._id);
  }

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

  render() {
    const { post, auth, classes } = this.props;
    const { anchorEl, open } = this.state;
    const id = open ? "simple-popper" : null;

    let creatorName;
    if (this.props.auth.user.method === "google")
      creatorName = this.props.auth.user.google.name;
    else if (this.props.auth.user.method === "facebook")
      creatorName = this.props.auth.user.facebook.name;
    else if (this.props.auth.method === "local")
      creatorName = this.props.auth.user.local.name;

    //const img = 'https://material-ui.com/static/images/cards/paella.jpg';
    return (
      <div>
        <Card className={classes.card} raised>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {creatorName === undefined
                  ? null
                  : creatorName[0].toUpperCase()}
              </Avatar>
            }
            title={creatorName}
            subheader={<Moment fromNow>{post.datePosted}</Moment>}
            action={
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
            }
          />
          <CardMedia
            className={post.photo.length > 0 ? classes.media : classes.media2}
            image={post.photo.length > 0 ? post.photo : ""}
          />
          <CardContent>
            <Typography component="p">{this.props.post.postBody}</Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>

            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>

            <EditPostDialog
              show={this.state.showEditDialog}
              handleClose={this.handleEditClick}
              value={this.state.post}
            />
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CommentBox eventID={post._id} />
            <List>
              <CommentFeed
                className={classes.root2}
                comments={post.comments}
                userID={this.props.auth.user._id}
                eventID={post._id}
              />
            </List>
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
  { deletePost, getPost, editPost }
)(withStyles(styles)(PostCard));
