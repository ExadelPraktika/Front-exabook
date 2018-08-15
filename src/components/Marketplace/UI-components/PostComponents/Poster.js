import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import ImageHolder from './ImageHolder';
import Footer from './Footer';
import deepOrange from '@material-ui/core/colors/deepOrange';
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popper from "@material-ui/core/es/Popper/Popper";
import Fade from "@material-ui/core/es/Fade/Fade";
import Paper from "@material-ui/core/es/Paper/Paper";
import Menu from "@material-ui/core/es/Menu/Menu";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import { deletePost, updateComments } from "../../../../actions/marketActions";

const styles = {
    card: {
        maxWidth: 400,
        margin: 20,
        backgroundColor: '#e8e8e8'
    },
    avatar: {
      color: '#fff',
      backgroundColor: deepOrange[500],
    }
};

class Poster extends Component {
    constructor(props) {
      super(props);
      this.state = {
        anchorEl: null,
        open: false,
        disableComments: this.props.post.disableComments
      };
    }
    handlePopperClick = event => {
      const { currentTarget } = event;
      this.setState(state => ({
        anchorEl: currentTarget,
        open: !state.open,
      }));
    };

    handleDelete = (userId, postId) => {
      this.props.deletePost(userId, postId);
    };

    handleDisableComments = () => {
      let object = {
        disableComments: !this.state.disableComments,
        _id: this.props.post._id,
      };
      this.props.updateComments(object);
      this.setState({ disableComments: !this.state.disableComments})
    };

    render() {
        let creatorName;
        if(this.props.post.creator.method === 'google')
            creatorName = this.props.post.creator.google.name;
        else if(this.props.post.creator.method === 'facebook')
            creatorName = this.props.post.creator.facebook.name;
        else if(this.props.post.creator.method === 'local')
            creatorName = this.props.post.creator.local.name;

        return (
            <div >
                <Card style={styles.card}>
                    <CardHeader
                        avatar={
                          <Avatar
                            style={styles.avatar}
                            src={this.props.post.creator.avatar
                              ? this.props.post.creator.avatar
                              : "https://res.cloudinary.com/exabook/image/upload/v1533390048/nophoto_profile_xucgsa.jpg"}
                          >
                          </Avatar>
                        }
                        action={
                          <IconButton onClick={this.handlePopperClick}>
                            <MoreVertIcon />
                            <Popper open={this.state.open} anchorEl={this.state.anchorEl} transition>
                              {({ TransitionProps }) => (
                                <Fade {...TransitionProps} timeout={1}>
                                  <Paper>
                                    <Menu
                                      anchorEl={this.state.anchorEl}
                                      open={Boolean(this.state.anchorEl)}
                                      onClose={this.handleClose}
                                    >
                                        {this.props.auth.user._id === this.props.post.creator._id
                                          ?
                                          <MenuItem onClick={this.handleDelete.bind(this, this.props.auth.user._id, this.props.post._id)}>Delete</MenuItem>
                                          :
                                          <MenuItem onClick={this.handleClose}>Buy</MenuItem> }
                                        {this.props.auth.user._id === this.props.post.creator._id
                                          ?
                                          <MenuItem onClick={this.handleDisableComments.bind(this)}>
                                            {this.state.disableComments === true ? 'Enable comments' : 'Disable comments'}
                                          </MenuItem>
                                          :
                                          null }
                                    </Menu>
                                  </Paper>
                                </Fade>
                              )}
                            </Popper>
                          </IconButton>
                        }
                        title={creatorName}
                        subheader={this.props.post.timePosted}
                    />
                    <CardContent>
                        <Typography component="p" variant={'headline'}>
                            {this.props.post.title}
                        </Typography>
                        <Typography component="p">
                           Price: {this.props.post.price} €
                         </Typography>
                      {this.props.post.location === undefined ? null :
                        <Typography component="p">
                          Location: {this.props.post.location}
                        </Typography>}
                    </CardContent>
                    {(this.props.post.images === undefined || this.props.post.images.length === 0) ? null :
                        <ImageHolder images={this.props.post.images}/>
                    }
                    <Footer
                      disableComments={this.state.disableComments}
                      description={this.props.post.description}
                      liked={this.props.post.liked}
                      rating={this.props.post.rating}
                      _id={this.props.post._id}
                      currentUser={this.props.auth.user._id}
                      postCreator={this.props.post.creator._id}
                      //for comments
                      comments={this.props.post.comments}
                      User={this.props.auth.user}
                    />
                </Card>
            </div>
        );
    }
}

Poster.propTypes = {
  deletePost: PropTypes.func.isRequired,
  updateComments: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { deletePost, updateComments })(Poster);