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
import { deletePost, updateComments, buyingItem } from "../../../../actions/marketActions";
import { removeBoughtItems } from "../../../../actions/authActions";
import Badge from "@material-ui/core/es/Badge/Badge";
import Moment from "react-moment";
import { addtoChatArrray } from "../../../../actions/messageActions";

const styles = {
    card: {
        maxWidth: 350,
        margin: 10,
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
        disableComments: this.props.post.disableComments,
        averageRating: '0',
        buying: ''
      };
    }

    componentDidMount(){
      if (this.props.post.creator.marketRating !== undefined && this.props.post.creator.marketRating.length !== 0)
      this.getUserMarketRating();
    }

    handlePopperClick = event => {
      const { currentTarget } = event;
      this.setState(state => ({
        anchorEl: currentTarget,
        open: !state.open,
      }));
    };

    handleDelete = (userId, postId) => {
      let sellingTo = this.props.auth.user.sellingTo.filter( user => user.buyingItem !== postId);
      this.props.removeBoughtItems(userId, sellingTo);
      this.props.deletePost(userId, postId);
    };

    handleDisableComments = () => {
      let postIds = [];
      this.props.market.marketFeed.forEach( post => { postIds.push(post._id) });
      let object = {
        disableComments: !this.state.disableComments,
        _id: this.props.post._id,
        postIds: postIds
      };
      this.props.updateComments(object);
      this.setState({ disableComments: !this.state.disableComments})
    };

    handleBuyItem = () => {
      let buyer = { ...this.props.auth.user, buyingItem: this.props.post._id};
      let seller = { ...this.props.post.creator, sellingItem: this.props.post._id };
      this.props.buyingItem(buyer, seller, this.props.post._id);
      this.props.addtoChatArrray(this.props.post.creator);
      this.setState({ buying: 'buying' });
    };

    getUserMarketRating = () => {
        let averageRating = 0;
        this.props.post.creator.marketRating.forEach((rate) => {averageRating += rate});
        averageRating /= this.props.post.creator.marketRating.length;
        this.setState({ averageRating: averageRating.toFixed(1)});
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
                      avatar={(this.props.post.creator.marketRating !== undefined && this.props.post.creator.marketRating.length !== 0) ?
                        <Badge badgeContent={this.state.averageRating} color={'primary'}>
                          <Avatar
                            style={styles.avatar}
                            src={this.props.post.creator.avatar
                              ? this.props.post.creator.avatar
                              : "https://res.cloudinary.com/exabook/image/upload/v1533390048/nophoto_profile_xucgsa.jpg"}
                          >
                          </Avatar>
                        </Badge>
                        :
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
                                          ( ( this.props.post.creator.sellingTo.find( sellingTo =>
                                              ( sellingTo._id === this.props.auth.user._id && sellingTo.buyingItem === this.props.post._id ))
                                            !== undefined ) || this.state.buying === 'buying'
                                              ?
                                            <MenuItem disabled={true}>Buying...</MenuItem>
                                              :
                                            <MenuItem onClick={this.handleBuyItem.bind(this)}>Buy</MenuItem>
                                          ) }
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
                      subheader={<Moment fromNow>{this.props.post.timePosted}</Moment>}
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
  updateComments: PropTypes.func.isRequired,
  addtoChatArrray: PropTypes.func.isRequired,
  buyingItem: PropTypes.func.isRequired,
  removeBoughtItems: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  msg: state.msg,
  market: state.market
});
export default connect(mapStateToProps, { deletePost, updateComments, buyingItem, addtoChatArrray, removeBoughtItems })(Poster);