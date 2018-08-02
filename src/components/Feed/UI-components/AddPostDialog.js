import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { addPost } from '../../../actions/postActions';
import { connect } from 'react-redux';

const styles = theme => ({
  button: {
    marginLeft: theme.spacing.unit * 5,
    marginTop: theme.spacing.unit * 3
  },
  rightIcon: {
    marginLeft: theme.spacing.unit * 30,
  },
  orangeAvatar: {
    marginRight: theme.spacing.unit,
    color: '#fff',
    backgroundColor: deepOrange[500]
  },
  addPhotoButton: {
    marginLeft: theme.spacing.unit
  },
  addPostTextBar: {
    width: "400px"
  }
});

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postBody: '',
      open: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = (event) => {
    const { user } = this.props.auth;
  
    const newPost = {
      author: user._id,
      postBody: this.state.postBody,
    };

    this.props.addPost(newPost);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen} className={classes.button}>
          <Avatar className={classes.orangeAvatar}>N</Avatar>
          What's new with you?
          <AddAPhoto className={classes.rightIcon} /> 
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle id="form-dialog-title">Add Post</DialogTitle>
    
          <DialogContent>
            <div>
              <TextField
                className={classes.addPostTextBar}
                autoFocus
                name="postBody"
                value={this.state.postBody}
                onChange={this.handleChange}
                margin="normal"
                multiline
                rowsMax="4"
                label="What's new with you?"
              />
              <Button className={classes.addPhotoButton} >
                <AddAPhoto />
              </Button>
            </div>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Post
            </Button>
          </DialogActions>
        </Dialog>       
      </div>
    )
  }
}

AddPost.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

const styledComponent = withStyles(styles)(AddPost);

export default withStyles(styles)(connect(mapStateToProps, { addPost })(AddPost));
//export default withStyles(styles)(connect(mapStateToProps) (ButtonAppBar));
//export default withStyles(styles)(AddPost);