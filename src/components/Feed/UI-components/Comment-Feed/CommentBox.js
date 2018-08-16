import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/es/styles";
import { connect } from "react-redux";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/es/Button/Button";
import Icon from "@material-ui/core/es/Icon/Icon";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { addComment, getPost } from "../../../../actions/postActions";
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CardMedia from "@material-ui/core/CardMedia";
const styles = theme => ({
  expandOpen: {
    transform: "rotate(180deg)"
  },
  comments: {
    margin: 10
  },
  posterImg: {
    with: 200,
    height: 200
  },
  padding: {
    padding: "20px"
  },
  padding1: {
    padding: "4px"
  },
  Button: {
    marginTop: "5px",
    textTransform: "lowercase",
    padding: "0",
    float: "right",
    marginRight: "5px"
  },
  photo: {
    maxWidth: 100,
    maxHeight: 100,
    opacity: 0.8,
    BorderRadius: "50%"
  },
  floatLeft: {
    float: "left",
    width: 40,
    height: 40,
    marginTop: "4px"
  }
});

class CommentBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: this.props.anchorEl,
      comments: this.props.comments,
      descriptionOpened: this.props.descriptionOpened,
      photo: "",
      text: "",
      name: ""
    };
    this.uploadWidget = this.uploadWidget.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
  }
  componentDidMount() {
    const { user } = this.props.auth;
    let name;
    if (user.method === "google") {
      name = user.google.name;
    }
    if (user.method === "local") {
      name = user.local.name;
    }
    if (user.method === "facebook") {
      name = user.facebook.name;
    }
    this.setState({
      name: name
    });
  }

  uploadWidget() {
    cloudinary.openUploadWidget(
      {
        cloud_name: "exabook",
        upload_preset: "n1jdzlyw",
        show_powered_by: false,
        tags: ["xmas"],
        max_image_width: "1600",
        max_image_height: "900"
      },
      (error, result) => {
        console.log(result[0].secure_url);
        this.setState({ photo: result[0].secure_url });
      }
    );
  }
  deletePhoto() {
    this.setState({ photo: "" });
  }

  handleDescriptionButton = () => {
    this.setState(() => {
      if (this.state.descriptionOpened) {
        return { descriptionOpened: false };
      }
      return { descriptionOpened: true };
    });
  };

  handleChange1 = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const { user } = this.props.auth;

    const newComment = {
      text: this.state.text,
      photo: this.state.photo,
      user: user._id,
      name: this.state.name
    };
    this.setState({
      text: ""
    });
    console.log(this.props.eventID, newComment);
    this.props.addComment(this.props.eventID, newComment);

    this.setState({ text: "", photo: "" });
  };
  onKeyPress = e => {
    if (e.key === "Enter") {
      this.onSubmit(e);
    }
  };

  render() {
    const { classes } = this.props;
    let UploadButton;
    if (this.state.photo.length == 0) {
      UploadButton = (
        <Button
          onClick={this.uploadWidget.bind(this)}
          variant="outlined"
          color="primary"
          className={classes.Button}
        >
          Image
          <Icon>image</Icon>
        </Button>
      );
    } else {
      UploadButton = (
        <Button
          onClick={this.deletePhoto.bind(this)}
          variant="outlined"
          color="primary"
          className={classes.Button}
        >
          Delete
          <Icon>image </Icon>
        </Button>
      );
    }
    return (
      <div>
        <FormGroup onSubmit={this.onSubmit} onKeyPress={this.onKeyPress}>
          <br />
          <div className={classes.margin}>
            <Card className={classes.padding}>
              <Grid container spacing={8} alignItems="space-around">
                <Grid item>
                  {this.props.auth.user.avatar ? (
                    <Avatar
                      src={this.props.auth.user.avatar}
                      className={classes.posterImg}
                      style={{ width: 100, height: 100 }}
                    />
                  ) : (
                    <Avatar style={{ width: 100, height: 100 }}>
                      {this.state.name.charAt(0)}
                    </Avatar>
                  )}
                </Grid>
                <Grid item>
                  <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                      <TextField
                        name="text"
                        value={this.state.text}
                        onChange={this.handleChange1}
                        multiline="true"
                        style={{ width: 330 }}
                        id="input-with-icon-grid"
                        label="Say something"
                      />{" "}
                      <br />
                      <Button
                        onClick={event => {
                          this.onSubmit(event);
                        }}
                        variant="contained"
                        color="primary"
                        className={classes.Button}
                      >
                        Post Comment
                      </Button>
                      {UploadButton}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </div>
        </FormGroup>
      </div>
    );
  }
}
// CommentBox.propTypes = {
//     description: PropTypes.string.isRequired,
//     descriptionOpened: PropTypes.bool.isRequired,
//     comments: PropTypes.bool.isRequired,
//     anchorEl: PropTypes.object.isRequired,

// };
const mapStateToProps = state => ({
  auth: state.auth,
  event: state.event
});
export default connect(
  mapStateToProps,
  { addComment, getPost }
)(withStyles(styles)(CommentBox));
