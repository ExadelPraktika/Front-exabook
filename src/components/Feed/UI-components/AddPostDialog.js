import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import AddAPhoto from "@material-ui/icons/AddAPhoto";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";
import { addPost } from "../../../actions/postActions";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import { CloudinaryContext, Transformation, Image } from "cloudinary-react";

const styles = theme => ({
  button: {
    marginLeft: theme.spacing.unit * 5,
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    backgroundColor: "#d6d6d6",
    color: "#6d6d6d"
  },
  rightIcon: {
    marginLeft: theme.spacing.unit * 36
  },
  orangeAvatar: {
    marginRight: theme.spacing.unit,
    color: "#fff",
    backgroundColor: deepOrange[500]
  },
  addPhotoButton: {
    marginLeft: theme.spacing.unit
  },
  addPostTextBar: {
    width: "400px"
  },
  photo: {
    maxWidth: 320,
    maxHeight: 250
  }
});

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postBody: "",
      open: false,
      photo: ""
    };

    this.uploadWidget = this.uploadWidget.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = event => {
    const { user } = this.props.auth;

    const newPost = {
      creator: user._id,
      postBody: this.state.postBody,
      photo: this.state.photo
    };

    this.props.addPost(newPost);
    this.setState({ open: false, postBody: "", photo: "" });
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
    return (
      <div>
        {console.log()}
        <Button
          variant="contained"
          onClick={this.handleClickOpen}
          className={classes.button}
        >
          What's new with you?
          <AddAPhoto className={classes.rightIcon} />
        </Button>

        <Dialog open={this.state.open} onClose={this.handleClose}>
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
              <Button
                className={classes.addPhotoButton}
                onClick={this.uploadWidget.bind(this)}
              >
                <AddAPhoto />
              </Button>
            </div>
            <img src={this.state.photo} className={classes.photo} />
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
    );
  }
}

AddPost.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const styledComponent = withStyles(styles)(AddPost);

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { addPost }
  )(AddPost)
);
