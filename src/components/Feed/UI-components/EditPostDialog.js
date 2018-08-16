import React, { Component } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { editPost } from "../../../actions/postActions";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { getPost } from "../../../actions/postActions";

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
      postBody: ""
    };

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState(state => ({
      postBody: this.props.value.postBody,
      post: this.props.value
    }));
    //console.log(this.props.post);
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleUpdate = (id, postBody) => {
    //this.props.editPost(id, postBody);
    console.log(id, postBody);

    const { user } = this.props.auth;

    const editedPost = {
      postBody: this.state.postBody
    };

    this.props.editPost(editedPost);
    //this.setState({ open: false, postBody: "" });
  };

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div>
        <Dialog open={this.props.show}>
          {this.props.children}

          <DialogTitle id="form-dialog-title">Edit Post</DialogTitle>

          <DialogContent>
            <TextField
              //className={classes.addPostTextBar}
              autoFocus
              name="postBody"
              value={this.state.postBody}
              onChange={this.handleChange}
              margin="normal"
              multiline
              rowsMax="4"
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() =>
                this.handleUpdate(this.state.post._id, this.state.postBody)
              }
              color="primary"
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

EditPostDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  editPost: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
  getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { editPost, getPost }
)(withStyles(styles)(EditPostDialog));
