import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addAvatar, logoutUser } from "../actions/authActions";
import {Link} from "react-router-dom";
class profileOptions extends React.Component {
  state = {
    anchorEl: null,
    photo: "",
    name: "s"
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleLogout = () => {
    this.setState({ anchorEl: null });
    this.props.logoutUser();
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  uploadWidget() {
    cloudinary.openUploadWidget(
      {
        cloud_name: "exabook",
        upload_preset: "n1jdzlyw",
        multiple: true,
        show_powered_by: false,
        tags: ["xmas"],
        max_image_width: "400",
        max_image_height: "400"
      },
      (error, result) => {
        console.log(result[0].secure_url);
        const data = { avatar: result[0].secure_url };
        this.props.addAvatar(this.props.auth.user._id, data);
        this.handleClose();
        location.reload();
      }
    );
  }
  render() {
    const { anchorEl } = this.state;
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
    return (
      <div>
        {this.props.auth.user.avatar ? (
          <Avatar
            alt="Unknown"
            src={this.props.auth.user.avatar}
            aria-owns={anchorEl ? "simple-menu" : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          />
        ) : (
          <Avatar src={'https://res.cloudinary.com/exabook/image/upload/v1533390048/nophoto_profile_xucgsa.jpg'}
                  onClick={this.handleClick}/>

        )}

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.uploadWidget.bind(this)}>
            Upload avatar
          </MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.handleLogout} component={Link} to="/" >Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}
profileOptions.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { addAvatar, logoutUser }
)(profileOptions);
