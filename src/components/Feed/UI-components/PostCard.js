import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { deletePost } from '../../../actions/postActions';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Moment from 'react-moment';
import EditPostDialog from './EditPostDialog';
import { getPost } from '../../../actions/postActions';
import { editPost } from '../../../actions/postActions';
import EditContainer from '../../../hoc/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
  card: {
    width: 500,
    margin: theme.spacing.unit * 5,
    backgroundColor: '#e8e8e8'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  typography: {
    padding: theme.spacing.unit * 2,
  },
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
    };

   

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  

  handleEditClick = () => {
  
    this.setState({
      showEditDialog: !this.state.showEditDialog,

    });
    console.log('click')

  }

  handlePopperClick = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open,
    }));
  };

  handleDeleteClick = (id) => {
    this.props.deletePost(id);
  }

  handleEditClose = () => {
    this.setState({ editOpen: false });
  };

  handleEditOpen = () => {
    this.setState({ editOpen: true });
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { post, auth, classes } = this.props;
    const { anchorEl, open } = this.state;
    const id = open ? 'simple-popper' : null;

    let creatorName;
    if(this.props.auth.user.method === 'google')
      creatorName = this.props.auth.user.google.name;
    else if(this.props.auth.user.method === 'facebook')
      creatorName = this.props.auth.user.facebook.name;
    else if(this.props.auth.method === 'local')
      creatorName = this.props.auth.user.local.name;


    const img = 'https://material-ui.com/static/images/cards/paella.jpg';
    return (
      <div>
      
        <Card className={classes.card} raised>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {creatorName === undefined ? null : creatorName[0].toUpperCase()}
              </Avatar>
            }
            
            title={creatorName}
            subheader={<Moment fromNow>{post.datePosted}</Moment>}
            action={
              <IconButton aria-describedby={id} onClick={this.handlePopperClick}>
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
                      <MenuItem onClick={() => this.handleEditClick()}>Edit Post</MenuItem>
                      
                      
                       {/* <EditPostDialog 
                        show={this.state.showEditDialog}
                        handleClose={() => this.handleEditClick()}
                        value={this.props.post}
                      /> */}


                      <MenuItem onClick={() => this.handleDeleteClick(post._id)}>Delete Post</MenuItem>
                      <MenuItem >Disable Sharing</MenuItem>
                      <MenuItem >Disable Comments</MenuItem>
                    </Menu>

                  
                      </Paper>
                    </Fade>
                    )}

                    
                  </Popper>
              </IconButton>
              
          }
          />
          <CardMedia
            className={classes.media}
            image={img}
            title="Contemplative Reptile"
          />
          <CardContent>
          <Dialog
                          open={this.state.showEditDialog}
                          onClose={this.handleEditClose}
                        >
                        <DialogTitle id="form-dialog-title">Edit Post</DialogTitle>
                    
                        <DialogContent>
                          <TextField
                            //className={classes.addPostTextBar}
                            autoFocus
                            name="postBody"
                            value={post.postBody}
                            //onChange={this.handleChange}
                            margin="normal"
                            multiline
                            rowsMax="4"
                            //label="What's new with you?"
                          />
                        </DialogContent>

                        <DialogActions>
                            <Button color="primary" onClick={() =>this.handleEditClose()}>
                              Cancel
                            </Button>
                            <Button color="primary">
                              Update
                            </Button>
                        </DialogActions>
      </Dialog>       
            <Typography component="p">
             {this.props.post.postBody}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
            <Button
              onClick={() => this.handleEditClick2(post._id) }
            >
              Edit
            </Button>
            <EditPostDialog show={this.state.showEditDialog} handleClose={this.handleEditClick2}/>

            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              
            </CardContent>
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
  auth: state.auth,
  //post: state.post
});

//export default withStyles(styles)(PostCard);
export default connect(mapStateToProps, { deletePost, getPost, editPost })(withStyles(styles)(PostCard));


