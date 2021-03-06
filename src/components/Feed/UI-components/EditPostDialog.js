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
import AddAPhoto from "@material-ui/icons/AddAPhoto";

const styles = theme => ({
  card: {
    width: 500,
    margin: theme.spacing.unit * 5
  },
  photo: {
    maxWidth: 320,
    maxHeight: 250
  }
});

class EditPostDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      post: this.props.value,
      postBody: this.props.value.postBody,
      photo: this.props.value.photo
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleUpdate = (id, postBody) => {
    const { user } = this.props.auth;

    const editedPost = {
      postBody: this.state.postBody,
      _id: this.props.value._id,
      photo: this.state.photo
    };

    this.props.editPost(editedPost);
    this.props.handleClose();
  };

  handleRemovePhoto = () => {
    this.setState(state => ({
      photo: ""
    }));
  };

  uploadWidget() {
    cloudinary.openUploadWidget(
      {
        cloud_name: "exabook",
        upload_preset: "n1jdzlyw",
        multiple: true,
        show_powered_by: false,
        tags: ["xmas"],
        max_image_width: "1600",
        max_image_height: "900"
      },
      (error, result) => {
        this.setState({ photo: result[0].secure_url });
      }
    );
  }

  render() {
    const { classes } = this.props;

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
              autoFocus
              name="postBody"
              value={this.state.postBody}
              onChange={this.handleChange}
              margin="normal"
              multiline
              rowsMax="4"
            />
            <div>
              <img src={this.state.photo} className={classes.photo} />
            </div>
            {this.state.photo === "" ? (
              <Button
                onClick={this.uploadWidget.bind(this)}
              >
                <AddAPhoto />
              </Button>
            ) : (
              <Button onClick={this.handleRemovePhoto}>Remove photo</Button>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() =>
                this.handleUpdate(this.state.post._id, this.state.post.postBody)
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
