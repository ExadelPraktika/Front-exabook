import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { editPost } from '../../../actions/postActions';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getPost } from '../../../actions/postActions';

const styles = theme => ({
  card: {
    width: 500,
    margin: theme.spacing.unit * 5
  }
});

class EditPostDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      post: {},
      postBody: ''
    }

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    //console.log(this.props);
  }

  // handleUpdate = (id) => {
  //   this.props.editPost(id);
  // }

  render() {
    const { post } = this.props;

    if(!this.props.show) {
      return null;
    }

    return(
      <Dialog
        open={this.props.show}
        //onClose={this.handleClose}
      >
      {this.props.children}

      <DialogTitle id="form-dialog-title">Edit Post</DialogTitle>
  
      <DialogContent>
        <TextField
          //className={classes.addPostTextBar}
          autoFocus
          name="postBody"
          value={this.state.postBody}
          //onChange={this.handleChange}
          margin="normal"
          multiline
          rowsMax="4"
          //label="What's new with you?"
        />
      </DialogContent>

      <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary">
            Update
          </Button>
      </DialogActions>
      </Dialog>       
          )
  }
}

EditPostDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  editPost: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
  getPost: PropTypes.func.isRequired,
  //post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(mapStateToProps, { editPost, getPost })(withStyles(styles)(EditPostDialog));
